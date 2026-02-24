import type { ReactNode } from "react";
import { cn } from "@/lib";

type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <div>
        <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
        {description ? <p className="mt-1 text-xs text-[var(--muted)]">{description}</p> : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export type { FormSectionProps };
