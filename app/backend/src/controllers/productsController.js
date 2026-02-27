// src/controllers/productsController.js
// Thin controller: reads input → calls service → emits events → sends response.

const { emitEvent } = require("../../analytics");
const { getProducts, getCategories } = require("../services/productsService");

async function listProducts(req, res) {
  emitEvent("request_received", { route: "/api/v1/products", method: "GET" });

  const { category } = req.query;

  try {
    const results = await getProducts(category);

    // AC-05: emit products_filtered only when a category filter was applied
    if (category && category.toLowerCase() !== "all") {
      emitEvent("products_filtered", { category, resultCount: results.length });
    }

    emitEvent("request_success", { route: "/api/v1/products", resultCount: results.length });

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching products:", error);
    emitEvent("request_error", { route: "/api/v1/products", reason: error.message });
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

async function listCategories(req, res) {
  emitEvent("request_received", { route: "/api/v1/categories", method: "GET" });
  
  try {
    const categories = await getCategories();
    emitEvent("request_success", { route: "/api/v1/categories" });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    emitEvent("request_error", { route: "/api/v1/categories", reason: error.message });
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}

module.exports = { listProducts, listCategories };