// src/pages/Home.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products as productsData } from '../data/products.js';

function getCategory(p) {
  return (p?.category || p?.type || '').toString();
}
function getTitle(p) {
  return (p?.title || p?.name || '').toString();
}

export default function Home() {
  // Build unique category list + counts
  const categories = useMemo(() => {
    const map = new Map();
    for (const p of productsData) {
      const cat = getCategory(p).trim();
      if (!cat) continue;
      map.set(cat, (map.get(cat) || 0) + 1);
    }
    // Sort A–Z for a nice, predictable order
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
  }, []);

  return (
    <section className="mx-auto max-w-6xl">
      {/* Hero */}
      <div className="mb-6 rounded-2xl border bg-slate-50 p-6">
        <h1 className="text-2xl font-bold">Welcome to ShopCart</h1>
        <p className="mt-2 text-slate-600">
          Pick a category to browse products. Filters will be pre-applied on the next page.
        </p>
      </div>

      {/*Featured products strip */}
      <div className="mb-5">
        <h2 className="mt-8 mb-3 px-3 text-xl font-semibold">Featured</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productsData.slice(0, 4).map((p) => (
            <div key={p.id ?? getTitle(p)} className="rounded-xl border p-4">
              {getTitle(p)}
            </div>
          ))}
        </div>
      </div>

      {/* Categories grid */}
      <div className="mt-8 mb-3 px-3 text-xl font-semibold">Categories</div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.length === 0 ? (
          <div className="col-span-full rounded-xl border p-6 text-center text-slate-600">
            No categories found.
          </div>
        ) : (
          categories.map(({ name, count }) => (
            <Link
              key={name}
              to={`/products?cat=${encodeURIComponent(name)}`}
              className="group rounded-2xl border p-5 transition hover:shadow-lg"
              title={`View ${name}`}
            >
              <div className="text-lg font-semibold">{name}</div>
              <div className="mt-1 text-sm text-slate-600">
                {count} item{count === 1 ? '' : 's'}
              </div>

              {/* Decorative area (optional image placeholder) */}
              <div className="mt-4 h-28 rounded-xl bg-slate-400 transition group-hover:bg-slate-200" />
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
