const request = require("supertest");
const app = require("../../index");
const { emitEvent } = require("../../analytics");

jest.mock("../../analytics", () => ({ emitEvent: jest.fn() }));

beforeEach(() => jest.clearAllMocks());

// ── Health ────────────────────────────────────────────────────
describe("GET /api/v1/health", () => {
  test("returns 200 with status ok", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

// ── GET /api/v1/products ──────────────────────────────────────
describe("GET /api/v1/products", () => {

  test("returns 200 and an array of all products", async () => {
    const res = await request(app).get("/api/v1/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("filters by category query param", async () => {
    const res = await request(app).get("/api/v1/products?category=Electronics");
    expect(res.statusCode).toBe(200);
    res.body.forEach((p) => expect(p.category).toBe("Electronics"));
  });

  test("returns empty array for unknown category (not 404)", async () => {
    const res = await request(app).get("/api/v1/products?category=Furniture");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // AC-06: Analytics event assertions
  test("emits request_received and request_success on unfiltered request", async () => {
    await request(app).get("/api/v1/products");
    const calls = emitEvent.mock.calls.map((c) => c[0]);
    expect(calls).toContain("request_received");
    expect(calls).toContain("request_success");
    expect(calls).not.toContain("products_filtered");
  });

  test("emits products_filtered when category query param is present", async () => {
    await request(app).get("/api/v1/products?category=Books");
    expect(emitEvent).toHaveBeenCalledWith(
      "products_filtered",
      expect.objectContaining({ category: "Books" })
    );
  });

  test("does NOT emit products_filtered when category is 'all'", async () => {
    await request(app).get("/api/v1/products?category=all");
    const calls = emitEvent.mock.calls.map((c) => c[0]);
    expect(calls).not.toContain("products_filtered");
  });

  test("request_success payload includes resultCount", async () => {
    await request(app).get("/api/v1/products");
    expect(emitEvent).toHaveBeenCalledWith(
      "request_success",
      expect.objectContaining({ resultCount: expect.any(Number) })
    );
  });
});

// ── AC-04: Invalid route returns 404 ─────────────────────────
describe("Invalid routes", () => {
  test("returns 404 for unknown route", async () => {
    const res = await request(app).get("/api/v1/doesnotexist");
    expect(res.statusCode).toBe(404);
  });
});