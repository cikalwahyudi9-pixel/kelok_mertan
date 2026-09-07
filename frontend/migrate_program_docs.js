const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.zaokvtwzxsndgqllbjnl:%40Kelokmertan@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
});

async function run() {
  await client.connect();
  console.log('Connected!');

  const queries = [
    // Program dokumentasi array table
    `CREATE TABLE IF NOT EXISTS program_dokumentasi (
      _order INTEGER NOT NULL,
      _parent_id INTEGER NOT NULL REFERENCES program(id) ON DELETE CASCADE,
      id VARCHAR(50) PRIMARY KEY,
      caption VARCHAR(300),
      jenis VARCHAR(20) DEFAULT 'umum',
      foto_id INTEGER REFERENCES media(id) ON DELETE SET NULL
    )`,
    `CREATE INDEX IF NOT EXISTS program_dokumentasi_order_idx ON program_dokumentasi(_order)`,
    `CREATE INDEX IF NOT EXISTS program_dokumentasi_parent_idx ON program_dokumentasi(_parent_id)`,
  ];

  for (const q of queries) {
    try {
      await client.query(q);
      console.log('OK:', q.substring(0, 70));
    } catch (e) {
      console.error('ERR:', e.message.substring(0, 100));
    }
  }

  console.log('Done!');
  await client.end();
}

run().catch(console.error);
