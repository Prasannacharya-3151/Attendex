import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader,  CardTitle,  CardDescription, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft, Shield } from "lucide-react";


interface AdminSignupProps {
    onBack:()=> void;
    onSignup:(data: {
        name:string;
        email:string;
        password:string;
        branch: string;
    }) => void;
}

const AdminSignup = ({onBack, onSignup }: AdminSignupProps) => {
    const [formData, setFormData ] = useState({
        name:"",
        email:"",
        password:"",
        branch:""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignup(formData)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-cenetr justify-center p-4 ">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                <Button variant="ghost" onClick={onBack} className="w-fit p-2">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center justify-center mb-2">
                    <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-center">Admin Signup</CardTitle>
                <CardDescription className="items-center">
                    Create your Admin account
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full name</Label>
                            <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                            id="email"
                            type="email"
                            placeholder="Enter your emali"
                            value={formData.email}
                            onChange={(e) => setFormData({... formData, email: e.target.value})}
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
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Select value={formData.branch} onValueChange={(value)=> setFormData({... formData, branch:value})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your branch"/>
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


                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <p className="text-sm text-amber-800">
                                <strong>Note:</strong> Admin accounts require approval and are typically restricted to HOD creation only.
                            </p>
                        </div>

                        <Button type="submit" className="w-full">
                            Create Admin Account
                        </Button>
                    </form>
                </CardContent>


            </Card>
        </div>
    )
}
export default AdminSignup