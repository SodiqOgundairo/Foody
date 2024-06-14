import { useNavigate } from "react-router"
import Hero from "../components/Hero"
import { UserAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { LuFolderSearch } from "react-icons/lu"
import SingleRecipe from "../components/SingleRecipe"

const Home = () => {

  const navigate = useNavigate()
  const {user} = UserAuth()
  const [searchBar, setSearchBar] = useState('')

  const handleSearch = () => {
    console.log(searchBar.value)
  }

  useEffect(() => {
    // if(user) {
    //   navigate('home')
    // } else {
    //   navigate ('/')
    //   }

        user ? `${navigate('/home')}` : `${navigate('/')}`
  }, [])
    
  return (
    <div className="pt-[90px] flex flex-col justify-center items-center">
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

      <div className="m-5 flex flex-wrap justify-between">
        <SingleRecipe />
      </div>
    </div>
  )
}

export default Home