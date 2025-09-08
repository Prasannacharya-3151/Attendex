import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"
import { Calendar, Download, FileBarChart, Users, TrendingUp } from "lucide-react"
import { useToast } from "../../hooks/use-toast"

interface ReportsPageProps {
  user: {
    name: string;
    id: string;
    department: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ReportsPage = ({ user }: ReportsPageProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [selectedSection, setSelectedSection] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const { toast } = useToast()

  const subjects = ["Data Structures", "Computer Networks", "Operating Systems", "Database Management"]
  const sections = ["A", "B", "C"]
  const years = ["2024", "2023", "2022"]

  // Mock attendance data
  const attendanceData = [
    { usn: "1BM21CS001", name: "Aarav Kumar", totalClasses: 45, present: 42, percentage: 93.3 },
    { usn: "1BM21CS002", name: "Bhavya Sharma", totalClasses: 45, present: 38, percentage: 84.4 },
    { usn: "1BM21CS003", name: "Chetan Raj", totalClasses: 45, present: 35, percentage: 77.8 },
    { usn: "1BM21CS004", name: "Divya Nair", totalClasses: 45, present: 44, percentage: 97.8 },
    { usn: "1BM21CS005", name: "Eshan Reddy", totalClasses: 45, present: 32, percentage: 71.1 },
  ]

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 85) return "default";
    if (percentage >= 75) return "secondary";
    return "destructive";
  };

  const handleExportReport = (type: string) => {
    toast({
      title: "Export Started",
      description: `${type} report is being generated...`,
    })
  }

  const handlePrintReport = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and view detailed attendance reports</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrintReport} variant="outline">
            <FileBarChart className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={() => handleExportReport("PDF")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>Section {section}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Across all sections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Above 85%</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98</div>
            <p className="text-xs text-muted-foreground">Students with good attendance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Below 75%</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-xs text-muted-foreground">Students needing attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Report Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Report
            {selectedSubject && <Badge variant="outline">{selectedSubject}</Badge>}
            {selectedSection && <Badge variant="outline">Section {selectedSection}</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">USN</th>
                  <th className="text-left p-2 font-medium">Student Name</th>
                  <th className="text-center p-2 font-medium">Total Classes</th>
                  <th className="text-center p-2 font-medium">Present</th>
                  <th className="text-center p-2 font-medium">Absent</th>
                  <th className="text-center p-2 font-medium">Percentage</th>
                  <th className="text-center p-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((student) => (
                  <tr key={student.usn} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-mono text-sm">{student.usn}</td>
                    <td className="p-2">{student.name}</td>
                    <td className="p-2 text-center">{student.totalClasses}</td>
                    <td className="p-2 text-center text-green-600">{student.present}</td>
                    <td className="p-2 text-center text-red-600">{student.totalClasses - student.present}</td>
                    <td className="p-2 text-center font-semibold">{student.percentage}%</td>
                    <td className="p-2 text-center">
                      <Badge variant={getAttendanceBadge(student.percentage)}>
                        {student.percentage >= 85 ? "Good" : student.percentage >= 75 ? "Average" : "Poor"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button onClick={() => handleExportReport("Excel")} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export as Excel
            </Button>
            <Button onClick={() => handleExportReport("CSV")} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </Button>
            <Button onClick={() => handleExportReport("PDF")} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export as PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}