// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import StudentSignup from "./components/auth/StudentSignup";
import FacultySignup from "./components/auth/FacultySignup";

function App(){
  return(
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studentsignup" element={<StudentSignup onBack={() => {}} onSignup={() => {}} />} />
        <Route path="/facultysignup" element={<FacultySignup onBack={() => {}} onSignup={() => {}} />} />
      </Routes>

    </BrowserRouter>
   
  )
}

export default App;