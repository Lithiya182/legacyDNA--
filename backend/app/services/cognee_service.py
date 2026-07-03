import os
import time
import asyncio
import logging
import json
from typing import Dict, Any, List

import cognee
import litellm
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

class CogneeService:
    def __init__(self):
        if not os.getenv("GROQ_API_KEY"):
            logger.warning("GROQ_API_KEY is not set. Recall will fail.")
        # Encapsulated state tracker to avoid global keyword
        self.last_groq_call_time = 0.0

    async def remember(self, text: str, doc_id: str) -> Dict[str, Any]:
        try:
            print(f"🧠 Cognee is memorizing document {doc_id}...")
            await cognee.add([text], dataset_name="legacydna_memory")
            await cognee.cognify()
            print(f"✅ Memory successfully created for {doc_id}")
            return {"status": "success", "operation": "remember", "doc_id": doc_id}
        except Exception as e:
            logger.error(f"Cognee failed to remember {doc_id}: {str(e)}")
            return {"status": "error", "message": str(e)}

    def _parse_memories_to_list(self, memories: Any) -> List[str]:
        """Parses various Cognee context types into a list of strings."""
        if not memories:
            return []
        if isinstance(memories, str):
            return [memories]
        if isinstance(memories, list):
            parsed = []
            for item in memories:
                if isinstance(item, dict):
                    # Handle Access Control format: {"dataset_name": "...", "search_result": "..."}
                    result = item.get("search_result") or item.get("context")
                    if result:
                        parsed.append(str(result))
                    else:
                        parsed.append(str(item))
                else:
                    parsed.append(str(item))
            return parsed
        return [str(memories)]

    async def recall(self, question: str) -> Dict[str, Any]:
        try:
            print(f"🔍 Searching memory for: {question}")

            # Using query_text explicitly as standard Cognee parameter name
            search_results = await cognee.search(
                query_text=question, 
                only_context=True, 
                datasets=["legacydna_memory"]
            )

            # Robust handling of various Cognee context return structures
            parsed_results = self._parse_memories_to_list(search_results)

            supporting_memories = []
            context_parts = []
            for item in parsed_results[:5]:
                context_parts.append(item)
                supporting_memories.append(item[:200] + "..." if len(item) > 200 else item)

            context_text = "\n\n".join(context_parts)
            context_text = context_text[:10000]

            MAX_CONTEXT_CHARS = 1500
            if len(context_text) > MAX_CONTEXT_CHARS:
                context_text = context_text[:MAX_CONTEXT_CHARS]

            if not context_text.strip():
                return {
                    "status": "success",
                    "answer": "I don't have any memory of this yet.",
                    "sources": [],
                    "supporting_memories": []
                }

            # Proactive throttle — enforce minimum gap between Groq calls asynchronously
            MIN_INTERVAL_SECONDS = 8
            elapsed = time.time() - self.last_groq_call_time
            if elapsed < MIN_INTERVAL_SECONDS:
                wait = MIN_INTERVAL_SECONDS - elapsed
                print(f"⏳ Throttling: waiting {wait:.1f}s before calling Groq...")
                await asyncio.sleep(wait)

            print("🧠 Passing context to Groq for synthesis...")

            system_prompt = (
                "You are LegacyDNA, an AI memory assistant for an event planning team. "
                "Answer the user's question using ONLY the context provided below. "
                "If the context does not contain the answer, say 'I don't have enough information in my memory.'\n\n"
                f"CONTEXT:\n{context_text}"
            )

            self.last_groq_call_time = time.time()
            response = await litellm.acompletion(
                model="groq/llama-3.1-8b-instant",
                max_tokens=250,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": question}
                ],
                timeout=30.0
            )

            if not response.choices:
                raise ValueError("No choices returned from LLM.")

            final_answer = response.choices[0].message.content
            if not final_answer:
                raise ValueError("LLM returned empty answer.")

            print("✅ Answer generated successfully!")

            return {
                "status": "success",
                "answer": final_answer,
                "sources": ["(Memory Graph)"],
                "supporting_memories": supporting_memories
            }

        except litellm.RateLimitError as e:
            logger.error(f"Rate limited: {str(e)}")
            return {
                "status": "error",
                "answer": "The AI is briefly rate-limited from recent testing. Please wait ~30 seconds and try again.",
                "sources": [],
                "supporting_memories": []
            }
        except Exception as e:
            logger.error(f"Error during recall: {str(e)}")
            print(f"🔴 RECALL ERROR: {str(e)}")
            return {
                "status": "error",
                "answer": "Sorry, I encountered an error searching the memory.",
                "sources": [],
                "supporting_memories": []
            }

    async def improve(self) -> Dict[str, Any]:
        try:
            try:
                memories = await cognee.search(
                    query_text="event planning success failures sponsors volunteers logistics lessons learned",
                    only_context=True,
                    datasets=["legacydna_memory"]
                )
            except Exception as e:
                # Handle missing dataset gracefully
                if "DatasetNotFoundError" in str(e):
                    return {
                        "status": "success",
                        "patterns": [],
                        "problems": [],
                        "recommendations": []
                    }
                raise

            # Parse results safely
            parsed_memories = self._parse_memories_to_list(memories)
            memory_text = "\n".join(parsed_memories)
            memory_text = memory_text[:4000]

            if not memory_text.strip():
                return {
                    "status": "success",
                    "patterns": [],
                    "problems": [],
                    "recommendations": []
                }

            prompt = f"""
            Extract success patterns, recurring problems, and recommendations from the following text.
            
            Return ONLY valid JSON:
            {{
              "patterns": [],
              "problems": [],
              "recommendations": []
            }}

            Constraints:
            - Recommendations: short actionable statements.
            - Patterns/Problems: concise bullet-style findings.

            Context:
            {memory_text}
            """

            response = await litellm.acompletion(
                model="groq/llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                timeout=30.0
            )

            if not response.choices:
                raise ValueError("No choices returned from LLM.")
                
            content_str = response.choices[0].message.content
            if not content_str:
                raise ValueError("LLM returned empty response.")
                
            content = json.loads(content_str)

            return {
                "status": "success",
                "patterns": content.get("patterns", []),
                "problems": content.get("problems", []),
                "recommendations": content.get("recommendations", [])
            }

        except Exception as e:
            logger.error(f"Error during improve: {str(e)}")
            return {
                "status": "error",
                "patterns": [],
                "problems": [],
                "recommendations": [],
                "message": str(e)
            }

    async def forget(self, memory_id: str) -> Dict[str, Any]:
        return {"status": "pending", "message": "Forget functionality not yet implemented"}

memory_engine = CogneeService()