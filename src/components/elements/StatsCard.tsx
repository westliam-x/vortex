import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "default" | "success" | "warning" | "info";
  description?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
  description,
}: StatCardProps) {
  const toneStyles: Record<NonNullable<StatCardProps["tone"]>, string> = {
    default: "bg-[var(--surface-2)] text-[var(--text)]",
    success: "bg-[rgba(34,197,94,0.18)] text-[var(--success)]",
    warning: "bg-[rgba(245,158,11,0.18)] text-[var(--warning)]",
    info: "bg-[rgba(96,165,250,0.18)] text-[var(--info)]",
  };

  return (
    <Card className="flex items-center justify-between gap-6 p-5">
      {/* Text Section */}
      <div className="flex flex-col">
        <p className="text-sm font-medium text-[var(--text-subtle)]">{label}</p>
        <h3 className="text-2xl font-semibold text-[var(--text)]">{value}</h3>
        {description && (
          <span className="text-xs text-[var(--text-muted)] mt-1">{description}</span>
        )}
      </div>

      {/* Icon Section */}
      <div
        className={`flex items-center justify-center h-12 w-12 rounded-full ${toneStyles[tone]}`}
      >
        <Icon className="h-6 w-6" />
      </div>
    </Card>
  );
}
