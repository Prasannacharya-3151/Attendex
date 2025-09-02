// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import StudentSignup from "./components/auth/StudentSignup";

function App(){
  return(
    <BrowserRouter>
   
      <Routes>
        <LandingPage />
        <Route path="/studentsignup" element={<StudentSignup onBack={() => {}} onSignup={() => {}} />} />
      </Routes>

    </BrowserRouter>
   
  )
}

export default App;