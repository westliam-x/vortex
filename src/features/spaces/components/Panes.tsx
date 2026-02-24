"use client";

import type { ReactNode } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";
import { SectionCard } from "@/components/patterns";
import { Button, EmptyState, Input, Textarea } from "@/components/ui";
import type { VortexFile, VortexMessage } from "@/types/vortex";
import { getId } from "@/lib/ids";

type FilesPaneProps = {
  files: VortexFile[];
  loading?: boolean;
  uploadProgress?: number;
  onUpload: (file: File) => void;
};

export function FilesPane({ files, loading, uploadProgress = 0, onUpload }: FilesPaneProps) {
  return (
    <SectionCard title="Files" description="Project assets and approvals">
      <div className="space-y-3">
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Loading files...</p>
        ) : files.length ? (
          files.map((file) => (
            <div
              key={getId(file) ?? `${file.fileName}-${file.size}`}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2 text-sm"
            >
              <a href={file.url} className="truncate underline" target="_blank" rel="noreferrer">
                {file.fileName}
              </a>
              <span className="ml-3 shrink-0 text-xs text-[var(--muted)]">{Math.round(file.size / 1024)} KB</span>
            </div>
          ))
        ) : (
          <EmptyState title="No files yet" description="Upload assets to share with collaborators." />
        )}
      </div>

      <label className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm hover:bg-[var(--surface2)]">
        <Paperclip size={14} />
        Upload file
        <input
          type="file"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
          }}
        />
      </label>
      {uploadProgress > 0 ? <p className="mt-2 text-xs text-[var(--muted)]">Uploading... {uploadProgress}%</p> : null}
    </SectionCard>
  );
}

type MessagesPaneProps = {
  messages: VortexMessage[];
  loading?: boolean;
  composerType?: "input" | "textarea";
  messageBody: string;
  onMessageBodyChange: (value: string) => void;
  onSend: () => void;
  sendDisabled?: boolean;
};

export function MessagesPane({
  messages,
  loading,
  composerType = "input",
  messageBody,
  onMessageBodyChange,
  onSend,
  sendDisabled,
}: MessagesPaneProps) {
  return (
    <SectionCard title="Messages" description="Conversation stream">
      <div className="space-y-3">
        {loading ? (
          <p className="text-sm text-[var(--muted)]">Loading messages...</p>
        ) : messages.length ? (
          messages.map((item) => (
            <div key={getId(item) ?? `${item.authorType}-${item.body}`} className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
              <p className="text-xs text-[var(--muted)]">{item.authorType}</p>
              <p className="mt-1 text-sm text-[var(--text)]">{item.body}</p>
            </div>
          ))
        ) : (
          <EmptyState title="No messages yet" description="Start the conversation to keep everyone aligned." />
        )}
      </div>

      <div className="mt-3 space-y-2">
        {composerType === "textarea" ? (
          <Textarea
            rows={3}
            value={messageBody}
            onChange={(event) => onMessageBodyChange(event.target.value)}
            placeholder="Write a message..."
          />
        ) : (
          <Input
            value={messageBody}
            onChange={(event) => onMessageBodyChange(event.target.value)}
            placeholder="Write a message..."
          />
        )}
        <Button className="w-full gap-2" disabled={sendDisabled} onClick={onSend}>
          <SendHorizontal size={14} />
          Send
        </Button>
      </div>
    </SectionCard>
  );
}

type StatusPaneProps = {
  statusBadge: ReactNode;
  metadata: Array<{ label: string; value: ReactNode }>;
  actions?: ReactNode;
};

export function StatusPane({ statusBadge, metadata, actions }: StatusPaneProps) {
  return (
    <SectionCard title="Status" description="Current workspace context" actions={actions}>
      <div className="space-y-4">
        {statusBadge}
        <dl className="space-y-2 text-sm">
          {metadata.map((item) => (
            <div key={item.label} className="flex items-start justify-between gap-3">
              <dt className="text-[var(--muted)]">{item.label}</dt>
              <dd className="text-right text-[var(--text)]">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionCard>
  );
}

type ActivityPaneProps = {
  events: Array<{ title: string; meta?: string }>;
  fallback?: string;
};

export function ActivityPane({ events, fallback = "No recent activity." }: ActivityPaneProps) {
  return (
    <SectionCard title="Event Stream" description="Recent workspace activity">
      {events.length ? (
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={`${event.title}-${index}`} className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2">
              <p className="text-sm text-[var(--text)]">{event.title}</p>
              {event.meta ? <p className="text-xs text-[var(--muted)]">{event.meta}</p> : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted)]">{fallback}</p>
      )}
    </SectionCard>
  );
}

export type { FilesPaneProps, MessagesPaneProps, StatusPaneProps, ActivityPaneProps };
