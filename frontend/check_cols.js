const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.zaokvtwzxsndgqllbjnl:%40Kelokmertan@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
});

async function run() {
  await client.connect();
  
  const tables = ['kegiatan', 'program', 'umkm'];
  for (const table of tables) {
    try {
      const res = await client.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position`,
        [table]
      );
      console.log(`\n${table} columns:`, res.rows.map(r => r.column_name));
    } catch(e) {
      console.log(`Error for ${table}:`, e.message);
    }
  }
  
  await client.end();
}

run().catch(console.error);
