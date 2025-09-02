import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, } from "../ui/card";


interface StudentSignupProps {
    onBack:()=>void;
    onSignup:()
}