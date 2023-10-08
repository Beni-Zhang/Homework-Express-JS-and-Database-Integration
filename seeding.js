const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rental',
  password: 'benizhang123',
  port: 5432,
});

async function seedActors() {
    const actors = [
      { first_name: 'Liu', last_name: 'Kang' },
      { first_name: 'Kung', last_name: 'Lao' },
      { first_name: 'Bi', last_name: 'Han' },
      { first_name: 'Kuai', last_name: 'Liang' },
      { first_name: 'Shang', last_name: 'Tsung' },
    ];
  
    for (const actor of actors) {
      try {
        await pool.query('INSERT INTO actor (first_name, last_name) VALUES ($1, $2)', [
          actor.first_name,
          actor.last_name,
        ]);
        console.log('Actor added:', actor);
      } catch (error) {
        console.error('Error adding actor:', error.message);
      }
    }
  }
  
seedActors();