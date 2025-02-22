"use client"
import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Eye, EyeOff, LogOut } from "lucide-react"
import Link from "next/link"
function login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
//   const [error, setError] = useState("");
const [showPassword,setshowPassword]=useState("")
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     setError("");
//     // Add your login logic here
//     console.log("Logging in with: ", email, password);
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <Card className="w-full max-w-md">

        <CardHeader className="space-y-6">
          <div className="flex justify-center">
            <div className="text-2xl font-bold">ShardaCodex</div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-4">
          <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="jhon@gmail.com" value={email} onChange={(e)=>setemail(e.target.value)} className="bg-[#f8f9fa]"/>

            <div className="relative">
            <Label htmlFor="password">Password</Label>
              <Input type= "password" name="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}className="bg-[#f8f9fa] pr-10"/>
              <button type="button"
                // onClick={togglePasswordVisibility}
                className="absolute  mt-3 right-3 top-1/2 -translate-y-1/2 "
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full   text-white">
            Sign In
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="flex justify-between w-full text-sm">
            <Link href="/forgetpassword" className="text-gray-600 hover:text-gray-800 transition-colors">
              Forgot Password?
            </Link>
            <Link href="/signup" className="text-gray-600 hover:text-gray-800 transition-colors">
              Sign Up
            </Link>
          </div>
        </CardFooter>

    </Card>
  </div>
  );
};

export default login;
