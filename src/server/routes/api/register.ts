import { defineEventHandler, readBody } from 'h3';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store',
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { first_name, last_name, email, password } = body;

  if (!first_name || !last_name || !email || !password) {
    return { error: 'All fields are required' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [first_name, last_name, email, hashedPassword]
    );

    return { message: 'User registered successfully' };
  } catch (err) {
    return { error: 'User registration failed: ' + err };
  }
});
