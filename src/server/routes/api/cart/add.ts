import { defineEventHandler, readBody, getCookie } from 'h3';
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

  const body = await readBody(event);
  const { product_id, quantity = 1 } = body;

  if (!product_id) {
    return new Response(JSON.stringify({ error: 'Product ID required' }), { status: 400 });
  }

  const [existing] = await pool.query(
    'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
    [parseInt(userId), product_id]
  );

  if ((existing as any[]).length > 0) {
    await pool.query(
      'UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
      [quantity, parseInt(userId), product_id]
    );
  } else {
    await pool.query(
      'INSERT INTO cart_items (user_id, product_id, quantity, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [parseInt(userId), product_id, quantity]
    );
  }

  return { message: 'Product added to cart' };
});
