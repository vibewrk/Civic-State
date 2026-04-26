import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-50">
      {/* Dashboard Header */}
      <header className="border-b border-navy-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-navy-700">
              CivicState
            </Link>
            <nav className="hidden items-center gap-4 sm:flex">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors"
              >
                My Campaigns
              </Link>
              <Link
                href="/submit"
                className="text-sm font-medium text-navy-400 hover:text-navy-600 transition-colors"
              >
                New Submission
              </Link>
            </nav>
          </div>
          <UserButton />
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
}
