import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import { trackEvent } from "../utils/analytics";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProductListPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // AC-03: page_view fires once on mount
  useEffect(() => {
    trackEvent("page_view", { page: "products" });
  }, []);

  // Fetch categories from backend
  useEffect(() => {
    fetch(`${API_URL}/v1/categories`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch products from backend (with optional category filter)
  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);

        const url =
          activeCategory === "All"
            ? `${API_URL}/v1/products`
            : `${API_URL}/v1/products?category=${activeCategory}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        console.log("Products received:", data);
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Catalogue
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {loading
              ? "Loading..."
              : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* AC-02: FilterBar receives categories from API */}
        {categories.length > 0 && (
          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20 text-red-500">
            <p className="text-lg font-medium">Error loading products</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && !error && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">Loading products...</p>
          </div>
        )}

        {/* AC-01: Product grid — each card renders from API data */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
