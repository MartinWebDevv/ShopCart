// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../features/product/ProductCard';
import products from '../data/products';

export default function Home() {
  return (
    <section className="mx-auto">
      {/* Hero */}
      <div className="rounded-2xl border bg-slate-50 p-6">
        <h1 className="text-4xl font-bold">Welcome to ShopCart</h1>
        <p className="mt-2 text-slate-600">
          A clean React + Vite demo storefront with a cart, coupons, and a product modal.
        </p>

        <div className="mt-4 flex gap-3">
          <Link
            to="/products"
            className="rounded bg-slate-700 px-5 py-4 text-md font-semibold text-white hover:opacity-90"
          >
            Browse Products
          </Link>
        </div>
      </div>

      {/* Feature highlights */}
      <div id="features" className="mt-8 grid gap-4 md:grid-cols-3 mb-5">
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Cart & Coupons</h3>
          <p className="mt-1 text-sm text-slate-600">
            Add items, adjust quantities, and apply promo codes with live totals.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Product Modal</h3>
          <p className="mt-1 text-sm text-slate-600">
            Click any product for a clean, mobile-friendly detail popup.
          </p>
        </div>
        <div className="rounded-xl border p-4">
          <h3 className="font-semibold">Global Search</h3>
          <p className="mt-1 text-sm text-slate-600">
            Filter products from the header search, instantly.
          </p>
        </div>
      </div>
      {/* instead of showing product, show categories to choose from.
      those will bring you to a page to show  the chosen category */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id ?? p.title ?? p.name} product={p} />
        ))}
      </div>
    </section>
  );
}
