// components/ui/Button.tsx
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

const buttonStyles = cva(
  "inline-flex items-center cursor-pointer justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        outline:
          "bg-transparent border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface)] focus:ring-[var(--accent)]/40",
        primary:
          "bg-[var(--accent-strong)] hover:bg-[var(--accent)] text-[#041017] focus:ring-[var(--accent)]/40",
        secondary:
          "bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--text)] focus:ring-[var(--accent)]/30",
        destructive:
          "bg-[var(--error)] hover:bg-[#dc2626] text-white focus:ring-[var(--error)]/40",
        ghost:
          "bg-transparent text-[var(--text)] hover:bg-[var(--surface)] focus:ring-[var(--accent)]/30",
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

 const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
};

export default Button;
