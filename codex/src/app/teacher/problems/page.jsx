"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "@/components/ui/button";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3010/api",
  withCredentials: true,
});

export default function ProblemListPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProblems() {
      try {
        const res = await API.get("/problem"); // Fetch teacher's problems
        setProblems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this problem?")) return;
    try {
      await API.delete(`/problem/${id}`);
      setProblems(problems.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Problems</h1>
        <Link href="/teacher/problems/new">
          <Button className="bg-indigo-600 text-white">Create New Problem</Button>
        </Link>
      </div>

      <div className="grid gap-3">
        {problems.length === 0 && <div>No problems created yet.</div>}

        {problems.map(p => (
          <div key={p._id} className="flex justify-between items-center border p-4 rounded shadow-sm bg-white dark:bg-gray-800">
            <div>
              <div className="font-semibold text-lg">{p.title}</div>
              <div className="text-sm text-gray-500">
                Difficulty: {p.difficulty} • Total: {p.totalSubmissions} • Accepted: {p.acceptedSubmissions} • Acceptance Rate: {p.acceptanceRate}%
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/teacher/problems/${p._id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
              <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
