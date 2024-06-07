import { useState } from "react";
import { UserAuth } from "../context/AuthContext"; // Import UserAuth instead
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
    <div className="pt-[100px]">
      <h1 className="text-orange-500">SIGN UP FOR FOODY</h1>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Conditionally render error message */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            autoComplete="email"
            value={email} // Added value attribute for controlled input
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="*****************"
            autoComplete="current-password"
            value={password} // Added value attribute for controlled input
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Signup</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign up with Google</button>
      <p>
        Already a user? <Link to="/login">Login Here</Link>
      </p>{" "}
      {/* Corrected route path */}
    </div>
  );
};

export default Signup;
