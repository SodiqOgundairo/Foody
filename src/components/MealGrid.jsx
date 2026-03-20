import MealCard from "./MealCard";

export default function MealGrid({ meals, startIndex = 0 }) {
  return (
    <div className="masonry">
      {meals.map((meal, i) => (
        <MealCard key={meal.idMeal} meal={meal} index={startIndex + i} />
      ))}
    </div>
  );
}
