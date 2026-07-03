from fastapi import APIRouter, HTTPException
from app.services.cognee_service import memory_engine

router = APIRouter()

@router.get("/insights")
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

    if result.get("status") == "pending":
        return {
            "success_patterns": [],
            "recurring_problems": [],
            "recommendations": [],
            "message": "Insight generation not yet implemented"
        }

    patterns = result.get("patterns", [])
    problems = result.get("problems", [])
    recommendations = result.get("recommendations", [])

    # Empty memory guard
    if not patterns and not problems and not recommendations:
        return {
            "success_patterns": [],
            "recurring_problems": [],
            "recommendations": [],
            "message": "No insights yet. Upload documents and query first."
        }

    return {
        "success_patterns": patterns,
        "recurring_problems": problems,
        "recommendations": recommendations
    }