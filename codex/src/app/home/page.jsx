// "use client";

// import Link from "next/link";
// import { useTheme } from "next-themes";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@/store/slices/authSlice";
// import { motion } from "framer-motion";

// import {
//   Sun,
//   Moon,
//   Code,
//   Users,
//   Trophy,
//   BookOpen,
//   Zap,
//   Shield
// } from "lucide-react";

// export default function HomePage() {
//   const { theme, setTheme } = useTheme();
//   const dispatch = useDispatch();

//   const user = useSelector((state) => state.auth.user);

//   return (
//     <main className="min-h-screen bg-gradient-to-b 
//       from-white via-sky-50 to-indigo-50 
//       dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

//       {/* NAVBAR */}
//       <nav className="flex items-center justify-between px-8 py-4 
//         bg-gradient-to-r from-indigo-600 to-purple-600 
//         text-white shadow-md sticky top-0 z-50">

//         {/* Logo */}
//         <div className="flex items-center space-x-2 font-bold text-xl">
//           <Code className="w-7 h-7" />
//           <span>CODEX</span>
//         </div>

//         {/* Navbar Links */}
//         <div className="hidden md:flex items-center space-x-6 text-sm font-medium">

//           <Link href="/dashboard" className="hover:text-sky-200 transition-colors">
//             Dashboard
//           </Link>

//           <Link href="/playground" className="hover:text-sky-200 transition-colors">
//             Problems
//           </Link>

//           {!user ? (
//             <>
//               <Link href="/login" className="hover:text-sky-200 transition-colors">
//                 Login
//               </Link>

//               <Link
//                 href="/signup"
//                 className="bg-white text-indigo-700 font-semibold px-4 py-1 rounded-full hover:bg-sky-100 transition"
//               >
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <>
//               <span className="text-sky-200">Hi, {user.name}</span>

//               <button
//                 onClick={() => dispatch(logout())}
//                 className="bg-red-500/40 px-4 py-1 rounded-full hover:bg-red-500 transition"
//               >
//                 Logout
//               </button>
//             </>
//           )}

//           {/* Theme Toggle */}
//           <button
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             className="p-2 rounded-full bg-indigo-500/40 hover:bg-indigo-400 transition"
//           >
//             {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//           </button>
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="text-center py-28 px-6 
//         bg-gradient-to-r from-white via-sky-100 to-indigo-100 
//         dark:from-indigo-800 dark:via-purple-900 dark:to-indigo-950">

//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-5xl md:text-6xl font-extrabold mb-4 text-indigo-800 dark:text-white"
//         >
//           Welcome to <span className="text-indigo-700 dark:text-yellow-300">CODEX</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="max-w-2xl mx-auto text-lg opacity-90 mb-10 text-gray-700 dark:text-gray-300"
//         >
//           Master coding with our platform featuring automated judge, 
//           interactive courses, and competitive programming.
//         </motion.p>

//         {!user && (
//           <div className="flex gap-4 justify-center">
//             <Link
//               href="/signup"
//               className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full text-lg hover:bg-indigo-700 transition"
//             >
//               Sign Up
//             </Link>
//           </div>
//         )}
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="py-20 px-8 text-center">
//         <h2 className="text-4xl font-bold mb-4 text-indigo-700">Why Choose CODEX?</h2>
//         <p className="text-gray-600 dark:text-gray-400 mb-12">
//           Experience the future of coding education with our modern platform.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {[
//             {
//               title: "Multi-Language Support",
//               desc: "Write and execute code in C++, Java, Python and more.",
//               icon: <Code className="w-10 h-10 text-indigo-600 mb-4" />,
//             },
//             {
//               title: "Collaborative Learning",
//               desc: "Join courses and learn with peers.",
//               icon: <Users className="w-10 h-10 text-purple-600 mb-4" />,
//             },
//             {
//               title: "Competitive Programming",
//               desc: "Climb the leaderboard and earn achievements.",
//               icon: <Trophy className="w-10 h-10 text-sky-600 mb-4" />,
//             },
//             {
//               title: "Structured Courses",
//               desc: "Take expert-designed coding courses.",
//               icon: <BookOpen className="w-10 h-10 text-indigo-500 mb-4" />,
//             },
//             {
//               title: "Instant Execution",
//               desc: "Immediate results powered by Judge0.",
//               icon: <Zap className="w-10 h-10 text-sky-500 mb-4" />,
//             },
//             {
//               title: "Secure & Reliable",
//               desc: "Your data is safe with secure backend.",
//               icon: <Shield className="w-10 h-10 text-purple-500 mb-4" />,
//             },
//           ].map((feature, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md 
//                 hover:shadow-lg border border-indigo-100 dark:border-gray-700 transition-all"
//             >
//               <div className="flex flex-col items-center">
//                 {feature.icon}
//                 <h3 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-sky-400">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-8 text-center">
//         <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
//         <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
//           Join thousands of learners mastering coding on CODEX.
//         </p>

