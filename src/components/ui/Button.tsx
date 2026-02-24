"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-[var(--mint)] text-[var(--on-accent)] hover:bg-[var(--blue)]",
        secondary: "border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] hover:bg-[var(--surface)]",
        outline: "border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[var(--surface)]",
        ghost: "border-transparent bg-transparent text-[var(--text)] hover:bg-[var(--surface)]",
        destructive: "border-transparent bg-[var(--danger)] text-[var(--text)] hover:bg-[var(--warning)]",
      },
      size: {
        xs: "h-8 px-2.5 text-xs",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

const Spinner = () => (
  <span
    aria-hidden="true"
    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
  />
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        {...props}
      >
        {loading ? <Spinner /> : leftIcon}
        <span>{children}</span>
        {!loading ? rightIcon : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
