import { createContext, useContext, useState, useEffect } from "react";

const RecipeModalContext = createContext();

export function RecipeModalProvider({ children }) {
  const [activeMeal, setActiveMeal] = useState(null);

  // Open with either a full meal object or just an ID string
  const openRecipe = (mealOrId) => {
    if (typeof mealOrId === "object") {
      setActiveMeal(mealOrId);
    } else {
      setActiveMeal({ idMeal: mealOrId });
    }
  };
  const closeRecipe = () => setActiveMeal(null);

  useEffect(() => {
    if (activeMeal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeMeal]);

  return (
    <RecipeModalContext.Provider value={{ activeMeal, openRecipe, closeRecipe }}>
      {children}
    </RecipeModalContext.Provider>
  );
}

export function useRecipeModal() {
  return useContext(RecipeModalContext);
}
