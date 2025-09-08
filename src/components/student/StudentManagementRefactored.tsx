import { useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import type { Student, NewStudent } from "../types/attendance"

interface StudentManagementProps {
  students: Student[]
  onAddStudent: (student: NewStudent) => void
  onUpdateStudent: (id: string, student: NewStudent) => void
  onDeleteStudent: (id: string) => void
}

export function StudentManagementRefactored({ 
  students, 
  onAddStudent, 
  onUpdateStudent, 
  onDeleteStudent 
}: StudentManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedSection, setSelectedSection] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [newStudent, setNewStudent] = useState<NewStudent>({
    name: "",
    usn: "",
    year: "",
    section: "",
    subject: "",
  })

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.usn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === "all" || student.year === selectedYear
    const matchesSection = selectedSection === "all" || student.section === selectedSection
    return matchesSearch && matchesYear && matchesSection
  })

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.usn && newStudent.year && newStudent.section && newStudent.subject) {
      onAddStudent(newStudent)
      setNewStudent({ name: "", usn: "", year: "", section: "", subject: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setNewStudent({
      name: student.name,
      usn: student.usn,
      year: student.year,
      section: student.section,
      subject: student.subject,
    })
  }

  const handleUpdateStudent = () => {
    if (
      editingStudent &&
      newStudent.name &&
      newStudent.usn &&
      newStudent.year &&
      newStudent.section &&
      newStudent.subject
    ) {
      onUpdateStudent(editingStudent.id, newStudent)
      setEditingStudent(null)
      setNewStudent({ name: "", usn: "", year: "", section: "", subject: "" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Student Management</h2>
          <p className="text-muted-foreground">
            Manage your students across different years, sections, and subjects.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter the student details to add them to your class.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Student Name</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Enter student name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="usn">USN</Label>
                <Input
                  id="usn"
                  value={newStudent.usn}
                  onChange={(e) => setNewStudent({ ...newStudent, usn: e.target.value })}
                  placeholder="Enter USN (e.g., 1MS21CS001)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Select
                  value={newStudent.year}
                  onValueChange={(value) => setNewStudent({ ...newStudent, year: value })}
                >
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
                <Label htmlFor="section">Section</Label>
                <Select
                  value={newStudent.section}
                  onValueChange={(value) => setNewStudent({ ...newStudent, section: value })}
                >
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
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={newStudent.subject}
                  onValueChange={(value) => setNewStudent({ ...newStudent, subject: value })}
                >
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or USN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1st Year">1st Year</SelectItem>
                  <SelectItem value="2nd Year">2nd Year</SelectItem>
                  <SelectItem value="3rd Year">3rd Year</SelectItem>
                  <SelectItem value="4th Year">4th Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>USN</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.usn}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.section}</Badge>
                  </TableCell>
                  <TableCell>{student.subject}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={`font-medium ${getAttendanceColor(student.attendancePercentage)}`}>
                        {student.attendancePercentage.toFixed(1)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {student.presentClasses}/{student.totalClasses} classes
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleEditStudent(student)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Student</DialogTitle>
                            <DialogDescription>Update the student information.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-name">Student Name</Label>
                              <Input
                                id="edit-name"
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-usn">USN</Label>
                              <Input
                                id="edit-usn"
                                value={newStudent.usn}
                                onChange={(e) => setNewStudent({ ...newStudent, usn: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-year">Year</Label>
                              <Select
                                value={newStudent.year}
                                onValueChange={(value) => setNewStudent({ ...newStudent, year: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
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
                              <Label htmlFor="edit-section">Section</Label>
                              <Select
                                value={newStudent.section}
                                onValueChange={(value) => setNewStudent({ ...newStudent, section: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="A">Section A</SelectItem>
                                  <SelectItem value="B">Section B</SelectItem>
                                  <SelectItem value="C">Section C</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-subject">Subject</Label>
                              <Select
                                value={newStudent.subject}
                                onValueChange={(value) => setNewStudent({ ...newStudent, subject: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
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
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingStudent(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleUpdateStudent}>Update Student</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteStudent(student.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}