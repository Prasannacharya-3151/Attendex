import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Plus, Pencil, Trash2, Users, Search, Loader2 } from "lucide-react";

interface StudentManagementProps {
  faculty: { id: string; name: string; department?: string };
  subjects: { code: string; label: string }[];
  sections: string[];
}

interface Student {
  _id?: string;
  facultyId: string;
  name: string;
  usn: string;
  email: string;
  subject: string;
  section: string;
  year: string;
  department: string;
}

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    _id: "1",
    facultyId: "fac123",
    name: "John Doe",
    usn: "USN001",
    email: "john@example.com",
    subject: "CS101",
    section: "A",
    year: "2023",
    department: "Computer Science"
  },
  {
    _id: "2",
    facultyId: "fac123",
    name: "Jane Smith",
    usn: "USN002",
    email: "jane@example.com",
    subject: "CS101",
    section: "A",
    year: "2023",
    department: "Computer Science"
  },
  {
    _id: "3",
    facultyId: "fac123",
    name: "Bob Johnson",
    usn: "USN003",
    email: "bob@example.com",
    subject: "CS201",
    section: "B",
    year: "2023",
    department: "Information Technology"
  }
];

// Mock API functions
const listStudents = async ({ facultyId, subject, section, search }:any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredStudents = mockStudents.filter(student => 
    student.facultyId === facultyId &&
    student.subject === subject &&
    student.section === section
  );
  
  if (search) {
    filteredStudents = filteredStudents.filter(student =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.usn.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return { success: true, data: filteredStudents };
};

const createStudent = async (student: Student) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newStudent = { ...student, _id: Date.now().toString() };
  mockStudents.push(newStudent);
  return { success: true, data: newStudent };
};

const updateStudent = async (id: string, student: Student) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockStudents.findIndex(s => s._id === id);
  if (index !== -1) {
    mockStudents[index] = { ...student, _id: id };
  }
  return { success: true };
};

const deleteStudent = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockStudents.findIndex(s => s._id === id);
  if (index !== -1) {
    mockStudents.splice(index, 1);
  }
  return { success: true };
};

const emptyForm: Student = {
  facultyId: "",
  name: "",
  usn: "",
  email: "",
  subject: "",
  section: "",
  year: "",
  department: "",
};

const StudentManagement = ({ faculty, subjects, sections }: StudentManagementProps) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<Student>({ ...emptyForm, facultyId: faculty.id });
  const [editingId, setEditingId] = useState<string | null>(null);

  const canQuery = useMemo(() => !!faculty.id && !!selectedSubject && !!selectedSection, [faculty.id, selectedSubject, selectedSection]);

  async function load() {
    if (!canQuery) return;
    setLoading(true);
    const res = await listStudents({ facultyId: faculty.id, subject: selectedSubject, section: selectedSection, search });
    if (res.success) setStudents(res.data);
    else setStudents([]);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubject, selectedSection, search]);

  const onNew = () => {
    setEditingId(null);
    setForm({ 
      ...emptyForm, 
      facultyId: faculty.id, 
      subject: selectedSubject, 
      section: selectedSection, 
      department: faculty.department || "",
      year: new Date().getFullYear().toString()
    });
    setOpenDialog(true);
  };

  const onEdit = (s: Student) => {
    setEditingId(s._id!);
    setForm({ ...s });
    setOpenDialog(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this student?")) return;
    const res = await deleteStudent(id);
    if (res.success) load();
    else alert("Delete failed");
  };

  const onSubmit = async () => {
    if (!form.name || !form.usn || !form.subject || !form.section) {
      alert("Name, USN, Subject and Section are required.");
      return;
    }
    if (editingId) {
      const res = await updateStudent(editingId, form);
      if (!res.success) return alert("Update failed");
    } else {
      const res = await createStudent(form);
      if (!res.success) return alert("Create failed");
    }
    setOpenDialog(false);
    load();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-7 h-7 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">Student Management</h1>
              <p className="text-sm text-muted-foreground">Set up your class roster</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{faculty.name}</p>
            {faculty.department && <p className="text-sm text-muted-foreground">{faculty.department}</p>}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-lg">Subject</CardTitle></CardHeader>
            <CardContent>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(s => (
                    <SelectItem key={s.code} value={s.code}>{s.label} ({s.code})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-lg">Section</CardTitle></CardHeader>
            <CardContent>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(sec => (
                    <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-3"><CardTitle className="text-lg">Search Students</CardTitle></CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or USN..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Students {selectedSubject && selectedSection && `- ${selectedSubject} (${selectedSection})`}
          </h2>
          <Button onClick={onNew} disabled={!canQuery}>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>

        {!canQuery ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Please select a subject and section to view students</p>
              </div>
            </CardContent>
          </Card>
        ) : loading ? (
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            </CardContent>
          </Card>
        ) : students.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No students found for the selected criteria</p>
                <Button onClick={onNew} className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Student
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <Card key={student._id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>{student.usn}</CardDescription>
                    </div>
                    <Badge variant="secondary">{student.section}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm">{student.email || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Year:</span>
                      <span className="text-sm">{student.year || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Department:</span>
                      <span className="text-sm">{student.department || "N/A"}</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => onEdit(student)}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(student._id!)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Student" : "Add New Student"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usn">USN *</Label>
                  <Input
                    id="usn"
                    value={form.usn}
                    onChange={(e) => setForm({ ...form, usn: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={form.subject} onValueChange={(value) => setForm({ ...form, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(s => (
                        <SelectItem key={s.code} value={s.code}>{s.label} ({s.code})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section *</Label>
                  <Select value={form.section} onValueChange={(value) => setForm({ ...form, section: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map(sec => (
                        <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    min="2000"
                    max="2100"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button onClick={onSubmit}>
                {editingId ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default StudentManagement;