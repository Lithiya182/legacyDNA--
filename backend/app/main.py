from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

# Import routers
from app.api.upload import router as upload_router
from app.api.query import router as query_router
from app.api.compare import router as compare_router
from app.api.insights import router as insights_router

app = FastAPI(title="LegacyDNA Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(upload_router, prefix="/api", tags=["Upload"])
app.include_router(query_router, prefix="/api", tags=["Query"])
app.include_router(compare_router, prefix="/api", tags=["Compare"])
app.include_router(insights_router, prefix="/api", tags=["Insights"])

@app.get("/")
def read_root():
    return {"status": 200, "message": "LegacyDNA API is running"}