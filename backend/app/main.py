from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.utils.db_handler import initialize_database
from app.api.upload import router as upload_router
from app.api.query import router as query_router
from app.api.compare import router as compare_router
from app.api.insights import router as insights_router

load_dotenv()

app = FastAPI(
    title="LegacyDNA Backend API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    initialize_database()


@app.get("/")
def root():
    return {"message": "LegacyDNA Backend API is running!"}


app.include_router(upload_router, prefix="/api", tags=["Upload"])
app.include_router(query_router, prefix="/api", tags=["Query"])
app.include_router(compare_router, prefix="/api", tags=["Compare"])
app.include_router(insights_router, prefix="/api", tags=["Insights"])