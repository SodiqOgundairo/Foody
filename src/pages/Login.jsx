import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, signInWithGoogle } = UserAuth(); // Ensure signUp matches your context method
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fixed typo
    setError("");

    try {
      await logIn(email, password);
      navigate("/home"); // Corrected route path
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Invalid login details");
      } else if (error.code === "auth/network-request-failed") {
        setError(
          "Error in your internet connection. Please check your internet and try again."
        );
      } else {
        setError(error.message); // Fall back to default message if not a known error
      }
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/home"); // Corrected route path
      // Handle redirect or UI update after successful sign-in
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login h-[100vh] flex flex-col justify-center items-center">
      <div className="backdrop-blur-md p-10 rounded-lg shadow-lg">
        <h1 className="text-light font-bold text-5xl py-5">Login to FOODY</h1>
        {error && (
          <p className="bg-red-700  font-bold text-base px-4 py-2 italic my-2 text-light">
            {error}
          </p>
        )}{" "}
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
          <div className="flex justify-between items center">
            <button
              type="submit"
              className="bg-orange-500 px-6 py-2 rounded-sm text-white hover:bg-orange-900 hover:shadow-lg"
            >
              Login
            </button>

            <p className="italic flex flex-col">
              <span className="text-light"> Don't Have an account yet?</span>
              <Link
                to="/signup"
                className="text-light font-bold hover:text-orange-500"
              >
                Signup Now
              </Link>
            </p>
          </div>
        </form>
        <div className="flex justify-center my-5">
          <button
            onClick={handleGoogleSignIn}
            className="bg-light text-center py-3 px-9 rounded-sm hover:bg-orange-500 hover:shadow-lg hover:text-light flex justify-center items-center gap-5"
          >
            {" "}
            <FaGoogle /> <span> Login with Google </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
