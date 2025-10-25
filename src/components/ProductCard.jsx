// src/components/ProductCard.jsx
import React from "react";

/* =========================================
   SECTION: ProductCard (defensive + memoized)
   - Normalizes fields (title/image/price)
   - Calls parent handlers with the (normalized) product
   - Exported with React.memo for render perf
   ========================================= */

function toNumberPrice(value) {
  if (typeof value === "number") return value;
  if (value == null) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function ProductCard({ product, onClick, onAddToCart }) {
  // Defensive field resolution
  const title = product?.title || product?.name || "Product";
  const img =
    product?.image ||
    product?.img ||
    product?.src ||
    ""; // empty -> placeholder
  const priceNum = toNumberPrice(product?.price);
  const priceLabel = `$${priceNum.toFixed(2)}`;

  // Ensure stable id for cart items
  const id =
    product?.id ??
    product?.sku ??
    `${title.replace(/\s+/g, "-").toLowerCase()}-${priceNum}`;

  // Normalize for downstream (cart math expects numeric price)
  const normalized = {
    id,
    title,
    image: img,
    price: priceNum,
    ...product,
  };

  return (
    <div
      className="group overflow-hidden rounded-2xl bg-slate-900 text-slate-100 shadow-sm ring-1 ring-slate-800"
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(normalized)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(normalized)}
    >
      {/* Image */}
      <div className="h-48 w-full bg-slate-800">
        {img ? (
          <img
            src={img}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center text-slate-500">
            No image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-800 bg-slate-900/95 p-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{title}</div>
          <div className="mt-1 text-sm text-slate-300">{priceLabel}</div>
        </div>

        <button
          type="button"
          className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-800"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(normalized);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
