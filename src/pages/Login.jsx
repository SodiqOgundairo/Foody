import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    const { logIn } = UserAuth(); // Ensure signUp matches your context method
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // Fixed typo
      setError('')
  
      try {
        await logIn(email, password);
        navigate('/home'); // Corrected route path
      } catch (error) {
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
            setError('Invalid login details');
            } else if (error.code === 'auth/network-request-failed') {
              setError('Error in your internet connection. Please check your internet and try again.');
          } else {
            setError(error.message); // Fall back to default message if not a known error
          }
        console.log(error);
      }
    };

  return (
    <div className="py-[100px]">
    <h1 className="text-orange-500">Login with your credentials</h1>
    {error && <p className="text-red-500">{error}</p>} {/* Conditionally render error message */}
    {/* {error ? <p className='p-3 bg-red-400 my-2'> {error} </p> : null} */}
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

      <button type="submit">Login</button>
    </form>

    <p>Don't Have an account yet?<Link to="/signup">Signup Now</Link></p>

  </div>
  )
}

export default Login