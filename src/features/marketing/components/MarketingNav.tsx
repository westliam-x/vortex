import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

type MarketingNavProps = {
  links?: Array<{ label: string; href: string }>;
};

const defaultLinks = [
  { label: "Workspace", href: "/features/workspace" },
  { label: "Spaces", href: "/features/workspace#spaces" },
  { label: "Invoices", href: "/features/payments#invoices" },
  { label: "Payments", href: "/features/payments" },
  { label: "Blaaiz", href: "/features/payments#blaaiz" },
  { label: "Reviews", href: "/features/reviews" },
  { label: "Signal", href: "/features/signal" },
  { label: "Vora", href: "/vora-ai" },
  { label: "Pricing", href: "/pricing" },
];

export default function MarketingNav({ links = defaultLinks }: MarketingNavProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg-elevated)]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)]">
            <BadgeCheck size={15} style={{ color: "var(--accent)" }} />
          </span>
          <span className="text-lg font-semibold text-[var(--text)]">Vortex</span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-[var(--muted)] lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--text)]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden text-sm text-[var(--muted)] hover:text-[var(--text)] sm:inline">
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-strong)] px-4 py-2 text-sm font-medium text-[#041017] hover:bg-[var(--accent)]"
          >
            Start now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
