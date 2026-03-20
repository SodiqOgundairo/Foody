import { useEffect, useState, useRef } from "react";
import requests from "../Requests";

export default function CategoryBar({ active, onSelect }) {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    fetch(requests.mdb.categories)
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-2 py-1 -mx-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* All button */}
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            active === null
              ? "bg-stone-900 text-white shadow-md"
              : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.strCategory}
            onClick={() => onSelect(cat.strCategory)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              active === cat.strCategory
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                : "bg-white text-stone-600 border border-stone-200 hover:border-brand-300 hover:bg-brand-50"
            }`}
          >
            <img
              src={cat.strCategoryThumb}
              alt=""
              className="w-6 h-6 rounded-full object-cover"
            />
            {cat.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
}
