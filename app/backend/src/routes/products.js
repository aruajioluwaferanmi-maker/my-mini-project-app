const express = require("express");
const router = express.Router();
const { listProducts, listCategories } = require("../controllers/productsController");

router.get("/products", listProducts);
router.get("/categories", listCategories);

module.exports = router;