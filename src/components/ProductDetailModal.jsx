import React, { useState } from "react";
import { formatPrice } from "../data/products";

export default function ProductDetailModal(props) {
  const { isOpen, onClose, product, onAdd } = props;
  const [clicked, setClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  if (!isOpen) return null;

  const handleClick = () => {
    if (!product?.inStock) return;
    onAdd(product);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center c-overlay backdrop-blur-sm">
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl c-card shadow-2xl">
        <div className="flex items-center justify-between border-b c-border p-6">
          <h2 className="text-2xl font-bold c-text">{product.name}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 btn-ghost"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6 c-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl c-input">
              <div className="h-full w-full">
                {product.img ? (
                  <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="c-muted">{product.name}</span>
                )}
              </div>

              {/* Image overlay flash */}
              <div
                className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  showOverlay ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 rounded-xl c-veil backdrop-blur-sm" />
                <span className="relative select-none text-lg font-normal tracking-wide c-muted">
                  Add to Cart
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {[product.img, product.img, product.img].map((src, i) => (
                <div key={i} className="aspect-square h-20 w-20 overflow-hidden rounded-lg c-input">
                  {src ? <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" /> : null}
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block rounded-full px-3 py-1 text-sm font-medium chip border c-border">
                {product.category}
              </span>
              <h1 className="mt-2 text-3xl font-bold c-text">{product.name}</h1>
            </div>

            <div className="text-3xl font-bold c-price">
              {formatPrice(product.price)}
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold c-text">Description</h3>
              <p className="c-muted">{product.description ?? "No description available."}</p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold c-text">Specifications</h3>
              <div className="space-y-2">
                {Array.isArray(product.specs) && product.specs.length > 0 ? (
                  product.specs.map((spec, idx) => (
                    <div
                      key={spec.name || idx}
                      className={`flex justify-between py-2 ${idx !== product.specs.length - 1 ? "border-b c-border" : ""}`}
                    >
                      <span className="c-muted">{spec.name}</span>
                      <span className="font-medium c-text">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <div className="c-muted">No specifications available.</div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="mb-2 text-lg font-semibold c-text">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(product.tags) &&
                  product.tags.map((tag, idx) => (
                    <span key={tag || idx} className="rounded-full px-3 py-1 text-sm chip border c-border">
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleClick}
                disabled={!product.inStock}
                className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-colors
                  ${product.inStock ? (clicked ? "btn-flash" : "btn-primary") : "btn-disabled"}
                `}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
