import sqlite3
import json
import datetime
import uuid

conn = sqlite3.connect('frontend/payload.db')
cursor = conn.cursor()

# Insert media
now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3] + "Z"
media_id = 1
# Actually, lets check the schema first
cursor.execute("PRAGMA table_info(potensi)")
print("Potensi:", cursor.fetchall())
