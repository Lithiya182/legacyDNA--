import os
import time
from pathlib import Path
from fastapi import UploadFile

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")


def save_upload_file(file: UploadFile) -> str:
    """Save uploaded file to disk and return its path."""

    Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)

    timestamp = int(time.time())

    safe_filename = f"{timestamp}_{file.filename}"

    file_path = os.path.join(
        UPLOAD_DIR,
        safe_filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return file_path