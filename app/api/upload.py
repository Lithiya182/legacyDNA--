from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import shutil
import os
from datetime import datetime

from app.utils.db_handler import insert_document, get_all_documents

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt"]


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a document, save it locally, and store its metadata in SQLite.
    """

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Only PDF, DOCX and TXT are allowed."
        )

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    document_type = extension.replace(".", "").upper()

    document_id = insert_document(
        filename=filename,
        document_type=document_type,
        memory_status="Pending"
    )

    return {
        "document_id": document_id,
        "filename": filename,
        "document_type": document_type,
        "status": "Pending",
        "message": "File uploaded successfully"
    }


@router.get("/history")
async def get_upload_history():
    """
    Returns all uploaded documents.
    """

    documents = get_all_documents()

    return {
        "documents": documents
    }
@router.get("/history")
async def get_upload_history():
    """Returns a list of uploaded files."""
    documents = get_all_documents()
    return {"documents": documents}