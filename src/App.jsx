import React from "react";
import Signin from "./auth/Signin";
import { FaSign } from "react-icons/fa";
import Signup from "./auth/Signup";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />s
    </Routes>
  );
};

export default App;
