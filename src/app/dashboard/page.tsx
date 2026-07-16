import Link from "next/link";
import DashboardShell from "../components/DashboardShell";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <DashboardShell>
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30">
        <p className="text-sm text-cyan-300">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold">Welcome to your workspace</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Supporters can track contributions, creators can manage campaigns, and admins can moderate activity from one place.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: "My campaigns", description: "Create and review project updates." },
            { title: "My contributions", description: "Track backed projects and credits." },
            { title: "Moderation", description: "Review approvals and platform actions." }
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{card.description}</p>
              <Link href="/explore" className="mt-4 inline-flex text-sm text-cyan-400">Open section →</Link>
            </div>
          ))}
        </div>
      </div>
      </DashboardShell>
    </main>
    </ProtectedRoute>
  );
}
