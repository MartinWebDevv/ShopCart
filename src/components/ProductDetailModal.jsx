import React, { useState } from "react";
import { formatPrice } from "../data/products";

export default function ProductDetailModal(props) {
  const { isOpen, onClose, product, onAdd } = props;
  const [clicked, setClicked] = useState(false);       // button grey flash
  const [showOverlay, setShowOverlay] = useState(false); // image overlay flash

  if (!isOpen) return null;

  const handleClick = () => {
    if (!product?.inStock) return;
    onAdd(product);

    // Button grey flash
    setClicked(true);
    setTimeout(() => setClicked(false), 200);

    // Image overlay fade/blur flash
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Main content - grid layout for image and details */}
        <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
          {/* Left side - Product images */}
          <div className="space-y-4">
            {/* Main product image with overlay */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-full bg-slate-200 dark:bg-slate-700">
                {product.img ? (
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{product.name}</span>
                )}
              </div>

              {/* Overlay flash text with slight white fade + blur */}
              <div
                className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                  showOverlay ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* soft white veil + blur */}
                <div className="absolute inset-0 rounded-xl bg-white/35 backdrop-blur-lg" />
                {/* quiet gray text, not bold */}
                <span className="relative select-none text-lg font-bold tracking-wide text-slate-700 dark:text-slate-900">
                  Added to Cart
                </span>
              </div>
            </div>

            {/* Thumbnail images row */}
            <div className="flex gap-2">
              {[product.img, product.img, product.img].map((src, i) => (
                <div
                  key={i}
                  className="aspect-square h-20 w-20 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700"
                >
                  {src ? (
                    <img
                      src={src}
                      alt={`${product.name} ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {product.category}
              </span>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {product.name}
              </h1>
            </div>

            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatPrice(product.price)}
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                Description
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {product.description
                  ? product.description
                  : "No description available."}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                Specifications
              </h3>
              <div className="space-y-2">
                {Array.isArray(product.specs) && product.specs.length > 0 ? (
                  product.specs.map((spec, idx) => (
                    <div
                      key={spec.name || idx}
                      className={`flex justify-between py-2 ${
                        idx !== product.specs.length - 1
                          ? "border-b border-slate-200 dark:border-slate-700"
                          : ""
                      }`}
                    >
                      <span className="text-slate-600 dark:text-slate-400">
                        {spec.name}
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {spec.value}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 dark:text-slate-400">
                    No specifications available.
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(product.tags) &&
                  product.tags.map((tag, idx) => (
                    <span
                      key={tag || idx}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleClick}
                disabled={!product.inStock}
                className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-colors duration-200
                  ${
                    product.inStock
                      ? clicked
                        ? "bg-gray-400 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                      : "cursor-not-allowed bg-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-500"
                  }`}
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
