"use client";

import { format } from "date-fns";
import { Copy, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui";
import type { VortexFile } from "@/types/vortex";

type FileRowProps = {
  file: VortexFile;
  locked?: boolean;
  onCopyLink?: (file: VortexFile) => void;
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const resolveType = (mimeType: string, fileName: string) => {
  if (mimeType) return mimeType.split("/")[1]?.toUpperCase() ?? mimeType.toUpperCase();
  const ext = fileName.split(".").pop();
  return ext ? ext.toUpperCase() : "FILE";
};

const uploadedBy = (file: VortexFile) => {
  if (file.uploaderType === "guest" && file.guestEmail) return file.guestEmail;
  if (file.uploaderType === "owner") return "Owner";
  if (file.uploaderType === "member") return "Team";
  return "Unknown";
};

export default function FileRow({ file, locked = false, onCopyLink }: FileRowProps) {
  return (
    <div className="space-y-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
      <div className="grid grid-cols-[1.4fr_0.8fr_0.7fr_1fr] gap-2 text-xs text-[var(--muted)]">
        <div className="truncate text-[var(--text)]" title={file.fileName}>
          {file.fileName}
        </div>
        <div>{resolveType(file.mimeType, file.fileName)}</div>
        <div>{formatBytes(file.size)}</div>
        <div className="truncate" title={uploadedBy(file)}>
          {uploadedBy(file)}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-xs text-[var(--muted)]">
        <span>{file.createdAt ? format(new Date(file.createdAt), "dd MMM yyyy, HH:mm") : "No date"}</span>
        <div className="flex items-center gap-2">
          {locked ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-[11px] text-[var(--warning)]">
              <Lock size={12} />
              Locked
            </span>
          ) : (
            <>
              <a href={file.url} target="_blank" rel="noreferrer">
                <Button size="xs" variant="secondary" leftIcon={<Download size={12} />}>
                  Download
                </Button>
              </a>
              <Button size="xs" variant="ghost" leftIcon={<Copy size={12} />} onClick={() => onCopyLink?.(file)}>
                Copy link
              </Button>
            </>
          )}
        </div>
      </div>
      {locked ? <p className="text-xs text-[var(--warning)]">Downloads are locked until handover unlocks.</p> : null}
    </div>
  );
}

export type { FileRowProps };
