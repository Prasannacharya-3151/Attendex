import React, { useState} from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle  } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calender";
import { Button, ButtonVariant } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Users, CalendarIcon, BookOpen, CheckCircle, XCircle, Clock, UserCheck, UserX, Search } from "lucide-react";
import { format } from "data-fns";
import { Popover } from "../ui/popover";
import { cn } from "@/lib/utils";


interface FacultyDashboardProps {
    user: {
        name:string;
        id:string;
        department:string;
    onLogput:()=>void;
}

const FacultyDashboard = ({user, onLogout }: FacultyDashboardProps)=>{
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedClass, setSelectedClass] = useState("");
    const [searchTerm, setSelectedTerm] = useState("");
    const [showAbsentDetails, setShowAbsentDetails] = useState(false);
    

    const classes = [
    { id: "math101", name: "Mathematics", year: "2nd Year", section: "A", students: 45 },
    { id: "math102", name: "Advanced Mathematics", year: "3rd Year", section: "B", students: 38 },
  ];

   const students = [
    { id: "1", name: "Abhibc", USN: "4al23is001", status: "present" },
    { id: "2", name: "Abhilash", USN: "4al23is002", status: "absent" },
    { id: "3", name: "Abhishek", USN: "4al23is003", status: "present" },
    { id: "4", name: "Akhilesh", USN: "4al23is004", status: "late" },
    { id: "5", name: "Adhiti", USN: "4al23is005", status: "present" },
  ];

  const[attandance, setattendance] = useState(
    students.reduce((acc, students)=>({
        ...acc,
        [students.id]: students.status
    }),{} as Record<string, string>)
  );

  const filterStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())||student.USN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateAttendance = (studentId: string, status:string)=>{
    setattendance(prev => ({...prev, [studentId]:status}))
  }

  const getStatusIcon = (status: string) =>{
    switch (status){
        case "present":
            return <UserCheck className="w-4 h-4 text-present"/>;
        case "absent":
            return <UserX className="w-4 h-4 text-absent"/>
        case "late":
            return <Users className="w-4 h-4 text-late"
    };
  };

  const getStatusBadge = (status: string) =>{
    switch (status){
        case "present":
            return <Badge className="bg-present text-white">Present</Badge>
        case "absent":
            return <Badge className="bg-absent text-white">Absent</Badge>
        case "late":
            return <Badge className="bg-late text-white">Late</Badge>
    }
  }
}
