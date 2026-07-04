import uuid
from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.models.upload import UploadResponse
from app.utils.file_handler import save_upload_file
from app.utils.db_handler import insert_document, get_all_documents, update_memory_status

# MUST HAVE THESE FOR AI:
from app.services.parser import parse_document
from app.services.cognee_service import memory_engine

router = APIRouter()
ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt"]


@router.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a document, save it locally, parse it, and send to AI Memory.
    """
    file_extension = Path(file.filename).suffix.lower()
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{file_extension}'. Only PDF, DOCX and TXT are allowed."

        )

    # 1. Save file locally
    file_path = save_upload_file(file)
    doc_id = str(uuid.uuid4())
    uploaded_at = datetime.utcnow().isoformat()
    
    # Format extension (e.g., '.pdf' -> 'PDF') for a cleaner database
    doc_type_formatted = file_extension.replace(".", "").upper()

    # 2. Log in DB as pending
    insert_document(
        doc_id=doc_id, 
        filename=file.filename, 
        uploaded_at=uploaded_at, 
        document_type=doc_type_formatted, 
        status="pending"
    )

    try:
        # 3. Extract Text
        extracted_text = parse_document(file_path)

        # 4. Send to Cognee Memory
        memory_result = await memory_engine.remember(
            text=extracted_text,
            doc_id=doc_id
        )

        if memory_result.get("status") == "error":
            update_memory_status(doc_id, "failed")
            raise HTTPException(status_code=500, detail="AI Memory failed.")

        # 5. Mark as Success in DB
        update_memory_status(doc_id, "success")

        return UploadResponse(
            document_id=doc_id,
            filename=file.filename,
            file_type=file_extension,
            file_path=file_path,
            status="success"
        )
        
    except HTTPException:
        # Don't swallow HTTPExceptions we raised intentionally
        raise
    except Exception as e:
        # If parsing or anything else fails, mark as failed
        update_memory_status(doc_id, "failed")
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")


@router.get("/history")
async def get_upload_history():
    """
    Returns all uploaded documents.
    """
    documents = get_all_documents()
    return {"documents": documents}