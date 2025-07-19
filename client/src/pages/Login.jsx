import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Logo from "/BITLOGO.png";
import {loginIntro} from '../constants/Constants'
const Login = () => {
  const [error, setError] = useState("");

  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, "_self");

  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="sm:w-1/4  rounded-lg flex flex-col justify-center items-center gap-4 p-4 shadow-card">
        <h1 className="w-full font-lexend text-heading text-center">
          Welcome Back!
        </h1>
        <img src={Logo} alt="Bit Logo" className="w-[200px]" />
        <h1 className="font-inter text-body text-center">
          {loginIntro}
        </h1>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-3 py-2 rounded-lg flex justify-center items-center w-full font-lexend"
        >
          Google Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
