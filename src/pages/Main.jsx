import { useNavigate } from "react-router";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { LuFolderSearch } from "react-icons/lu";

const Main = () => {
  const navigate = useNavigate();
  const { user } = UserAuth(); // Ensure signUp matches your context method
  const [searchBar, setSearchBar] = useState('');
  
  const handleSearch = () => {
    console.log(searchBar.value)
  }

  useEffect(() => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="pt-[90px] flex flex-wrap justify-center items-center">
      <Hero />
      <form onSubmit={handleSearch} className="m-5 flex gap-4">
        <input
          className="border rounded-sm w-[400px] px-2"
          type="search"
          placeholder="Enter your a search keyword here"
          
          onChange={(e) => setSearchBar(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center gap-3 bg-orange-500 text-white py-2 px-6 rounded-sm hover:bg-orange-900 hover:shadow-lg"
        >
          <LuFolderSearch /> Search
        </button>
      </form>

      <div className="m-5 flex flex-wrap justify-between"></div>
    </div>
  );
};

export default Main;
