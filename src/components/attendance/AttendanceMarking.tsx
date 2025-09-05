import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Checkbox } from "../ui/checkbox";
import { type Student } from "../types/students";
import { useToast } from "../../hooks/use-toast";
import { Calendar, Users, BookOpen, Save, RotateCcw } from "lucide-react";

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late';
  date: string;
  subject: string;
  section: string;
}

interface AttendanceMarkingProps {
  students: Student[];
  subjects: string[];
  onAttendanceSubmit: (attendance: AttendanceRecord[]) => void;
}

export const AttendanceMarking = ({
  students,
  subjects,
  onAttendanceSubmit,
}: AttendanceMarkingProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<'A' | 'B' | 'C' | 'ALL'>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
  const { toast } = useToast();

  // Filter students by section and subject
  const filteredStudents = useMemo(() => {
    let filtered = students;

    if (selectedSection !== 'ALL') {
      filtered = filtered.filter(student => student.section === selectedSection);
    }

    if (selectedSubject) {
      filtered = filtered.filter(student => student.subject === selectedSubject);
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [students, selectedSection, selectedSubject]);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleBulkAction = (action: 'present' | 'absent' | 'reset') => {
    if (action === 'reset') {
      setAttendance({});
    } else {
      const bulkAttendance: Record<string, 'present' | 'absent' | 'late'> = {};
      filteredStudents.forEach(student => {
        bulkAttendance[student.id] = action;
      });
      setAttendance(bulkAttendance);
    }
  };

  const handleSubmit = () => {
    if (!selectedSubject) {
      toast({
        title: "Subject Required",
        description: "Please select a subject before submitting attendance.",
        variant: "destructive",
      });
      return;
    }

    const attendanceRecords: AttendanceRecord[] = filteredStudents.map(student => ({
      studentId: student.id,
      status: attendance[student.id] || 'absent',
      date: selectedDate,
      subject: selectedSubject,
      section: student.section,
    }));

    onAttendanceSubmit(attendanceRecords);

    const presentCount = attendanceRecords.filter(record => record.status === 'present').length;
    const totalCount = attendanceRecords.length;

    toast({
      title: "Attendance Submitted",
      description: `Attendance recorded for ${presentCount}/${totalCount} students in ${selectedSubject}.`,
    });

    // Reset attendance after submission
    setAttendance({});
  };

  const getStatusCounts = () => {
    const present = filteredStudents.filter(student => attendance[student.id] === 'present').length;
    const absent = filteredStudents.filter(student => attendance[student.id] === 'absent').length;
    const late = filteredStudents.filter(student => attendance[student.id] === 'late').length;
    const notMarked = filteredStudents.length - present - absent - late;

    return { present, absent, late, notMarked };
  };

  const statusCounts = getStatusCounts();

  const getStatusBadgeColor = (status: 'present' | 'absent' | 'late') => {
    const colors = {
      present: "bg-green-100 text-green-800 hover:bg-green-200",
      absent: "bg-red-100 text-red-800 hover:bg-red-200",
      late: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mark Attendance</h1>
          <p className="text-muted-foreground">Record student attendance for your classes</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(selectedDate).toLocaleDateString()}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Class Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Section</label>
              <Select
                value={selectedSection}
                onValueChange={(value: 'A' | 'B' | 'C' | 'ALL') => setSelectedSection(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Sections</SelectItem>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Actions</label>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction('present')}
                  className="text-xs"
                >
                  All Present
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction('reset')}
                  className="text-xs"
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{filteredStudents.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.present}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.absent}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Late</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.late}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Not Marked</p>
                <p className="text-2xl font-bold text-gray-600">{statusCounts.notMarked}</p>
              </div>
              <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      {filteredStudents.length > 0 ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Students - {selectedSection !== 'ALL' ? `Section ${selectedSection}` : 'All Sections'}</CardTitle>
              <Badge variant="outline">{filteredStudents.length} students</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.usn} • Section {student.section}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={attendance[student.id] === 'present' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(student.id, 'present')}
                      className={attendance[student.id] === 'present' ? getStatusBadgeColor('present') : ''}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={attendance[student.id] === 'late' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(student.id, 'late')}
                      className={attendance[student.id] === 'late' ? getStatusBadgeColor('late') : ''}
                    >
                      Late
                    </Button>
                    <Button
                      size="sm"
                      variant={attendance[student.id] === 'absent' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(student.id, 'absent')}
                      className={attendance[student.id] === 'absent' ? getStatusBadgeColor('absent') : ''}
                    >
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredStudents.length > 0 && (
              <div className="flex justify-end mt-6">
                <Button onClick={handleSubmit} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Submit Attendance
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              {!selectedSubject
                ? "Please select a subject to view students"
                : "No students found for the selected criteria"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendanceMarking;