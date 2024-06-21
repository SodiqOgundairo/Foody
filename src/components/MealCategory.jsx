import { useEffect, useState } from "react";
import SingleRecipe from "./SingleRecipe";
import { UserAuth } from "../context/AuthContext";
import { LuFolderSearch } from "react-icons/lu";
import axios from "axios";
import emptyPlate from "../assets/img/emptyRecipe.png";

const MealCategory = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = UserAuth()
    const [query, setQuery] = useState('');
    const [noResult, setNoResult] =useState(false)
  

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
    }, [user]);
  
    if (loading) {
      return ;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

// useEffect(() => {
  const handleSearch = async (e) => {
    e.preventDefault()
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
        url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
        headers: {}
      }

      // axios.request(config)
      // .then((res) => {
      //   console.log(JSON.stringify(res.data))
      //   setCategories(JSON.stringify(res.data))
      // })
      // .catch((err) => {
      //   console.error(err)
      // })
      axios.request(config)
      .then((res) => {
          if(res.data.meals) {
          const normalizedData = res.data.meals.map(meal => ({
            idCategory: meal.idMeal,
            strCategory: meal.strMeal,
            strCategoryThumb: meal.strMealThumb,
            strCategoryDescription: meal.strInstructions, // Use strInstructions for the description
          }));
          setCategories(normalizedData);
        } else{
          setCategories([]); // Set categories to an empty array if no meals are found
          setNoResult(true); // Set no results state to true
        }
      })
      .catch((err) => {
        console.error(err);
        setNoResult(true)
      });
    }
  // }, [])
    
  return (
    <div className="flex justify-center flex-col items-center">
          <form onSubmit={handleSearch} className="m-5 flex gap-4">
        <input
          className="border rounded-sm w-[400px] px-2"
          type="text"
          placeholder="Enter your a search keyword here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-3 bg-orange-500 text-white py-2 px-6 rounded-sm hover:bg-orange-900 hover:shadow-lg"
        >
          <LuFolderSearch /> Search
        </button>
      </form>
      <div className="search-results">
        {noResult ? (
          <div className="flex flex-col items-center justify-center">
          <p className="text-2xl text-orange-500 font-bold italic">No results found for "{query}". Please try a different search Meal.</p>
          <img src={emptyPlate} alt="Recipe Not found" className="w-1/3" />
          </div>
        ) : (
          categories && categories.length > 0 ? (
            <SingleRecipe categories={categories} />
          ) : (
            <p>Start by searching for a meal.</p>
          )
        )}
        {/* <SingleRecipe categories={categories} /> */}
      </div>
    </div>
  )
}

export default MealCategory