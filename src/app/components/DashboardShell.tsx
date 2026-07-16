import Link from "next/link";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 lg:flex-row lg:px-8">
      <aside className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 p-6 lg:w-72">
        <h2 className="text-lg font-semibold text-white">Quick access</h2>
        <div className="mt-4 space-y-2 text-sm text-slate-300">
          <Link href="/dashboard" className="block rounded-2xl border border-slate-800 px-3 py-2 hover:border-cyan-400 hover:text-cyan-300">Dashboard</Link>
          <Link href="/contributions" className="block rounded-2xl border border-slate-800 px-3 py-2 hover:border-cyan-400 hover:text-cyan-300">My Contributions</Link>
          <Link href="/creator" className="block rounded-2xl border border-slate-800 px-3 py-2 hover:border-cyan-400 hover:text-cyan-300">Creator Tools</Link>
          <Link href="/admin" className="block rounded-2xl border border-slate-800 px-3 py-2 hover:border-cyan-400 hover:text-cyan-300">Admin Area</Link>
        </div>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
