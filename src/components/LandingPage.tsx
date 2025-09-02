import {Button} from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, User, Shield, ArrowRight } from "lucide-react";

interface LandingPageProps {
    onRoleSelect: (role: string) => void;
    onGetStarted: () => void;
}

const LandingPage = (
    {onRoleSelect, onGetStarted}: LandingPageProps) =>{
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-cenetr justify-center p-4">
                <div className="w-full max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-primary mb-4">
                            Attendance Management System
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Streamiline attendance tracking and management with our intuitive system.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onRoleSelect("student")}>
                            <CardHeader className="text-center">
                                <GraduationCap className="w-12 h-12 text-primary m-auto mb-4" />
                                <CardTitle>Student</CardTitle>
                                <CardDescription>
                                    Access your attendance records and manage your profile.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="outline" className="w-full">
                                    Student Login
                                </Button>
                            </CardContent>
                        </Card>
                        
                        <Card className="hover:shadow-lg trasition "
                    </div>
                </div>
            </div>
        )
    }


export default LandingPage;