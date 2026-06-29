import pdfplumber
import os
import docx

def parse_pdf(path: str) -> str:
    text = ""

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text


def parse_txt(path: str) -> str:
    with open(path, "r", encoding="utf-8") as file:
        return file.read()

def parse_docx(path: str) -> str:
    """Parse a DOCX file and return extracted text."""
    doc = docx.Document(path)
    return "\n".join(
        para.text for para in doc.paragraphs
        if para.text.strip()
    )


def parse_document(path: str) -> str:
    """Dispatcher function."""

    _, ext = os.path.splitext(path)
    ext = ext.lower()

    if ext == ".pdf":
        return parse_pdf(path)
    elif ext == ".txt":
        return parse_txt(path)
    elif ext == ".docx":
        return parse_docx(path)
    else:
        raise ValueError(
            f"Unsupported file type: {ext}"
        )