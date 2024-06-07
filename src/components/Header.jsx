import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";

const Header = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login"); // Navigate to login page after logging out
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex justify-between p-4 bg-light/70 fixed w-full backdrop-blur-lg flex-wrap">
      <Link to="/" className="text-orange-500 font-bold text-2xl italic">
        foody
      </Link>
      <nav className="flex justify-center gap-7 items-center flex-wrap">
        <ul className="list-none hidden md:flex justify-center gap-4 p-4 flex-wrap">
          <li>Home</li>
          <li>About</li>
          <li>Meal of the Day</li>
          <li>Pricing</li>
        </ul>

        {user?.email ? (
          <>
            <span>{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-orange-500 px-6 py-2 rounded-lg text-white hover:bg-orange-900 hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 px-6 py-2 rounded-lg text-white hover:bg-orange-900 hover:shadow-lg"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
