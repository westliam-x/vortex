"use client";

import { Paperclip, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui";

type GuestFileUploadProps = {
  uploadProgress?: number;
  loading?: boolean;
  onUpload: (file: File) => void;
};

export default function GuestFileUpload({
  uploadProgress = 0,
  loading = false,
  onUpload,
}: GuestFileUploadProps) {
  return (
    <div className="space-y-3 rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface2)] p-3">
      <p className="inline-flex items-center gap-2 text-sm text-[var(--text)]">
        <UploadCloud size={14} />
        Upload files for this project
      </p>
      <p className="text-xs text-[var(--muted)]">Allowed formats: PDF, PNG, JPG, ZIP</p>
      <p className="text-xs text-[var(--muted)]">Maximum size: 25MB per file</p>

      <label className="inline-flex cursor-pointer items-center gap-2">
        <Button size="xs" variant="secondary" leftIcon={<Paperclip size={12} />} disabled={loading}>
          Select file
        </Button>
        <input
          type="file"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
          }}
        />
      </label>

      {uploadProgress > 0 ? (
        <p className="text-xs text-[var(--muted)]">Uploading... {uploadProgress}%</p>
      ) : null}
    </div>
  );
}

export type { GuestFileUploadProps };
