from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import router as upload_router
from app.utils.db_handler import initialize_database

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
    return {
        "message": "LegacyDNA Backend API is running!"
    }


app.include_router(
    upload_router,
    prefix="/api",
    tags=["Upload"]
)