"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Rocket,
  Users,
  FileText,
  Share2,
  BadgeDollarSign,
  MessageSquareHeart,
  ShieldCheck,
  ArrowRight,
  TerminalSquare,
} from "lucide-react";

const accent = "#985EFF"; // brand accent


const easeBezier: [number, number, number, number] = [0.21, 1, 0.21, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeBezier },
  },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};


export default function LandingPage() {
  const reduce = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#090909] text-white overflow-x-clip">
      
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(600px circle at 50% -10%, rgba(152,94,255,0.25), transparent 60%)",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <Rocket size={16} style={{ color: accent }} />
              </span>
              <span className="text-lg font-bold" style={{ color: accent }}>Vortex</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#how" className="hover:text-white">How it works</a>
              <a href="#reviews" className="hover:text-white">Reviews API</a>
              <a href="#faq" className="hover:text-white">FAQ</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:inline-block text-sm text-gray-300 hover:text-white">Login</Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-[#985EFF] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-[#8d5df9]"
              >
                Get started <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center">
            <motion.h1 variants={fadeUp} className="text-4xl leading-tight font-extrabold md:text-6xl">
              The remote dev hub for
              <span className="block" style={{ color: accent }}>projects, clients, and the Vortex</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
              Plan work, onboard clients, share updates in a unique Vortex space, generate invoices, and collect reviews — all in one place.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-md bg-[#985EFF] px-5 py-3 text-sm md:text-base font-medium hover:bg-[#8d5df9]">
                Start free <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 py-3 text-sm md:text-base font-medium text-white hover:bg-white/10">
                Live demo
              </Link>
            </motion.div>
            <motion.div variants={fade} className="mt-8 text-xs text-gray-400">
              Built for remote teams • Loved by freelancers • USD & NGN invoices supported
            </motion.div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.21, 1, 0.21, 1] }}
            viewport={{ once: true, amount: 0.4 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { Icon: TerminalSquare, title: "Projects", body: "Plan tasks, sprints, and milestones with zero fuss." },
              { Icon: Users, title: "Clients", body: "Onboard clients cleanly — keep context and comms in one place." },
              { Icon: Share2, title: "The Vortex", body: "A shareable, unique space per project for updates, links, & docs." },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/40">
                    <Icon size={18} style={{ color: accent }} />
                  </span>
                  <h3 className="text-base font-semibold">{title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-300">{body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold">Everything you need to ship</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-gray-300">
              Vortex bundles the essentials for remote development — no switching tabs or tools. Focus on the work.
            </motion.p>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { Icon: TerminalSquare, title: "Projects", body: "Kanban, milestones, priorities, and deadlines that stay out of your way." },
                { Icon: Users, title: "Team & Roles", body: "Invite via email, assign roles, keep permissions clean and auditable." },
                { Icon: FileText, title: "Invoices", body: "Create USD/NGN invoices, add custom fields, one‑click PDF download." },
                { Icon: Share2, title: "Vortex Space", body: "A unique, shareable hub per project for updates, links, and docs." },
                { Icon: MessageSquareHeart, title: "Client Feedback", body: "Comment threads, decisions, and approvals tracked in context." },
                { Icon: BadgeDollarSign, title: "Reviews API", body: "Collect reviews at wrap‑up and embed anywhere via API." },
              ].map(({ Icon, title, body }) => (
                <motion.div variants={fadeUp} key={title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/40">
                      <Icon size={18} style={{ color: accent }} />
                    </span>
                    <h3 className="text-base font-semibold">{title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">{body}</p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3 text-sm text-gray-300">
              <ShieldCheck size={18} style={{ color: accent }} /> No trackers, no noise — just the work and the people.
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold">How it works</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-gray-300">
              Share a single link with everyone — clients and team — and keep the project moving.
            </motion.p>

            <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { n: 1, t: "Create a project", d: "Define scope, milestones, and owners." },
                { n: 2, t: "Spin up a Vortex", d: "A unique space for updates, links, and docs." },
                { n: 3, t: "Invite", d: "Add the team & client by email or share the Vortex link." },
                { n: 4, t: "Ship & update", d: "Post progress, attach references, keep decisions visible." },
                { n: 5, t: "Invoice & wrap", d: "Send a clean invoice, mark complete, archive neatly." },
                { n: 6, t: "Collect reviews", d: "Publishable reviews via the embeddable API." },
              ].map(({ n, t, d }) => (
                <motion.li variants={fadeUp} key={n} className="relative rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-[#1b1b1b] grid place-items-center border border-white/10 text-sm font-semibold" style={{ color: accent }}>{n}</div>
                  <h3 className="text-base font-semibold">{t}</h3>
                  <p className="mt-1 text-sm text-gray-300">{d}</p>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* Reviews API highlight */}
      <section id="reviews" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 md:p-10">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold">Turn client feedback into your unfair advantage</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-gray-300">
              At project completion, clients leave a structured review. Expose those reviews anywhere with the **Vortex Reviews API** — portfolio, docs, or even your homepage.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-md bg-[#985EFF] px-5 py-3 text-sm font-medium hover:bg-[#8d5df9]">
                Try it free <ArrowRight size={18} />
              </Link>
              <a href="#faq" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10">
                Learn more
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center">FAQ</motion.h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:gap-6">
            {[ 
              { q: "Who is Vortex for?", a: "Remote teams and freelance developers who need a single hub for clients, projects, and communication." },
              { q: "What’s the Vortex space?", a: "A unique, shareable link per project where updates, feedback, links, and docs live together." },
              { q: "Can I invoice clients?", a: "Yes — create USD or NGN invoices with custom fields and one‑click PDF download." },
              { q: "Do clients need an account?", a: "You can invite by email or share the Vortex link — clients can view and respond without friction." },
            ].map(({ q, a }) => (
              <motion.div key={q} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="font-medium">{q}</p>
                <p className="mt-2 text-sm text-gray-300">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-6 md:p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to enter the Vortex?</h2>
            <p className="mt-2 text-gray-300">Launch a project, spin up a Vortex, invite your client, and start shipping.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-md bg-[#985EFF] px-5 py-3 text-sm md:text-base font-medium hover:bg-[#8d5df9]">
                Create your account <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 py-3 text-sm md:text-base font-medium text-white hover:bg-white/10">
                I already have one
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/5">
              <Rocket size={14} style={{ color: accent }} />
            </span>
            <span className="font-semibold" style={{ color: accent }}>Vortex</span>
            <span className="hidden sm:inline">• A hub for remote developers</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>© {new Date().getFullYear()} Vortex</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
