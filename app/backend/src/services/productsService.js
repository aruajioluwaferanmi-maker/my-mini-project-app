const products = [
  { id: "p1", name: "Wireless Headphones", price: 79.99, category: "Electronics", description: "Over-ear headphones with noise cancellation." },
  { id: "p2", name: "Mechanical Keyboard", price: 129.99, category: "Electronics", description: "TKL layout with tactile switches and RGB." },
  { id: "p3", name: "USB-C Hub",           price: 39.99,  category: "Electronics", description: "7-in-1 hub with HDMI, SD card, and 3x USB-A." },
  { id: "p4", name: "Clean Code",          price: 34.99,  category: "Books",       description: "Robert C. Martin's guide to writing maintainable software." },
  { id: "p5", name: "The Pragmatic Programmer", price: 44.99, category: "Books",  description: "Your journey to mastery, 20th anniversary edition." },
  { id: "p6", name: "Developer Hoodie",    price: 59.99,  category: "Clothing",    description: "100% cotton, kangaroo pocket, unisex fit." },
  { id: "p7", name: "Laptop Backpack",     price: 89.99,  category: "Clothing",    description: "Padded 15\" laptop compartment, waterproof." },
];

function getProducts(category) {
  if (!category || category.toLowerCase() === "all") {
    return products;
  }
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

function getCategories() {
  const unique = [...new Set(products.map((p) => p.category))];
  return ["All", ...unique];
}

module.exports = { getProducts, getCategories };