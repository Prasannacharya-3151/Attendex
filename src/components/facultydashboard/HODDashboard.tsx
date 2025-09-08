import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  BarChart3,
  Download,
  Filter,
//   Calendar,
  GraduationCap
} from "lucide-react";

interface HODDashboardProps {
  user: { name: string; id: string; department: string };
  onLogout: () => void;
}

function HODDashboard({ user, onLogout }: HODDashboardProps) {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  // Mock data
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const sections = ["A", "B", "C"];
  const subjects = ["Mathematics", "Physics", "Chemistry", "English", "Computer Science"];

  const departmentStats = {
    totalStudents: 480,
    totalFaculty: 24,
    averageAttendance: 87,
    classesCompleted: 1250,
  };

  const yearWiseData = [
    { year: "1st Year", students: 120, attendance: 92, sections: 3 },
    { year: "2nd Year", students: 125, attendance: 89, sections: 3 },
    { year: "3rd Year", students: 118, attendance: 85, sections: 3 },
    { year: "4th Year", students: 117, attendance: 83, sections: 3 },
  ];

  const subjectWiseData = [
    { subject: "Mathematics", faculty: "Dr. Smith", classes: 180, attendance: 88 },
    { subject: "Physics", faculty: "Dr. Johnson", classes: 165, attendance: 91 },
    { subject: "Chemistry", faculty: "Dr. Brown", classes: 170, attendance: 86 },
    { subject: "English", faculty: "Prof. Davis", classes: 155, attendance: 94 },
    { subject: "Computer Science", faculty: "Dr. Wilson", classes: 200, attendance: 89 },
  ];

  const lowAttendanceStudents = [
    { name: "John Doe", rollNo: "2021001", year: "2nd Year", section: "A", attendance: 68 },
    { name: "Jane Smith", rollNo: "2020045", year: "3rd Year", section: "B", attendance: 71 },
    { name: "Mike Johnson", rollNo: "2022015", year: "1st Year", section: "C", attendance: 69 },
  ];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-present";
    if (percentage >= 75) return "text-warning";
    return "text-absent";
  };

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 90) return "bg-present text-white";
    if (percentage >= 75) return "bg-warning text-white";
    return "bg-absent text-white";
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Attendance Pro</h1>
                <p className="text-sm text-muted-foreground">HOD Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">Head of {user.department}</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Reports
            </CardTitle>
            <CardDescription>Filter data by year, section, and subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      Section {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-gradient-to-r from-primary to-primary-dark">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Across {years.length} years
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.totalFaculty}</div>
              <p className="text-xs text-muted-foreground">
                Teaching {subjects.length} subjects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getAttendanceColor(departmentStats.averageAttendance)}`}>
                {departmentStats.averageAttendance}%
              </div>
              <p className="text-xs text-muted-foreground">
                Department wide
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Classes Completed</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departmentStats.classesCompleted}</div>
              <p className="text-xs text-muted-foreground">
                This semester
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Year-wise Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Year-wise Attendance</CardTitle>
              <CardDescription>Attendance breakdown by academic year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {yearWiseData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.year}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.students} students, {item.sections} sections
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getAttendanceBadge(item.attendance)}>
                        {item.attendance}%
                      </Badge>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.attendance}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject-wise Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Performance</CardTitle>
              <CardDescription>Attendance by subject and faculty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectWiseData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.faculty} • {item.classes} classes
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getAttendanceBadge(item.attendance)}>
                        {item.attendance}%
                      </Badge>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.attendance}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Attendance Alert */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-red-600">Low Attendance Alert</CardTitle>
            <CardDescription>Students with attendance below 75%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowAttendanceStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {student.rollNo} • {student.year} - Section {student.section}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-absent text-white">
                      {student.attendance}%
                    </Badge>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HODDashboard;