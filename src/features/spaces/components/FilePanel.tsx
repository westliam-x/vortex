"use client";

import { toast } from "react-toastify";
import { Lock } from "lucide-react";
import { SectionCard } from "@/components/patterns";
import type { VortexFile } from "@/types/vortex";
import FileEmptyState from "./FileEmptyState";
import FilePanelSkeleton from "./FilePanelSkeleton";
import FileRow from "./FileRow";
import FileUploadDropzone from "./FileUploadDropzone";

type FilePanelProps = {
  files: VortexFile[];
  loading?: boolean;
  locked?: boolean;
  uploadProgress?: number;
  onUpload: (file: File) => void;
};

export default function FilePanel({
  files,
  loading = false,
  locked = false,
  uploadProgress = 0,
  onUpload,
}: FilePanelProps) {
  return (
    <SectionCard title="Files" description="Assets, contracts, and delivery artifacts">
      {locked ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-[var(--warning)]/50 bg-[var(--surface2)] px-3 py-2 text-xs text-[var(--warning)]">
          <Lock size={12} />
          Handover is locked. File downloads are unavailable.
        </div>
      ) : null}
      <FileUploadDropzone onUpload={onUpload} />
      {uploadProgress > 0 ? (
        <p className="mt-2 text-xs text-[var(--muted)]">Uploading... {uploadProgress}%</p>
      ) : null}

      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-[1.4fr_0.8fr_0.7fr_1fr] gap-2 px-1 text-[10px] uppercase tracking-wide text-[var(--muted)]">
          <span>Name</span>
          <span>Type</span>
          <span>Size</span>
          <span>Uploaded by</span>
        </div>

        {loading ? <FilePanelSkeleton /> : null}
        {!loading && files.length === 0 ? <FileEmptyState /> : null}
        {!loading
          ? files.map((file) => (
              <FileRow
                key={file.id ?? file._id ?? `${file.fileName}-${file.size}`}
                file={file}
                locked={locked}
                onCopyLink={() => {
                  toast.info("Copy link action is a UI placeholder.");
                }}
              />
            ))
          : null}
      </div>
    </SectionCard>
  );
}

export type { FilePanelProps };
