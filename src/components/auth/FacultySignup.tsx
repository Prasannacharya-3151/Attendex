import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader,  CardTitle,  CardDescription, CardContent, } from "../ui/card";
import { Input } from "../ui/input";;
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft } from "lucide-react";

interface FacultySignupProps {
    onBack:()=>void;
    onSignup:(data:{
        facultyId:string;
        name:string;
        email:string;
        password:string;
        department:string;
    })=> void;
}

const FacultySignup = ({onBack, onSignup}:FacultySignupProps)=>{
    const [formData, setFormData] = useState({
        facultyId:"",
        name:"",
        email:"",
        password:"",
        department:""
    });

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        onSignup(formData);
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4 bg-sky-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <Button variant="ghost" onClick={onBack} className="w-fit p-3 rounded-full hover:bg-sky-100">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle className="text-2xl font-bold text-center">Faculty Signup</CardTitle>
                    <CardDescription className="text-center">
                        Create your faculty account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="facultyId">Faculty ID</Label>
                            <Input
                            id="facultyId"
                            type="text"
                            placeholder="facultyid like a FA12345"
                            value={formData.facultyId}
                            onChange={(e) => setFormData({... formData, facultyId: e.target.value})} 
                            required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({... formData, name: e.target. value})}
                            required
                            />

                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({... formData, email:e.target.value})}
                            required
                            />
                        </div> 

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({... formData, password: e.target.value})}
                            required 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="departement">Department</Label>
                            <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value })} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="computer Science">Computer Science</SelectItem>
                                    <SelectItem value="Information Science">Information Science</SelectItem>
                                    <SelectItem value="Electronics and Communication">Electronics and Communication</SelectItem>
                                    <SelectItem value="Electrical and Electronics">Electrical and Electronics</SelectItem>
                                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                                    <SelectItem value="Civil">Civil</SelectItem>
                                    <SelectItem value="AIML">AIML</SelectItem>
                                    <SelectItem value="Agricultural Engineering">Agricultural Engineering</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="w-full">
                            Create Faculty Account 
                        </Button>


                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default FacultySignup;