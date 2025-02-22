
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";


function signup() {
  // const { toast } = useToast()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    

//     try {
//       const res = await axios.post('http://localhost:3010/api/auth/signup', {
//         name: name,
//         email: email,
//         password: password,
//         confirmPassword: confirmPassword,
//       });
//       if (res.data.status === "success") {
//         dispatch(userLoggedInDetails(res.data.user));
//         router.push("/login");
//       }
//       if (res.data) {
//         toast({
//           title: "Account Created!",
//         });
//       }
//     } catch (err) {
//       console.log("err: ", err);
//       toast({
//         title: err.response?.data?.message || "Something went wrong",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)} className="bg-[#f8f9fa]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} className="bg-[#f8f9fa]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} className="bg-[#f8f9fa]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} className="bg-[#f8f9fa]"
              />
            </div>
            <Button className="w-full">
              Create an account
              {/* {loading && (
                <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
              )} */}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* <ToastContainer />s */}
    </div>
  )
}

export default signup



