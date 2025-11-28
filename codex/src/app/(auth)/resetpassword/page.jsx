// "use client";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter
// } from "@/components/ui/card";
// import { useParams } from 'next/navigation'
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// // import { useToast } from "@/components/Ui/use-toast";
// import { useRouter } from "next/navigation";
// import { LucideLoader2 } from "lucide-react";
// import axios from "axios";

// function resetpassword() {

//     // const { toast } = useToast();
//   const router = useRouter();
//   const params = useParams()
//   // const { userId } = router.query;
//   const {userId}=params
    
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//     const [isOtpSent, setIsOtpSent] = useState(false); // Flag to determine if OTP is sent
  
    
//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//   console.log(userId)
  
//     if (
//       password.length === 0 ||
//       confirmPassword.length === 0 ||
//       otp.length == 0
//     ) {
//       // toast({ title: "Please fill all fields" });
//       setMessage("Please fill all fields")
//       setLoading(false);
//       return;
//     }
//     if (password !== confirmPassword) {
//       // toast({ title: "New password and Confirm password do not match" });
//       setMessage("New password and Confirm password do not match")
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.patch(`http://localhost:3010/api/auth/resetpassword/${userId}`, 
//       {  password,confirmPassword,otp},{
//         withCredentials:true
//       }
//       );
// console.log(res)
//       if (res.data.status =="sucess ") {
//         // toast({ title: "Password reset successfully!" });
//         setMessage("Password reset successfully!" )
//         router.push("/login");
//       } else {
//         // toast({ title: "Failed to reset password. Try Again" });
//         setMessage("Failed to reset password. Try Again")
//       }
//     } catch (err) {
//       console.log(err)
//       // if (err.data.message === "otp is not found or wrong") {
//       //   // toast({ title: "Invalid OTP" });
//       //   setMessage("Invalid OTP")
//       // } else {
//         // toast({ title: "Error resetting password" });
//         setMessage("Error resetting password:")
//         console.error("Error resetting password:", err);
//       // }
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="h-screen flex items-center justify-center">
//   <Card className="w-full max-w-sm">
//     <CardHeader>
//       <CardTitle className="text-xl">
//         Reset Password
//       </CardTitle>
//       <CardDescription>
//         Enter the OTP and new password details below to reset your password.
//       </CardDescription>
//     </CardHeader>
//     <CardContent className="grid gap-4">
//       {/* OTP Field */}
//       <div className="grid gap-2">
//         <Label htmlFor="otp">Enter OTP</Label>
//         <Input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//         />
//       </div>

//       {/* New Password Field */}
//       <div className="grid gap-2">
//         <Label htmlFor="password">New Password</Label>
//         <Input
//           type="password"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>

//       {/* Confirm New Password Field */}
//       <div className="grid gap-2">
//         <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
//         <Input
//           type="password"
//           placeholder="Confirm new password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//       </div>
//     </CardContent>
//     <CardFooter className="flex justify-end mt-4">
//       <Button type="submit" onClick={handleResetPassword}>
//         Submit
//         {loading && (
//           <LucideLoader2 className="animate-spin ml-2 w-4 h-4" />
//         )}
//       </Button>
//     </CardFooter>
//     {message && <p className="text-center mt-2">{message}</p>}
//   </Card>
//     </div>
//   )
// }

// export default resetpassword
"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { LucideLoader2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function resetpassword() {
  const router = useRouter();
  const params = useParams();
  const { userId } = params;

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp || !password || !confirmPassword) {
      setMessage("Please fill all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.patch(
        `http://localhost:3010/api/auth/resetpassword/${userId}`,
        { password, confirmPassword, otp },
        { withCredentials: true }
      );

      if (res.data.status === "sucess") {
        setMessage("Password reset successfully!");
        router.push("/login");
      } else {
        setMessage("Failed to reset password. Try Again");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setMessage("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
      <Card className="w-full max-w-md bg-white/95 shadow-xl backdrop-blur-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-gray-800">
            Reset Password
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter the OTP and new password details below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-gray-700">
                OTP
              </Label>
              <Input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                New Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <p className="text-center text-sm text-red-500 mt-2">{message}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              {loading ? (
                <>
                  Submitting
                  <LucideLoader2 className="ml-2 animate-spin w-4 h-4" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-gray-600">
          <p>
            Remembered your password?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
