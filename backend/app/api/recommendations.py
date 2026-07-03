from fastapi import APIRouter, HTTPException
from app.services.cognee_service import memory_engine
from datetime import datetime

router = APIRouter()

@router.get("/recommendations")
async def get_recommendations():
    """
    Generate evidence-backed recommendations from memory.
    """
    result = await memory_engine.improve()

    if result.get("status") == "error":
        raise HTTPException(
            status_code=500,
            detail=f"Recommendation generation failed: {result.get('message')}"
        )

    recommendations = result.get("recommendations", [])
    patterns = result.get("patterns", [])

    if not recommendations:
        return {
            "recommendations": [],
            "source_pattern": [],
            "generated_at": datetime.utcnow().isoformat(),
            "message": "No recommendations yet. Upload documents first."
        }

    return {
        "recommendations": recommendations,
        "source_pattern": patterns,
        "generated_at": datetime.utcnow().isoformat()
    }