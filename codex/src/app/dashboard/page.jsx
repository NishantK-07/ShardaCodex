"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Axios API instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3010/api",
  withCredentials: true,
});

/* -------------------- COMPONENTS -------------------- */

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white/90 border border-sky-100 p-5 rounded-2xl shadow-sm dark:bg-gray-800/80 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 flex items-center justify-center text-white text-lg font-semibold">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
          {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}

function ProblemRow({ p }) {
  return (
    <div className="bg-white/90 border border-sky-50 p-4 rounded-xl shadow-sm flex justify-between items-start dark:bg-gray-800/80 dark:border-gray-700">
      <div>
        <Link href={`/problems/${p._id}`} className="text-indigo-700 font-semibold hover:underline">
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

function DraftRow({ d }) {
  return (
    <div className="bg-white/90 border border-sky-50 p-3 rounded-lg flex justify-between items-center dark:bg-gray-800/80 dark:border-gray-700">
      <div>
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {d.problemTitle ?? "Untitled Problem"}
        </div>
        <div className="text-xs text-gray-500">
          Saved {new Date(d.savedAt).toLocaleString()}
        </div>
      </div>
      <Link
        href={`/editor?problem=${d.problemId}&lang=${d.language}`}
        className="text-sky-600 hover:underline text-sm"
      >
        Continue
      </Link>
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
        <div className="font-medium text-gray-800 dark:text-gray-100">
          {s.problemTitle ?? "Problem"}
        </div>
        <div className="text-xs text-gray-500">
          Language: {s.language} • {s.executionTime}ms
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>{s.status}</div>
    </div>
  );
}

/* -------------------- MAIN DASHBOARD PAGE -------------------- */

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({ solved: 0, contests: 0, drafts: 0 });
  const [recentProblems, setRecentProblems] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  /* -------------------- LOAD USER + DATA -------------------- */
  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        // First, verify user
        const userRes = await API.get("/auth/profile");

        if (!userRes?.data?.user) {
          router.push("/login");
          return;
        }

        if (!mounted) return;
        setUser(userRes.data.user);

        // Now load all dashboard sections
        const [statsRes, problemsRes, draftsRes, subsRes, lbRes] = await Promise.all([
          API.get("/students/stats").catch(() => ({ data: {} })),
          API.get("/problems/recent?limit=5").catch(() => ({ data: [] })),
          API.get("/drafts/my").catch(() => ({ data: [] })),
          API.get("/submissions/recent").catch(() => ({ data: [] })),
          API.get("/leaderboard?limit=5").catch(() => ({ data: [] })),
        ]);

        if (!mounted) return;

        setStats({
          solved: statsRes?.data?.solved ?? 0,
          contests: statsRes?.data?.contests ?? 0,
          drafts: draftsRes?.data?.length ?? 0,
        });

        setRecentProblems(problemsRes?.data ?? []);
        setDrafts(
          (draftsRes?.data || []).map((d) => ({
            ...d,
            problemTitle: d.problemTitle || d.problemId,
          }))
        );
        setSubmissions(subsRes?.data ?? []);
        setLeaderboard(lbRes?.data ?? []);

      } catch (err) {
        console.error("Auth error:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  /* -------------------- LOGOUT -------------------- */
  const handleSignOut = async () => {
    try {
      await API.post("/auth/logout");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  /* -------------------- LOADING SCREEN -------------------- */
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-indigo-100">
        <div className="space-y-2 text-center">
          <Loader2 className="animate-spin w-10 h-10 text-indigo-600 mx-auto" />
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  /* -------------------- DASHBOARD UI -------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-6">
      
      {/* NAVBAR */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-indigo-700">CODEX</div>
          <nav className="hidden md:flex gap-4 text-sm text-gray-600">
            <Link href="/dashboard" className="font-medium text-indigo-700">Dashboard</Link>
            <Link href="/problems" className="hover:underline">Problems</Link>
            <Link href="/editor" className="hover:underline">Editor</Link>
            <Link href="/contests" className="hover:underline">Contests</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Hi, <span className="font-semibold text-indigo-700">{user.name}</span>
          </div>
          <button onClick={() => router.push("/profile")} className="px-3 py-1 rounded-md bg-white/90 border border-sky-100">
            Profile
          </button>
          <button onClick={handleSignOut} className="px-3 py-1 rounded-md bg-indigo-600 text-white">
            Sign out
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <aside className="lg:col-span-1 space-y-6">
          
          <div className="bg-white/90 p-4 rounded-2xl border border-sky-100 shadow-sm dark:bg-gray-800/80 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white grid place-items-center font-semibold">
                {user.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Link href="/dashboard" className="block text-sm font-medium text-indigo-700">Overview</Link>
              <Link href="/problems" className="block text-sm">My Problems</Link>
              <Link href="/drafts" className="block text-sm">Drafts</Link>
              <Link href="/submissions" className="block text-sm">Submissions</Link>
              <Link href="/leaderboard" className="block text-sm">Leaderboard</Link>
            </div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-sky-100 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">Current Streak</div>
            <div className="text-2xl font-bold text-indigo-700">5 days</div>
            <div className="text-xs text-gray-400 mt-1">Keep coding every day to improve</div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-sky-100 shadow-sm">
            <div className="text-sm text-gray-500 mb-2">Quick Actions</div>
            <div className="flex flex-col gap-2">
              <Link href="/editor" className="text-sm px-3 py-2 rounded-md bg-sky-100 text-sky-700 text-center">Open Editor</Link>
              <Link href="/problems/new" className="text-sm px-3 py-2 rounded-md bg-indigo-600 text-white text-center">New Submission</Link>
            </div>
          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-3 space-y-6">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Problems Solved" value={stats.solved} icon="✧" subtitle="Total solved" />
            <StatCard title="Weekly Contests" value={stats.contests} icon="🏆" subtitle="Participated" />
            <StatCard title="Drafts" value={stats.drafts} icon="💾" subtitle="Saved drafts" />
          </div>

          {/* Recent Problems & Drafts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">Recent Problems</h3>
                <Link href="/problems" className="text-sm text-sky-600">View all</Link>
              </div>

              <div className="space-y-3">
                {recentProblems.length === 0 ? (
                  <div className="text-sm text-gray-500">No recent problems.</div>
                ) : (
                  recentProblems.map((p) => <ProblemRow key={p._id} p={p} />)
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">Recent Drafts</h3>
                <Link href="/drafts" className="text-sm text-sky-600">Manage drafts</Link>
              </div>

              <div className="space-y-3">
                {drafts.length === 0 ? (
                  <div className="text-sm text-gray-500">No drafts saved.</div>
                ) : (
                  drafts.map((d) => <DraftRow key={d._id} d={d} />)
                )}
              </div>
            </div>

          </div>

          {/* Submissions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Recent Submissions</h3>
              <Link href="/submissions" className="text-sm text-sky-600">View all</Link>
            </div>

            <div className="space-y-3">
              {submissions.length === 0 ? (
                <div className="text-sm text-gray-500">No submissions yet.</div>
              ) : (
                submissions.map((s) => <SubmissionRow key={s._id} s={s} />)
              )}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Leaderboard</h3>
              <Link href="/leaderboard" className="text-sm text-sky-600">See full</Link>
            </div>

            <div className="bg-white/90 p-4 rounded-2xl border border-sky-50 shadow-sm dark:bg-gray-800/80 dark:border-gray-700">
              {leaderboard.length === 0 ? (
                <div className="text-sm text-gray-500">No leaderboard data.</div>
              ) : (
                <ol className="space-y-3">
                  {leaderboard.map((u, i) => (
                    <li key={u._id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white grid place-items-center text-sm font-bold">
                          {i + 1}
                        </div>
                        <div>
                          <div className="font-medium">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.points} pts</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">Solved: {u.solved}</div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
