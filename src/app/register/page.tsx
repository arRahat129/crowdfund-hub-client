"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest } from "../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "supporter" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const data = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
      });

      localStorage.setItem("token", data.token);
      router.push("/login");
    } catch (error: any) {
      setMessage(error.message || "Registration failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-20 text-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-slate-400">Join Crowdfund Hub as a supporter or creator.</p>

        <div className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <input className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <input className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          <select className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
            <option value="supporter">Supporter</option>
            <option value="creator">Creator</option>
          </select>
        </div>

        {message ? <p className="mt-4 text-sm text-rose-400">{message}</p> : null}

        <button type="submit" className="mt-6 w-full rounded-full bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
          Register
        </button>

        <p className="mt-4 text-center text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-cyan-400">Log in</Link>
        </p>
      </form>
    </main>
  );
}
