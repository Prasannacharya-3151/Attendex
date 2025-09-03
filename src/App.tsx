// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import StudentSignup from "./components/auth/StudentSignup";
import FacultySignup from "./components/auth/FacultySignup";
import AdminSignup from "./components/auth/AdminSignup";
import LoginForm from "./components/auth/LoginForm";

function App(){
  return(
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studentsignup" element={<StudentSignup onSignup={() => {}} />} />
        <Route path="/facultysignup" element={<FacultySignup onBack={() => {}} onSignup={() => {}} />} />
        <Route path="/adminsignup" element={<AdminSignup onSignup={() => {}} /> } />
        <Route path="/loginform" element={<LoginForm onLogin={()=> {}} />} />
      </Routes>

    </BrowserRouter>
   
  )
}

export default App;