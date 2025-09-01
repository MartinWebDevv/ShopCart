import React from "react";
import { formatPrice } from "../data/products";

export default function ProductDetailModal(props) {
  const { isOpen, onClose, product, onAdd } = props;

  if (!isOpen) return null;

  return (
    // Modal overlay - full screen with dark background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal container - centered with max width and responsive design */}
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
        {/* Header section with close button */}
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
            {/* Main product image */}
            <div className="aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
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
            </div>

            {/* Thumbnail images row */}
            <div className="flex gap-2">
              <div className="aspect-square h-20 w-20 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
              <div className="aspect-square h-20 w-20 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
              <div className="aspect-square h-20 w-20 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="space-y-6">
            {/* Product title and category */}
            <div>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {product.category}
              </span>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {formatPrice(product.price)}
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                Description
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {product.description ? product.description : "No description available."}
              </p>
            </div>

            {/* Product specifications */}
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

            {/* Action buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => (product.inStock ? onAdd(product) : null)}
                className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
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
