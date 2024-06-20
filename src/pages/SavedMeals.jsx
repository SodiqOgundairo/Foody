import { Link } from "react-router-dom";
import SingleRecipe from "../components/SingleRecipe";

const SavedMeals = () => {
  return (
    <div className="pt-[90px] flex flex-col justify-center items-center">
      <div className="text-center">
        <p className="font-bold text-5xl my-8">
          Here are the meals you have saved so far
        </p>
        <Link to={'/'} className="bg-orange-500 py-2 px-6 text-light rounded-md hover:bg-orange-900 hover:shadow-lg "> Explore more meals</Link>
      </div>

      {/* <SingleRecipe /> */}
    </div>
  );
};

export default SavedMeals;
