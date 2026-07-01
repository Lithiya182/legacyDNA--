import sqlite3
from datetime import datetime
import os

DB_PATH = "legacydna.db"


def initialize_database():
    """Create the documents table if it doesn't exist."""

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS documents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                document_type TEXT NOT NULL,
                uploaded_at TEXT NOT NULL,
                memory_status TEXT NOT NULL
            )
        """)

        conn.commit()


def insert_document(filename: str, document_type: str, memory_status: str):
    """Insert uploaded document metadata into SQLite."""

    uploaded_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO documents
            (filename, document_type, uploaded_at, memory_status)
            VALUES (?, ?, ?, ?)
        """, (
            filename,
            document_type,
            uploaded_at,
            memory_status
        ))

        conn.commit()

        return cursor.lastrowid


def get_all_documents():
    """Fetch all uploaded documents."""

    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()

        cursor.execute("""
            SELECT
                id,
                filename,
                uploaded_at,
                memory_status
            FROM documents
            ORDER BY uploaded_at DESC
        """)

        rows = cursor.fetchall()

    return [
        {
            "id": row[0],
            "filename": row[1],
            "uploaded_at": row[2],
            "status": row[3]
        }
        for row in rows
    ]