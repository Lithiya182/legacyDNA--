from pydantic import BaseModel
from typing import List

class MemoryItem(BaseModel):
    id: str
    content: str
    source_file: str

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str
    sources: List[str]
    supporting_memories: List[str] = []

class CompareRequest(BaseModel):
    event_a: str
    event_b: str

class CompareResponse(BaseModel):
    differences: str
    strengths: str
    weaknesses: str
    lessons: str

class InsightItem(BaseModel):
    insight: str
    source_documents: List[str] = []

class RecommendationItem(BaseModel):
    recommendation: str
    reason: str = ""
    supporting_evidence: str = ""
    source_documents: List[str] = []

class InsightsResponse(BaseModel):
    success_patterns: List[InsightItem] = []
    recurring_problems: List[InsightItem] = []
    recommendations: List[RecommendationItem] = []

class MemoryDeleteResponse(BaseModel):
    id: str
    status: str