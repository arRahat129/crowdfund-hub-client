"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const loadCampaigns = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const response = await fetch("http://localhost:5000/api/admin/campaigns/pending", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setCampaigns(data.campaigns || []);
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleDecision = async (id: string, action: "approve" | "reject") => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    await fetch(`http://localhost:5000/api/admin/campaigns/${id}/${action}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` }
    });

    loadCampaigns();
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-semibold">Admin moderation</h1>
        <p className="mt-2 text-slate-400">Review pending campaigns and approve or reject them.</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-950/70 text-slate-300">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Creator</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-slate-400" colSpan={3}>No pending campaigns.</td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign._id} className="border-t border-slate-800 bg-slate-900/60">
                    <td className="px-4 py-3">{campaign.title}</td>
                    <td className="px-4 py-3">{campaign.creatorName || "Unknown"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <button onClick={() => handleDecision(campaign._id, "approve")} className="rounded-full bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-950">
                          Approve
                        </button>
                        <button onClick={() => handleDecision(campaign._id, "reject")} className="rounded-full bg-rose-500 px-3 py-2 text-sm font-medium text-slate-950">
                          Reject
                        </button>
                      </div>
                    </td>
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
