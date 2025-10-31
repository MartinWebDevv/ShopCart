// src/features/Product.jsx
import React, { useMemo, useState, useCallback } from "react";
import { useCart } from "../app/CartContext.jsx";
import ProductCard from "../features/product/ProductCard.jsx";
import ProductDetailModal from "../features/product/ProductDetailModal.jsx";
import { products as productsData } from "../data/products.js";

/* =========================================
   SECTION: Product Page (Grid + Modal Controller)
   - Uses global `query` from context to filter
   - Provides stable callbacks to memoized cards
   ========================================= */
export default function Product() {
  const { addToCart, query } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const products = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    let list = Array.isArray(productsData) ? productsData : [];
    if (q) {
      list = list.filter((item) => {
        const title = String(item.title || item.name || "").toLowerCase();
        const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";
        return title.includes(q) || tags.includes(q);
      });
    }
    return list;
  }, [query]);

  /* Stable callbacks (don’t recreate per item render) */
  const handleCardClick = useCallback((product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 200);
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      if (!product) return;
      addToCart(product);
    },
    [addToCart]
  );

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">
          Products{query ? ` — “${query}”` : ""}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id ?? p.title ?? p.name}
            product={p}
            onClick={handleCardClick}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <ProductDetailModal
        open={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={() => selectedProduct && handleAddToCart(selectedProduct)}
      />
    </section>
  );
}
