import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";  // Correct imports
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterDialog from "./pages/register/RegisterDialog";
import SubplanPage from "./pages/subplan/SubplanPage";
import Createprofile from "./pages/createprofile/Createprofile";


function App() {
  return (
    <BrowserRouter>  {/* Wrap the routes inside BrowserRouter */}
      <Routes>  {/* Define Routes for navigation */}
        <Route path="/" element={<HomePage />} />  {/* Default HomePage route */}
        <Route path="/login" element={<LoginPage />} />  {/* LoginPage route */}
        <Route path="/register" element={<RegisterDialog />} /> {/* RegisterDialog*/}
        <Route path="/createprofile" element={<Createprofile />} />
        <Route path="/subplan" element={<SubplanPage />} /> 
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
