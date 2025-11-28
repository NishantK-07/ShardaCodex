"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3010/api",
  withCredentials: true,
});

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await API.get("/submissions");
        setSubmissions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recent Submissions</h1>
      <div className="space-y-3">
        {submissions.map((s) => (
          <div key={s._id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{s.problemTitle}</div>
              <div className="text-sm text-gray-500">Language: {s.language} • {s.executionTime}ms</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${{
              Accepted: "bg-green-100 text-green-700",
              "Wrong Answer": "bg-red-100 text-red-700",
              "Runtime Error": "bg-red-100 text-red-700",
              "Time Limit Exceeded": "bg-yellow-100 text-yellow-700"
            }[s.status] || "bg-gray-100 text-gray-700"}`}>
              {s.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
