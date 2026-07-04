from fastapi import APIRouter, HTTPException
from app.models.contracts import QueryRequest, QueryResponse
from app.services.cognee_service import memory_engine

router = APIRouter()

# ADDED response_model here!
@router.post("/query", response_model=QueryResponse)
async def query_documents(request: QueryRequest):
    """
    Query the AI memory and return answer + supporting evidence.
    """
    if not request.question or not request.question.strip():
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty."
        )

    result = await memory_engine.recall(request.question)

    if result.get("status") == "error":
        raise HTTPException(
            status_code=500,
            detail=f"Retrieval failed: {result.get('message', 'Unknown error')}"
        )

    answer = result.get("answer", "")

    # Handle empty memory case
    if not answer or answer == "I don't have any memory of this yet.":
        # RETURN as QueryResponse object
        return QueryResponse(
            answer="No memory found. Please upload documents first.",
            sources=[],
            supporting_memories=[]
        )

    # RETURN as QueryResponse object
    return QueryResponse(
        answer=answer,
        sources=result.get("sources", []),
        supporting_memories=result.get("supporting_memories", [])
    )