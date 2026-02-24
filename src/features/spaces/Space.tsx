"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Button, Card, EmptyState, StatusBadge } from "@/components/ui";
import { useProject } from "@/features/projects";
import { useVortexMessages } from "@/hooks/vortex/useVortexMessages";
import { useVortexFiles } from "@/hooks/vortex/useVortexFiles";
import { useVortexReview } from "@/hooks/vortex/useVortexReview";
import {
  EventStream,
  FilePanel,
  MessageComposer,
  MessageList,
  ProjectStatusPanel,
  SpaceLayout,
  SpaceTopBar,
} from "./components";
import { getProjectId } from "@/lib/ids";

export default function Space() {
  const router = useRouter();
  const { id } = useParams();
  const projectId = typeof id === "string" ? id : undefined;
  const [messageBody, setMessageBody] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  const { project, client, loading } = useProject(projectId);
  const resolvedProjectId = getProjectId(project);

  const {
    messages,
    loading: loadingMessages,
    sendMessage,
  } = useVortexMessages(resolvedProjectId ?? undefined);

  const {
    files,
    loading: loadingFiles,
    uploadProgress,
    uploadFile,
  } = useVortexFiles(resolvedProjectId ?? undefined);
  const { review } = useVortexReview(resolvedProjectId ?? undefined);

  const isClosed = project?.status === "Completed" || project?.status === "Archived";
  const locked = !isClosed;
  const invoiceHref: string | undefined = undefined;
  const reviewState = (() => {
    if (review?.featured) return "published" as const;
    if (review?.status === "Approved") return "approved" as const;
    if (review?.status === "Pending") return "submitted" as const;
    if (locked) return "not_eligible" as const;
    return "eligible" as const;
  })();

  const events = useMemo(() => {
    const messageEvents = messages.slice(0, 8).map((item, index) => ({
      id: `msg-${item.id ?? item._id ?? index}`,
      time: item.createdAt ? format(new Date(item.createdAt), "HH:mm:ss") : "--:--:--",
      actor: item.authorType === "guest" ? item.guestEmail ?? "guest" : item.authorType,
      action: "message.posted",
      target: "thread",
      status: "success",
      category: "Auth" as const,
    }));

    const fileEvents = files.slice(0, 8).map((file, index) => ({
      id: `file-${file.id ?? file._id ?? index}`,
      time: file.createdAt ? format(new Date(file.createdAt), "HH:mm:ss") : "--:--:--",
      actor: file.uploaderType === "guest" ? file.guestEmail ?? "guest" : file.uploaderType,
      action: "file.uploaded",
      target: file.fileName,
      status: file.virusScanStatus === "blocked" ? "failure" : "success",
      category: "Files" as const,
    }));

    return [...messageEvents, ...fileEvents]
      .sort((a, b) => (a.time > b.time ? -1 : 1))
      .slice(0, 12);
  }, [files, messages]);

  if (!loading && !project) {
    return (
      <EmptyState
        title="Space not found"
        description="This space may not exist or you may not have access."
        action={
          <Link href="/spaces">
            <Button variant="secondary">Back to spaces</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <SpaceTopBar
        title={project?.title ? `${project.title} Space` : "Space"}
        subtitle="Developer-style collaboration workspace for messages, files, and status."
        statusSlot={<StatusBadge kind="project" status={project?.status ?? "Pending"} />}
        locked={locked}
        invoiceHref={invoiceHref}
      />

      <SpaceLayout
        filesPane={
          <FilePanel
            files={files}
            loading={loadingFiles}
            locked={locked}
            uploadProgress={uploadProgress}
            onUpload={(file) => {
              uploadFile(file).catch((err) => {
                toast.error(err instanceof Error ? err.message : "Upload failed");
              });
            }}
          />
        }
        messagesPane={
          <Card className="flex min-h-[560px] flex-col p-0">
            <div className="border-b border-[var(--border)] px-4 py-3">
              <h2 className="text-base font-semibold text-[var(--text)]">Messages</h2>
              <p className="text-xs text-[var(--muted)]">Project thread with daily grouping.</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <MessageList
                messages={messages}
                loading={loadingMessages}
                onSendFirstMessage={() => {
                  composerRef.current?.focus();
                }}
              />
            </div>

            <div className="mt-auto border-t border-[var(--border)] bg-[var(--surface)] p-3">
              <MessageComposer
                ref={composerRef}
                value={messageBody}
                onChange={setMessageBody}
                sending={sendingMessage}
                sendDisabled={!messageBody.trim()}
                onAttachClick={() => toast.info("File attach is available from the Files panel.")}
                onSend={() => {
                  if (!messageBody.trim()) return;
                  setSendingMessage(true);
                  void sendMessage(messageBody)
                    .then(() => setMessageBody(""))
                    .catch((err) => {
                      toast.error(err instanceof Error ? err.message : "Failed to send message");
                    })
                    .finally(() => setSendingMessage(false));
                }}
              />
            </div>
          </Card>
        }
        statusPane={
          <ProjectStatusPanel
            projectStatus={project?.status ?? "Pending"}
            handoverLocked={locked}
            invoiceHref={invoiceHref}
            deadline={project?.deadline ? format(new Date(project.deadline), "dd MMM yyyy") : "Not set"}
            budget={project?.budget ?? null}
            clientName={client?.name}
            paymentSummary="Awaiting invoice settlement"
            shareLinkStatus={project?.isPublic ? "Enabled" : "Disabled"}
            reviewState={reviewState}
            reviewReason="Unlocks after payment confirms"
            reviewLinkHref={reviewState === "published" ? "/reviews" : undefined}
            reviewActionLabel="Request review"
            onReviewAction={() => router.push("/reviews")}
            onEditProject={() => router.push("/projects")}
            onOpenInvoice={() => router.push("/invoices")}
          />
        }
        activityPane={<EventStream events={events} loading={loadingFiles || loadingMessages} />}
      />
    </div>
  );
}
