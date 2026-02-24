import type { ReactNode } from "react";
import { cn } from "@/lib";

type ContentGridProps = {
  main: ReactNode;
  right: ReactNode;
  className?: string;
};

export default function ContentGrid({ main, right, className }: ContentGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 xl:grid-cols-12", className)}>
      <div className="xl:col-span-8 2xl:col-span-9">{main}</div>
      <div className="xl:col-span-4 2xl:col-span-3">{right}</div>
    </div>
  );
}

export type { ContentGridProps };
