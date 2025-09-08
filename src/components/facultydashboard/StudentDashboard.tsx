import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CalendarIcon, BookOpen, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";

interface StudentDashboardProps {
  user: { name: string; id: string; year: string; section: string; usn: string };
  onLogout: () => void;
}

function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSubject, setSelectedSubject] = useState("all");

  // Mock data - in real app would come from API
  const subjects = [
    { id: "math", name: "Mathematics", code: "MATH101" },
    { id: "physics", name: "Physics", code: "PHY101" },
    { id: "chemistry", name: "Chemistry", code: "CHEM101" },
    { id: "english", name: "English", code: "ENG101" },
  ];

  const attendanceData = [
    { subject: "Mathematics", present: 18, total: 20, percentage: 90, lastClass: "2024-01-15" },
    { subject: "Physics", present: 16, total: 18, percentage: 89, lastClass: "2024-01-14" },
    { subject: "Chemistry", present: 14, total: 16, percentage: 88, lastClass: "2024-01-13" },
    { subject: "English", present: 19, total: 20, percentage: 95, lastClass: "2024-01-12" },
  ];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "bg-present text-white";
    if (percentage >= 75) return "bg-warning text-white";
    return "bg-absent text-white";
  };

  const overallAttendance = Math.round(
    attendanceData.reduce((acc, item) => acc + item.percentage, 0) / attendanceData.length
  );

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
                <p className="text-sm text-muted-foreground">Student Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">USN: {user.usn}</p>
                <p className="text-xs text-muted-foreground">{user.year} - {user.section}</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAttendance}%</div>
              <p className="text-xs text-muted-foreground">
                {overallAttendance >= 75 ? "Above minimum requirement" : "Below minimum requirement"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attendanceData.reduce((acc, item) => acc + item.total, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across {subjects.length} subjects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground">
                {format(new Date(), "PPP")}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attendance Records */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Attendance Summary</CardTitle>
                    <CardDescription>Your attendance record by subject</CardDescription>
                  </div>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.present} of {item.total} classes attended
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last class: {format(new Date(item.lastClass), "PPP")}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getAttendanceColor(item.percentage)}>
                          {item.percentage}%
                        </Badge>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Calendar
                </CardTitle>
                <CardDescription>Select a date to view attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                />
                {selectedDate && (
                  <div className="mt-4 p-3 bg-accent/50 rounded-lg">
                    <p className="text-sm font-medium">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      No classes scheduled
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard