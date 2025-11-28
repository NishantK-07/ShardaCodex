"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Axios instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3010/api",
  withCredentials: true,
});

// ----- COMPONENTS -----

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white/90 border border-sky-100 p-5 rounded-2xl shadow-sm dark:bg-gray-800/80 dark:border-gray-700">
      <div>
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
        {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
      </div>
    </div>
  );
}

function ProblemRow({ p }) {
  return (
    <div className="bg-white/90 border border-sky-50 p-4 rounded-xl shadow-sm flex justify-between items-start dark:bg-gray-800/80 dark:border-gray-700">
      <div>
        <Link href={`/teacher/problems/${p._id}`} className="text-indigo-700 font-semibold hover:underline">
          {p.title}
        </Link>
        <div className="text-xs text-gray-500">
          {p.difficulty} • {p.totalSubmissions ?? 0} submissions
        </div>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {p.date ? new Date(p.date).toLocaleDateString() : ""}
      </div>
    </div>
  );
}

function SubmissionRow({ s }) {
  const statusColor = {
    Accepted: "bg-green-100 text-green-700",
    "Wrong Answer": "bg-red-100 text-red-700",
    "Time Limit Exceeded": "bg-yellow-100 text-yellow-700",
    "Runtime Error": "bg-red-100 text-red-700",
    "Compilation Error": "bg-red-100 text-red-700",
  }[s.status] ?? "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white/90 border border-sky-50 p-3 rounded-lg flex justify-between items-center dark:bg-gray-800/80 dark:border-gray-700">
      <div>
        <div className="font-medium text-gray-800 dark:text-gray-100">{s.problemTitle}</div>
        <div className="text-xs text-gray-500">
          Language: {s.language} • {s.executionTime}ms
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>{s.status}</div>
    </div>
  );
}

// ----- MAIN DASHBOARD -----

export default function TeacherDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ problems: 0, totalSubmissions: 0, acceptedSubmissions: 0 });
  const [recentProblems, setRecentProblems] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        // Get profile
        const userRes = await API.get("/auth/profile");
        if (!userRes.data.user) {
          router.push("/login");
          return;
        }

        if (!mounted) return;
        setUser(userRes.data.user);

        // Fetch teacher dashboard data
        const [statsRes, problemsRes, subsRes] = await Promise.all([
          // API.get("/teachers/stats").catch(() => ({ data: {} })),
          
// NEW
API.get("/problem").catch(() => ({ data: [] })), // recentProblems
API.get("/submissions").catch(() => ({ data: [] })), // submissions
        ]);

        if (!mounted) return;

        // setStats(statsRes.data || {});
        // setRecentProblems(problemsRes.data || []);
        // setSubmissions(subsRes.data || []);
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  const handleSignOut = async () => {
    try {
      await API.post("/auth/logout");
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-indigo-100">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-600 mx-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-6">
      {/* NAVBAR */}
      <header className="flex items-center justify-between mb-6">
        <div className="text-2xl font-bold text-indigo-700">CODEX Teacher</div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hi, <b>{user.name}</b></span>
          <Button onClick={handleSignOut} className="px-3 py-1 bg-indigo-600 text-white">Sign Out</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <div className="font-semibold text-gray-800 dark:text-gray-100">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
            <div className="mt-4 space-y-2">
              <Link href="/teacher/dashboard" className="block text-sm text-indigo-700">Overview</Link>
              <Link href="/teacher/problems/new" className="block text-sm">Create Problem</Link>
              <Link href="/teacher/problems" className="block text-sm">My Problems</Link>
              <Link href="/teacher/submissions" className="block text-sm">Submissions</Link>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Problems Created" value={stats.problems} />
            <StatCard title="Total Submissions" value={stats.totalSubmissions} />
            <StatCard title="Accepted Submissions" value={stats.acceptedSubmissions} />
          </div>

          {/* Recent Problems */}
          <div>
            <div className="flex justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Recent Problems</h3>
              <Link href="/teacher/problems" className="text-sm text-sky-600">View all</Link>
            </div>
            <div className="space-y-3">
              {recentProblems.length === 0 ? (
                <div className="text-sm text-gray-500">No recent problems.</div>
              ) : (
                recentProblems.map((p) => <ProblemRow key={p._id} p={p} />)
              )}
            </div>
          </div>

          {/* Recent Submissions */}
          <div>
            <div className="flex justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Recent Submissions</h3>
              <Link href="/teacher/submissions" className="text-sm text-sky-600">View all</Link>
            </div>
            <div className="space-y-3">
              {submissions.length === 0 ? (
                <div className="text-sm text-gray-500">No submissions yet.</div>
              ) : (
                submissions.map((s) => <SubmissionRow key={s._id} s={s} />)
              )}
            </div>
          </div>

          {/* Quick Action */}
          <div className="mt-4">
            <Link href="/teacher/problems/new">
              <Button className="w-full bg-indigo-600 text-white">Create New Problem</Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
