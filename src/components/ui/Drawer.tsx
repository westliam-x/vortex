"use client";

import { forwardRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  title?: string;
  children: ReactNode;
  className?: string;
};

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ open, onClose, side = "right", title, children, className }, ref) => {
    useEffect(() => {
      if (!open) return;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (typeof document === "undefined") return null;

    return createPortal(
      <div
        className={cn(
          "fixed inset-0 z-50",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <button
          type="button"
          aria-label="Close drawer"
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity",
            open ? "bg-[var(--overlay)] opacity-100" : "opacity-0"
          )}
          onClick={onClose}
        />
        <aside
          ref={ref}
          className={cn(
            "absolute top-0 h-full w-full max-w-md border-[var(--border)] bg-[var(--surface)] p-6 transition-transform duration-200",
            side === "right" ? "right-0 border-l" : "left-0 border-r",
            open ? "translate-x-0" : side === "right" ? "translate-x-full" : "-translate-x-full",
            className
          )}
        >
          {title ? <h2 className="text-lg font-semibold text-[var(--text)]">{title}</h2> : null}
          <div className={cn(title ? "mt-4" : "")}>{children}</div>
        </aside>
      </div>,
      document.body
    );
  }
);

Drawer.displayName = "Drawer";

export default Drawer;
