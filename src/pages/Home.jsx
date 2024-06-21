import { useNavigate } from "react-router"
import Hero from "../components/Hero"
import { UserAuth } from "../context/AuthContext"
import { useEffect } from "react"
import MealCategory from "../components/MealCategory"

const Home = () => {

  const navigate = useNavigate()
  const {user} = UserAuth()

 
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

      <div className="m-5 flex flex-wrap justify-between">
        {/* <SingleRecipe /> */}
        <MealCategory />
      </div>
    </div>
  )
}

export default Home