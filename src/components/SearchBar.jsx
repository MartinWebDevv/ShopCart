import React, { useState } from "react";

export default function SearchBar({ value, onChange, showFilters }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="border-b c-border c-frosted backdrop-blur">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          <div className="hidden md:block flex-1">
            <input
              type="text"
              id="search"
              name="search"
              value={value}
              onChange={onChange}
              placeholder="Search products..."
              className="w-full rounded-lg border c-border c-input px-4 py-2 focus:outline-none focus:ring-2 c-ring"
            />
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-3">
            {/* Search toggle */}
            <div className="relative flex-1">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-lg btn-ghost ${isSearchOpen ? "bg-transparent" : ""}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 c-text">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
              </button>

              {/* Mobile Search panel */}
              {isSearchOpen && (
                <div className="fixed inset-x-0 top-[3.75rem] z-50 shadow-lg border-y c-border c-card">
                  <div className="max-w-6xl mx-auto px-3 py-2">
                    <input
                      type="text"
                      autoFocus
                      value={value}
                      onChange={onChange}
                      placeholder="Search products..."
                      className="w-full rounded-lg border c-border c-input px-4 py-2 focus:outline-none focus:ring-2 c-ring"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Filter button */}
            <button onClick={showFilters} className="p-2 rounded-lg btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="w-6 h-6 c-text">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
