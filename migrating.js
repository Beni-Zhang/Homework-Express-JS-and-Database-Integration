const { Pool } = require('pg');

const pool = new Pool({
    user: 'isi username pg admin anda',
    host: 'isi host pg admin anda',
    database: 'isi nama database pg admin anda',
    password: 'isi password pg admin anda',
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