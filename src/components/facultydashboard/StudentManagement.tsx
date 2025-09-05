import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { StudentForm } from "./StudentForm";
import { StudentTable } from "./StudentTable";
import { SectionTabs } from "./SectionTabs";
import { type Student, type StudentFormData, type ClassInfo, type FacultyInfo } from "../types/students";
import { useToast } from "../../hooks/use-toast";
import { Search, Plus, Users, BookOpen } from "lucide-react";

interface StudentManagementProps {
  faculty: FacultyInfo;
  classInfo: ClassInfo;
}

const generateMockStudents = (): Student[] => {
  const sections: ("A" | "B" | "C")[] = ["A", "B", "C"];
  const subjects = ["Mathematics", "Physics", "Chemistry", "Computer Science"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const students: Student[] = [];

  sections.forEach((section) => {
    for (let i = 1; i <= 15; i++) {
      const student: Student = {
        id: `${section}-${i}`,
        name: `Student ${section}${i.toString().padStart(2, "0")}`,
        usn: `1MS21CS${section}${i.toString().padStart(2, "0")}`,
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        section,
        year: years[Math.floor(Math.random() * years.length)],
        class: "BE Computer Science",
        email: `student${section.toLowerCase()}${i}@college.edu`,
        phone: `987654${section.charCodeAt(0)}${i.toString().padStart(2, "0")}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      students.push(student);
    }
  });

  return students;
};

export const StudentManagement = ({ faculty, classInfo }: StudentManagementProps) => {
  const [students, setStudents] = useState<Student[]>(generateMockStudents());
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState<"A" | "B" | "C" | "ALL">("ALL");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const filteredStudents = useMemo(() => {
    let filtered = students;
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.usn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeSection !== "ALL") {
      filtered = filtered.filter((s) => s.section === activeSection);
    }
    return filtered;
  }, [students, searchTerm, activeSection]);

  const sectionCounts = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0, ALL: students.length };
    students.forEach((s) => {
      counts[s.section as "A" | "B" | "C"]++;
    });
    return counts;
  }, [students]);

  const createStudent = (data: StudentFormData) => {
    const newStudent: Student = {
      id: `${data.section}-${Date.now()}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStudents((prev) => [...prev, newStudent]);
    toast({ title: "Student Added", description: `${newStudent.name} has been added to section ${newStudent.section}.` });
  };

  const updateStudent = (data: StudentFormData) => {
    if (!editingStudent) return;
    const updated: Student = { ...editingStudent, ...data, updatedAt: new Date() };
    setStudents((prev) => prev.map((s) => (s.id === editingStudent.id ? updated : s)));
    toast({ title: "Student Updated", description: `${updated.name}'s information has been updated.` });
  };

  const deleteStudent = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    toast({ title: "Student Removed", description: `${student.name} has been removed from the class.`, variant: "destructive" });
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: StudentFormData) => {
    if (editingStudent) updateStudent(data);
    else createStudent(data);
    setIsFormOpen(false);
    setEditingStudent(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">
            Manage students for {classInfo.class} - {classInfo.year}
          </p>
        </div>
        <Button onClick={handleAddStudent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{students.length}</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section A</CardTitle>
            <Badge variant="secondary">A</Badge>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{sectionCounts.A}</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section B</CardTitle>
            <Badge variant="secondary">B</Badge>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{sectionCounts.B}</div></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Section C</CardTitle>
            <Badge variant="secondary">C</Badge>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{sectionCounts.C}</div></CardContent>
        </Card>
      </div>

      {/* Search + Section filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or USN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <SectionTabs activeSection={activeSection} onSectionChange={setActiveSection} sectionCounts={sectionCounts} />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>Students {activeSection !== "ALL" && `- Section ${activeSection}`}</CardTitle>
            </div>
            <Badge variant="outline">
              {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <StudentTable
            students={filteredStudents}
            onEditStudent={handleEditStudent}
            onDeleteStudent={deleteStudent}
            activeSection={activeSection}
            searchTerm={searchTerm}
          />
        </CardContent>
      </Card>

      {/* Form */}
      <StudentForm
        isOpen={isFormOpen}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        editingStudent={editingStudent}
        classInfo={classInfo}
        facultySubjects={faculty.subjects}
      />
    </div>
  );
};
