import { defineEventHandler } from 'h3';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store',
});

export default defineEventHandler(async (event) => {
  const id = event.context.params?.['id'];
  
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : { error: 'Product not found' };
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'Database error' };
  }
});