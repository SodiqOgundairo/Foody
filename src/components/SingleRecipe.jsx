
const SingleRecipe = (props) => {
  
  return (
      <ul className=" flex flex-wrap justify-center gap-7 list-none">
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
              <h2 className="text-2xl font-bold ">
                {category.strCategory}
              </h2>
              <p>{category.strCategoryDescription.substring(0, 100)}...</p> 
              {/* {info.substring(0, 20)} {info.length >= 20 && '...'} */}
              <button className=" my-3 bg-orange-500 py-2 px-20 text-light rounded-md hover:bg-white hover:text-orange-500 hover:shadow-lg flex items-center gap-3">
                Add to List
              </button>
            </div>
          </li>
        ))}
      </ul>
  );
};

export default SingleRecipe;
