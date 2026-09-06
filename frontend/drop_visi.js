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
    await client.query('ALTER TABLE "profil" DROP COLUMN "visi";');
    console.log('Successfully dropped "visi" column');
  } catch (err) {
    console.error('Error dropping column:', err.message);
  } finally {
    await client.end();
  }
}

run();
