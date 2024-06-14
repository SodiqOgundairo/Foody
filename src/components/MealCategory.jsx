import { useEffect, useState } from "react";
import SingleRecipe from "./SingleRecipe";

const MealCategory = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCategories(data.categories);
          console.log(data);
        } catch (error) {
          setError(error);
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategories();
    }, []);
  
    if (loading) {
      return ;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
  return (
    <>
    <SingleRecipe categories = {categories} />
    </>
  )
}

export default MealCategory