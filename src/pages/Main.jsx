import { useNavigate } from "react-router";
import Hero from "../components/Hero"
import { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

const Main = () => {

  const navigate = useNavigate();
  const { user } = UserAuth(); // Ensure signUp matches your context method

  useEffect(() => {
      if (user) {
          navigate('/home');
      } else {
        navigate('/')
      }
  }, [user, navigate]);


  return (
    <div className="pt-[100px] flex flex-wrap justify-center items-center">
   <Hero />
    </div>
  )
}

export default Main