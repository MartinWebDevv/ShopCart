import React from "react";
import { formatPrice } from "../data/products";

export default function ProductCard(props) {
  const available = props.inStock !== false; // default to true if not provided

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Image / placeholder */}
      <div
        onClick={props.onOpenModel}
        className="h-56 w-full bg-slate-600 flex items-center justify-center text-slate-200"
      >
        {props.img ? (
          <img
            src={props.img}
            alt={props.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{props.name}</span>
        )}
      </div>

      <div className="p-4">
        <p className="mb-1 text-sm text-slate-500">{props.category}</p>
        <p className="mb-3 text-base font-medium"> {props.name}</p>
        <p className="mb-3 text-base font-medium">{formatPrice(props.price)}</p>

        {/* 
        This entire block is a conditional render. 
        It only runs if:
        1) props.tags is actually an array (Array.isArray(props.tags)), AND
        2) that array has at least 1 element (props.tags.length > 0).
        */}
        {Array.isArray(props.tags) && props.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {props.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            disabled={!available}
            onClick={props.onAdd}
            className={`w-full rounded-xl px-5 py-2 text-sm transition
              ${
                available
                  ? "border border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                  : "cursor-not-allowed border border-slate-200 text-slate-400 dark:border-slate-800 dark:text-slate-500"
              }`}
          >
            {available ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
