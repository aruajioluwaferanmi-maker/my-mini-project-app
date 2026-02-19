const { emitEvent } = require("../../analytics");
const { getProducts, getCategories } = require("../services/productsService");

function listProducts(req, res) {
  emitEvent("request_received", { route: "/api/v1/products", method: "GET" });

  const { category } = req.query;

  const results = getProducts(category);

  if (category && category.toLowerCase() !== "all") {
    emitEvent("products_filtered", { category, resultCount: results.length });
  }

  emitEvent("request_success", { route: "/api/v1/products", resultCount: results.length });

  res.status(200).json(results);
}

function listCategories(req, res) {
  emitEvent("request_received", { route: "/api/v1/categories", method: "GET" });
  const categories = getCategories();
  emitEvent("request_success", { route: "/api/v1/categories" });
  res.status(200).json(categories);
}

module.exports = { listProducts, listCategories };