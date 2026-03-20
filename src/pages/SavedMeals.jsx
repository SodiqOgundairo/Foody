import { useState } from "react";
import { Link } from "react-router-dom";
import { useSavedMeals } from "../context/SavedMealsContext";
import MealGrid from "../components/MealGrid";
import Pagination from "../components/Pagination";

const PER_PAGE = 12;

export default function SavedMeals() {
  const { savedMeals } = useSavedMeals();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(savedMeals.length / PER_PAGE);
  const paginated = savedMeals.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset to page 1 if current page is out of bounds after removing meals
  if (page > totalPages && totalPages > 0) setPage(totalPages);

  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-5xl block mb-3">❤️</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Saved Meals
          </h1>
          <p className="text-stone-500 mt-2">
            {savedMeals.length > 0
              ? `You have ${savedMeals.length} saved ${savedMeals.length === 1 ? "meal" : "meals"}.`
              : "Your saved meals will appear here."}
          </p>
        </div>

        {/* Device notice */}
        <div className="max-w-md mx-auto mb-10 bg-amber-50 border border-amber-200/60 rounded-xl px-4 py-3 text-center">
          <p className="text-amber-800 text-sm">
            Saved meals are stored on this device only — they won&apos;t sync across browsers or devices.
          </p>
        </div>

        {/* Content */}
        {savedMeals.length > 0 ? (
          <>
            <MealGrid meals={paginated} startIndex={(page - 1) * PER_PAGE} />
            <Pagination current={page} total={totalPages} onChange={setPage} />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-lg font-semibold text-stone-800">Nothing saved yet</h3>
            <p className="text-stone-500 mt-1 mb-6">
              Explore meals and tap the heart to save your favourites!
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold text-sm hover:bg-brand-600 transition-colors"
            >
              Discover Meals
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
