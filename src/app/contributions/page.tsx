"use client";

import { useEffect, useState } from "react";

export default function ContributionsPage() {
  const [contributions, setContributions] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    fetch("http://localhost:5000/api/contributions", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setContributions(data.contributions || []));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-semibold">My contributions</h1>
        <p className="mt-2 text-slate-400">Track your pending and approved contributions.</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-950/70 text-slate-300">
              <tr>
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {contributions.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-slate-400" colSpan={3}>No contributions yet.</td>
                </tr>
              ) : (
                contributions.map((item) => (
                  <tr key={item._id} className="border-t border-slate-800 bg-slate-900/60">
                    <td className="px-4 py-3">{item.campaignTitle || "Campaign"}</td>
                    <td className="px-4 py-3">{item.amount}</td>
                    <td className="px-4 py-3 capitalize">{item.status}</td>
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
