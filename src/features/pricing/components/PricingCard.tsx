import { Button, Card } from "@/components/ui";
import FeatureList from "./FeatureList";
import type { PricingPlan } from "../config";

type PricingCardProps = {
  plan: PricingPlan;
  billing: "monthly" | "yearly";
  highlighted?: boolean;
};

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

export default function PricingCard({ plan, billing, highlighted = false }: PricingCardProps) {
  const monthly = plan.priceMonthly;
  const yearly = monthly * 10;
  const amount = billing === "monthly" ? monthly : yearly;
  const suffix = billing === "monthly" ? "/mo" : "/yr";
  const isPaid = monthly > 0;

  return (
    <Card
      className={
        highlighted
          ? "border-[var(--blue)] bg-[var(--surface2)] shadow-[0_0_0_1px_var(--blue)]"
          : "border-[var(--border)]"
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-[var(--text)]">{plan.name}</h3>
          {highlighted ? (
            <span className="rounded-full border border-[var(--blue)] bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--text)]">
              Most popular
            </span>
          ) : null}
        </div>

        <div className="flex items-end gap-1">
          <p className="text-3xl font-semibold text-[var(--text)]">{formatPrice(amount)}</p>
          <p className="pb-1 text-sm text-[var(--muted)]">{suffix}</p>
        </div>

        {billing === "yearly" && isPaid ? (
          <p className="text-xs text-[var(--mint)]">2 months free on yearly billing</p>
        ) : null}

        <FeatureList features={plan.features} />

        <Button fullWidth variant={highlighted ? "primary" : "secondary"}>
          {isPaid ? "Upgrade" : "Get started"}
        </Button>
      </div>
    </Card>
  );
}
