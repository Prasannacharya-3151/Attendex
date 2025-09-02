import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import {GraduationCap, Users, Shield, ArrowRight } from "lucide-react";

const LandingPage: React.FC = () => {
//   const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleGetStarted = () => {
    if (!selectedRole) {
      alert("Please select a role first!");
      return;
    }
   
    // navigate(`/signup?role=${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Attendance Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline attendance tracking for students, faculty, and administrators
          </p>
        </div>

       
        <div className="grid md:grid-cols-3 gap-6 mb-8">
         
          <Card
            className={`hover:shadow-lg transition-shadow cursor-pointer ${
              selectedRole === "student" ? "border-primary" : ""
            }`}
            onClick={() => handleRoleSelect("student")}
          >
            <CardHeader className="text-center">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Students</CardTitle>
              <CardDescription>
                View your attendance records and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Student Login
              </Button>
            </CardContent>
          </Card>

     
          <Card
            className={`hover:shadow-lg transition-shadow cursor-pointer ${
              selectedRole === "faculty" ? "border-primary" : ""
            }`}
            onClick={() => handleRoleSelect("faculty")}
          >
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Faculty</CardTitle>
              <CardDescription>
                Mark attendance and manage your classes efficiently
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Faculty Login
              </Button>
            </CardContent>
          </Card>

        
          <Card
            className={`hover:shadow-lg transition-shadow cursor-pointer ${
              selectedRole === "hod" ? "border-primary" : ""
            }`}
            onClick={() => handleRoleSelect("hod")}
          >
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Admin/HOD</CardTitle>
              <CardDescription>
                Monitor department attendance and generate reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Admin Login
              </Button>
            </CardContent>
          </Card>
        </div>

       
        <div className="text-center">
          <Button onClick={handleGetStarted} size="lg" className="px-8">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
