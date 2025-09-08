export interface Student {
  id: string;
  name: string;
  usn: string;
  subject: string;
  section: 'A' | 'B' | 'C';
  year: string;
  class: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentFormData {
  name: string;
  usn: string;
  subject: string;
  section: 'A' | 'B' | 'C';
  year: string;
  class: string;
  email?: string;
  phone?: string;
}

export interface ClassInfo {
  year: string;
  class: string;
  subjects: string[];
}

export interface FacultyInfo {
  id: string;
  name: string;
  department: string;
  subjects: string[];
}