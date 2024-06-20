import { useState } from "react";
import { UserAuth } from "../context/AuthContext"; // Import UserAuth instead
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp, signInWithGoogle } = UserAuth(); // Destructure signInWithGoogle from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed typo
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      await signUp(email, password);
      navigate("/home"); // Corrected route path
    } catch (error) {
      setError(error.message); // Fall back to default message if not a known error
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/home"); // Corrected route path
    } catch (error) {
      setError(error.message); // Fall back to default message if not a known error
      console.log(error);
    }
  };

  return (
    <div className="signup h-[100vh] flex flex-col justify-center items-center bg-blend-overlay">
      <div className=" backdrop-blur-md p-10 rounded-lg shadow-lg">
        <h1 className="text-light font-bold text-5xl py-5">
          SIGN UP FOR FOODY
        </h1>
        {error && <p className="bg-red-500/50 ">{error}</p>}{" "}
        {/* Conditionally render error message */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 my-5">
            <label htmlFor="email" className="font-bold text-lg">
              Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              className="p-3 rounded-md"
              value={email} // Added value attribute for controlled input
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 my-5">
            <label htmlFor="password" className="font-bold text-lg">
              Password
            </label>
            <input
              type="password"
              placeholder="*****************"
              autoComplete="current-password"
              className="p-3 rounded-md"
              value={password} // Added value attribute for controlled input
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-orange-500 px-6 py-2 rounded-sm text-white hover:bg-orange-900 hover:shadow-lg"
            >
              Signup
            </button>
            <p className="font-normal italic">
              Already a user?{" "}
              <Link
                to="/login"
                className="text-light font-bold hover:text-orange-500"
              >
                Login Here
              </Link>
            </p>
          </div>
        </form>
        <div className="flex justify-center my-5">

        <button
          onClick={handleGoogleSignIn}
          className="bg-light text-center py-3 px-9 rounded-sm hover:bg-orange-500 hover:shadow-lg hover:text-light flex justify-center items-center gap-5"
          >
          <FaGoogle /> <span> Sign up with Google </span>
        </button>
          </div>
        {/* Corrected route path */}
      </div>
    </div>
  );
};

export default Signup;
