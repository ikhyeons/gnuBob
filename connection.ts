import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MY_SQL_HOST,
  port: Number(process.env.MY_SQL_PORT),
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PW,
  database: process.env.MY_SQL_DB,
  connectionLimit: 50,
});

export const getConnection = () => pool.getConnection();
export default getConnection;
