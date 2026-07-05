from fastapi import APIRouter
from app.utils.db_handler import get_all_documents
from app.services.cognee_service import memory_engine

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_stats():
    """
    Aggregates stats from existing data sources for the frontend dashboard.
    Never raises — always returns a safe zeroed response on partial failure,
    so the dashboard never crashes even if one sub-call fails.
    """
    documents = []
    insight_count = 0

    try:
        documents = get_all_documents()
    except Exception:
        documents = []

    try:
        result = await memory_engine.improve()
        if result.get("status") == "success":
            insight_count = (
                len(result.get("patterns", []))
                + len(result.get("problems", []))
                + len(result.get("recommendations", []))
            )
    except Exception:
        insight_count = 0

    return {
        "knowledge_assets": len(documents),
        "documents": len(documents),
        "insights": insight_count,
        "members": 4
    }