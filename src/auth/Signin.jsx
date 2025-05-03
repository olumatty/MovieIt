import React, { useState } from "react";
import bgImage from "../assets/photo-1674175830433-79d6d5bf5819.avif";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill, RiGithubFill } from "react-icons/ri";
import PasswordInput from "../../components/PasswordInput";
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const Signin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempted with:", {email, password });
  };

  const handleLoginSwitch = () => {
    navigate("/"); // Use /login for the login route as per common practice
  };

  const handleSignupSwitch = () => {
    navigate("/signup");
  };

  return (
   
    <div className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:block md:w-1/2 relative overflow-hidden rounded-lg">
        <img
          src={bgImage}
          alt="Login Background"
          className="w-full h-full object-cover rounded-lg" 
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-md">
          <div className="flex justify-around mb-6 border-b border-gray-200">
             <button
              className={`flex-1 text-sm font-medium py-2 text-center transition-colors duration-200 ${
                location.pathname === "/login"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black border-b-2 border-transparent"
              }`}
              onClick={handleLoginSwitch}
            >
              Log In
            </button>
            <button
               className={`flex-1 text-sm font-medium py-2 text-center transition-colors duration-200 ${
                location.pathname === "/signup" 
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black border-b-2 border-transparent"
              }`}
              onClick={handleSignupSwitch}
            >
              Create Account
            </button>
          </div>
          <div className="flex flex-col gap-4 items-center max-w-md mx-auto">
            <button className="input-box border-gray-300 hover:bg-gray-50 flex items-center justify-between cursor-pointer font-medium border rounded-md py-2 px-4 w-full transition-colors duration-200">
              <div className="flex items-center w-full">
                <FcGoogle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="flex-1 text-center">Continue with Google</span>
              </div>
            </button>
            <button className="input-box border-gray-300 hover:bg-gray-50 flex items-center justify-between cursor-pointer font-medium border rounded-md py-2 px-4 w-full transition-colors duration-200">
              <div className="flex items-center w-full">
                <RiAppleFill className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="flex-1 text-center">Continue with Apple</span>
              </div>
            </button>
            <button className="input-box border-gray-300 hover:bg-gray-50 flex items-center justify-between cursor-pointer font-medium border rounded-md py-2 px-4 w-full transition-colors duration-200">
              <div className="flex items-center w-full">
                <RiGithubFill className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="flex-1 text-center">Continue with Github</span>
              </div>
            </button>
          </div>

          <div className="my-8 flex items-center gap-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 text-sm font-medium">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder:text-sm placeholder:text-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <PasswordInput
                id="password"
                className="w-full mt-1"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <p className="text-xs sm:text-sm text-center text-gray-500 mt-4">
              By creating an account, you agree with our{" "}
              <span className="underline text-gray-700 hover:text-black cursor-pointer">Terms of Service</span> and{" "}
              <span className="underline text-gray-700 hover:text-black cursor-pointer">Privacy Policy</span>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-black text-white font-semibold rounded-md mt-4 hover:bg-gray-800 transition-colors duration-200"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;