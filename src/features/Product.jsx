import React, { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

export default function Product({ onAdd, onOpenModel, searchQuery }) {
  // Memoize categories to prevent recalculation on every render
  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [] // Empty dependency array since products is static
  );

  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      search: "",
    });
  };


  const filteredProducts = useMemo(() => {
    return products.filter((product) => {

      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }


      if (
        selectedFilters.category &&
        product.category !== selectedFilters.category
      ) {
        return false;
      }


      const productPrice = product.price; // price is in cents
      if (
        selectedFilters.minPrice &&
        productPrice < selectedFilters.minPrice * 100
      ) {
        return false;
      }
      if (
        selectedFilters.maxPrice &&
        productPrice > selectedFilters.maxPrice * 100
      ) {
        return false;
      }

      return true;
    });
  }, [selectedFilters, searchQuery]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="mb-4 text-lg font-medium">
        Products ({filteredProducts.length})
      </h2>
      <section className="grid grid-cols-[300px,1fr] gap-6">
        <div className="pt-[0px]">
          <Filters
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            categories={categories}
            resultsCount={filteredProducts.length}
            selectedFilters={selectedFilters}
          />
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
