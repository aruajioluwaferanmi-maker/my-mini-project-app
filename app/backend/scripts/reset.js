// scripts/reset.js
// Reset database: drop all data and reseed from config
// Run: npm run db:reset

require("dotenv").config();
const { db } = require("../db");
const { products } = require("../db/schema");

async function reset() {
  console.log("🔄 Resetting database...");

  try {
    // Delete all products
    await db.delete(products);
    console.log("✅ Database reset complete");
    
    console.log("\nRun 'npm run db:seed' to populate from config");
    process.exit(0);
  } catch (error) {
    console.error("❌ Reset failed:", error);
    process.exit(1);
  }
}

reset();