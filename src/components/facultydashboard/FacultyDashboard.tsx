// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
// import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
// import { Input } from "../ui/input";
// import { Calendar } from "../ui/calendar";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Users, CalendarIcon, BookOpen, CheckCircle, XCircle, Clock,UserCheck,UserX,Search } from "lucide-react";
// import { format } from "date-fns";
// import { cn } from "../../lib/utils";

// interface FacultyDashboardProps {
//   user: { name: string; id: string; department: string };
//   onLogout: () => void;
// }

// export function FacultyDashboard({ user, onLogout }: FacultyDashboardProps) {
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
//   const [selectedClass, setSelectedClass] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showAbsentDetails, setShowAbsentDetails] = useState(false);

//   // Mock data
//   const classes = [
//     { code: "math101", subname: "Mathematics", year: "2nd Year", section: "A", students: 45 },
//     { code: "math102", subname: "Advanced Mathematics", year: "3rd Year", section: "B", students: 38 },
//   ];

//   const students = [
//     { id: "1", name: "ABHI BC", USN: "4AL23IS001", status: "present" },
//     { id: "2", name: "ABHILASH", USN: "4AL23IS002", status: "absent" },
//     { id: "3", name: "ABHISHEK MS", USN: "4AL23IS003", status: "present" },
//     { id: "4", name: "AKHILESH", USN: "4AL23IS004", status: "late" },
//     { id: "5", name: "ADHITI", USN: "4AL23IS005", status: "present" },
//   ];

//   const [attendance, setAttendance] = useState(
//     students.reduce((acc, student) => ({
//       ...acc,
//       [student.id]: student.status
//     }), {} as Record<string, string>)
//   );

//   const filteredStudents = students.filter(student =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     student.USN.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const updateAttendance = (studentId: string, status: string) => {
//     setAttendance(prev => ({ ...prev, [studentId]: status }));
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "present":
//         return <UserCheck className="w-4 h-4 text-present" />;
//       case "absent":
//         return <UserX className="w-4 h-4 text-absent" />;
//       case "late":
//         return <Clock className="w-4 h-4 text-late" />;
//       default:
//         return <Users className="w-4 h-4 text-muted-foreground" />;
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "present":
//         return <Badge className="bg-present text-white">Present</Badge>;
//       case "absent":
//         return <Badge className="bg-absent text-white">Absent</Badge>;
//       case "late":
//         return <Badge className="bg-late text-white">Late</Badge>;
//       default:
//         return <Badge variant="secondary">Not Marked</Badge>;
//     }
//   };

//   const presentCount = Object.values(attendance).filter(status => status === "present").length;
//   const absentCount = Object.values(attendance).filter(status => status === "absent").length;
//   const lateCount = Object.values(attendance).filter(status => status === "late").length;

//   const absentStudents = students.filter(student => attendance[student.id] === "absent");

//   const handleSaveAttendance = () => {
//     setShowAbsentDetails(true);
//   };

