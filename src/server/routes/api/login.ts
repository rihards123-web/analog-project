import { defineEventHandler, readBody, setCookie } from 'h3';
import type { RowDataPacket } from 'mysql2';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'store',
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  type UserRow = {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  } & RowDataPacket;
  
  const [rows] = await pool.query<UserRow[]>('SELECT * FROM users WHERE email = ?', [email]);
  
  const user = rows[0]; // now properly typed
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Invalid email or password' };
  }

  setCookie(event, 'user_id', String(user.id), {
    httpOnly: true,
    path: '/',               
    sameSite: 'lax',         
    maxAge: 60 * 60 * 24,   
  });
  
  return { message: 'Login successful' };

  
});
