import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, } from "../ui/card";
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
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
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
                        <input
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
                        <input
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
                        <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFromData({ ...formData, email: e.target.value})}
                        required
                        />
                    </div>


                    
                </form>
            </CardContent>
           </Card> 
        </div>
    )
}
export default StudentSignup;