from fastapi import APIRouter
from app.models.contracts import InsightsResponse, MemoryDeleteResponse

router = APIRouter()

from app.services.cognee_service import memory_engine

@router.get("/insights", response_model=InsightsResponse)
async def get_insights():

    result = await memory_engine.improve()

    return InsightsResponse(
        success_patterns=result["patterns"],
        recurring_problems=result["problems"],
        recommendations=result["recommendations"]
    )


@router.delete("/memory/{memory_id}", response_model=MemoryDeleteResponse)
async def delete_memory(memory_id: str):
    return MemoryDeleteResponse(id=memory_id, status="deleted")