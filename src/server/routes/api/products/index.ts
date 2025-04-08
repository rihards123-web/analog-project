import { defineEventHandler } from 'h3';
import mysql from 'mysql2/promise';

// Create a connection pool to the database
const pool = mysql.createPool({
  host: 'localhost',       // Your MySQL host
  user: 'root',            // Your MySQL username
  password: '',            // Your MySQL password
  database: 'store',       // Your database name
});

export default defineEventHandler(async (event) => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
});