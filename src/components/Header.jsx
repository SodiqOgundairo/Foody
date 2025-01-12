import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";


const Header = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const hadnleClickOutside = () => {
      if (menuOpen && !event.target.closest('header')) {
        setMenuOpen(!menuOpen)
      }
    }
    document.addEventListener('mousedown', hadnleClickOutside)
    return () => {
      document.addEventListener('mousedown', hadnleClickOutside)
    }
  }, [menuOpen])

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
  }

  const handleMenuItemClick = () => {
    setMenuOpen(!menuOpen)
  }

  const handleMyMealsClick = () => {
    !user?.email ? (
      alert('Please login to see your saved meals!'), setTimeout(() =>{ 
        navigate('/login')
        setMenuOpen(!menuOpen)
        , 0})
    ) : (
      handleMenuItemClick()
    )
  }

  return (
    <header className="flex justify-between p-4 bg-light/70 fixed w-full backdrop-blur-lg flex-wrap md:items-center z-10">
      <Link to="/" className="text-orange-500 font-bold text-4xl italic">
        foody
      </Link>
      <nav className={`flex-col ${menuOpen ? 'flex flex-col relative right-0' : 'hidden'} md:flex md:flex-row justify-center gap-7 items-center flex-wrap`}>
        <ul className="list-none block md:flex justify-center gap-4 p-4 flex-wrap">
          <li className="hover:text-orange-500" > <Link to={'/'} onClick={handleMenuItemClick}>Home </Link> </li>
          <li className="hover:text-orange-500" > <Link to={'meal-of-the-day'} onClick={handleMenuItemClick}>Meal of the Day </Link> </li>
          <li className="hover:text-orange-500"  > <Link to={'my-meals'} onClick={handleMyMealsClick}> My saved Meals </Link> </li>
        </ul>

        {user?.email ? (
          <>
            <span>{user.email}</span>
            <button className="bg-light border-2 border-orange-500 rounded-sm px-6 py-2 text-orange-500 hover:bg-orange-500 hover:shadow-lg hover:text-white">Add my meal</button>
            <button
              onClick={handleLogout}
              className="bg-orange-500 px-6 py-2 rounded-sm text-white hover:bg-orange-900 hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <div>

          <Link
            to="/login"
            className="bg-orange-500 px-6 py-2 rounded-sm text-white hover:bg-orange-900 hover:shadow-lg"
            >
            Login
          </Link>
          <div className={`  text-4xl md:hidden`} onClick={handleMenu}>
        <IoCloseSharp />
      </div>
            </div>
        )}
      </nav>

      <div className={` ${menuOpen ? 'hidden' : 'block'} text-4xl md:hidden`} onClick={handleMenu}>
        <GiHamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
