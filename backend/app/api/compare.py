from fastapi import APIRouter
from app.models.contracts import CompareRequest, CompareResponse

router = APIRouter()

@router.post("/compare", response_model=CompareResponse)
async def compare_events(request: CompareRequest):
    return CompareResponse(
        differences="Mock differences between A and B.",
        strengths="Mock strengths found in both events.",
        weaknesses="Mock weaknesses identified.",
        lessons="Mock lessons learned."
    )