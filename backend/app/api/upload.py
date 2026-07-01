import os
import uuid
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path

from app.models.upload import UploadResponse
from app.utils.file_handler import save_upload_file
from app.utils.db_handler import insert_document

router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)):
    allowed_extensions = [".pdf", ".docx", ".txt"]
    file_extension = Path(file.filename).suffix.lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )
    
    file_path = save_upload_file(file)

    doc_id = str(uuid.uuid4())
    uploaded_at = datetime.utcnow().isoformat()

    insert_document(doc_id, file.filename, uploaded_at, status="pending")

    return UploadResponse(
        document_id=doc_id,
        filename=file.filename,
        file_type=file_extension,
        file_path=file_path,
        status="pending"
    )