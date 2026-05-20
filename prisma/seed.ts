import { Client } from 'pg';
import 'dotenv/config';

async function main() {
  console.log('Connecting to PostgreSQL directly to seed providers...');
  
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is missing inside .env!');
  }

  const client = new Client({ connectionString });
  await client.connect();

  try {
    console.log('Seeding 8 providers into "Provider" table...');

    for (let i = 1; i <= 8; i++) {
      const query = `
        INSERT INTO "Provider" (id, name, "monthlyQuota", "leadsReceivedCount", "lastAssignedAt")
        VALUES ($1, $2, 10, 0, NULL)
        ON CONFLICT (id) DO NOTHING;
      `;
      await client.query(query, [i, `Provider ${i}`]);
    }

    console.log('Successfully seeded 8 providers via native SQL.');
  } catch (error) {
    console.error('Error during native seeding:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();