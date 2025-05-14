import React from "react";
import Signin from "./auth/Signin";
import { FaSign } from "react-icons/fa";
import Signup from "./auth/Signup";
import { Routes, Route } from "react-router-dom";
import Homepage from "./global/Homepage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
