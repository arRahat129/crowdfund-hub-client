import Link from "next/link";
import NotificationsDropdown from "./NotificationsDropdown";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-white">
          Crowdfund Hub
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-300">
          <Link href="/" className="transition hover:text-cyan-300">
            Home
          </Link>
          <Link href="/explore" className="transition hover:text-cyan-300">
            Explore
          </Link>
          <Link href="/dashboard" className="transition hover:text-cyan-300">
            Dashboard
          </Link>
          <Link href="/contributions" className="transition hover:text-cyan-300">
            Contributions
          </Link>
          <Link href="/credits" className="transition hover:text-cyan-300">
            Credits
          </Link>
          <Link href="/creator" className="transition hover:text-cyan-300">
            Creator
          </Link>
          <Link href="/admin" className="transition hover:text-cyan-300">
            Admin
          </Link>
          <NotificationsDropdown />
          <Link href="/login" className="rounded-full border border-slate-700 px-3 py-2 transition hover:border-cyan-400 hover:text-cyan-300">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
