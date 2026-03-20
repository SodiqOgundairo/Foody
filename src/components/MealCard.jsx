import { useSavedMeals } from "../context/SavedMealsContext";
import { useRecipeModal } from "../context/RecipeModalContext";

const CLAMP_CLASSES = ["line-clamp-2", "line-clamp-4", "line-clamp-3"];

export default function MealCard({ meal, index = 0 }) {
  const { saveMeal, removeMeal, isSaved } = useSavedMeals();
  const { openRecipe } = useRecipeModal();
  const saved = isSaved(meal.idMeal);
  const dj = meal._source === "dummyjson";

  const toggleSave = (e) => {
    e.stopPropagation();
    if (saved) removeMeal(meal.idMeal);
    else saveMeal(meal);
  };

  const clamp = CLAMP_CLASSES[index % CLAMP_CLASSES.length];

  return (
    <article
      onClick={() => openRecipe(meal)}
      className="masonry-item card-animate card-lift group bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-sm cursor-pointer"
      style={{ animationDelay: `${(index % 12) * 60}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Save button */}
        <button
          onClick={toggleSave}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-lg active:scale-90 ${
            saved
              ? "bg-brand-500 text-white"
              : "bg-white/80 text-stone-500 hover:bg-white hover:text-brand-500"
          }`}
          aria-label={saved ? "Remove from saved" : "Save meal"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        {/* Category tag */}
        {meal.strCategory && (
          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-stone-700">
            {meal.strCategory}
          </span>
        )}
        {/* Rating badge (DummyJSON) */}
        {dj && meal._rating && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400/90 text-amber-950 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
            {meal._rating}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-stone-900 text-lg leading-snug line-clamp-1">
          {meal.strMeal}
        </h3>
        {meal.strInstructions && (
          <p className={`mt-2 text-stone-500 text-sm leading-relaxed ${clamp}`}>
            {meal.strInstructions}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {meal.strArea && (
              <span className="flex items-center gap-1 text-xs text-stone-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
                {meal.strArea}
              </span>
            )}
            {dj && meal._difficulty && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                meal._difficulty === "Easy" ? "bg-emerald-50 text-emerald-600" :
                meal._difficulty === "Medium" ? "bg-amber-50 text-amber-600" :
                "bg-red-50 text-red-600"
              }`}>
                {meal._difficulty}
              </span>
            )}
          </div>
          <span className="text-xs text-brand-500 font-medium group-hover:underline shrink-0">
            View Recipe →
          </span>
        </div>
      </div>
    </article>
  );
}
