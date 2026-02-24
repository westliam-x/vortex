"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { SectionCard } from "@/components/patterns";
import { Button, Card, EmptyState, StatusBadge } from "@/components/ui";
import { useGuestVortex } from "@/hooks/guest/useGuestVortex";
import { MessageList, SpaceTopBar } from "@/features/spaces";
import GuestFileUpload from "./components/GuestFileUpload";
import GuestMessageComposer from "./components/GuestMessageComposer";
import GuestOtpGate from "./components/GuestOtpGate";
import GuestSpaceLayout from "./components/GuestSpaceLayout";

export default function GuestSpace() {
  const { token } = useParams();
  const tokenValue = typeof token === "string" ? token : "";
  const [messageBody, setMessageBody] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  const {
    tokenValid,
    project,
    accessStep,
    email,
    setEmail,
    otp,
    setOtp,
    messages,
    files,
    uploadProgress,
    loading,
    error,
    requestAccess,
    verifyAccess,
    sendMessage,
    uploadFile,
  } = useGuestVortex(tokenValue);

  const summaryItems = useMemo(
    () => [
      { label: "Project", value: project?.title ?? "-" },
      { label: "Status", value: project?.status ?? "-" },
      {
        label: "Deadline",
        value: project?.deadline ? format(new Date(project.deadline), "dd MMM yyyy") : "Not set",
      },
      { label: "Payments", value: "Payment updates are shared by owner" },
      { label: "Share link", value: "Guest token active" },
    ],
    [project?.deadline, project?.status, project?.title]
  );

  if (!tokenValid) {
    return (
      <main className="min-h-screen bg-[var(--bg)] p-6 text-[var(--text)]">
        <div className="mx-auto max-w-6xl">
          <EmptyState
            title="Invalid guest link"
            description="Ask the project owner for a new Vortex link."
            action={
              <Link href="/">
                <Button variant="secondary">Back to Vortex</Button>
              </Link>
            }
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] p-6 text-[var(--text)]">
      <div className="mx-auto max-w-7xl space-y-6">
        <GuestSpaceLayout
          topBar={
            <SpaceTopBar
              title={project?.title ? `${project.title} Guest Space` : "Guest Space"}
              subtitle={project?.description ?? "Secure project handover workspace."}
              statusSlot={<StatusBadge kind="project" status={project?.status ?? "Pending"} />}
              locked={false}
            />
          }
          verified={accessStep === "ready"}
          otpGate={
            <GuestOtpGate
              step={accessStep === "verify" ? "verify" : "request"}
              email={email}
              otp={otp}
              loading={loading}
              error={error}
              onEmailChange={setEmail}
              onOtpChange={setOtp}
              onRequestAccess={requestAccess}
              onVerifyAccess={verifyAccess}
            />
          }
          messagesPane={
            <Card className="flex min-h-[560px] flex-col p-0">
              <div className="border-b border-[var(--border)] px-4 py-3">
                <h2 className="text-base font-semibold text-[var(--text)]">Messages</h2>
                <p className="text-xs text-[var(--muted)]">Share updates and approvals with the owner.</p>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <MessageList
                  messages={messages}
                  loading={loading}
                  onSendFirstMessage={() => composerRef.current?.focus()}
                />
              </div>

              <div className="mt-auto border-t border-[var(--border)] bg-[var(--surface)] p-3">
                <GuestMessageComposer
                  ref={composerRef}
                  value={messageBody}
                  loading={sendingMessage}
                  onChange={setMessageBody}
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
          filesPane={
            <SectionCard title="Files" description="Upload files for project handover">
              <GuestFileUpload
                uploadProgress={uploadProgress}
                loading={loading}
                onUpload={(file) => {
                  uploadFile(file).catch((err) => {
                    toast.error(err instanceof Error ? err.message : "Failed to upload file");
                  });
                }}
              />

              <div className="mt-4 space-y-2">
                {files.length ? (
                  files.map((file) => (
                    <div
                      key={file.id ?? file._id ?? file.fileName}
                      className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-3 py-2"
                    >
                      <a href={file.url} target="_blank" rel="noreferrer" className="text-sm text-[var(--text)] underline">
                        {file.fileName}
                      </a>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {Math.round(file.size / 1024)} KB
                        {file.createdAt
                          ? ` • ${format(new Date(file.createdAt), "dd MMM yyyy, HH:mm")}`
                          : ""}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[var(--muted)]">No files uploaded yet.</p>
                )}
              </div>
            </SectionCard>
          }
          summaryPane={
            <SectionCard title="Project Summary" description="Guest-safe project context">
              <StatusBadge kind="project" status={project?.status ?? "Pending"} />
              <dl className="mt-4 space-y-2 text-sm">
                {summaryItems.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-3">
                    <dt className="text-[var(--muted)]">{item.label}</dt>
                    <dd className="text-right text-[var(--text)]">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4">
                <Link href="/">
                  <Button size="xs" variant="secondary">
                    Exit
                  </Button>
                </Link>
              </div>
            </SectionCard>
          }
        />
      </div>
    </main>
  );
}
