const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'rental',
    password: 'benizhang123',
    port: 5432,
});

const migrate = async () => {
  try {
    const client = await pool.connect();
    await client.query('ALTER TABLE actor ADD COLUMN age INT');
    console.log('Migration successful: Added age column to actor table');
    client.release();
  } catch (error) {
    console.error('Migration failed:', error.message);
  } finally {
    await pool.end();
  }
};

migrate();