import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

const STORAGE_KEY = "foody_saved_meals";
const SavedMealsContext = createContext();

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function SavedMealsProvider({ children }) {
  const [savedMeals, setSavedMeals] = useState(loadSaved);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMeals));
  }, [savedMeals]);

  const saveMeal = (meal) => {
    setSavedMeals((prev) => [...prev, meal]);
    toast({ title: "Saved!", description: `${meal.strMeal} added to your list.` });
  };

  const removeMeal = (id) => {
    setSavedMeals((prev) => {
      const meal = prev.find((m) => m.idMeal === id);
      if (meal) {
        toast({ title: "Removed", description: `${meal.strMeal} removed.`, variant: "info" });
      }
      return prev.filter((m) => m.idMeal !== id);
    });
  };

  const isSaved = (id) => savedMeals.some((m) => m.idMeal === id);

  return (
    <SavedMealsContext.Provider value={{ savedMeals, saveMeal, removeMeal, isSaved }}>
      {children}
    </SavedMealsContext.Provider>
  );
}

export function useSavedMeals() {
  return useContext(SavedMealsContext);
}
