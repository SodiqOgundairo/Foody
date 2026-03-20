import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

export default function Hero({ onSearch, onClear }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length >= 2) {
      onSearch(trimmed);
    } else if (trimmed.length === 0 && onClear) {
      onClear();
    }
  }, [debouncedQuery, onSearch, onClear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-brand-400 font-medium text-sm tracking-widest uppercase mb-4">
          Discover & Save
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-shimmer leading-tight">
          What are you cooking today?
        </h1>
        <p className="mt-4 text-stone-400 text-lg sm:text-xl max-w-xl mx-auto">
          Explore recipes from MealDB &amp; DummyJSON — two sources, endless inspiration.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 border border-white/10 focus-within:border-brand-400/50 focus-within:bg-white/15 transition-all duration-300">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Start typing to search..."
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-stone-500 outline-none text-base"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="px-2 text-stone-500 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25 active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["Chicken", "Pasta", "Pizza", "Seafood", "Dessert", "Vegan"].map((tag) => (
            <button
              key={tag}
              onClick={() => { setQuery(tag); onSearch(tag); }}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-stone-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
