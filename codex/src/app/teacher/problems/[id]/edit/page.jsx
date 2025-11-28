"use client"
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3010/api",
  withCredentials: true,
});

export default function EditProblemPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProblem() {
      try {
        const res = await API.get(`/problem/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProblem();
  }, [id]);

  if (loading || !form) return <div>Loading...</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...form.testCases];
    newTestCases[index][field] = value;
    setForm({ ...form, testCases: newTestCases });
  };

  const addTestCase = () => {
    setForm({ ...form, testCases: [...form.testCases, { input: "", output: "" }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/problem/${id}`, form);
      router.push("/teacher/problems");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Problem</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" rows={5} required />
        <textarea name="constraints" value={form.constraints} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
        <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full p-2 border rounded">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <textarea name="boilerplateCode" value={form.boilerplateCode} onChange={handleChange} className="w-full p-2 border rounded" rows={4} />

        <div>
          <h3 className="font-semibold mb-2">Test Cases</h3>
          {form.testCases.map((tc, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input placeholder="Input" value={tc.input} onChange={(e) => handleTestCaseChange(i, "input", e.target.value)} className="flex-1 p-2 border rounded" required />
              <input placeholder="Output" value={tc.output} onChange={(e) => handleTestCaseChange(i, "output", e.target.value)} className="flex-1 p-2 border rounded" required />
            </div>
          ))}
          <Button type="button" onClick={addTestCase}>Add Test Case</Button>
        </div>

        <Button type="submit" className="bg-indigo-600 text-white">Update Problem</Button>
      </form>
    </div>
  );
}
