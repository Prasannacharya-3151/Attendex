import React, { useState} from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle  } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar } from "../ui/calender";
import { Button, ButtonVariant } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CalendarIcon, BookOpe, TrendingUp, Clock } from "lucide-react";
import { format } from "data-fns";


interface StudentDashboardProps {
    user: {
        name:string;
        usn:string;
        section:string;
        year:string;
    }
    onLogput:()=>void;
}

const StudentDashboard = ({user, onLogout }: StudentDashboardProps)=>{
    const [selectedDate, setSelectedDate] = useState<Date | undefine>(new Date());
    const [selectedSubject, setSelectedSubject] = useState("all");


}