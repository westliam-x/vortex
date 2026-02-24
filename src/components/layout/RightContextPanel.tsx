import type { ReactNode } from "react";
import { cn } from "@/lib";

type RightContextPanelProps = {
  children: ReactNode;
  className?: string;
};

export default function RightContextPanel({ children, className }: RightContextPanelProps) {
  return (
    <aside className={cn("space-y-4 xl:sticky xl:top-20", className)}>
      {children}
    </aside>
  );
}

export type { RightContextPanelProps };