//         <div className="flex justify-center gap-4 mb-12">
//           <Link
//             href="/signup"
//             className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-full text-lg hover:bg-sky-100 transition"
//           >
//             Sign Up
//           </Link>

//           <Link
//             href="/login"
//             className="border border-white text-white px-6 py-2 rounded-full text-lg hover:bg-white/10 transition"
//           >
//             Sign In
//           </Link>
//         </div>

//         <div className="border-t border-sky-400 pt-8 text-sm text-sky-100">
//           © {new Date().getFullYear()} CODEX — Built for developers, by developers.
//         </div>
//       </footer>

//     </main>
//   );
// }
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  Sun,
  Moon,
  Code,
  Users,
  Trophy,
  BookOpen,
  Zap,
  Shield
} from "lucide-react";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);

  const goToDashboard = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role === "Teacher") router.push("/teacher/dashboard");
    else if (user.role === "Admin") router.push("/admin/dashboard");
    else router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b 
      from-white via-sky-50 to-indigo-50 
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-4 
        bg-gradient-to-r from-indigo-600 to-purple-600 
        text-white shadow-md sticky top-0 z-50">

        {/* Logo */}
        <div className="flex items-center space-x-2 font-bold text-xl">
          <Code className="w-7 h-7" />
          <span>CODEX</span>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">

          <button onClick={goToDashboard} className="hover:text-sky-200 transition-colors">
            Dashboard
          </button>

          <Link href="/playground" className="hover:text-sky-200 transition-colors">
            Problems
          </Link>

          {!user ? (
            <>
              <Link href="/login" className="hover:text-sky-200 transition-colors">
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-white text-indigo-700 font-semibold px-4 py-1 rounded-full hover:bg-sky-100 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-sky-200">Hi, {user.name}</span>

              <button
                onClick={() => dispatch(logout())}
                className="bg-red-500/40 px-4 py-1 rounded-full hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-indigo-500/40 hover:bg-indigo-400 transition"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center py-28 px-6 
        bg-gradient-to-r from-white via-sky-100 to-indigo-100 
        dark:from-indigo-800 dark:via-purple-900 dark:to-indigo-950">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 text-indigo-800 dark:text-white"
        >
          Welcome to <span className="text-indigo-700 dark:text-yellow-300">CODEX</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg opacity-90 mb-10 text-gray-700 dark:text-gray-300"
        >
          Master coding with our platform featuring automated judge, 
          interactive courses, and competitive programming.
        </motion.p>

        {!user && (
          <div className="flex gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full text-lg hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-8 text-center">
        <h2 className="text-4xl font-bold mb-4 text-indigo-700">Why Choose CODEX?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Experience the future of coding education with our modern platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[{
              title: "Multi-Language Support",
              desc: "Write and execute code in C++, Java, Python and more.",
              icon: <Code className="w-10 h-10 text-indigo-600 mb-4" />,
            },
            {
              title: "Collaborative Learning",
              desc: "Join courses and learn with peers.",
              icon: <Users className="w-10 h-10 text-purple-600 mb-4" />,
            },
            {
              title: "Competitive Programming",
              desc: "Climb the leaderboard and earn achievements.",
              icon: <Trophy className="w-10 h-10 text-sky-600 mb-4" />,
            },
            {
              title: "Structured Courses",
              desc: "Take expert-designed coding courses.",
              icon: <BookOpen className="w-10 h-10 text-indigo-500 mb-4" />,
            },
            {
              title: "Instant Execution",
              desc: "Immediate results powered by Judge0.",
              icon: <Zap className="w-10 h-10 text-sky-500 mb-4" />,
            },
            {
              title: "Secure & Reliable",
              desc: "Your data is safe with secure backend.",
              icon: <Shield className="w-10 h-10 text-purple-500 mb-4" />,
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md 
                hover:shadow-lg border border-indigo-100 dark:border-gray-700 transition-all"
            >
              <div className="flex flex-col items-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-sky-400">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
          Join thousands of learners mastering coding on CODEX.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <Link
            href="/signup"
            className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-full text-lg hover:bg-sky-100 transition"
          >
            Sign Up
          </Link>

          <Link
            href="/login"
            className="border border-white text-white px-6 py-2 rounded-full text-lg hover:bg-white/10 transition"
          >
            Sign In
          </Link>
        </div>

        <div className="border-t border-sky-400 pt-8 text-sm text-sky-100">
          © {new Date().getFullYear()} CODEX — Built for developers, by developers.
        </div>
      </footer>

    </main>
  );
}
