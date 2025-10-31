import React from "react";
import { createPortal } from "react-dom";

/* =========================================
   SECTION: Product Detail Modal (robust)
   PURPOSE:
   - Works with many possible field names from products.js
   - Shows optional specs/tags if present
   PROPS:
     - open: boolean
     - product: object | null
     - onClose: fn()
     - onAddToCart: fn()
   ========================================= */

function pickFirst(obj, keys, fallback = "") {
  for (const k of keys) {
    const v = obj?.[k];
    if (typeof v === "string" && v.trim()) return v;
    if (typeof v === "number" && Number.isFinite(v)) return String(v);
  }
  return fallback;
}

function toNumberPrice(value) {
  if (typeof value === "number") return value;
  if (value == null) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

export default function ProductDetailModal({ open, product, onClose, onAddToCart }) {
  if (!open || !product) return null;

  const title = pickFirst(product, ["title", "name"], "Product");
  const img =
    pickFirst(product, ["image", "img", "src"], "") || ""; // empty shows placeholder
  const price = toNumberPrice(product.price);
  const priceLabel = `$${price.toFixed(2)}`;

  // Try multiple keys for description-like text
  const description = pickFirst(
    product,
    ["description", "desc", "details", "about", "info", "longDescription", "text"],
    ""
  );

  // Optional “specs” or extra details (render if they exist)
  const brand = pickFirst(product, ["brand", "maker"], "");
  const category = pickFirst(product, ["category", "type"], "");
  const flavor = pickFirst(product, ["flavor", "variant"], "");
  const size = pickFirst(product, ["size", "volume", "ml"], "");
  const tags = Array.isArray(product.tags) ? product.tags : [];

  const content = (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} details`}
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Close details"
      />

      {/* Panel */}
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-xl">
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 md:flex-row">
          {img ? (
            <img
              src={img}
              alt={title}
              className="h-48 w-full rounded-lg object-cover md:h-48 md:w-48"
              loading="lazy"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-lg bg-slate-100 text-slate-400 md:h-48 md:w-48">
              No image
            </div>
          )}

          <div className="flex-1">
            <div className="mb-2 text-lg font-semibold">{priceLabel}</div>

            {/* Description (fallback to something present if we truly have nothing) */}
            <p className="mb-3 text-sm text-slate-700">
              {description ||
                (tags.length
                  ? `Tags: ${tags.slice(0, 5).join(", ")}`
                  : "No description available.")}
            </p>

            {/* Optional spec list */}
            {(brand || category || flavor || size) && (
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700">
                {brand && (
                  <>
                    <dt className="font-medium text-slate-600">Brand</dt>
                    <dd>{brand}</dd>
                  </>
                )}
                {category && (
                  <>
                    <dt className="font-medium text-slate-600">Category</dt>
                    <dd>{category}</dd>
                  </>
                )}
                {flavor && (
                  <>
                    <dt className="font-medium text-slate-600">Flavor</dt>
                    <dd>{flavor}</dd>
                  </>
                )}
                {size && (
                  <>
                    <dt className="font-medium text-slate-600">Size</dt>
                    <dd>{size}</dd>
                  </>
                )}
              </dl>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Close
          </button>
          <button
            onClick={onAddToCart}
            className="rounded bg-slate-900 px-4 py-2 text-sm text-white hover:opacity-90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
