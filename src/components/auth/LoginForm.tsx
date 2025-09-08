import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { GraduationCap, Users, UserCheck } from "lucide-react";

interface LoginFormProps {
  selectedRole?: string;
  onLogin: (credentials: {
    email: string;
    password: string;
    role: string;
  }) => void;
}

const LoginForm = ({ onLogin, selectedRole }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(selectedRole || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && role) {
      onLogin({ email, password, role });
    }
  };

  //   const roleIcons = {
  //     student: GraduationCap,
  //     faculty: Users,
  //     hod: UserCheck,
  //   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-accent p-4 bg-sky-100">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
            <GraduationCap className="w-12 h-12 text-primary mx-auto" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-primary">
              Attendance Pro
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to manage attendance
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Student
                    </div>
                  </SelectItem>
                  <SelectItem value="faculty" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Faculty
                    </div>
                  </SelectItem>
                  <SelectItem value="hod" className="flex items-center">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      HOD
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full h-11 hover:bg-sky-600">
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={() => window.location.reload()}
            >
              Sign up here
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginForm;
