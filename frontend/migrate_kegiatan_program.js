const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.zaokvtwzxsndgqllbjnl:%40Kelokmertan@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
});

async function run() {
  await client.connect();
  console.log('Connected!');

  const queries = [
    // Kegiatan new columns
    `ALTER TABLE kegiatan ADD COLUMN IF NOT EXISTS waktu VARCHAR(100)`,
    `ALTER TABLE kegiatan ADD COLUMN IF NOT EXISTS lokasi VARCHAR(200)`,
    `ALTER TABLE kegiatan ADD COLUMN IF NOT EXISTS kategori VARCHAR(50) DEFAULT 'lainnya'`,
    `ALTER TABLE kegiatan ADD COLUMN IF NOT EXISTS deskripsi_html TEXT`,
    `ALTER TABLE kegiatan ADD COLUMN IF NOT EXISTS is_arsip BOOLEAN DEFAULT false`,

    // Program new columns
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS latar_belakang JSONB`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS latar_belakang_html TEXT`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS permasalahan JSONB`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS permasalahan_html TEXT`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS tujuan JSONB`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS tujuan_html TEXT`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS sasaran TEXT`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS pelaksanaan JSONB`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS pelaksanaan_html TEXT`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS hasil JSONB`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS hasil_html TEXT`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS dampak JSONB`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS dampak_html TEXT`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS luaran JSONB`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS luaran_html TEXT`,
    `ALTER TABLE program ADD COLUMN IF NOT EXISTS urutan INTEGER DEFAULT 0`,
  ];

  for (const q of queries) {
    try {
      await client.query(q);
      console.log('OK:', q.substring(0, 60));
    } catch (e) {
      console.error('ERR:', e.message.substring(0, 80));
    }
  }

  console.log('\nDone! Checking columns...');
  
  for (const table of ['kegiatan', 'program']) {
    const res = await client.query(
      `SELECT column_name FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position`, [table]
    );
    console.log(`\n${table}:`, res.rows.map(r => r.column_name));
  }

  await client.end();
}

run().catch(console.error);
