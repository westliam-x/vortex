"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  FileText,
  FolderKanban,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Timer,
  Wallet,
} from "lucide-react";

const ACCENT = "var(--accent)";
const easeBezier: [number, number, number, number] = [0.21, 1, 0.21, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeBezier } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function LandingPage() {
  const reduce = useReducedMotion();

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(700px circle at 20% -10%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(600px circle at 80% 10%, rgba(59,130,246,0.12), transparent 55%)",
        }}
      />

      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg-elevated)]/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                <Sparkles size={16} style={{ color: ACCENT }} />
              </span>
              <span className="text-lg font-semibold text-[var(--text)]">Vortex</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--text-muted)]">
              <a href="#features" className="hover:text-[var(--text)]">Features</a>
              <a href="#workflow" className="hover:text-[var(--text)]">Workflow</a>
              <a href="#trust" className="hover:text-[var(--text)]">Trust</a>
              <a href="#pricing" className="hover:text-[var(--text)]">Reviews API</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-strong)] px-4 py-2 text-sm font-medium text-[#041017] hover:bg-[var(--accent)]"
              >
                Start workspace <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-muted)]">
              <BadgeCheck size={14} style={{ color: ACCENT }} />
              Developer-first freelance workspace
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-5 text-4xl leading-tight font-semibold md:text-6xl">
              One space for every client, every project, every decision.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base md:text-lg text-[var(--text-muted)]">
              Vortex keeps your freelance work clean and client-ready: projects, files, payments, and reviews in a shareable Vortex space. Clients join as guests, leave comments, and approve outcomes with zero friction.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-strong)] px-5 py-3 text-sm md:text-base font-medium text-[#041017] hover:bg-[var(--accent)]">
                Create workspace <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm md:text-base font-medium text-[var(--text)] hover:bg-[var(--surface-2)]">
                View demo
              </Link>
            </motion.div>
            <motion.div variants={fade} className="mt-6 text-xs text-[var(--text-subtle)]">
              Guest access via magic link - USD/NGN invoices - Reviews API for your portfolio
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeBezier }}
            viewport={{ once: true, amount: 0.4 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { Icon: FolderKanban, title: "Project control", body: "Scope, timelines, and status tracking that stays readable." },
              { Icon: MessageSquareText, title: "Client-ready updates", body: "Keep comments, files, and approvals inside the Vortex." },
              { Icon: Wallet, title: "Payments clarity", body: "Track totals, paid amounts, and outstanding balance at a glance." },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-2)]">
                    <Icon size={18} style={{ color: ACCENT }} />
                  </span>
                  <h3 className="text-base font-semibold">{title}</h3>
                </div>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">
              Everything you need to deliver with confidence
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-[var(--text-muted)]">
              Vortex replaces scattered docs and chat threads with a single, auditable workspace per project.
            </motion.p>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { Icon: FolderKanban, title: "Projects", body: "Priorities, deadlines, and owners tracked in one view." },
                { Icon: Briefcase, title: "Clients", body: "Keep contact details, notes, and project history aligned." },
                { Icon: FileText, title: "Invoices", body: "Create USD/NGN invoices with custom line items and PDF export." },
                { Icon: MessageSquareText, title: "Vortex space", body: "Share one link for updates, files, and approvals." },
                { Icon: Timer, title: "Activity logs", body: "A timeline of decisions, uploads, and status changes." },
                { Icon: ShieldCheck, title: "Reviews API", body: "Verified project reviews ready for your portfolio." },
              ].map(({ Icon, title, body }) => (
                <motion.div variants={fadeUp} key={title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-2)]">
                      <Icon size={18} style={{ color: ACCENT }} />
                    </span>
                    <h3 className="text-base font-semibold">{title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="workflow" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">
              A clean workflow from kickoff to close
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-[var(--text-muted)]">
              Invite clients as guests, share one link, and keep decisions transparent. Close with verified reviews.
            </motion.p>

            <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { n: 1, t: "Create a project", d: "Define scope, milestones, and owners." },
                { n: 2, t: "Open a Vortex space", d: "A single link for updates, files, and approvals." },
                { n: 3, t: "Invite guests", d: "Clients join via magic link, no account needed." },
                { n: 4, t: "Track payments", d: "Totals, paid, and outstanding at a glance." },
                { n: 5, t: "Close the project", d: "Archive history and lock reviews." },
                { n: 6, t: "Showcase reviews", d: "Publish verified feedback through the Reviews API." },
              ].map(({ n, t, d }) => (
                <motion.li variants={fadeUp} key={n} className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-[var(--surface-2)] grid place-items-center border border-[var(--border)] text-sm font-semibold text-[var(--accent)]">
                    {n}
                  </div>
                  <h3 className="text-base font-semibold">{t}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{d}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      <section id="trust" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">
              Clients trust what they can see
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-[var(--text-muted)]">
              Every update lives in the Vortex. Clients can comment, upload files, and approve outcomes without endless back-and-forth.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-strong)] px-5 py-3 text-sm font-medium text-[#041017] hover:bg-[var(--accent)]">
                Start now <ArrowRight size={18} />
              </Link>
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-5 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)]">
                Explore Reviews API
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold">
              Reviews that carry weight
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-[var(--text-muted)]">
              Reviews are locked until a project closes. Once submitted, they are immutable and can be shared through the Vortex Reviews API.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold">Ready to enter the Vortex?</h2>
            <p className="mt-2 text-[var(--text-muted)]">
              Create a workspace, invite a client, and ship with clarity.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-strong)] px-5 py-3 text-sm md:text-base font-medium text-[#041017] hover:bg-[var(--accent)]">
                Create your workspace <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-5 py-3 text-sm md:text-base font-medium text-[var(--text)] hover:bg-[var(--surface)]">
                I already have one
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm text-[var(--text-subtle)]">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)]">
              <Sparkles size={14} style={{ color: ACCENT }} />
            </span>
            <span className="font-semibold text-[var(--text)]">Vortex</span>
            <span className="hidden sm:inline">A developer-first freelance workspace</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[var(--text)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--text)]">Terms</Link>
            <span>Ac {new Date().getFullYear()} Vortex</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
