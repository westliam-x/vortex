"use client";

import { useRef, useState, type DragEvent } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib";

type FileUploadDropzoneProps = {
  onUpload: (file: File) => void;
  disabled?: boolean;
  allowedFormatsText?: string;
  maxSizeText?: string;
};

export default function FileUploadDropzone({
  onUpload,
  disabled = false,
  allowedFormatsText = "PDF, PNG, JPG, ZIP",
  maxSizeText = "Max 25MB per file",
}: FileUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (disabled) return;
    const file = event.dataTransfer.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={onDrop}
      className={cn(
        "rounded-lg border border-dashed p-3 text-center transition-colors",
        dragActive ? "border-[var(--blue)] bg-[var(--surface2)]" : "border-[var(--border)] bg-[var(--surface)]",
        disabled && "cursor-not-allowed opacity-60"
      )}
    >
      <p className="inline-flex items-center gap-2 text-sm text-[var(--text)]">
        <Upload size={14} />
        Drag and drop files here
      </p>
      <p className="mt-1 text-xs text-[var(--muted)]">{allowedFormatsText}</p>
      <p className="text-xs text-[var(--muted)]">{maxSizeText}</p>
      <Button
        type="button"
        size="xs"
        variant="secondary"
        className="mt-3"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        Browse files
      </Button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file && !disabled) {
            onUpload(file);
          }
        }}
      />
    </div>
  );
}

export type { FileUploadDropzoneProps };
