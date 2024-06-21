import { useEffect, useState } from "react"
import { UserAuth } from "../context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import SingleRecipe from "../components/SingleRecipe"

const MealofTheDay = () => {

    const [categories, setCategories] = useState()
    const { user } = UserAuth()

    useEffect(() => {
        const searchMeal = async () => {
            try {
                const res = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
                    
                )
                if(!res.ok) {
                    throw new Error('Error')
                }
                const data = await res.json()
                setCategories(data.categories)
            } catch(err) {
                console.error(err)
        }
        }

        searchMeal()
    }, [user] )

  return (
    <>
    
    <SingleRecipe categories = {categories} />
    </>
  )
}

export default MealofTheDay