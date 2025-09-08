import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { FileSpreadsheet, CalendarDays, User, BookOpenCheck } from "lucide-react"
import { type Student } from "../types/attendance"

interface ReportsProps {
  students: Student[]
}

export function ReportsRefactored({ students }: ReportsProps) {
  const [reportType, setReportType] = useState("")
  const [reportYear, setReportYear] = useState("")
  const [reportSection, setReportSection] = useState("")
  const [reportSubject, setReportSubject] = useState("")
  const [reportDate, setReportDate] = useState("")
  const [reportStudent, setReportStudent] = useState("")

  const generateDailyReport = () => {
    if (!reportDate || !reportYear || !reportSection || !reportSubject) {
      alert("Please fill in all required fields for daily report")
      return
    }

    const reportData = students.filter(
      (student) =>
        student.year === reportYear && student.section === reportSection && student.subject === reportSubject,
    )

    console.log("[v0] Generating daily report for:", { reportDate, reportYear, reportSection, reportSubject })
    console.log("[v0] Report data:", reportData)

    // Simulate PDF generation
    alert(
      `Daily Report generated for ${reportDate}\n${reportYear} - Section ${reportSection} - ${reportSubject}\n${reportData.length} students included`,
    )
  }

  const generateStudentReport = () => {
    if (!reportStudent) {
      alert("Please select a student for the report")
      return
    }

    const studentData = students.filter((student) => student.usn === reportStudent)

    console.log("[v0] Generating student-wise report for:", reportStudent)
    console.log("[v0] Student data:", studentData)

    // Simulate PDF generation
    const student = studentData[0]
    if (student) {
      alert(
        `Student Report generated for ${student.name} (${student.usn})\nAttendance: ${student.attendancePercentage.toFixed(1)}%\nClasses: ${student.presentClasses}/${student.totalClasses}`,
      )
    }
  }

  const generateSubjectReport = () => {
    if (!reportSubject || !reportYear || !reportSection) {
      alert("Please fill in all required fields for subject report")
      return
    }

    const reportData = students.filter(
      (student) =>
        student.year === reportYear && student.section === reportSection && student.subject === reportSubject,
    )

    console.log("[v0] Generating subject-wise report for:", { reportSubject, reportYear, reportSection })
    console.log("[v0] Report data:", reportData)

    const avgAttendance = reportData.reduce((sum, student) => sum + student.attendancePercentage, 0) / reportData.length

    // Simulate PDF generation
    alert(
      `Subject Report generated for ${reportSubject}\n${reportYear} - Section ${reportSection}\n${reportData.length} students\nAverage Attendance: ${avgAttendance.toFixed(1)}%`,
    )
  }

  const exportToExcel = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let reportData: string | any[] = []

    if (reportType === "daily" && reportDate && reportYear && reportSection && reportSubject) {
      reportData = students.filter(
        (student) =>
          student.year === reportYear && student.section === reportSection && student.subject === reportSubject,
      )
    } else if (reportType === "student" && reportStudent) {
      reportData = students.filter((student) => student.usn === reportStudent)
    } else if (reportType === "subject" && reportSubject && reportYear && reportSection) {
      reportData = students.filter(
        (student) =>
          student.year === reportYear && student.section === reportSection && student.subject === reportSubject,
      )
    }

    console.log("[v0] Exporting to Excel:", reportData)

    // Simulate Excel export
    alert(`Excel file exported with ${reportData.length} records`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Reports</h2>
        <p className="text-muted-foreground">
          Generate and export attendance reports for analysis and record-keeping.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Select report type and configure parameters to generate detailed reports.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Report Type</Label>
            <RadioGroup value={reportType} onValueChange={setReportType} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily" className="flex items-center gap-2 cursor-pointer">
                  <CalendarDays className="h-4 w-4" />
                  Daily Report
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Student-wise Report
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="subject" id="subject" />
                <Label htmlFor="subject" className="flex items-center gap-2 cursor-pointer">
                  <BookOpenCheck className="h-4 w-4" />
                  Subject-wise Report
                </Label>
              </div>
            </RadioGroup>
          </div>

          {reportType === "daily" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="report-date">Date</Label>
                <Input
                  id="report-date"
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="report-year">Year</Label>
                <Select value={reportYear} onValueChange={setReportYear}>
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
                <Label htmlFor="report-section">Section</Label>
                <Select value={reportSection} onValueChange={setReportSection}>
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
                <Label htmlFor="report-subject">Subject</Label>
                <Select value={reportSubject} onValueChange={setReportSubject}>
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
          )}

          {reportType === "student" && (
            <div className="grid gap-2">
              <Label htmlFor="report-student">Student</Label>
              <Select value={reportStudent} onValueChange={setReportStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.usn}>
                      {student.name} ({student.usn})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {reportType === "subject" && (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="subject-report-year">Year</Label>
                <Select value={reportYear} onValueChange={setReportYear}>
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
                <Label htmlFor="subject-report-section">Section</Label>
                <Select value={reportSection} onValueChange={setReportSection}>
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
                <Label htmlFor="subject-report-subject">Subject</Label>
                <Select value={reportSubject} onValueChange={setReportSubject}>
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
          )}

          <div className="flex gap-2 pt-4 border-t">
            {reportType === "daily" && (
              <Button onClick={generateDailyReport} disabled={!reportDate || !reportYear || !reportSection || !reportSubject}>
                Generate Daily Report
              </Button>
            )}
            {reportType === "student" && (
              <Button onClick={generateStudentReport} disabled={!reportStudent}>
                Generate Student Report
              </Button>
            )}
            {reportType === "subject" && (
              <Button onClick={generateSubjectReport} disabled={!reportSubject || !reportYear || !reportSection}>
                Generate Subject Report
              </Button>
            )}
            <Button variant="outline" onClick={exportToExcel} disabled={!reportType}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export to Excel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}