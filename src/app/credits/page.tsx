"use client";

import { useState } from "react";
import { apiRequest } from "../lib/api";

const packages = [
  { name: "Starter", amount: 100, price: 10 },
  { name: "Boost", amount: 500, price: 40 },
  { name: "Pro", amount: 1200, price: 90 }
];

export default function CreditsPage() {
  const [message, setMessage] = useState("");

  const handlePurchase = async (price: number) => {
    try {
      const data = await apiRequest("/api/payments/intent", {
        method: "POST",
        body: JSON.stringify({ amount: price })
      });
      setMessage(`Payment intent ready: ${data.clientSecret}`);
    } catch (error: any) {
      setMessage(error.message || "Purchase failed");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-semibold">Buy credits</h1>
        <p className="mt-2 text-slate-400">Choose a package to top up your balance for future campaigns and contributions.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.name} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
              <h2 className="text-xl font-semibold text-white">{pkg.name}</h2>
              <p className="mt-2 text-sm text-slate-400">{pkg.amount} credits</p>
              <p className="mt-4 text-3xl font-semibold text-cyan-300">${pkg.price}</p>
              <button
                onClick={() => handlePurchase(pkg.price)}
                className="mt-6 w-full rounded-full bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
              >
                Purchase
              </button>
            </div>
          ))}
        </div>

        {message ? <p className="mt-6 text-sm text-cyan-300">{message}</p> : null}
      </div>
    </main>
  );
}
