// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { useDispatch } from "react-redux";

// // ✅ FIXED: correct import
// import { setUser } from "@/store/slices/authSlice";

// export default function Login() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     try {
//       const res = await axios.post(
//         "http://localhost:3010/api/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       if (res.data.status === "success") {
//         // Save the user in redux
//         dispatch(setUser(res.data.user));
//         router.push("/dashboard");
//       }
//     } catch (err) {
//       setErrorMsg(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4">
//       <Card className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 border shadow-xl rounded-2xl p-6">
//         <CardHeader className="text-center space-y-2">
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
//             Welcome Back
//           </CardTitle>
//           <CardDescription>
//             Login to continue learning on CODEX
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={onSubmit} className="space-y-4">
//             {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

//             <div>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 placeholder="•••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <Button type="submit" disabled={loading} className="w-full">
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin mr-2" /> Signing in...
//                 </>
//               ) : (
//                 "Sign In"
//               )}
//             </Button>
//           </form>

//           <div className="mt-6 text-center text-sm">
//             Don’t have an account? <Link href="/signup" className="text-indigo-600">Sign up</Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser, fetchMe } from "@/store/slices/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        "http://localhost:3010/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
          const actionResult = await dispatch(fetchMe());
          const user = actionResult.payload; // full user info

          if (!user) {
            setErrorMsg("Failed to get user info after login");
            return;
          }

          // Redirect based on role
          if (user.role === "Teacher") router.push("/teacher/dashboard");
          else if (user.role === "Admin") router.push("/admin/dashboard");
          else router.push("/dashboard");
      }
    } catch (err) {
      console.log(err)
      setErrorMsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-4">
      <Card className="w-full max-w-md bg-white/70 border shadow-xl rounded-2xl p-6">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription>Login to continue learning on CODEX</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="•••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Signing in...</> : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don’t have an account? <Link href="/signup" className="text-indigo-600">Sign up</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
