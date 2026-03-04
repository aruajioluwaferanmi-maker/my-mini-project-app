const express = require("express");
const productsRouter = require("./src/routes/products");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", productsRouter);

// AC-04: Invalid routes return 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => 
    console.log(`Backend running on port ${PORT}`)
  );
}

module.exports = app;