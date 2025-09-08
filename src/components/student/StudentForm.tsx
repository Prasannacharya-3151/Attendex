import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Student, StudentFormData, ClassInfo } from "../types/student";
import { useToast } from "../../hooks/use-toast";

interface StudentFormProps {
  isOpen: boolean;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
  editingStudent: Student | null;
  classInfo: ClassInfo;
  facultySubjects: string[];
}

export const StudentForm = ({
  isOpen,
  onSubmit,
  onCancel,
  editingStudent,
  classInfo,
  facultySubjects,
}: StudentFormProps) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    usn: "",
    subject: "",
    section: "A",
    year: classInfo.year,
    class: classInfo.class,
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<StudentFormData>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        usn: editingStudent.usn,
        subject: editingStudent.subject,
        section: editingStudent.section,
        year: editingStudent.year,
        class: editingStudent.class,
        email: editingStudent.email || "",
        phone: editingStudent.phone || "",
      });
    } else {
      setFormData({
        name: "",
        usn: "",
        subject: "",
        section: "A",
        year: classInfo.year,
        class: classInfo.class,
        email: "",
        phone: "",
      });
    }
    setErrors({});
  }, [editingStudent, isOpen, classInfo]);

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.usn.trim()) {
      newErrors.usn = "USN is required";
    } else if (!/^[0-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/.test(formData.usn.toUpperCase())) {
      newErrors.usn = "USN format should be like 1MS21CS001";
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number should be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      ...formData,
      usn: formData.usn.toUpperCase(),
    });
  };

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingStudent ? "Edit Student" : "Add New Student"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter student name"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="usn">USN *</Label>
              <Input
                id="usn"
                value={formData.usn}
                onChange={(e) => handleInputChange("usn", e.target.value)}
                placeholder="1MS21CS001"
                className="uppercase"
              />
              {errors.usn && <p className="text-sm text-destructive">{errors.usn}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => handleInputChange("subject", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {facultySubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section *</Label>
              <Select
                value={formData.section}
                onValueChange={(value: 'A' | 'B' | 'C') => handleInputChange("section", value)}
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                placeholder="1st Year"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Input
                id="class"
                value={formData.class}
                onChange={(e) => handleInputChange("class", e.target.value)}
                placeholder="BE Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="student@college.edu"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="9876543210"
                maxLength={10}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {editingStudent ? "Update Student" : "Add Student"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};