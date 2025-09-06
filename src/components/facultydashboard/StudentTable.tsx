import { useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../ui/alert-dialog";
import { type Student } from "../types/students";
import { Edit, Trash2, Mail, Phone } from "lucide-react";

interface StudentTableProps {
  students: Student[];
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  activeSection?: string;
  searchTerm?: string;
  selectedSubject?: string;
  selectedYear?: string;
}

export const StudentTable = ({
  students,
  onEditStudent,
  onDeleteStudent,
  activeSection,
  searchTerm,
  selectedSubject,
  selectedYear,
}: StudentTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (studentToDelete) {
      onDeleteStudent(studentToDelete.id);
    }
    setDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  const getSectionColor = (section: string) => {
    const colors: Record<string, string> = {
      A: "bg-blue-100 text-blue-800",
      B: "bg-green-100 text-green-800",
      C: "bg-purple-100 text-purple-800",
    };
    return colors[section] ?? "bg-gray-100 text-gray-800";
  };

  if (students.length === 0) {
    const activeCriteria: string[] = [];
    if (activeSection && activeSection !== "ALL") activeCriteria.push(`Section ${activeSection}`);
    if (searchTerm) activeCriteria.push(`Search: "${searchTerm}"`);
    if (selectedSubject) activeCriteria.push(`Subject: ${selectedSubject}`);
    if (selectedYear) activeCriteria.push(`Year: ${selectedYear}`);

    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
          {activeCriteria.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">No students match the selected criteria:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {activeCriteria.map((criteria, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {criteria}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No students have been added yet. Click "Add Student" to get started.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>USN</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden sm:table-cell">Year</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="font-mono text-sm">{student.usn}</TableCell>
                  <TableCell>
                    <Badge className={getSectionColor(student.section)}>
                      Section {student.section}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.subject}</TableCell>
                  <TableCell className="hidden sm:table-cell">{student.year}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col gap-1 max-w-[180px]">
                      {student.email && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground truncate">
                          <Mail className="h-3 w-3" />
                          <span>{student.email}</span>
                        </div>
                      )}
                      {student.phone && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{student.phone}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditStudent(student)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(student)}
                        className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {studentToDelete?.name} ({studentToDelete?.usn}) from the student list. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
