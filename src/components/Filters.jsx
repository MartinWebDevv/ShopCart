import React from "react";
import SortProducts from "./SortProducts";

export default function Filters({
  onChange,
  onClear,
  onClose,
  categories,
  resultsCount,
  selectedFilters,
  selectedSort,
  onSortChange,
}) {
  return (
    <div className="md:p-4 rounded-xl c-card shadow-sm ring-1 c-ring md:sticky md:top-4">
      {/* Mobile Close */}
      <div className="flex items-center justify-between border-b c-border p-4 lg:hidden">
        <h2 className="text-md font-bold c-text">Filters</h2>
        <button onClick={onClose} className="rounded-lg p-2 btn-ghost" aria-label="Close filters">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="w-6 h-6 c-text">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Count */}
      <div className="mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium c-muted chip border c-border">
        {resultsCount} products
      </div>

      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium c-muted">Category:</label>
        <select
          id="category"
          name="category"
          value={selectedFilters.category}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border c-border c-card shadow-sm focus:outline-none focus:ring-2 c-ring"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (<option key={category} value={category}>{category}</option>))}
        </select>
      </div>

      {/* Price */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium c-muted">Price Range:</label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Min"
            value={selectedFilters.minPrice}
            onChange={onChange}
            className="w-full rounded-md border c-border c-input shadow-sm focus:outline-none focus:ring-2 c-ring"
          />
          <span className="c-muted">to</span>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Max"
            value={selectedFilters.maxPrice}
            onChange={onChange}
            className="w-full rounded-md border c-border c-input shadow-sm focus:outline-none focus:ring-2 c-ring"
          />
        </div>
      </div>

      <SortProducts selectedSort={selectedSort} onSortChange={onSortChange} />

      <button
        onClick={onClear}
        className="mt-4 w-full rounded-md px-4 py-2 text-sm font-medium btn-ghost"
      >
        Clear Filters
      </button>
    </div>
  );
}
