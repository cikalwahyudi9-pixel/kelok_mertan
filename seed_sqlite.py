import sqlite3
import json
import datetime

conn = sqlite3.connect('frontend/payload.db')
cursor = conn.cursor()

def create_rich_text(text):
    return json.dumps({
        "root": {
            "type": "root",
            "children": [
                {
                    "type": "paragraph",
                    "children": [{"type": "text", "text": text, "version": 1}],
                    "direction": None,
                    "format": "",
                    "indent": 0,
                    "version": 1
                }
            ],
            "direction": None,
            "format": "",
            "indent": 0,
            "version": 1
        }
    })

now = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%fZ")

data = [
    ('Spot Foto Kereta Tikungan Maut', 'wahana', create_rich_text('Spot fotografi terbaik di Kelok Mertan! Anda bisa mendapatkan angle sempurna saat kereta meliuk tajam dengan latar perbukitan hijau. Sangat direkomendasikan datang di pagi atau sore hari saat cahaya matahari sedang bagus.'), 'Buka setiap hari, Gratis'),
    ('Warung Kopi Tepi Sawah', 'kuliner', create_rich_text('Tempat istirahat nyaman untuk menikmati kopi lokal dan gorengan hangat sambil menunggu kereta melintas. Warung ini dikelola langsung oleh warga lokal dengan harga yang sangat terjangkau.'), 'Harga mulai Rp 5.000'),
    ('Sewa Sepeda Onthel Keliling Desa', 'paket', create_rich_text('Nikmati suasana pedesaan dengan menyewa sepeda onthel klasik. Rute yang disarankan adalah menyusuri persawahan dari Dusun Mertan hingga ke stasiun terdekat. Sangat cocok untuk wisata keluarga.'), 'Rp 20.000 / Jam')
]

for item in data:
    cursor.execute("""
        INSERT INTO potensi (judul, kategori, deskripsi, sumber_data, updated_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (item[0], item[1], item[2], item[3], now, now))

conn.commit()
conn.close()
print("Success")
