import React, { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

export default function Product({
  onAdd,
  onOpenModel,
  searchQuery,
  isFilterOpen,
  setIsFilterOpen,
}) {
  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    []
  );

  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  const [selectedSort, setSelectedSort] = useState("default");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => setSelectedSort(e.target.value);

  const handleClearFilters = () => {
    setSelectedFilters({ category: "", minPrice: "", maxPrice: "", search: "" });
    setSelectedSort("default");
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedFilters.category && product.category !== selectedFilters.category) return false;
      const price = product.price;
      if (selectedFilters.minPrice && price < selectedFilters.minPrice * 100) return false;
      if (selectedFilters.maxPrice && price > selectedFilters.maxPrice * 100) return false;
      return true;
    });

    if (selectedSort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (selectedSort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    if (selectedSort === "name-asc") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (selectedSort === "name-desc") return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    if (selectedSort === "newest") return [...filtered].sort((a, b) => b.id.localeCompare(a.id));

    return filtered;
  }, [selectedFilters, searchQuery, selectedSort]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="mb-4 text-lg font-medium c-text">
        Products ({filteredProducts.length})
      </h2>

      <section id="products" className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
        {/* Desktop Filters */}
        <div className="hidden lg:block lg:pt-[0px]">
          <Filters
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            onClose={() => {}}
            categories={categories}
            resultsCount={filteredProducts.length}
            selectedFilters={selectedFilters}
            selectedSort={selectedSort}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Mobile Filters: drop panel under header/search */}
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[3.75rem] z-50 border-t border-b c-border c-card shadow-lg">
            <div className="max-w-6xl mx-auto px-3 py-3">
              <Filters
                onChange={handleFilterChange}
                onClear={handleClearFilters}
                onClose={() => setIsFilterOpen(false)}
                categories={categories}
                resultsCount={filteredProducts.length}
                selectedFilters={selectedFilters}
                selectedSort={selectedSort}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="order-1 lg:order-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                img={product.img}
                tags={product.tags}
                inStock={product.inStock}
                onAdd={() =>
                  onAdd({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                  })
                }
                onOpenModel={() => onOpenModel(product)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
