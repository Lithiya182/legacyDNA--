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

class CompareRequest(BaseModel):
    event_a: str
    event_b: str

class CompareResponse(BaseModel):
    differences: str
    strengths: str
    weaknesses: str
    lessons: str

class InsightsResponse(BaseModel):
    success_patterns: List[str]
    recurring_problems: List[str]
    recommendations: List[str]

class MemoryDeleteResponse(BaseModel):
    id: str
    status: str