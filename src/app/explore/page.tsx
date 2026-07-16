import Link from "next/link";

const campaigns = [
  { title: "Community Solar Co-op", creator: "Mina Chen", goal: "$24,000", raised: "$18,500" },
  { title: "Riverside Food Hub", creator: "Daniel Ortiz", goal: "$15,000", raised: "$12,100" },
  { title: "SkillShare Mobile Lab", creator: "Ava Thompson", goal: "$30,000", raised: "$22,400" }
];

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-cyan-300">Explore campaigns</p>
            <h1 className="text-3xl font-semibold">Discover live projects</h1>
          </div>
          <Link href="/register" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
            Start a campaign
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {campaigns.map((campaign) => (
            <article key={campaign.title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
              <p className="text-sm text-cyan-300">Approved campaign</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{campaign.title}</h2>
              <p className="mt-2 text-sm text-slate-400">by {campaign.creator}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-300">
                <span>Goal {campaign.goal}</span>
                <span>Raised {campaign.raised}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
