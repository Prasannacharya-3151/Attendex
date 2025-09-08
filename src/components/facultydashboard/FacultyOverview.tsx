import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Users, Calendar, TrendingUp, BookOpen, Clock } from "lucide-react"

interface FacultyOverviewProps {
  user: {
    name: string;
    id: string;
    department: string;
  };
}

export const FacultyOverview = ({ user }: FacultyOverviewProps) => {
  // Mock data - replace with actual data from your backend
  const stats = {
    totalStudents: 156,
    todayAttendance: {
      present: 134,
      total: 156,
      percentage: 85.9
    },
    averageAttendance: 82.3,
    classesSeated: 24,
    totalClasses: 30,
    subjects: [
      { name: "Data Structures", attendance: 88.5, students: 52 },
      { name: "Computer Networks", attendance: 79.2, students: 52 },
      { name: "Operating Systems", attendance: 84.1, students: 52 }
    ]
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 85) return "default";
    if (percentage >= 75) return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}</h1>
        <p className="opacity-90">Department of {user.department}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across all sections
            </p>
          </CardContent>
        </Card>

        {/* Today's Attendance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getAttendanceColor(stats.todayAttendance.percentage)}>
                {stats.todayAttendance.percentage}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.todayAttendance.present}/{stats.todayAttendance.total} present
            </p>
          </CardContent>
        </Card>

        {/* Average Attendance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className={getAttendanceColor(stats.averageAttendance)}>
                {stats.averageAttendance}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>

        {/* Classes Conducted */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Conducted</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.classesSeated}/{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.classesSeated / stats.totalClasses) * 100)}% completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Subject Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.subjects.map((subject) => (
              <div key={subject.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{subject.name}</h4>
                  <p className="text-sm text-muted-foreground">{subject.students} students</p>
                </div>
                <div className="text-right">
                  <Badge variant={getAttendanceBadge(subject.attendance)} className="mb-1">
                    {subject.attendance}%
                  </Badge>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};