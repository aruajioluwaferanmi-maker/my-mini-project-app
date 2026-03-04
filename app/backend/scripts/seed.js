require("dotenv").config();
const { db } = require("../db");
const { products } = require("../db/schema");
const productsConfig = require("../config/productsConfig.json");

async function seed() {
  console.log("🌱 Seeding database from productsConfig.json...");

  try {
    // Clear existing products
    await db.delete(products);
    console.log("✅ Cleared existing products");

    // Insert products from config
    for (const product of productsConfig.products) {
      await db.insert(products).values({
        id: product.id,
        name: product.name,
        price: product.price.toString(), // Convert to string for decimal
        category: product.category,
        description: product.description,
      });
      console.log(`   ✓ Inserted: ${product.name}`);
    }

    console.log(
      `\n🎉 Successfully seeded ${productsConfig.products.length} products!`,
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
