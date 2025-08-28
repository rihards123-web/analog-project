import { defineEventHandler, getCookie } from 'h3';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store',
});

export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'user_id');
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const [rows] = await pool.query(`
    SELECT 
      p.id, p.title, p.price, p.image, ci.quantity 
    FROM 
      cart_items ci
    JOIN 
      products p ON ci.product_id = p.id
    WHERE 
      ci.user_id = ?
  `, [parseInt(userId)]);

  return { cart: rows };
});
