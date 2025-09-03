import React from "react";

export default function Filters({
  onChange,
  onClear,
  categories,
  resultsCount,
  selectedFilters, // Add this prop
}) {
  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md">
      {/* Results count */}
      <div className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        {resultsCount} products found
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

      {/* Clear Filters button */}
      <button
        onClick={onClear}
        className="mt-4 w-full rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
      >
        Clear Filters
      </button>
    </div>
  );
}
