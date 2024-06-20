import { Link } from "react-router-dom";
import SingleRecipe from "../components/SingleRecipe";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const SavedMeals = () => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user }= UserAuth()


    // useEffect(() => {
    //     onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
    //         setCategories(doc.data()?.savedMeals)
    //     })
    // }, [user?.email])


    useEffect(() => {
        if(user?.email) {
            const unsub = onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
                setCategories(doc.data()?.savedMeals || [])
                setLoading(true)
            })

            return () => unsub()
        }
    }, [user?.email])

  return (
    <div className="pt-[90px] flex flex-col justify-center items-center">
      <div className="text-center my-10 py-10">
        <p className="font-bold text-5xl my-8">
          Here are the meals you have saved so far
        </p>
        <Link to={'/'} className="bg-orange-500 py-2 px-6 text-light rounded-md hover:bg-orange-900 hover:shadow-lg "> Explore more meals</Link>
      </div>

      <SingleRecipe categories = {categories} />
    </div>
  );
};

export default SavedMeals;
