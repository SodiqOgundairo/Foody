import { useEffect, useState, useCallback, useRef } from "react";
import Hero from "../components/Hero";
import MealGrid from "../components/MealGrid";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import CategoryBar from "../components/CategoryBar";
import AreaFilter from "../components/AreaFilter";
import requests from "../Requests";
import { normalizeDJ } from "../utils/normalize";

const PER_PAGE = 12;

export default function Home() {
  const [allMeals, setAllMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heading, setHeading] = useState("Featured Meals");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeArea, setActiveArea] = useState(null);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState("featured"); // featured | search | category | area
  const initialLoaded = useRef(false);

  const totalPages = Math.ceil(allMeals.length / PER_PAGE);
  const paginated = allMeals.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goToPage = (p) => {
    setPage(p);
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── Featured: merge MealDB categories + DummyJSON on first load ──
  const loadFeatured = useCallback(async () => {
    setLoading(true);
    setError(null);
    setActiveCategory(null);
    setActiveArea(null);
    setPage(1);
    setMode("featured");
    setHeading("Featured Meals");

    try {
      const [mdbRes, djRes] = await Promise.all([
        // Fetch a few popular MealDB categories in parallel
        Promise.all(
          ["Chicken", "Beef", "Seafood", "Dessert", "Pasta", "Vegetarian"].map((cat) =>
            fetch(requests.mdb.byCategory(cat))
              .then((r) => r.json())
              .then((d) => (d.meals || []).slice(0, 4))
              .catch(() => [])
          )
        ),
        // Fetch all DummyJSON recipes
        fetch(requests.dj.all(50))
          .then((r) => r.json())
          .then((d) => (d.recipes || []).map(normalizeDJ))
          .catch(() => []),
      ]);

      const mdbMeals = mdbRes.flat();
      const merged = shuffle([...mdbMeals, ...djRes]);
      setAllMeals(merged);
    } catch {
      setError("Failed to load meals.");
      setAllMeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Search: both APIs ──
  const fetchSearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    setActiveCategory(null);
    setActiveArea(null);
    setPage(1);
    setMode("search");
    setHeading(`Results for "${query}"`);

    try {
      const [mdbRes, djRes] = await Promise.all([
        fetch(requests.mdb.search(query))
          .then((r) => r.json())
          .then((d) => d.meals || [])
          .catch(() => []),
        fetch(requests.dj.search(query))
          .then((r) => r.json())
          .then((d) => (d.recipes || []).map(normalizeDJ))
          .catch(() => []),
      ]);

      setAllMeals([...mdbRes, ...djRes]);
    } catch {
      setError("Failed to search.");
      setAllMeals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Category (MealDB) ──
  const fetchCategory = useCallback(async (category) => {
    if (!category) { loadFeatured(); return; }
    setLoading(true);
    setError(null);
    setActiveCategory(category);
    setActiveArea(null);
    setPage(1);
    setMode("category");
    setHeading(category);

    try {
      const res = await fetch(requests.mdb.byCategory(category));
      const data = await res.json();
      setAllMeals(data.meals || []);
    } catch {
      setError("Failed to load meals.");
      setAllMeals([]);
    } finally {
      setLoading(false);
    }
  }, [loadFeatured]);

  // ── Area (MealDB) ──
  const fetchArea = useCallback(async (area) => {
    if (!area) { loadFeatured(); return; }
    setLoading(true);
    setError(null);
    setActiveArea(area);
    setActiveCategory(null);
    setPage(1);
    setMode("area");
    setHeading(`${area} Cuisine`);

    try {
      const res = await fetch(requests.mdb.byArea(area));
      const data = await res.json();
      setAllMeals(data.meals || []);
    } catch {
      setError("Failed to load meals.");
      setAllMeals([]);
    } finally {
      setLoading(false);
    }
  }, [loadFeatured]);

  // Initial load
  useEffect(() => {
    if (!initialLoaded.current) {
      initialLoaded.current = true;
      loadFeatured();
    }
  }, [loadFeatured]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Hero onSearch={fetchSearch} onClear={loadFeatured} />

      <section id="results" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 scroll-mt-20">
        {/* Filters */}
        <div className="space-y-4 mb-8">
          <CategoryBar active={activeCategory} onSelect={fetchCategory} />
          <div className="flex items-center gap-3 flex-wrap">
            <AreaFilter active={activeArea} onSelect={fetchArea} />
            {mode !== "featured" && (
              <button
                onClick={loadFeatured}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-2"
              >
                Back to Featured
              </button>
            )}
          </div>
        </div>

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">{heading}</h2>
            {!loading && !error && (
              <p className="text-stone-500 text-sm mt-1">
                {allMeals.length} {allMeals.length === 1 ? "meal" : "meals"} found
                {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Skeleton />
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-lg font-semibold text-stone-800">Something went wrong</h3>
            <p className="text-stone-500 mt-1">{error}</p>
            <button
              onClick={loadFeatured}
              className="mt-4 px-5 py-2.5 bg-brand-500 text-white rounded-xl font-medium text-sm hover:bg-brand-600 transition-colors"
            >
              Try again
            </button>
          </div>
        ) : allMeals.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-lg font-semibold text-stone-800">No meals found</h3>
            <p className="text-stone-500 mt-1">
              Try a different search or browse by category.
            </p>
          </div>
        ) : (
          <>
            <MealGrid meals={paginated} startIndex={(page - 1) * PER_PAGE} />
            <Pagination current={page} total={totalPages} onChange={goToPage} />
          </>
        )}
      </section>
    </div>
  );
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
