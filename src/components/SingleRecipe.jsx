import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";
import { UserAuth } from "../context/AuthContext";

const SingleRecipe = (props) => {
  const [savedItems, setSavedItems] = useState([]);
  // const [list, setList] = useState(false);
  // const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();

  const saveMeal = async (category) => {
    if (user?.email) {
      // setList(!list);
      // setSaved(true);
      try {
        const mealId = doc(db, "users", `${user.email}`);
        await updateDoc(mealId, {
          savedMeals: arrayUnion({
            id: category.idCategory,
            title: category.strCategory,
            img: category.strCategoryThumb,
          }),
        });
        setSavedItems((prevSavedItems) => [
          ...prevSavedItems,
          category.idCategory,
        ]);
        console.log("Meal saved successfully");
      } catch (error) {
        console.error("Error saving meal: ", error);
        alert("Error saving meal");
      }
    } else {
      alert("Please login first to save a meal");
      navigate("/login");
    }
  };

  const removeMeal = async (category) => {
    // logic to remove meal from firestore needed
    setSavedItems((prev) => prev.filter((id) => id !== category.idCategory));
  };
  return (
    <ul className="flex flex-wrap justify-center gap-7 list-none">
      {props.categories.map((category) => (
        <li
          className="w-[300px] list-none bg-white shadow-lg rounded-md hover:bg-orange-500 hover:text-white"
          key={category.idCategory}
        >
          <img
            className="py-3"
            src={category.strCategoryThumb}
            alt={category.strCategory}
          />
          <div className="py-4 px-10">
            <h2 className="text-2xl font-bold">{category.strCategory}</h2>
            <p>{category.strCategoryDescription.substring(0, 100)}...</p>
            {/* <button
              onClick={() => saveMeal(category)}
              className="my-3 bg-orange-500 py-2 px-20 text-light rounded-md hover:bg-white hover:text-orange-500 hover:shadow-lg flex items-center gap-3"
            >
              {list ? 'Remove from List' : 'Add to List'}
            </button> */}

            <button
              onClick={() =>
                savedItems.includes(category.idCategory)
                  ? removeMeal(category)
                  : saveMeal(category)
              }
              className="my-3 bg-orange-500 py-2 px-20 text-light rounded-md hover:bg-white hover:text-orange-500 hover:shadow-lg flex items-center gap-3"
            >
              {savedItems.includes(category.idCategory)
                ? "Remove from List"
                : "Add to List"}
            </button> 
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SingleRecipe;
