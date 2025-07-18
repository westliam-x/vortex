// components/ui/Button.tsx
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

const buttonStyles = cva(
  "inline-flex items-center cursor-pointer justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
      outline: "bg-transparent border border-gray-600 text-gray-200 hover:bg-gray-700",
        primary: "bg-[#985EFF] hover:bg-[#985EFF] text-white",
        secondary: "bg-gray-700 hover:bg-gray-600 text-white",
        destructive: "bg-red-600 hover:bg-red-700 text-white",
        ghost: "bg-transparent text-white hover:bg-white/10",
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