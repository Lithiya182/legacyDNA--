from fastapi import APIRouter
from app.models.contracts import QueryRequest, QueryResponse

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
async def query_documents(request: QueryRequest):
    return QueryResponse(
        answer="This is a mock answer based on your documents.",
        sources=["doc1.pdf", "notes.txt"]
    )