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
import Link from "next/link"
import axios from "axios";
import { useRouter } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, LogOut } from "lucide-react"
function login() {
  const router = useRouter();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword,setshowPassword]=useState("")
  const[loading,setLoading]=useState(false)

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (email.length === 0 || password.length === 0) {
        // toast({ title: "Please fill all fields" });
        // toast("Please fill all fields");
        console.log("Please fill all fields")
      }
      const res = await axios.post(`http://localhost:3010/api/auth/login`, {
        email: email,
        password: password,
      },{withCredentials:true});
      if (res.data.status === "success") {
        // dispatch(userLoggedInDetails(res.data));
        // setTimeout(() => {
          router.push("/"); // Redirect after showing the toast
        // }, 1500);
      }
    } catch (err) {
      console.log("err: ", err);
      // toast.error("Invalid credentials");
      // toast({ title: "Invalid credentials", variant: 'destructive' });
      console.log("Invalid credentials")
    } finally {
      setLoading(false);
    }

  };


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

          <Button type="submit" onClick={onSubmit} className="w-full   text-white">
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
