"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest } from "../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form)
      });

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error: any) {
      setMessage(error.message || "Login failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-20 text-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">Log in to continue to your dashboard.</p>

        <div className="mt-6 space-y-4">
          <input className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <input className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        </div>

        {message ? <p className="mt-4 text-sm text-rose-400">{message}</p> : null}

        <button type="submit" className="mt-6 w-full rounded-full bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
          Login
        </button>

        <p className="mt-4 text-center text-sm text-slate-400">
          New here? <Link href="/register" className="text-cyan-400">Create account</Link>
        </p>
      </form>
    </main>
  );
}
