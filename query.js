const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'isi username pg admin anda',
    host: 'isi host pg admin anda',
    database: 'isi nama database pg admin anda',
    password: 'isi password pg admin anda',
    port: 5432,
  });

app.get('/films', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM film');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting films:', error.message);
    res.status(500).send('Error getting films');
  }
});

app.get('/films/:id', async (req, res) => {
    const filmId = req.params.id;
    try {
      const result = await pool.query('SELECT * FROM film WHERE film_id = $1', [filmId]);
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).send('Film not found');
      }
    } catch (error) {
      console.error('Error getting film by ID:', error.message);
      res.status(500).send('Error getting film by ID');
    }
  });
  
  app.get('/categories', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM category');
      res.json(result.rows);
    } catch (error) {
      console.error('Error getting categories:', error.message);
      res.status(500).send('Error getting categories');
    }
  });
  
  app.get('/films-by-category/:category_name', async (req, res) => {
    const categoryName = req.params.category_name;
    try {
      const result = await pool.query(
        `SELECT film.* FROM film
         JOIN film_category ON film.film_id = film_category.film_id
         JOIN category ON film_category.category_id = category.category_id
         WHERE category.name = $1`,
        [categoryName]
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Error getting films by category:', error.message);
      res.status(500).send('Error getting films by category');
    }
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});