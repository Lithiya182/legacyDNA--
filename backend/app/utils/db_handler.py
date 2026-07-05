import sqlite3

DB_PATH = "legacydna.db"

def initialize_database():
    """Create all required Day 3 tables if they don't exist."""
    with sqlite3.connect(DB_PATH) as conn:
        # 1. Documents
        conn.execute("""
            CREATE TABLE IF NOT EXISTS documents (
                id TEXT PRIMARY KEY,
                filename TEXT NOT NULL,
                document_type TEXT,
                uploaded_at TEXT NOT NULL,
                memory_status TEXT NOT NULL DEFAULT 'pending'
            )
        """)
        # 2. Events
        conn.execute("""
            CREATE TABLE IF NOT EXISTS events (
                id TEXT PRIMARY KEY,
                event_name TEXT, year TEXT, attendance INTEGER
            )
        """)
        # 3. Sponsors
        conn.execute("""
            CREATE TABLE IF NOT EXISTS sponsors (
                id TEXT PRIMARY KEY,
                name TEXT, reliability_score TEXT
            )
        """)
        # 4. Insights
        conn.execute("""
            CREATE TABLE IF NOT EXISTS insights (
                id TEXT PRIMARY KEY,
                title TEXT, category TEXT
            )
        """)
        # 5. Recommendations
        conn.execute("""
            CREATE TABLE IF NOT EXISTS recommendations (
                id TEXT PRIMARY KEY,
                recommendation TEXT,
                source_pattern TEXT,
                generated_at TEXT
            )
        """)
        conn.commit()

def insert_document(doc_id: str, filename: str, uploaded_at: str, document_type: str = None, status: str = "pending"):
    """Inserts a new document record into the database."""
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            "INSERT INTO documents (id, filename, document_type, uploaded_at, memory_status) VALUES (?, ?, ?, ?, ?)",
            (doc_id, filename, document_type, uploaded_at, status)
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

def get_all_documents():
    """Fetch all uploaded documents."""
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute("""
            SELECT id, filename, document_type, uploaded_at, memory_status
            FROM documents
            ORDER BY uploaded_at DESC
        """)
        rows = cursor.fetchall()
    return [
        {
            "id": row[0],
            "filename": row[1],
            "document_type": row[2],
            "uploaded_at": row[3],
            "status": row[4]
        }
        for row in rows
    ]