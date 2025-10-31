import React from "react";

/* =========================================
   Filters (sort + categories)
   PROPS:
     - sortBy: "name-asc" | "name-desc" | "price-asc" | "price-desc"
     - onChangeSort: (value) => void
     - categories: string[]
     - selectedCategories: Set<string> | string[]
     - onToggleCategory: (cat) => void
     - onClear: () => void
   ========================================= */

export default function Filters({
  sortBy = "name-asc",
  onChangeSort,
  categories = [],
  selectedCategories = new Set(),
  onToggleCategory,
  onClear,
}) {
  // Support both Set and Array for selectedCategories
  const isSelected = (c) =>
    selectedCategories instanceof Set
      ? selectedCategories.has(c)
      : selectedCategories.includes?.(c);

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-2xl border p-3 md:flex-row md:items-center md:justify-between">
      {/* Sort */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-slate-600">
          Sort:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onChangeSort?.(e.target.value)}
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="name-asc">A – Z</option>
          <option value="name-desc">Z – A</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-600">Categories:</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <label
              key={c}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                isSelected(c) ? "bg-slate-900 text-white" : "bg-white"
              }`}
              title={c}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={isSelected(c)}
                onChange={() => onToggleCategory?.(c)}
              />
              {c}
            </label>
          ))}
        </div>

        {/* Clear */}
        {(selectedCategories?.size || selectedCategories?.length) ? (
          <button
            className="ml-2 text-xs text-red-600 hover:underline"
            onClick={onClear}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
