import { useState } from "react";
import { Navbar } from "./Navbar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  BookOpen,
  Users,
  CheckCircle,
  TrendingUp,
  Calendar,
  BarChart3,
} from "lucide-react";
import { StudentManagement } from "./StudentManagement";
import { AttendanceMarking } from "../attendance/AttendanceMarking";
import { type Student, type FacultyInfo, type ClassInfo } from "../types/students";

type TabKey = "overview" | "students" | "attendance" | "reports";

interface FacultyDashboardProps {
  user: { name: string; id: string; department: string };
  onLogout: () => void;
}

export const FacultyDashboard = ({ user, onLogout }: FacultyDashboardProps) => {
  const [active, setActive] = useState<TabKey>("overview");

  const facultyInfo: FacultyInfo = {
    id: user.id,
    name: user.name,
    department: user.department,
    subjects: ["Mathematics", "Physics", "Computer Science", "Data Structures"],
  };

  const classInfo: ClassInfo = {
    year: "2nd Year",
    class: "BE Computer Science",
    subjects: facultyInfo.subjects,
  };

  const [students] = useState<Student[]>([]);

  const handleAttendanceSubmit = (
    records: { studentId: string; status: "present" | "absent" | "late"; date: string }[]
  ) => {
    console.log("Attendance submitted:", records);
  };

  const stats = {
    totalStudents: 135,
    todayPresent: 128,
    todayAbsent: 7,
    avgAttendance: 95.2,
    totalClasses: 24,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Navbar active={active} onNavigate={setActive} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {/* Header */}
        <header className="">
          <div className="">
            <div className="">
              {/* <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Faculty Portal</h1>
                  <p className="text-sm text-muted-foreground">
                    Attendance Management System
                  </p>
                </div>
              </div> */}

              {/* Avatar only (logout removed) */}
              <div className="flex items-center gap-3 sm:gap-4">
                <Avatar>
                  <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-right">
                  <p className="font-medium text-foreground">{user?.name ?? "Faculty"}</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.department ?? "Department"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 overflow-auto">
          {active === "overview" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome back, {user?.name?.split(" ")[0] ?? "Faculty"}!
                </h2>
                <p className="text-muted-foreground">
                  Here's what's happening with your classes today.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalStudents}</div>
                    <p className="text-xs text-muted-foreground">Across all sections</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {stats.todayPresent}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stats.todayAbsent} absent
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.avgAttendance}%</div>
                    <p className="text-xs text-muted-foreground">This semester</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Classes Conducted</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalClasses}</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {active === "students" && (
            <StudentManagement faculty={facultyInfo} classInfo={classInfo} />
          )}

          {active === "attendance" && (
            <AttendanceMarking
              students={students}
              subjects={facultyInfo.subjects}
              onAttendanceSubmit={handleAttendanceSubmit}
            />
          )}

          {active === "reports" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Attendance Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Calendar className="h-6 w-6 mb-2" />
                      Daily Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      Student-wise Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <BookOpen className="h-6 w-6 mb-2" />
                      Subject-wise Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;