//   return (
//     <div className="min-h-screen bg-muted/30">
//       {/* Header for this page*/}
//       <header className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 flex items-center justify-center">
//                 <BookOpen className="w-8 h-8 text-primary" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-semibold text-gray-900">Attendance Pro</h1>
//                 <p className="text-sm text-muted-foreground">Faculty Portal</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="text-right">
//                 <p className="font-medium">{user.name}</p>
//                 <p className="text-sm text-muted-foreground">{user.department}</p>
//               </div>
//               <Button variant="outline" onClick={onLogout}>
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Class Selection and Date fro user section*/}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">Select Class</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Select value={selectedClass} onValueChange={setSelectedClass}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Choose a class" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {classes.map((cls) => (
//                     <SelectItem key={cls.code} value={cls.code}>
//                       {cls.subname} - {cls.year} {cls.section}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">Date</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className={cn(
//                       "w-full justify-start text-left font-normal hover:bg-sky-100",
//                       !selectedDate && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={selectedDate}
//                     onSelect={setSelectedDate}
//                     initialFocus
//                     className="p-3 pointer-events-auto "
//                   />
//                 </PopoverContent>
//               </Popover>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Button 
//                 className="w-full hover:bg-sky-600"
//                 onClick={handleSaveAttendance}
//               >
//                 Save Attendance
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Attendance Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Students</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{students.length}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Present</CardTitle>
//               <CheckCircle className="h-4 w-4 text-present" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-present">{presentCount}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Absent</CardTitle>
//               <XCircle className="h-4 w-4 text-absent" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-absent">{absentCount}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Late</CardTitle>
//               <Clock className="h-4 w-4 text-late" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-late">{lateCount}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Student List */}
//         <Card>
//           <CardHeader>
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <div>
//                 <CardTitle>Mark Attendance</CardTitle>
//                 <CardDescription>
//                   {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
//                 </CardDescription>
//               </div>
//               <div className="relative w-full sm:w-64">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                 <Input
//                   placeholder="Search students..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {filteredStudents.map((student) => (
//                 <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
//                   <div className="flex items-center gap-4">
//                     {getStatusIcon(attendance[student.id])}
//                     <div>
//                       <p className="font-medium">{student.name}</p>
//                       <p className="text-sm text-muted-foreground">USN : {student.USN}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     {getStatusBadge(attendance[student.id])}
//                     <div className="flex gap-2">
//                       <Button
//                         size="sm"
//                         variant={attendance[student.id] === "present" ? "default" : "outline"}
//                         onClick={() => updateAttendance(student.id, "present")}
//                         className={attendance[student.id] === "present" ? "bg-present hover:bg-present/90" : ""}
//                       >
//                         Present
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant={attendance[student.id] === "absent" ? "default" : "outline"}
//                         onClick={() => updateAttendance(student.id, "absent")}
//                         className={attendance[student.id] === "absent" ? "bg-absent hover:bg-absent/90" : ""}
//                       >
//                         Absent
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant={attendance[student.id] === "late" ? "default" : "outline"}
//                         onClick={() => updateAttendance(student.id, "late")}
//                         className={attendance[student.id] === "late" ? "bg-late hover:bg-late/90" : ""}
//                       >
//                         Late
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Absent Students Details Modal */}
//         {showAbsentDetails && (
//           <Card className="mt-8">
//             <CardHeader>
//               <div className="flex justify-between items-center">
//                 <div>
//                   <CardTitle className="text-lg text-absent">Absent Students Summary</CardTitle>
//                   <CardDescription>
//                     {absentStudents.length} students were absent on {selectedDate ? format(selectedDate, "PPP") : "selected date"}
//                   </CardDescription>
//                 </div>
//                 <Button 
//                   variant="outline" 
//                   onClick={() => setShowAbsentDetails(false)}
//                 >
//                   Close
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               {absentStudents.length > 0 ? (
//                 <div className="space-y-3">
//                   {absentStudents.map((student, index) => (
//                     <div key={student.id} className="flex items-center justify-between p-4 border border-absent/20 rounded-lg bg-absent/5">
//                       <div className="flex items-center gap-4">
//                         <div className="w-8 h-8 bg-absent/20 rounded-full flex items-center justify-center">
//                           <span className="text-sm font-medium text-absent">{index + 1}</span>
//                         </div>
//                         <div>
//                           <p className="font-medium">{student.name}</p>
//                           <p className="text-sm text-muted-foreground">USN: {student.USN}</p>
//                         </div>
//                       </div>
//                       <Badge className="bg-absent text-white">
//                         Absent
//                       </Badge>
//                     </div>
//                   ))}
//                   <div className="mt-6 p-4 bg-muted/50 rounded-lg">
//                     <h4 className="font-medium mb-2">Attendance Summary</h4>
//                     <div className="grid grid-cols-3 gap-4 text-sm">
//                       <div className="text-center">
//                         <p className="text-present font-medium">{presentCount}</p>
//                         <p className="text-muted-foreground">Present</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-absent font-medium">{absentCount}</p>
//                         <p className="text-muted-foreground">Absent</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-late font-medium">{lateCount}</p>
//                         <p className="text-muted-foreground">Late</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <CheckCircle className="w-12 h-12 text-present mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-present mb-2">Perfect Attendance!</h3>
//                   <p className="text-muted-foreground">All students were present today.</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FacultyDashboard

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { StudentManagement } from "../facultydashboard/StudentManagement";
import { AttendanceMarking } from "../attendance/AttendanceMarking";
import { type Student, type FacultyInfo, type ClassInfo } from "../types/students";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  LogOut,
  // Clock,
  CheckCircle,
  BarChart3,
  UserPlus,
  ClipboardCheck
} from "lucide-react";

interface FacultyDashboardProps {
  user: { name: string; id: string; department: string };
  onLogout: () => void;
}

// Import AttendanceRecord type from the shared types file
// import { AttendanceRecord } from "../types/students";
// If AttendanceRecord is not exported, use an existing type or define it here:
export type AttendanceRecord = {
  studentId: string;
  status: "present" | "absent" | "late";
  date: string;
};

export const FacultyDashboard = ({ user, onLogout }: FacultyDashboardProps) => {
  // Mock faculty info
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

  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [students, setStudents] = useState<Student[]>([]);

  const handleAttendanceSubmit = (attendanceRecords: AttendanceRecord[]) => {
    console.log("Attendance submitted:", attendanceRecords);
    // TODO: Send to backend via API
  };

  // Mock dashboard statistics
  const stats = {
    totalStudents: 135,
    todayPresent: 128,
    todayAbsent: 7,
    avgAttendance: 95.2,
    totalClasses: 24,
    recentActivity: [
      { id: 1, action: "Marked attendance for Mathematics", time: "2 hours ago", type: "attendance" },
      { id: 2, action: "Added new student to Section A", time: "1 day ago", type: "student" },
      { id: 3, action: "Generated attendance report", time: "2 days ago", type: "report" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Faculty Portal</h1>
                <p className="text-sm text-muted-foreground">Attendance Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
              </Avatar>
              <div className="text-right hidden md:block">
                <p className="font-medium text-foreground">{user?.name ?? "Faculty"}</p>
                <p className="text-sm text-muted-foreground">{user?.department ?? "Department"}</p>
              </div>
              <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overviw</TabsTrigger>
            <TabsTrigger value="students">
              <UserPlus className="h-4 w-4 mr-2" />
              Student Management
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Mark Attendance
            </TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Welcome back, {user?.name?.split(" ")[0] ?? "Faculty"}!
              </h2>
              <p className="text-muted-foreground">
                Here's what's happening with your classes today.
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <CheckCircle className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{stats.todayPresent}</div>
                  <p className="text-xs text-muted-foreground">{stats.todayAbsent} absent</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
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
          </TabsContent>

          {/* Student Management */}
          <TabsContent value="students" className="space-y-4">
            <StudentManagement faculty={facultyInfo} classInfo={classInfo} />
          </TabsContent>

          {/* Attendance */}
          <TabsContent value="attendance" className="space-y-4">
            <AttendanceMarking
              students={students}
              subjects={facultyInfo.subjects}
              onAttendanceSubmit={handleAttendanceSubmit}
            />
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Attendance Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacultyDashboard;
