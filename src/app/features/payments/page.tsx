"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Wallet } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/features/marketing";

const flow = [
  "Invoice created with project context and due date.",
  "Collection launched via provider and tracked with payment events.",
  "Status updates reflected in invoice details and project state.",
  "Handover lock can align with paid status to protect delivery value.",
];

export default function PaymentsFeaturePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(760px circle at 0% 0%, rgba(0,122,255,0.18), transparent 58%), radial-gradient(720px circle at 92% 14%, rgba(0,255,148,0.14), transparent 56%)",
        }}
      />
      <MarketingNav />

      <section id="invoices" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Revenue clarity</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Invoice-to-payment visibility without spreadsheet drift.</h1>
          <p className="mt-3 max-w-3xl text-[var(--muted)]">
            Vortex makes revenue state explicit. Invoices, collections, and payment events are tied to project execution, so finance and delivery stay aligned.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 lg:col-span-2">
              <Image
                src="/images/payments.png"
                alt="Payments feature placeholder"
                width={1400}
                height={860}
                className="h-auto w-full rounded-xl border border-[var(--border)]"
              />
            </article>
            <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h2 className="text-xl font-semibold">Collection flow</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                {flow.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 text-[var(--mint)]" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)]">
                <FileText size={17} style={{ color: "var(--accent)" }} />
              </span>
              <h3 className="mt-3 text-lg font-semibold">Invoice operations</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Draft, send, and monitor invoice states with totals, due dates, and context panels built for decision speed.
              </p>
            </article>
            <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface2)]">
                <Wallet size={17} style={{ color: "var(--accent)" }} />
              </span>
              <h3 className="mt-3 text-lg font-semibold">Payment telemetry</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Payment timelines and confirmation states reduce uncertainty and prevent handover without financial closure.
              </p>
            </article>
          </div>

          <article id="blaaiz" className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h3 className="text-xl font-semibold">Virtual bank accounts powered by Blaaiz</h3>
            <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
              Vortex can generate virtual bank account references through the Blaaiz integration flow, so teams can collect funds
              with cleaner traceability and map collections back to invoices and projects.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface2)] px-3 py-1 text-xs text-[var(--muted)]">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--mint)]" />
              Powered by Blaaiz
            </div>
          </article>

          <div className="mt-10">
            <Link href="/features/reviews" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--mint)] hover:text-[var(--text)]">
              Next: Reviews & trust layer <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
