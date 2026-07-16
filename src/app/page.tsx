import Link from "next/link";

const featuredCampaigns = [
  {
    title: "Community Solar Co-op",
    creator: "Mina Chen",
    goal: "$24,000",
    raised: "$18,500",
    status: "Funding strong"
  },
  {
    title: "Riverside Food Hub",
    creator: "Daniel Ortiz",
    goal: "$15,000",
    raised: "$12,100",
    status: "Nearly funded"
  },
  {
    title: "SkillShare Mobile Lab",
    creator: "Ava Thompson",
    goal: "$30,000",
    raised: "$22,400",
    status: "Popular"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
            Crowdfund Hub • launch, support, grow
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Finance meaningful projects with a modern community-first platform.
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Creators can launch campaigns, supporters can back ideas, and admins can guide every milestone from one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/explore" className="rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
              Explore campaigns
            </Link>
            <Link href="/register" className="rounded-full border border-slate-700 px-6 py-3 font-medium text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300">
              Join as a creator
            </Link>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/30">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-sm text-cyan-300">Live campaign snapshot</p>
            <div className="mt-4 space-y-4">
              {featuredCampaigns.map((campaign) => (
                <div key={campaign.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-semibold text-white">{campaign.title}</h2>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                      {campaign.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">by {campaign.creator}</p>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                    <span>Goal {campaign.goal}</span>
                    <span>Raised {campaign.raised}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Fast onboarding", body: "Creators can launch their idea in minutes with guided steps." },
            { title: "Flexible support", body: "Supporters can contribute credits and track their activity over time." },
            { title: "Trusted moderation", body: "Admins review campaigns and withdrawals to keep the community healthy." }
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
