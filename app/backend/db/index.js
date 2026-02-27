// db/index.js
// Database connection using Drizzle ORM

require("dotenv").config();
const mysql = require("mysql2/promise");
const { drizzle } = require("drizzle-orm/mysql2");
const { products } = require("./schema");

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3307,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "mini_project",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create Drizzle instance
const db = drizzle(pool, { schema: { products }, mode: "default" });

module.exports = { db, pool };