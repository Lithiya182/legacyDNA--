from fastapi import APIRouter, HTTPException
from app.models.contracts import InsightsResponse, MemoryDeleteResponse
from app.services.cognee_service import memory_engine

router = APIRouter()

@router.get("/insights", response_model=InsightsResponse)
async def get_insights():
    """
    Generate insights from stored memory.
    """
    result = await memory_engine.improve()

    if result.get("status") == "error":
        raise HTTPException(
            status_code=500,
            detail=f"Insight generation failed: {result.get('message')}"
        )

    patterns = result.get("patterns", [])
    problems = result.get("problems", [])
    recommendations = result.get("recommendations", [])

    return InsightsResponse(
        success_patterns=patterns,
        recurring_problems=problems,
        recommendations=recommendations
    )


@router.delete("/memory/{memory_id}", response_model=MemoryDeleteResponse)
async def delete_memory(memory_id: str):
    """
    Delete a memory. NOTE: forget() is not yet implemented in cognee_service —
    this currently returns 'pending', not a real deletion.
    """
    result = await memory_engine.forget(memory_id)

    if result.get("status") == "pending":
        raise HTTPException(
            status_code=501,
            detail="Forget functionality not yet implemented."
        )

    return MemoryDeleteResponse(id=memory_id, status=result.get("status", "unknown"))