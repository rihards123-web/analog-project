import { defineEventHandler, getCookie } from 'h3';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store',
});

export default defineEventHandler(async (event) => {
  // Ensure cookies are properly processed
  const userId = getCookie(event, 'user_id');
  
  // Add debug headers to response
  event.node.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  event.node.res.setHeader('Pragma', 'no-cache');
  event.node.res.setHeader('Expires', '0');
  
  if (!userId) {
    
    return { user: null };
  }

  try {
    // Parse userId to ensure it's a number
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      
      return { user: null };
    }

    const [rows] = await pool.query('SELECT id, first_name, email FROM users WHERE id = ?', [parsedUserId]);
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return { user: null };
    }
    
    const user = rows[0];
   
    return { user };
  } catch (error) {
   
    return { user: null };
  }
});