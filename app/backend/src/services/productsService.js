const { db } = require("../../db");
const { products } = require("../../db/schema");
const { eq } = require("drizzle-orm");

// Get all products or filter by category
async function getProducts(category) {
  if (!category || category.toLowerCase() === "all") {
    return await db.select().from(products);
  }
  
  // Filter by category (case-insensitive)
  const allProducts = await db.select().from(products);
  return allProducts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

// Get unique categories from database
async function getCategories() {
  const allProducts = await db.select().from(products);
  const unique = [...new Set(allProducts.map((p) => p.category))];
  return ["All", ...unique];
}

module.exports = { getProducts, getCategories };