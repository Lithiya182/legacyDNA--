import sqlite3

# Assuming Engineer A creates legacydna.db in the root directory
DB_PATH = "legacydna.db"

def insert_document(doc_id: str, filename: str, uploaded_at: str, status: str = "pending"):
    """Inserts a new document record into the database."""
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            "INSERT INTO documents (id, filename, uploaded_at, memory_status) VALUES (?, ?, ?, ?)",
            (doc_id, filename, uploaded_at, status)
        )
        conn.commit()

def update_memory_status(doc_id: str, status: str):
    """Updates the memory status of an existing document."""
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            "UPDATE documents SET memory_status = ? WHERE id = ?",
            (status, doc_id)
        )
        conn.commit()