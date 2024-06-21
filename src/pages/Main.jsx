import { useNavigate } from "react-router";
import Hero from "../components/Hero";
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import MealCategory from "../components/MealCategory";

const Main = () => {
  const navigate = useNavigate();
  const { user } = UserAuth(); // Ensure signUp matches your context method

  useEffect(() => {
    user ? `${navigate('/home')}` : `${navigate('/')}`
  }, [user, navigate]);

  return (
    <div className="pt-[90px] flex flex-col justify-center items-center">
      <Hero />

      <div className="m-5 flex flex-wrap justify-between">
        <MealCategory />
      </div>
    </div>
  );
};

export default Main;
