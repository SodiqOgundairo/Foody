import { useEffect, useState, useRef } from "react";
import { useRecipeModal } from "../context/RecipeModalContext";
import { useSavedMeals } from "../context/SavedMealsContext";
import { isDJ } from "../utils/normalize";
import parseIngredients from "../utils/parseIngredients";
import requests from "../Requests";

function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function RecipeModal() {
  const { activeMeal, closeRecipe } = useRecipeModal();
  const { saveMeal, removeMeal, isSaved } = useSavedMeals();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef();

  useEffect(() => {
    if (!activeMeal) { setMeal(null); return; }

    // DummyJSON meals already have full data
    if (isDJ(activeMeal)) {
      setMeal(activeMeal);
      return;
    }

    // If the object already has full MealDB data (has instructions), use it directly
    if (activeMeal.strInstructions) {
      setMeal(activeMeal);
      return;
    }

    // Otherwise fetch full details from MealDB
    setLoading(true);
    fetch(requests.mdb.lookup(activeMeal.idMeal))
      .then((r) => r.json())
      .then((data) => setMeal(data.meals?.[0] || null))
      .catch(() => setMeal(null))
      .finally(() => setLoading(false));
  }, [activeMeal]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") closeRecipe(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeRecipe]);

  if (!activeMeal) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeRecipe();
  };

  const djMode = meal && isDJ(meal);
  const ingredients = meal
    ? djMode
      ? (meal._ingredients || []).map((ing) => ({ ingredient: ing, measure: "" }))
      : parseIngredients(meal)
    : [];
  const youtubeId = meal ? getYoutubeId(meal.strYoutube) : null;
  const saved = meal ? isSaved(meal.idMeal) : false;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-3rem)]">
        {/* Close button */}
        <button
          onClick={closeRecipe}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        {loading ? (
          <div className="p-12 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-stone-200 border-t-brand-500 rounded-full animate-spin" />
            <p className="text-stone-400 text-sm">Loading recipe...</p>
          </div>
        ) : meal ? (
          <div className="overflow-y-auto flex-1">
            {/* Hero image */}
            <div className="relative shrink-0">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {meal.strMeal}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {meal.strCategory && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                      {meal.strCategory}
                    </span>
                  )}
                  {meal.strArea && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                      {meal.strArea}
                    </span>
                  )}
                  {djMode && meal._difficulty && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-brand-500/80 text-white backdrop-blur-sm">
                      {meal._difficulty}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* DummyJSON meta badges */}
              {djMode && (
                <div className="flex flex-wrap gap-3 text-sm">
                  {meal._rating && (
                    <span className="flex items-center gap-1 text-amber-600 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                      </svg>
                      {meal._rating} ({meal._reviewCount})
                    </span>
                  )}
                  {meal._prepTime && (
                    <span className="text-stone-500">Prep: {meal._prepTime}min</span>
                  )}
                  {meal._cookTime && (
                    <span className="text-stone-500">Cook: {meal._cookTime}min</span>
                  )}
                  {meal._servings && (
                    <span className="text-stone-500">Serves {meal._servings}</span>
                  )}
                  {meal._calories && (
                    <span className="text-stone-500">{meal._calories} cal</span>
                  )}
                </div>
              )}

              {/* Save button */}
              <button
                onClick={() => saved ? removeMeal(meal.idMeal) : saveMeal(meal)}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
                  saved
                    ? "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    : "bg-brand-500 text-white hover:bg-brand-600 shadow-md shadow-brand-500/25"
                }`}
              >
                {saved ? "Remove from Saved" : "Save to My Meals"}
              </button>

              {/* Ingredients */}
              {ingredients.length > 0 && (
                <div>
                  <h3 className="font-semibold text-stone-900 mb-3 text-lg">Ingredients</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {ingredients.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-stone-50 rounded-xl px-4 py-2.5"
                      >
                        {!djMode && (
                          <img
                            src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png`}
                            alt={item.ingredient}
                            className="w-8 h-8 object-contain"
                          />
                        )}
                        {djMode && (
                          <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-stone-800">{item.ingredient}</p>
                          {item.measure && (
                            <p className="text-xs text-stone-500">{item.measure}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions */}
              {meal.strInstructions && (
                <div>
                  <h3 className="font-semibold text-stone-900 mb-3 text-lg">Instructions</h3>
                  <div className="text-stone-600 text-sm leading-relaxed space-y-3">
                    {meal.strInstructions
                      .split(/\r?\n/)
                      .filter((p) => p.trim())
                      .map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                  </div>
                </div>
              )}

              {/* DummyJSON tags */}
              {djMode && meal._tags?.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {meal._tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-600">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* YouTube (MealDB only) */}
              {youtubeId && (
                <div>
                  <h3 className="font-semibold text-stone-900 mb-3 text-lg">Video</h3>
                  <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={`${meal.strMeal} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-stone-500">Could not load recipe.</p>
          </div>
        )}
      </div>
    </div>
  );
}
