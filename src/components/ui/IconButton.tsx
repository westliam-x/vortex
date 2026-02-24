"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib";

const iconButtonStyles = cva(
  "inline-flex items-center justify-center rounded-lg border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-[var(--mint)] text-[var(--on-accent)] hover:bg-[var(--blue)]",
        secondary: "border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] hover:bg-[var(--surface)]",
        outline: "border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--surface)]",
        ghost: "border-transparent bg-transparent text-[var(--text)] hover:bg-[var(--surface)]",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof iconButtonStyles>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(iconButtonStyles({ variant, size }), className)}
      {...props}
    />
  )
);

IconButton.displayName = "IconButton";

export default IconButton;
