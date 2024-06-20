import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Header = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuBtn, setMenuBtn] = useState(true)

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenu = () => {
    setMenuOpen(!menuOpen)
    setMenuBtn(!menuBtn)
  }

  return (
    <header className="flex justify-between p-4 bg-light/70 fixed w-full backdrop-blur-lg flex-wrap md:items-center z-10">
      <Link to="/" className="text-orange-500 font-bold text-4xl italic">
        foody
      </Link>
      <nav className={`flex-col ${menuOpen ? 'flex flex-col relative right-0' : 'hidden'} md:flex md:flex-row justify-center gap-7 items-center flex-wrap`}>
        <ul className="list-none block md:flex justify-center gap-4 p-4 flex-wrap">
          <li className="hover:text-orange-500" > <Link to={'/'} >Home </Link> </li>
          <li className="hover:text-orange-500" > <Link to={'/'} >Meal of the Day </Link> </li>
          <li className="hover:text-orange-500" > <Link to={'my-meals'} > My saved Meals </Link> </li>
        </ul>

        {user?.email ? (
          <>
            <span>{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-orange-500 px-6 py-2 rounded-sm text-white hover:bg-orange-900 hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 px-6 py-2 rounded-sm text-white hover:bg-orange-900 hover:shadow-lg"
          >
            Login
          </Link>
        )}
      </nav>

      <div className={` ${menuBtn ? 'block' : 'hidden'} text-4xl md:hidden`} onClick={handleMenu}>
        <GiHamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
