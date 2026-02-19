import { useState, useEffect, useMemo } from "react";
import productsConfig from "../config/productsConfig.json";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import { trackEvent } from "../utils/analytics";

const { categories, products } = productsConfig;

export default function ProductListPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  useEffect(() => {
    trackEvent("page_view", { page: "products" });
  }, []);
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
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
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
