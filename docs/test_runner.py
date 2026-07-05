import requests
import time
import re
from datetime import datetime

API_URL = "http://127.0.0.1:8000/api/query"
DELAY_BETWEEN_QUESTIONS = 10  # seconds — stay under Groq's TPM limit

def load_questions(md_path="question_bank.md"):
    """Extract numbered questions from the markdown question bank."""
    questions = []
    with open(md_path, "r", encoding="utf-8") as f:
        for line in f:
            match = re.match(r"^\d+\.\s+(.*)", line.strip())
            if match:
                questions.append(match.group(1))
    return questions

def run_tests():
    questions = load_questions()
    print(f"🚀 Loaded {len(questions)} questions from question_bank.md\n")

    results = []

    for i, q in enumerate(questions, 1):
        print(f"❓ [{i}/{len(questions)}] {q}")
        try:
            start_time = time.time()
            response = requests.post(API_URL, json={"question": q}, timeout=60)
            elapsed = round(time.time() - start_time, 2)

            if response.status_code == 200:
                data = response.json()
                answer = data.get("answer", "")
                sources = data.get("sources", [])
                supporting = data.get("supporting_memories", [])

                answer_lower = answer.lower().strip()
                # A response is a non-answer if it STARTS with a negative
                # phrase — regardless of total length. This catches cases
                # like "I don't have enough information...to accurately
                # determine..." which can run well past 120 chars but is
                # still a pure non-answer. A real answer that merely mentions
                # a missing detail as a caveat (e.g. "...launch marketing 30+
                # days before the event. However, we do not have the exact
                # start date.") should NOT be flagged, since the negative
                # phrase isn't at the start of the response.
                is_empty = (
                    (not answer)
                    or answer_lower.startswith("i don't have")
                    or answer_lower.startswith("no memory found")
                )

                print(f"✅ ({elapsed}s): {answer[:150]}{'...' if len(answer) > 150 else ''}")

                results.append({
                    "question": q,
                    "answer": answer,
                    "sources": sources,
                    "supporting_memories_count": len(supporting),
                    "response_time": elapsed,
                    "status": "EMPTY" if is_empty else "ANSWERED",
                    "score": ""  # left blank for manual Pass/Partial/Fail grading
                })
            else:
                print(f"❌ API Error: {response.status_code} - {response.text}")
                results.append({
                    "question": q,
                    "answer": f"ERROR {response.status_code}: {response.text}",
                    "sources": [],
                    "supporting_memories_count": 0,
                    "response_time": elapsed,
                    "status": "ERROR",
                    "score": "Incorrect"
                })

        except Exception as e:
            print(f"❌ Failed to reach API: {e}")
            results.append({
                "question": q,
                "answer": f"EXCEPTION: {str(e)}",
                "sources": [],
                "supporting_memories_count": 0,
                "response_time": 0,
                "status": "EXCEPTION",
                "score": "Incorrect"
            })

        print("-" * 60)

        # Pace requests to avoid Groq TPM rate limit
        if i < len(questions):
            print(f"⏳ Waiting {DELAY_BETWEEN_QUESTIONS}s before next question...\n")
            time.sleep(DELAY_BETWEEN_QUESTIONS)

    write_report(results)

def write_report(results):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    total = len(results)
    answered = sum(1 for r in results if r["status"] == "ANSWERED")
    empty = sum(1 for r in results if r["status"] == "EMPTY")
    errors = sum(1 for r in results if r["status"] in ("ERROR", "EXCEPTION"))

    with open("test_report.md", "w", encoding="utf-8") as f:
        f.write(f"# LegacyDNA Retrieval Test Report\n\n")
        f.write(f"Generated: {timestamp}\n\n")
        f.write(f"## Summary\n\n")
        f.write(f"- Total Questions: {total}\n")
        f.write(f"- Answered (non-empty): {answered}\n")
        f.write(f"- Empty/No Memory: {empty}\n")
        f.write(f"- Errors: {errors}\n\n")
        f.write(f"**Note:** Correct/Partial/Incorrect scoring requires manual review — fill in the `score` column below after reading each answer against source documents.\n\n")
        f.write(f"## Results\n\n")
        f.write("| # | Question | Status | Time (s) | Sources | Score |\n")
        f.write("|---|----------|--------|----------|---------|-------|\n")
        for i, r in enumerate(results, 1):
            q_short = r["question"][:60] + ("..." if len(r["question"]) > 60 else "")
            f.write(f"| {i} | {q_short} | {r['status']} | {r['response_time']} | {r['supporting_memories_count']} | {r['score']} |\n")

        f.write(f"\n## Full Answers\n\n")
        for i, r in enumerate(results, 1):
            f.write(f"### {i}. {r['question']}\n\n")
            f.write(f"**Status:** {r['status']}\n\n")
            f.write(f"**Answer:** {r['answer']}\n\n")
            f.write(f"**Sources:** {r['sources']}\n\n")
            f.write("---\n\n")

    print(f"\n✅ Report written to test_report.md")

if __name__ == "__main__":
    run_tests()