import React, { useState, useEffect } from "react";
import Signin from "./auth/Signin";
import { FaSign } from "react-icons/fa";
import Signup from "./auth/Signup";
import { Routes, Route } from "react-router-dom";
import Homepage from "./global/Homepage";
import AuthService from "../services/AuthService";
import Movie from "./global/Movie";
import PageNotFound from "./global/PageNotFound";

const ProtectedRoutes = ({children})=>  {
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser]= useState(null);

  useEffect(() => {
        const user = AuthService.getCurrentUser();
        setUser(user);
        setIsLoading(false);
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={user ? <Navigate to ="/movie"/> : <Signin />} />
      <Route path="/signup" element={user ? <Navigate to ="/movie"/> : <Signup />} />
      <Route path= "/movie" element={<ProtectedRoutes><Movie /></ProtectedRoutes>} />

      <Route path = "*" element={<PageNotFound/>} />
      
    </Routes>
  );
};

export default App;
