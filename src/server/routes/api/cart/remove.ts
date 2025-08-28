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
  const { product_id } = body;

  if (!product_id) {
    return new Response(JSON.stringify({ error: 'Product ID required' }), { status: 400 });
  }

  await pool.query(
    'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?',
    [parseInt(userId), product_id]
  );

  return { message: 'Item removed from cart' };
});
