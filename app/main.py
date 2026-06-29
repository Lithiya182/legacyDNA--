from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.upload import router as upload_router
app = FastAPI(
    title="LegacyDNA Backend",
    description="Backend API for LegacyDNA Hackathon Project",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for hackathon MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(
    upload_router,
    prefix="/api",
    tags=["Upload"]
)
# Root endpoint
@app.get("/")
def root():
    return {
        "status": "success",
        "message": "LegacyDNA Backend is Running 🚀"
    }