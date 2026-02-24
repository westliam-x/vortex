"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BriefcaseBusiness,
  Compass,
  FileClock,
  FileText,
  FolderKanban,
  MessageSquareShare,
  ShieldCheck,
  Signal,
  Star,
  Users,
  Wallet,
} from "lucide-react";

const ACCENT = "var(--accent)";
const easeBezier: [number, number, number, number] = [0.21, 1, 0.21, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeBezier } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const featureGroups = [
  {
    title: "Core workspace",
    items: [
      { icon: FolderKanban, title: "Dashboard + Projects", body: "Track delivery health, deadlines, and execution from one command view." },
      { icon: BriefcaseBusiness, title: "Clients + Invites", body: "Manage client profiles and onboard external stakeholders with clean invite flows." },
      { icon: MessageSquareShare, title: "Share Spaces", body: "Run handover, files, and communication inside a single project-linked client space." },
      { icon: FileClock, title: "Logs + Audit", body: "Every change has traceability, so decisions and approvals never get lost." },
    ],
  },
  {
    title: "Revenue engine",
    items: [
      { icon: FileText, title: "Invoices", body: "Generate project-linked invoices with due dates, totals, and clean status tracking." },
      { icon: Wallet, title: "Payments + Blaaiz", body: "Collect, monitor payment events, and generate virtual bank account references powered by Blaaiz." },
      { icon: Star, title: "Reviews", body: "Capture transaction-backed social proof with clearer trust for future clients." },
      { icon: Users, title: "Team", body: "Coordinate collaborators and roles without losing ownership of delivery quality." },
    ],
  },
  {
    title: "Growth surface",
    items: [
      { icon: Signal, title: "Signal", body: "Expose availability and collaboration intent in a profile clients and peers can act on." },
      { icon: Compass, title: "Discover", body: "Find talent or partners quickly with role, stack, and readiness context." },
      { icon: Bot, title: "Vora", body: "Generate client-ready drafts, planning prompts, and follow-ups from your current context." },
      { icon: ShieldCheck, title: "Public profile + widget", body: "Show verified proof publicly with an embeddable trust layer for your portfolio." },
    ],
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(850px circle at 8% -10%, rgba(0,255,148,0.14), transparent 62%), radial-gradient(780px circle at 95% 8%, rgba(0,122,255,0.14), transparent 58%)",
        }}
      />

      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg-elevated)]/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)]">
              <BadgeCheck size={15} style={{ color: ACCENT }} />
            </span>
            <span className="text-lg font-semibold">Vortex</span>
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-[var(--muted)] lg:flex">
            <Link href="/features/workspace#spaces" className="hover:text-[var(--text)]">Vortex Space</Link>
            <Link href="/features/payments" className="hover:text-[var(--text)]">Payments</Link>
            <Link href="/features/reviews" className="hover:text-[var(--text)]">Reviews</Link>
            <Link href="/features/signal" className="hover:text-[var(--text)]">Signal</Link>
            <Link href="/vora-ai" className="hover:text-[var(--text)]">Vora</Link>
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

      <section id="platform" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]">
              <ShieldCheck size={14} style={{ color: ACCENT }} />
              Built for serious freelance delivery
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-5 max-w-5xl text-4xl font-semibold leading-tight md:text-6xl">
              Run projects, payments, client collaboration, and proof of work from one operating system.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-3xl text-base text-[var(--muted)] md:text-lg">
              Vortex is where execution meets trust. Ship work in shared spaces, close with linked invoices and payment signals,
              then publish verified outcomes through public profile surfaces.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-strong)] px-5 py-3 text-sm font-medium text-[#041017] hover:bg-[var(--accent)]"
              >
                Build in Vortex <ArrowRight size={18} />
              </Link>
              <Link
                href="/public/william"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium hover:bg-[var(--surface2)]"
              >
                View public profile mode
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-xs text-[var(--muted)]">
              Includes: dashboard, projects, clients, invites, logs, reviews, invoices, payments, team, spaces, Vora, Signal, Discover.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section id="visuals" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              <Image
                src="/illustrations/landing-dashboard.svg"
                alt="Vortex dashboard preview placeholder"
                width={1200}
                height={800}
                className="h-auto w-full rounded-xl border border-[var(--border)]"
              />
              <p className="mt-3 px-1 text-sm text-[var(--muted)]">Dashboard command view placeholder (replace with your real screenshot).</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              <Image
                src="/illustrations/landing-space.svg"
                alt="Vortex space preview placeholder"
                width={1200}
                height={800}
                className="h-auto w-full rounded-xl border border-[var(--border)]"
              />
              <p className="mt-3 px-1 text-sm text-[var(--muted)]">Space collaboration placeholder (messages, files, right context panel).</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              <Image
                src="/illustrations/landing-vora.svg"
                alt="Vora assistant preview placeholder"
                width={1200}
                height={800}
                className="h-auto w-full rounded-xl border border-[var(--border)]"
              />
              <p className="mt-3 px-1 text-sm text-[var(--muted)]">Vora drafting + planning placeholder (replace with your drawer screenshot).</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-semibold md:text-4xl">
              Full-stack operations for freelancers and delivery teams
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-[var(--muted)]">
              Every module in Vortex is designed to collapse ambiguity, speed up client decisions, and keep cash flow transparent.
            </motion.p>
          </motion.div>

          <div className="mt-10 space-y-10">
            {featureGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{group.title}</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {group.items.map(({ icon: Icon, title, body }) => (
                    <article key={title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)]">
                          <Icon size={18} style={{ color: ACCENT }} />
                        </span>
                        <h4 className="text-base font-semibold">{title}</h4>
                      </div>
                      <p className="mt-2 text-sm text-[var(--muted)]">{body}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-3">
                  <Link
                    href={
                      group.title === "Core workspace"
                        ? "/features/workspace"
                        : group.title === "Revenue engine"
                        ? "/features/payments"
                        : "/features/signal"
                    }
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--mint)] hover:text-[var(--text)]"
                  >
                    Explore {group.title.toLowerCase()} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 lg:col-span-2">
              <h3 className="text-2xl font-semibold">Why this product is different</h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                <li>1. Work and trust are linked: project updates, invoice state, payment events, and review outcomes connect in one timeline.</li>
                <li>2. Guest-safe collaboration: clients operate in secure space routes without getting access to internal owner controls.</li>
                <li>3. Built-in growth layer: public profile + embeddable widget expose verified proof where you win work.</li>
                <li>4. Assistant utility with control: Vora drafts stay owner-side and never auto-post as assistant content.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-xl font-semibold">High intent routes</h3>
              <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                <p><span className="text-[var(--text)]">Owner:</span> `/dashboard`, `/projects`, `/spaces`, `/invoices`, `/vora`</p>
                <p><span className="text-[var(--text)]">Guest:</span> `/v/[token]`</p>
                <p><span className="text-[var(--text)]">Public trust:</span> `/public/[username]`, `/public/[username]/widget`</p>
              </div>
              <Link href="/pricing" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--mint)] hover:text-[var(--text)]">
                See plan tiers <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link href="/features" className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm text-[var(--muted)] hover:text-[var(--text)]">
              Open full feature hub
            </Link>
            <Link href="/vora-ai" className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm text-[var(--muted)] hover:text-[var(--text)]">
              Read Vora deep dive
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center md:p-10">
            <h2 className="text-3xl font-semibold md:text-4xl">Ship client work with less chaos and more proof.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--muted)]">
              Stand up your workspace, run a project in Vortex Space, and close with linked invoice + verified review flow.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-strong)] px-5 py-3 text-sm font-medium text-[#041017] hover:bg-[var(--accent)]"
              >
                Launch workspace <ArrowRight size={18} />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface2)] px-5 py-3 text-sm font-medium hover:bg-[var(--surface)]"
              >
                Open existing workspace
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-sm text-[var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)]">
              <BadgeCheck size={14} style={{ color: ACCENT }} />
            </span>
            <span className="font-semibold text-[var(--text)]">Vortex</span>
            <span className="hidden sm:inline">Developer-first client delivery workspace</span>
          </div>
          <div className="flex gap-4">
            <Link href="/pricing" className="hover:text-[var(--text)]">Pricing</Link>
            <Link href="/login" className="hover:text-[var(--text)]">Login</Link>
            <span>© {new Date().getFullYear()} Vortex</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
