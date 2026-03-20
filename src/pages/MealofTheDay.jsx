import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import Skeleton from "../components/Skeleton";
import requests from "../Requests";
import { normalizeDJ } from "../utils/normalize";

export default function MealofTheDay() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [djTags, setDjTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [source, setSource] = useState("mealdb"); // mealdb | dummyjson

  // Fetch MealDB categories + DummyJSON tags on mount
  useEffect(() => {
    fetch(requests.mdb.listCategories)
      .then((r) => r.json())
      .then((data) => setCategories((data.meals || []).map((c) => c.strCategory)))
      .catch(() => {});

    fetch(requests.dj.tags)
      .then((r) => r.json())
      .then((data) => setDjTags(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const fetchRandom = async (category, src) => {
    setLoading(true);
    setError(null);

    try {
      if (src === "dummyjson") {
        // DummyJSON: fetch by tag or all, then pick random
        const url = category ? requests.dj.byTag(category) : requests.dj.all(50);
        const res = await fetch(url);
        const data = await res.json();
        const pool = data.recipes || [];
        if (pool.length === 0) { setError("No recipes found."); setMeal(null); return; }
        const pick = pool[Math.floor(Math.random() * pool.length)];
        setMeal(normalizeDJ(pick));
      } else {
        if (!category) {
          const res = await fetch(requests.mdb.random);
          const data = await res.json();
          if (data.meals?.[0]) setMeal(data.meals[0]);
        } else {
          const listRes = await fetch(requests.mdb.byCategory(category));
          const listData = await listRes.json();
          const pool = listData.meals || [];
          if (pool.length === 0) { setError("No meals found."); setMeal(null); return; }
          const pick = pool[Math.floor(Math.random() * pool.length)];
          const detailRes = await fetch(requests.mdb.lookup(pick.idMeal));
          const detailData = await detailRes.json();
          if (detailData.meals?.[0]) setMeal(detailData.meals[0]);
        }
      }
    } catch {
      setError("Failed to fetch a meal.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandom(null, "mealdb");
  }, []);

  const handleSourceChange = (src) => {
    setSource(src);
    setSelectedCategory(null);
    fetchRandom(null, src);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    fetchRandom(cat, source);
  };

  const activeTags = source === "mealdb" ? categories : djTags;

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🎲</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Surprise Me
          </h1>
          <p className="text-stone-500 mt-2">
            Not sure what to cook? Pick a source and category, then shuffle.
          </p>
        </div>

        {/* Source toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-stone-100 rounded-xl p-1">
            <button
              onClick={() => handleSourceChange("mealdb")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                source === "mealdb"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              MealDB
            </button>
            <button
              onClick={() => handleSourceChange("dummyjson")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                source === "dummyjson"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              More Recipes
            </button>
          </div>
        </div>

        {/* Category / Tag selector */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 max-h-40 overflow-y-auto scrollbar-hide">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-stone-900 text-white shadow-md"
                  : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300"
              }`}
            >
              Any
            </button>
            {activeTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleCategoryChange(tag)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === tag
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-brand-300 hover:bg-brand-50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Skeleton count={1} />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-stone-500">{error}</p>
          </div>
        ) : meal ? (
          <div className="max-w-sm mx-auto">
            <MealCard meal={meal} />
          </div>
        ) : null}

        {/* Shuffle button */}
        <div className="text-center mt-8">
          <button
            onClick={() => fetchRandom(selectedCategory, source)}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-semibold text-sm hover:bg-stone-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.598a.75.75 0 00-.75.75v3.634a.75.75 0 001.5 0v-2.033l.312.311a7 7 0 0011.712-3.138.75.75 0 00-1.449-.389zm1.063-7.286a.75.75 0 00-1.5 0v2.033l-.312-.31a7 7 0 00-11.712 3.137.75.75 0 001.449.39 5.5 5.5 0 019.201-2.467l.312.311h-2.433a.75.75 0 000 1.5h3.634a.75.75 0 00.75-.75V4.138z" clipRule="evenodd" />
            </svg>
            Shuffle
          </button>
        </div>
      </div>
    </div>
  );
}
