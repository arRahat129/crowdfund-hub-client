"use client";

import { useEffect, useState } from "react";

export default function CreatorPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", goal: "", description: "" });
  const [message, setMessage] = useState("");

  const loadCampaigns = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const response = await fetch("http://localhost:5000/api/creator-campaigns", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setCampaigns(data.campaigns || []);
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in first.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/creator-campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...form, goal: Number(form.goal) })
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message || "Campaign creation failed");
      return;
    }

    setMessage("Campaign submitted for approval.");
    setForm({ title: "", goal: "", description: "" });
    loadCampaigns();
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-semibold">Creator dashboard</h1>
        <p className="mt-2 text-slate-400">Create campaigns and review your submissions.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 md:grid-cols-2">
          <input className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3" placeholder="Campaign title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
          <input className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3" type="number" placeholder="Goal" value={form.goal} onChange={(event) => setForm({ ...form, goal: event.target.value })} required />
          <textarea className="md:col-span-2 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3" placeholder="Description" rows={4} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
          <button type="submit" className="md:col-span-2 rounded-full bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
            Create campaign
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-cyan-300">{message}</p> : null}

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-950/70 text-slate-300">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Goal</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-slate-400" colSpan={3}>No campaigns yet.</td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign._id} className="border-t border-slate-800 bg-slate-900/60">
                    <td className="px-4 py-3">{campaign.title}</td>
                    <td className="px-4 py-3">${campaign.goal || 0}</td>
                    <td className="px-4 py-3 capitalize">{campaign.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
