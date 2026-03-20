import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import SavedMeals from "./pages/SavedMeals";
import MealofTheDay from "./pages/MealofTheDay";
import Toast from "./components/Toast";
import RecipeModal from "./components/RecipeModal";
import CursorGlow from "./components/CursorGlow";
import { ToastProvider } from "./context/ToastContext";
import { SavedMealsProvider } from "./context/SavedMealsContext";
import { RecipeModalProvider } from "./context/RecipeModalContext";

function App() {
  return (
    <ToastProvider>
      <SavedMealsProvider>
        <RecipeModalProvider>
          <CursorGlow />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="my-meals" element={<SavedMeals />} />
            <Route path="meal-of-the-day" element={<MealofTheDay />} />
          </Routes>
          <RecipeModal />
          <Toast />
        </RecipeModalProvider>
      </SavedMealsProvider>
    </ToastProvider>
  );
}

export default App;
