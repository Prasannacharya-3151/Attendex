import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { ClipboardCheck, CheckCircle, XCircle, Clock, Save } from "lucide-react"
import { type Student, type AttendanceRecord } from "../types/attendance"
import { toast } from "../../hooks/use-toast"
// import { toast } from "sonner"

interface AttendanceMarkingProps {
  students: Student[]
  onSubmitAttendance: (records: AttendanceRecord[], classInfo: { year: string; section: string; subject: string }) => void
}

export function AttendanceMarkingRefactored({ students, onSubmitAttendance }: AttendanceMarkingProps) {
  const [attendanceYear, setAttendanceYear] = useState("")
  const [attendanceSection, setAttendanceSection] = useState("")
  const [attendanceSubject, setAttendanceSubject] = useState("")
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false)

  const getStudentsForAttendance = () => {
    return students.filter(
      (student) =>
        student.year === attendanceYear &&
        student.section === attendanceSection &&
        student.subject === attendanceSubject,
    )
  }

  const startAttendanceMarking = () => {
    if (attendanceYear && attendanceSection && attendanceSubject) {
      const studentsForClass = getStudentsForAttendance()
      const initialRecords = studentsForClass.map((student) => ({
        studentId: student.id,
        status: "present" as const,
      }))
      setAttendanceRecords(initialRecords)
      setIsMarkingAttendance(true)
    }
  }

  const updateAttendanceStatus = (studentId: string, status: "present" | "absent" | "late") => {
    setAttendanceRecords((prev) =>
      prev.map((record) => (record.studentId === studentId ? { ...record, status } : record)),
    )
  }

  const submitAttendance = () => {
    const classInfo = {
      year: attendanceYear,
      section: attendanceSection,
      subject: attendanceSubject
    }
    
    onSubmitAttendance(attendanceRecords, classInfo)
    
    // Calculate attendance statistics for toast
    const totalStudents = attendanceRecords.length
    const presentCount = attendanceRecords.filter(r => r.status === "present").length
    const lateCount = attendanceRecords.filter(r => r.status === "late").length
    const absentCount = attendanceRecords.filter(r => r.status === "absent").length
    const attendancePercentage = ((presentCount + lateCount) / totalStudents * 100).toFixed(1)
    
    toast.success("Attendance submitted successfully!", {
      description: `Present: ${presentCount}, Late: ${lateCount}, Absent: ${absentCount} | Attendance: ${attendancePercentage}%`
    })
    
    setIsMarkingAttendance(false)
    setAttendanceRecords([])
    setAttendanceYear("")
    setAttendanceSection("")
    setAttendanceSubject("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Mark Attendance</h2>
        <p className="text-muted-foreground">
          Select a class and subject to mark attendance for your students.
        </p>
      </div>

      {!isMarkingAttendance ? (
        <Card>
          <CardHeader>
            <CardTitle>Select Class Details</CardTitle>
            <CardDescription>
              Choose the year, section, and subject to mark attendance for today's class.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="attendance-year">Year</Label>
                <Select value={attendanceYear} onValueChange={setAttendanceYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="attendance-section">Section</Label>
                <Select value={attendanceSection} onValueChange={setAttendanceSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="attendance-subject">Subject</Label>
                <Select value={attendanceSubject} onValueChange={setAttendanceSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {attendanceYear && attendanceSection && attendanceSubject && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">
                  Selected Class: {attendanceYear} - Section {attendanceSection} - {attendanceSubject}
                </p>
                <p className="text-sm text-muted-foreground">
                  {getStudentsForAttendance().length} students found for this class
                </p>
              </div>
            )}

            <Button
              onClick={startAttendanceMarking}
              disabled={
                !attendanceYear ||
                !attendanceSection ||
                !attendanceSubject ||
                getStudentsForAttendance().length === 0
              }
              className="w-full"
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Start Marking Attendance
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mark Attendance</CardTitle>
                <CardDescription>
                  {attendanceYear} - Section {attendanceSection} - {attendanceSubject}
                </CardDescription>
              </div>
              <Badge variant="outline">{new Date().toLocaleDateString()}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                {getStudentsForAttendance().map((student) => {
                  const record = attendanceRecords.find((r) => r.studentId === student.id)
                  return (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex flex-col">
                        <span className="font-medium">{student.name}</span>
                        <span className="text-sm text-muted-foreground">{student.usn}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <RadioGroup
                          value={record?.status || "present"}
                          onValueChange={(value) =>
                            updateAttendanceStatus(student.id, value as "present" | "absent" | "late")
                          }
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="present" id={`present-${student.id}`} />
                            <Label
                              htmlFor={`present-${student.id}`}
                              className="flex items-center gap-1 text-green-600"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Present
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="late" id={`late-${student.id}`} />
                            <Label
                              htmlFor={`late-${student.id}`}
                              className="flex items-center gap-1 text-yellow-600"
                            >
                              <Clock className="h-4 w-4" />
                              Late
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="absent" id={`absent-${student.id}`} />
                            <Label
                              htmlFor={`absent-${student.id}`}
                              className="flex items-center gap-1 text-red-600"
                            >
                              <XCircle className="h-4 w-4" />
                              Absent
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsMarkingAttendance(false)}>
                  Cancel
                </Button>
                <Button onClick={submitAttendance}>
                  <Save className="mr-2 h-4 w-4" />
                  Submit Attendance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}