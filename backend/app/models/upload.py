# app/models/upload.py

from pydantic import BaseModel


class UploadResponse(BaseModel):
    document_id: str
    filename: str
    file_type: str
    file_path: str
    status: str = "success"