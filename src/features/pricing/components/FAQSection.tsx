import { SectionCard } from "@/components/patterns";
import { pricingFaq } from "../config";

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-4xl space-y-3">
      <h2 className="text-xl font-semibold text-[var(--text)]">FAQ</h2>
      <div className="space-y-3">
        {pricingFaq.map((item) => (
          <SectionCard key={item.question} title={item.question}>
            <p className="text-sm text-[var(--muted)]">{item.answer}</p>
          </SectionCard>
        ))}
      </div>
    </section>
  );
}
