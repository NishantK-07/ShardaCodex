// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { useDispatch } from "react-redux";

// // ✅ FIXED: Correct slice path
// import { setUser } from "@/store/slices/authSlice";

// export default function Signup() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     if (password !== confirmPassword) {
//       setErrorMsg("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:3010/api/auth/signup",
//         { name, email, password, confirmPassword },
//         { withCredentials: true }
//       );

//       if (res.data.status === "success") {
//         // Save logged-in user into Redux
//         dispatch(setUser(res.data.user));
//         router.push("/");
//       }
//     } catch (err) {
//       setErrorMsg(err.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4">
//       <Card className="w-full max-w-md bg-white/70 dark:bg-gray-900/70 border shadow-xl rounded-2xl p-6">
//         <CardHeader className="text-center space-y-2">
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
//             Create Your CODEX Account
//           </CardTitle>
//           <CardDescription>
//             Enter your information to get started
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={onSubmit} className="space-y-4">
//             {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

//             <div>
//               <Label>Full Name</Label>
//               <Input value={name} onChange={(e) => setName(e.target.value)} required />
//             </div>

//             <div>
//               <Label>Email</Label>
//               <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//             </div>

//             <div>
//               <Label>Password</Label>
//               <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//             </div>

//             <div>
//               <Label>Confirm Password</Label>
//               <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//             </div>

//             <Button type="submit" disabled={loading} className="w-full">
//               {loading ? <><Loader2 className="animate-spin mr-2" /> Creating...</> : "Create Account"}
//             </Button>
//           </form>

//           <div className="mt-6 text-center text-sm">
//             Already have an account?{" "}
//             <Link href="/login" className="text-indigo-600">
//               Sign in
//             </Link>
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
import { setUser } from "@/store/slices/authSlice";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Student"); // default role
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3010/api/auth/signup",
        { name, email, password, confirmPassword, role },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
       dispatch(setUser(res.data.user));
       router.push("/")
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-4">
      <Card className="w-full max-w-md bg-white/70 border shadow-xl rounded-2xl p-6">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Create Your CODEX Account
          </CardTitle>
          <CardDescription>Enter your information to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <div>
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            <div>
              <Label>Role</Label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <><Loader2 className="animate-spin mr-2" /> Creating...</> : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
