from fastapi import APIRouter
from app.models.contracts import InsightsResponse, MemoryDeleteResponse

router = APIRouter()

@router.get("/insights", response_model=InsightsResponse)
async def get_insights():
    return InsightsResponse(
        success_patterns=["Mock pattern 1", "Mock pattern 2"],
        recurring_problems=["Mock problem 1"],
        recommendations=["Mock recommendation 1"]
    )

@router.delete("/memory/{memory_id}", response_model=MemoryDeleteResponse)
async def delete_memory(memory_id: str):
    return MemoryDeleteResponse(id=memory_id, status="deleted")