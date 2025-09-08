export interface Student {
  id: string
  name: string
  usn: string
  year: string
  section: string
  subject: string
  totalClasses: number
  presentClasses: number
  attendancePercentage: number
}

export interface AttendanceRecord {
  studentId: string
  status: "present" | "absent" | "late"
}

export interface DashboardStats {
  totalStudents: number
  todayAttendance: number
  averageAttendance: number
  classesConduc: number
  subjects: string[]
}

export interface NewStudent {
  name: string
  usn: string
  year: string
  section: string
  subject: string
}