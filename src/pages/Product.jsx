// src/pages/Products.jsx
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useCart } from "../app/CartContext.jsx";
import ProductCard from "../features/product/ProductCard.jsx";
import ProductDetailModal from "../features/product/ProductDetailModal.jsx";
import Filters from "../features/product/Filters.jsx";
import { products as productsData } from "../data/products.js";

/* =========================================
   Helpers
   ========================================= */
function toNumberPrice(value) {
  if (typeof value === "number") return value;
  if (value == null) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}
function getTitle(p) {
  return (p?.title || p?.name || "").toString();
}
function getCategory(p) {
  return (p?.category || p?.type || "").toString();
}
function normalizeId(val) {
  if (val == null) return "";
  return String(val);
}
function deriveIdFromProduct(p) {
  const base = (p?.id ?? p?.sku ?? p?.title ?? p?.name ?? "").toString();
  return base || `${(p?.title || p?.name || "product").replace(/\s+/g, "-").toLowerCase()}`;
}
function parseCatsFromSearch(search) {
  const sp = new URLSearchParams(search);
  const arr = sp.getAll("cat").map((c) => c.trim()).filter(Boolean);
  return new Set(arr);
}

/* =========================================
   Products Page (Filters + Grid + Modal + Deep Linking)
   ========================================= */
export default function Products() {
  const { addToCart, query } = useCart();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Filter state
  const [sortBy, setSortBy] = useState("name-asc");
  // Initialize selected categories from ?cat=...
  const [selectedCats, setSelectedCats] = useState(() => parseCatsFromSearch(location.search));

  // If you navigate from Home with a new ?cat=..., sync it in:
  useEffect(() => {
    const fromURL = parseCatsFromSearch(location.search);
    // Only update if the URL actually carries categories
    if (fromURL.size > 0) setSelectedCats(fromURL);
  }, [location.search]);

  // Unique categories from data
  const allCategories = useMemo(() => {
    const set = new Set();
    for (const p of productsData) {
      const c = getCategory(p);
      if (c) set.add(c);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  // Filter + search + sort pipeline
  const products = useMemo(() => {
    const q = (query || "").trim().toLowerCase();

    let list = Array.isArray(productsData) ? productsData.slice() : [];

    // Search filter (title or tags)
    if (q) {
      list = list.filter((item) => {
        const title = getTitle(item).toLowerCase();
        const tags = Array.isArray(item.tags) ? item.tags.join(" ").toLowerCase() : "";
        return title.includes(q) || tags.includes(q);
      });
    }

    // Category filter (if any selected)
    if (selectedCats.size > 0) {
      list = list.filter((item) => {
        const c = getCategory(item);
        return c && selectedCats.has(c);
      });
    }

    // Sorting
    switch (sortBy) {
      case "name-asc":
        list.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
        break;
      case "name-desc":
        list.sort((a, b) => getTitle(b).localeCompare(getTitle(a)));
        break;
      case "price-asc":
        list.sort((a, b) => toNumberPrice(a.price) - toNumberPrice(b.price));
        break;
      case "price-desc":
        list.sort((a, b) => toNumberPrice(b.price) - toNumberPrice(a.price));
        break;
      default:
        break;
    }

    return list;
  }, [query, selectedCats, sortBy]);

  // ID index for deep-link
  const byId = useMemo(() => {
    const map = new Map();
    for (const p of productsData) {
      map.set(normalizeId(deriveIdFromProduct(p)), p);
      if (p?.id != null) map.set(normalizeId(p.id), p);
    }
    return map;
  }, []);

  // Open modal if /product/:id is present
  useEffect(() => {
    const routeId = params.id ? normalizeId(params.id) : "";
    if (!routeId) return;

    const p = byId.get(routeId);
    if (p) {
      setSelectedProduct(p);
      setModalOpen(true);
    } else {
      navigate("/products", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, byId]);

  // Handlers
  const handleCardClick = useCallback(
    (product) => {
      const id = normalizeId(deriveIdFromProduct(product));
      const basePath = location.pathname.startsWith("/products") ? "/products" : "/";
      navigate(`/product/${encodeURIComponent(id)}`, { state: { from: basePath } });
      setSelectedProduct(product);
      setModalOpen(true);
    },
    [navigate, location.pathname]
  );

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 200);
    const from = location.state?.from;
    if (from === "/products" || from === "/") {
      navigate(from, { replace: true });
    } else {
      navigate("/products", { replace: true });
    }
  }, [navigate, location.state]);

  const handleAddToCart = useCallback(
    (product) => {
      if (!product) return;
      addToCart(product);
    },
    [addToCart]
  );

  // Category filter handlers
  const handleToggleCategory = useCallback((cat) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCats(new Set());
  }, []);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Products</h2>
      </div>

      {/* Filters */}
      <Filters
        sortBy={sortBy}
        onChangeSort={setSortBy}
        categories={allCategories}
        selectedCategories={selectedCats}
        onToggleCategory={handleToggleCategory}
        onClear={handleClearFilters}
      />

      {/* Grid */}
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

      {/* Modal */}
      <ProductDetailModal
        open={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={() => selectedProduct && handleAddToCart(selectedProduct)}
      />
    </section>
  );
}
