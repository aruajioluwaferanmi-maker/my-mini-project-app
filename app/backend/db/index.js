require("dotenv").config();
const mysql = require("mysql2/promise");
const { drizzle } = require("drizzle-orm/mysql2");
const { products } = require("./schema");

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create Drizzle instance
const db = drizzle(pool, { schema: { products }, mode: "default" });

module.exports = { db, pool };