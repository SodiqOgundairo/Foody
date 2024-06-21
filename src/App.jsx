import Aos from "aos";
import { useEffect } from "react";
import Header from "./components/Header";
import Main from "./pages/Main";
import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SavedMeals from "./pages/SavedMeals";
import MealofTheDay from "./pages/MealofTheDay";

function App() {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-meals"
            element={
              <ProtectedRoute>
                <SavedMeals />
              </ProtectedRoute>
            }
          />
          <Route
            path="meal-of-the-day"
            element={
              <ProtectedRoute>
                <MealofTheDay />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
