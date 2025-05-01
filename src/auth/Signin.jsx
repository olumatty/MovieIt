import React, { useState } from "react";
import bgImage from "../assets/photo-1674175830433-79d6d5bf5819.avif";
import { FcGoogle } from "react-icons/fc";
import { RiAppleFill, RiGithubFill } from "react-icons/ri";
import PasswordInput from "../../components/PasswordInput";

const Signin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <div className="w-1/2  relative">
        <img
          src={bgImage}
          alt="Login Background"
          size={20}
          className=" rounded-lg "
        />
      </div>

      {/* Right side - Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex justify-around mb-6 pb-2">
            <button
              className={`text-sm font-medium ${
                location.pathname === "/login"
                  ? "text-black  border-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              Log In
            </button>
            <button
              className={`text-sm font-medium ${
                location.pathname === "/signUp"
                  ? "text-black  border-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-4 items-center max-w-md">
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

          {/* Divider */}
          <div className="my-8 flex items-center gap-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 text-sm font-medium">Or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="text"
                className="flex items-center w-full text-smbg-white border border-gray-300 px-4 py-3 rounded-md outline-none  focus-within:ring-gray-700 focus-within:border-gray-800 transition duration-200 placeholder:text-[12px] placeholder:text-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <PasswordInput
                id="password"
                className="w-full mt-1"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500 mt-4">
              By creating an account, you agree with our{" "}
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary w-full py-2 bg-black text-white font-semibold rounded-md mt-4"
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
