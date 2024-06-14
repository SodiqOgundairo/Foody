import React, { useEffect, useState } from "react";

const SingleRecipe = () => {
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <h1>Meal Categories</h1>
      <ul className=" flex flex-wrap justify-center gap-7">
        {categories.map((category) => (
          <li
            className="w-[300px] list-none bg-white shadow-lg rounded-md hover:bg-orange-500 hover:text-white"
            key={category.idCategory}
          >
            <img
              className="my-3"
              src={category.strCategoryThumb}
              alt={category.strCategory}
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold ">
                {category.strCategory}
              </h2>
              <p>{category.strCategoryDescription}</p>
              <button className=" my-3 bg-orange-500 py-2 px-6 text-light rounded-md hover:bg-white hover:text-orange-500 hover:shadow-lg flex items-center gap-3">
                Add to List
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleRecipe;
