const { Client } = require('pg');
const fs = require('fs');

async function run() {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const dbUriMatch = envContent.match(/DATABASE_URI=([^\r\n]+)/);
  if (!dbUriMatch) {
    console.error('DATABASE_URI not found in .env.local');
    return;
  }
  const dbUri = dbUriMatch[1].trim();

  const client = new Client({
    connectionString: dbUri,
  });
  await client.connect();
  
  try {
    const res = await client.query('SELECT * FROM "profil" LIMIT 1;');
    console.log('Columns in profil table:', Object.keys(res.rows[0] || {}));
    console.log('Data:', res.rows[0]);
  } catch (err) {
    console.error('Error querying profil:', err.message);
  } finally {
    await client.end();
  }
}

run();
