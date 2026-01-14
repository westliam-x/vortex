"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib";

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-[var(--surface-2)]/70",
      className
    )}
    {...props}
  />
);

export default Skeleton;
