import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader,  CardTitle,  CardDescription, CardContent, } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArrowLeft } from "lucide-react";



interface StudentSignupProps {
    onBack:()=>void;
    onSignup:(data: {
        usn:string;
        name:string;
        email:string;
        password:string;
        branch:string;
        year:string;
    }) => void;

}



const StudentSignup = ({ onBack, onSignup}: StudentSignupProps) => {
    const [formData, setFromData] = useState({
        usn:"",
        name:"",
        email:"",
        password:"",
        branch:"",
        year:""

    });

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        onSignup(formData)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4 bg-sky-50">
           <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <Button variant="ghost" onClick={onBack} className="w-fit p-2">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-2xl font-bold text-center">Student Signup</CardTitle>
                <CardDescription className="text-center">
                    Create your student account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="usn">USN</Label>
                        <Input
                        id="usn"
                        type="text"
                        placeholder="Enter your USN"
                        value={formData.usn}
                        onChange={(e) => setFromData({ ...formData, usn: e.target.value})}
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
                        onChange={(e) => setFromData({ ...formData, name: e.target.value})}
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
                        onChange={(e) => setFromData({ ...formData, email: e.target.value})}
                        required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                        id="password"
                        type="password"
                        placeholder="enter your password"
                        value={formData.password}
                        onChange={(e) => setFromData({...formData, password: e.target.value})}
                        required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="branch">Branch</Label>
                        <Select value={formData.branch} onValueChange={(value) => setFromData({...formData, branch:value})}>
                            <SelectTrigger>
                                <SelectValue placeholder="select your branch" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Computer Science">Computer Science</SelectItem>
                                <SelectItem value="Information Technology">Information Technology</SelectItem>
                                <SelectItem value="Electronics and Communication">Electronics and Communication</SelectItem>
                                <SelectItem value="Electrical and Electronics">Electrical and Electronics</SelectItem>
                                <SelectItem value="Mechanical">Mechanical</SelectItem>
                                <SelectItem value="Civil">Civil</SelectItem>
                                <SelectItem value="Chemical">Chemical</SelectItem>
                                <SelectItem value="Aerospace">Aerospace</SelectItem>
                                <SelectItem value="AIML">AIML</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Select value={formData.year} onValueChange={(value) => setFromData({...formData, year:value})}>
                            <SelectTrigger>
                                <SelectValue placeholder="select your year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1st Year">1st Year</SelectItem>
                                <SelectItem value="2nd Year">2nd Year</SelectItem>
                                <SelectItem value="3rd Year">3rd Year</SelectItem>
                                <SelectItem value="4th Year">4th Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full">
                        Create Student Account
                    </Button>

                </form>
            </CardContent>
           </Card> 
        </div>
    )
}
export default StudentSignup;