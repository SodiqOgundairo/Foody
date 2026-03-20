/**
 * Normalize a DummyJSON recipe into the same shape our app uses everywhere.
 * The _dj prefix on idMeal lets the modal know NOT to call MealDB lookup.
 */
export function normalizeDJ(r) {
  return {
    idMeal: `dj-${r.id}`,
    strMeal: r.name,
    strMealThumb: r.image,
    strCategory: r.tags?.[0] || r.mealType?.[0] || "",
    strArea: r.cuisine || "",
    strInstructions: Array.isArray(r.instructions)
      ? r.instructions.join("\n")
      : r.instructions || "",
    // Extra metadata the modal can use
    _source: "dummyjson",
    _rating: r.rating,
    _reviewCount: r.reviewCount,
    _difficulty: r.difficulty,
    _prepTime: r.prepTimeMinutes,
    _cookTime: r.cookTimeMinutes,
    _servings: r.servings,
    _calories: r.caloriesPerServing,
    _ingredients: r.ingredients || [],
    _tags: r.tags || [],
  };
}

/** Check if a meal is from DummyJSON */
export function isDJ(meal) {
  return typeof meal?.idMeal === "string" && meal.idMeal.startsWith("dj-");
}
