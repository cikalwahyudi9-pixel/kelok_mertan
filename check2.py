import sqlite3
conn = sqlite3.connect('frontend/payload.db')
cursor = conn.cursor()
cursor.execute("PRAGMA table_info(media)")
print("Media:", cursor.fetchall())
