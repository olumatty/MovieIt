import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import { Routes, Route } from "react-router-dom";
import Homepage from "./global/Homepage";
import Movie from "./global/Movie";
import PageNotFound from "./global/PageNotFound";
import { Navigate } from "react-router-dom";
import React from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext"
import { useEffect } from "react";
import setupAxiosInterceptors from "./util/axiosSetup";
import Loader from "../components/Loader";
import Home from "./global/Home";
import TvSeries from "./global/TvSeries";
import Layout from "./../components/Layout";

const ProtectedRoutes = ({children})=>  {
  const {User, loading} = React.useContext(AuthContext);
  if(loading) {
    return <div className="flex justify-center items-center h-screen">
      <h1><Loader/></h1>
    </div>
  }
  if(!User) {
    return <Navigate to="/login" />
  }
  return children;
}

const AppContent = () => {
  const  {refreshToken, logout} = React.useContext(AuthContext);

  useEffect(() => {
    setupAxiosInterceptors(refreshToken, logout);
  }, [refreshToken, logout]);

  return (
    <Layout>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={ <Signin />} />
      <Route path="/signup" element={ <Signup />} />
      <Route path= "/movie" element={<Movie/>} />
      <Route path= "/home" element = {<Home/>} />
      <Route path= "/tvseries" element= {<TvSeries/>} />
     

      <Route path = "*" element={<PageNotFound/>} />

    </Routes>
    </Layout>


  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
