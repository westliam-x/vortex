"use client";

import { forwardRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, description, children, className }, ref) => {
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

    if (!open || typeof document === "undefined") return null;

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <button
          type="button"
          aria-label="Close modal"
          className="absolute inset-0 h-full w-full bg-[var(--overlay)]"
          onClick={onClose}
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative z-10 w-full max-w-xl rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6",
            className
          )}
        >
          {title ? <h2 className="text-lg font-semibold text-[var(--text)]">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm text-[var(--muted)]">{description}</p> : null}
          <div className={cn(title || description ? "mt-4" : "")}>{children}</div>
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
