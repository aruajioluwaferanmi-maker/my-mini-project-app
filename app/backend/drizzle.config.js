require("dotenv").config();

/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: "./db/schema.js",
  out: "./drizzle",
   dialect: "mysql",
  // driver: "mysql2",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3307,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "mini_project",
  },
};