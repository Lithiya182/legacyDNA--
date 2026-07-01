# backend/app/models/database.py
import sqlite3

DB_PATH = "legacydna.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS documents (
            id TEXT PRIMARY KEY,
            filename TEXT,
            uploaded_at TEXT,
            memory_status TEXT
        )
    """)
    conn.commit()
    conn.close()