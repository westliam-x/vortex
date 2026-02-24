"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Banknote, Bot, FolderKanban, Signal, Star, Wallet } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/features/marketing";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const pages = [
  {
    href: "/features/workspace",
    title: "Workspace & Spaces",
    body: "How dashboard, projects, clients, team, and share spaces work as one delivery flow.",
    icon: FolderKanban,
    image: "/illustrations/feature-workspace.svg",
  },
  {
    href: "/features/payments",
    title: "Invoices & Payments",
    body: "How linked invoices, collections, and payment events produce cleaner cash flow visibility.",
    icon: Wallet,
    image: "/illustrations/feature-payments.svg",
  },
  {
    href: "/features/payments#blaaiz",
    title: "Virtual Accounts (Blaaiz)",
    body: "How virtual bank accounts powered by Blaaiz support cleaner collection references and reconciliation.",
    icon: Banknote,
    image: "/illustrations/feature-payments.svg",
  },
  {
    href: "/features/reviews",
    title: "Reviews & Trust",
    body: "How verified reviews connect to completed work and power your public profile credibility.",
    icon: Star,
    image: "/illustrations/feature-reviews.svg",
  },
  {
    href: "/features/signal",
    title: "Signal & Discover",
    body: "How availability, discovery, and smart invites turn collaboration into repeatable growth.",
    icon: Signal,
    image: "/illustrations/feature-signal.svg",
  },
  {
    href: "/vora-ai",
    title: "Vora Assistant",
    body: "Dedicated deep dive into drafting, provider modes, owner-only workflows, and planning utility.",
    icon: Bot,
    image: "/illustrations/landing-vora.svg",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(780px circle at 12% -8%, rgba(0,255,148,0.12), transparent 60%), radial-gradient(820px circle at 90% 8%, rgba(0,122,255,0.14), transparent 58%)",
        }}
      />
      <MarketingNav />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Explore the Vortex platform in depth</h1>
            <p className="mt-3 max-w-3xl text-[var(--muted)]">
              Each page below breaks down one part of the product architecture so prospects can understand why Vortex is different.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {pages.map((page, idx) => {
              const Icon = page.icon;
              return (
                <motion.article
                  key={page.href}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.04 }}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <Image
                    src={page.image}
                    alt={`${page.title} preview placeholder`}
                    width={1200}
                    height={700}
                    className="h-auto w-full rounded-xl border border-[var(--border)]"
                  />
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)]">
                        <Icon size={16} style={{ color: "var(--accent)" }} />
                      </span>
                      <h2 className="text-lg font-semibold">{page.title}</h2>
                    </div>
                    <p className="mt-2 text-sm text-[var(--muted)]">{page.body}</p>
                    <Link
                      href={page.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--mint)] hover:text-[var(--text)]"
                    >
                      Open deep dive <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
