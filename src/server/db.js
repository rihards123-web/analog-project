import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',       // MySQL host
  user: 'root',            // MySQL username
  password: '',            // MySQL password
  database: 'store',       // database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;