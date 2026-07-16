"use client";

import Link from "next/link";
import { useState } from "react";

const campaignDetails: Record<string, { title: string; creator: string; goal: string; raised: string; story: string; highlights: string[] }> = {
  "community-solar-co-op": {
    title: "Community Solar Co-op",
    creator: "Mina Chen",
    goal: "$24,000",
    raised: "$18,500",
    story: "This campaign will help a neighborhood install shared solar panels and reduce utility costs for local renters and homeowners.",
    highlights: ["Community-led rollout", "Lower energy costs", "Transparent reporting"]
  },
  "riverside-food-hub": {
    title: "Riverside Food Hub",
    creator: "Daniel Ortiz",
    goal: "$15,000",
    raised: "$12,100",
    story: "The Riverside Food Hub is building a neighborhood distribution center for fresh produce and pantry staples.",
    highlights: ["Weekly distribution", "Local partnerships", "Volunteer support"]
  },
  "skillshare-mobile-lab": {
    title: "SkillShare Mobile Lab",
    creator: "Ava Thompson",
    goal: "$30,000",
    raised: "$22,400",
    story: "A mobile learning lab will bring coding, design, and career coaching to underserved schools and communities.",
    highlights: ["Hands-on sessions", "Free resources", "Youth mentorship"]
  }
};

export default function CampaignDetailPage({ params }: { params: { slug: string } }) {
  const campaign = campaignDetails[params.slug];
  const [amount, setAmount] = useState("50");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in before contributing.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/contributions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ campaignTitle: campaign?.title, campaignSlug: params.slug, amount: Number(amount) })
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message || "Contribution failed");
      return;
    }

    setMessage("Contribution submitted successfully. It is pending review.");
  };

  if (!campaign) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
          <p className="text-sm text-cyan-300">Campaign not found</p>
          <h1 className="mt-2 text-3xl font-semibold">This campaign is not available yet.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30">
        <Link href="/explore" className="text-sm text-cyan-300">
          ← Back to explore
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm text-cyan-300">Approved campaign</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{campaign.title}</h1>
            <p className="mt-3 text-slate-400">by {campaign.creator}</p>
            <p className="mt-6 text-lg leading-8 text-slate-300">{campaign.story}</p>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-white">Highlights</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {campaign.highlights.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <p className="text-sm text-cyan-300">Funding progress</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold text-white">{campaign.raised}</p>
                <p className="text-sm text-slate-400">raised of {campaign.goal}</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Live</span>
            </div>

            <div className="mt-6 h-3 rounded-full bg-slate-800">
              <div className="h-3 w-3/4 rounded-full bg-cyan-500" />
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
                placeholder="Credits"
              />
              <button type="submit" className="w-full rounded-full bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
                Support this campaign
              </button>
            </form>
            {message ? <p className="mt-3 text-sm text-cyan-300">{message}</p> : null}
          </div>
        </div>
      </div>
    </main>
  );
}
