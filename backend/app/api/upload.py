from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    allowed_extensions = [".pdf", ".docx", ".txt"]
    file_extension = Path(file.filename).suffix.lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )

    return {
        "status": "success",
        "message": "File validation successful",
        "filename": file.filename
    }