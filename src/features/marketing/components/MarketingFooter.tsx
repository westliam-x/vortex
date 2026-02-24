import Link from "next/link";

export default function MarketingFooter() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-sm text-[var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[var(--text)]">Vortex</span>
          <span className="hidden sm:inline">Built for high-trust client delivery</span>
        </div>
        <div className="flex gap-4">
          <Link href="/features" className="hover:text-[var(--text)]">Features</Link>
          <Link href="/vora-ai" className="hover:text-[var(--text)]">Vora</Link>
          <Link href="/pricing" className="hover:text-[var(--text)]">Pricing</Link>
          <span>© {new Date().getFullYear()} Vortex</span>
        </div>
      </div>
    </footer>
  );
}

