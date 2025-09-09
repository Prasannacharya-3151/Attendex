import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import StudentSignup from "./components/auth/StudentSignup";
import FacultySignup from "./components/auth/FacultySignup";
import AdminSignup from "./components/auth/AdminSignup";
import LoginForm from "./components/auth/LoginForm";
import FacultyDashboard from "./components/facultydashboard/FacultyDashboard";

import { FacultyOverview } from "./components/facultydashboard/FacultyOverview";
import { StudentManagement } from "./components/student/StudentManagement";
import { AttendanceMarking } from "./components/attendance/AttendanceMarking"; // or AttendanceMarkingRefactored
import { ReportsPage } from "./components/reports/ReportsPage";
import StudentDashboard from "./components/facultydashboard/StudentDashboard";
import HODDashboard from "./components/facultydashboard/HODDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studentsignup" element={<StudentSignup onSignup={() => {}} />} />
        <Route path="/facultysignup" element={<FacultySignup onBack={() => {}} onSignup={() => {}} />} />
        <Route path="/adminsignup" element={<AdminSignup onSignup={() => {}} />} />
        <Route path="/loginform" element={<LoginForm onLogin={() => {}} />} />
        

        {/* Faculty Dashboard with Nested Routes */}
        <Route
          path="/facultydashboard"
          element={
            <FacultyDashboard
              user={{ name: "John Doe", id: "F123", department: "CSE" }}
              onLogout={() => console.log("Logged out")}
            />
          }
        >
          <Route path="overview" element={<FacultyOverview user={{ name: "John Doe", id: "F123", department: "CSE" }} />} />
          <Route
            path="students"
            element={
              <StudentManagement
                faculty={{
                  id: "F123",
                  name: "John Doe",
                  department: "CSE",
                  subjects: ["Data Structures", "Computer Networks", "Operating Systems", "Database Management"]
                }}
                classInfo={{
                  year: "3rd Year",
                  class: "BE Computer Science",
                  subjects: ["Data Structures", "Computer Networks", "Operating Systems", "Database Management"]
                }}
              />
            }
          />
          <Route
            path="attendance"
            element={
              <AttendanceMarking
                students={[]}
                subjects={["Data Structures", "Computer Networks", "Operating Systems", "Database Management"]}
                onAttendanceSubmit={(attendanceData) => {
                  console.log("Attendance submitted:", attendanceData);
                }}
              />
            }
          />
          <Route path="reports" element={<ReportsPage user={{ name: "John Doe", id: "F123", department: "CSE" }} />} />
        </Route>
        <Route path="/studentdashboard" element={<StudentDashboard user={() => {}} onLogout={() => {}} />} />
        <Route path="/hoddashboard" element={<HODDashboard user={() => {}} onLogout={() => {}} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
