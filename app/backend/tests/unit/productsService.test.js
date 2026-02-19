// tests/unit/productsService.test.js
// AC-06: Unit tests cover filterProducts() service function

const { getProducts, getCategories } = require("../../src/services/productsService");

describe("getProducts()", () => {

  test("returns all products when no category given", () => {
    const result = getProducts();
    expect(result.length).toBeGreaterThan(0);
    expect(Array.isArray(result)).toBe(true);
  });

  test("returns all products when category is 'all'", () => {
    const all = getProducts();
    const withAll = getProducts("all");
    expect(withAll.length).toBe(all.length);
  });

  test("filters products by category (case-insensitive)", () => {
    const result = getProducts("electronics");
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.category).toBe("Electronics"));
  });

  test("filter is case-insensitive — 'BOOKS' matches 'Books'", () => {
    const result = getProducts("BOOKS");
    expect(result.length).toBeGreaterThan(0);
    result.forEach((p) => expect(p.category).toBe("Books"));
  });

  test("returns empty array for an unknown category", () => {
    const result = getProducts("nonexistent");
    expect(result).toEqual([]);
  });

  test("every product has required fields", () => {
    const result = getProducts();
    result.forEach((p) => {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("name");
      expect(p).toHaveProperty("price");
      expect(p).toHaveProperty("category");
      expect(p).toHaveProperty("description");
    });
  });

  test("price is always a number", () => {
    const result = getProducts();
    result.forEach((p) => expect(typeof p.price).toBe("number"));
  });
});

describe("getCategories()", () => {

  test("always includes 'All' as first item", () => {
    const categories = getCategories();
    expect(categories[0]).toBe("All");
  });

  test("returns unique categories only", () => {
    const categories = getCategories();
    const unique = new Set(categories);
    expect(unique.size).toBe(categories.length);
  });
});