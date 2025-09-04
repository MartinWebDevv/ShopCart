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
    <div className="md:p-4 rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 md:sticky md:top-4">
      {/* Mobile Close Button */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 p-4 md:hidden">
        <h2 className="text-md font-bold">Filters</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {/* Results count */}
      <div className="mb-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {resultsCount} products
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={selectedFilters.category}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-300"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Price Range:
        </label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Min"
            value={selectedFilters.minPrice}
            onChange={onChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-300"
          />
          <span className="text-slate-500 dark:text-slate-400">to</span>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Max"
            value={selectedFilters.maxPrice}
            onChange={onChange}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-300"
          />
        </div>
      </div>
      <div>
        <SortProducts selectedSort={selectedSort} onSortChange={onSortChange} />
      </div>

      <button
        onClick={onClear}
        className="mt-4 w-full rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
      >
        Clear Filters
      </button>
    </div>
  );
}
