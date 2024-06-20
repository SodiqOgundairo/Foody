import { useEffect, useState } from "react";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";
import { UserAuth } from "../context/AuthContext";

const SingleRecipe = (props) => {
  const [savedItems, setSavedItems] = useState([]);
  const { user } = UserAuth();
  const navigate = useNavigate();


 // Fetch user's saved meals on component mount (optional)
 useEffect(() => {
  const fetchSavedMeals = async () => {
    if (user?.email) {
      const mealId = doc(db, "users", `${user.email}`);
      try {
        const docSnap = await getDoc(mealId);
        if (docSnap.exists) {
          setSavedItems(docSnap.data().savedMeals || []); 
        }
      } catch (error) {
        console.error("Error fetching saved meals:", error);
      }
    }
  };
  fetchSavedMeals();
}, [user]); // Update on user changes

const saveMeal = async (category) => {
  if (user?.email) {
    try {
      const mealId = doc(db, "users", `${user.email}`);
      const docSnap = await getDoc(mealId);
      const newMeal = {
        // id: category.idCategory,
        // title: category.strCategory,
        // img: category.strCategoryThumb,
        // description: category.strCategoryDescription,

        idCategory: category.idCategory,
        strCategory: category.strCategory,
        strCategoryThumb: category.strCategoryThumb,
        strCategoryDescription: category.strCategoryDescription,
      }

      if (docSnap.exists) {
        // Document exists, update saved meals
        await updateDoc(mealId, {
          savedMeals: arrayUnion(newMeal),
        });
        setSavedItems((prevSavedItems) => [
          ...prevSavedItems, newMeal
        ]);
        console.log("Meal saved successfully");
      } else {
        // Document doesn't exist, create a new document with savedMeals array
        await setDoc(mealId, { savedMeals: [newMeal] });
        setSavedItems([newMeal])
        console.log("New user document created");
        // Now update saved meals (with the newly created document)
        // await updateDoc(mealId, {
        //   savedMeals: arrayUnion({
        //     id: category.idCategory,
        //     title: category.strCategory,
        //     img: category.strCategoryThumb,
        //   }),
        // });
        // setSavedItems([
        //   { id: category.idCategory, title: category.strCategory, img: category.strCategoryThumb },
        // ]);
      }
    } catch (error) {
      console.error("Error saving meal:", error);
      alert(`Error saving meal: ${error.message || "Unknown error"}`);
    }
  } else {
    alert("Please login first to save a meal");
    navigate("/login");
  }
};


  const removeMeal = async (category) => {
    if (user?.email) {
      try {
        const mealId = doc(db, "users", `${user.email}`);
        const docSnap = await getDoc(mealId);
        if (docSnap.exists) {
          const currentSavedMeals = docSnap.data().savedMeals || [];
          const updatedSavedMeals = currentSavedMeals.filter(
            (meal) => meal.idCategory !== category.idCategory
          );
          await updateDoc(mealId, { savedMeals: updatedSavedMeals });
          setSavedItems(updatedSavedMeals);
          console.log("Meal removed successfully");
          // alert("Meal removed successfully");
        } else {
          console.warn("User document not found"); // Handle missing document
        }
      } catch (error) {
        console.error("Error removing meal:", error);
        alert("Error removing meal. Please try again."); // Informative message
      }
    } else {
      alert("Please login first to remove a meal");
    }
  };

  const isMealSaved = (idCategory) => {
    return savedItems.some((item) => item.idCategory === idCategory)
  }

   // Ensure props.categories is an array
   const categories = Array.isArray(props.categories) ? props.categories : [];


  //  truncate Text

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };


  return (
    <ul className="flex flex-wrap justify-center gap-7 list-none">
      {categories.map((category) => (
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
            <p> {truncateText(category.strCategoryDescription, 20)}</p>
            
            <button
              onClick={() =>
                isMealSaved(category.idCategory)
                  ? removeMeal(category)
                  : saveMeal(category)
              }
              className="my-3 bg-orange-500 py-2 px-20 text-light rounded-md hover:bg-white hover:text-orange-500 hover:shadow-lg flex items-center gap-3"
            >
              {isMealSaved(category.idCategory)
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