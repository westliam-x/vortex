"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Badge, Button, Card, EmptyState, Input, Textarea } from "@/components/ui";
import { Paperclip, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useGuestVortex } from "@/hooks/guest/useGuestVortex";
import { getId } from "@/lib/ids";

export default function VortexGuestPage() {
  const { token } = useParams();
  const tokenValue = typeof token === "string" ? token : "";
  const [messageBody, setMessageBody] = useState("");
  const {
    tokenValid,
    project,
    isClosed,
    accessStep,
    email,
    setEmail,
    otp,
    setOtp,
    messages,
    files,
    uploadProgress,
    reviewRating,
    setReviewRating,
    reviewComment,
    setReviewComment,
    consent,
    setConsent,
    loading,
    error,
    requestAccess,
    verifyAccess,
    sendMessage,
    uploadFile,
    submitReview,
  } = useGuestVortex(tokenValue);

  if (!tokenValid) {
    return (
      <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
        <div className="mx-auto max-w-3xl">
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
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-subtle)]">Vortex guest space</p>
            <h1 className="text-3xl font-semibold">{project?.title ?? "Loading project..."}</h1>
            <p className="text-sm text-[var(--text-muted)]">{project?.description ?? "Awaiting summary."}</p>
          </div>
          <Badge tone="info">Guest Access</Badge>
        </div>

        {accessStep !== "ready" ? (
          <Card className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[var(--accent)]" />
              <h2 className="text-lg font-semibold">Verify access</h2>
            </div>
            {accessStep === "request" ? (
              <div className="space-y-3">
                <Input placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button onClick={requestAccess} disabled={!email || loading}>
                  Send access code
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Input placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Button onClick={verifyAccess} disabled={!otp || loading}>
                  Verify access
                </Button>
              </div>
            )}
            {error ? <p className="text-xs text-[var(--error)]">{error}</p> : null}
          </Card>
        ) : (
          <>
            <Card className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[var(--accent)]" />
                <h2 className="text-lg font-semibold">Project updates</h2>
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                You can comment and upload files without creating an account. Activity is visible to the project owner.
              </p>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="space-y-4">
                <h3 className="text-lg font-semibold">Messages</h3>
                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <p className="text-sm text-[var(--text-muted)]">No messages yet.</p>
                  ) : (
                    messages.map((item) => (
                      <div key={getId(item) ?? item.body} className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3">
                        <p className="text-xs text-[var(--text-subtle)]">{item.authorType}</p>
                        <p className="text-sm text-[var(--text)]">{item.body}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="space-y-2">
                  <Textarea
                    rows={3}
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Write a comment for the team..."
                  />
                  <Button
                    className="w-full"
                    disabled={!messageBody.trim()}
                    onClick={async () => {
                      await sendMessage(messageBody);
                      setMessageBody("");
                    }}
                  >
                    Send comment
                  </Button>
                </div>
              </Card>

              <Card className="space-y-4">
                <h3 className="text-lg font-semibold">Files</h3>
                <div className="space-y-3">
                  {files.length === 0 ? (
                    <p className="text-sm text-[var(--text-muted)]">
                      No files uploaded yet. Add references or approvals here.
                    </p>
                  ) : (
                    files.map((file) => (
                      <div
                        key={getId(file) ?? file.fileName}
                        className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-muted)]"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Paperclip size={16} />
                          <a href={file.url} className="underline" target="_blank" rel="noreferrer">
                            {file.fileName}
                          </a>
                        </span>
                        <span>{Math.round(file.size / 1024)} KB</span>
                      </div>
                    ))
                  )}
                </div>
                <label className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)] cursor-pointer hover:bg-[var(--surface-2)]">
                  <Paperclip size={16} />
                  Upload file
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        uploadFile(file).catch((err) => {
                          toast.error(err instanceof Error ? err.message : "Failed to upload file");
                        });
                      }
                    }}
                  />
                </label>
                {uploadProgress > 0 ? (
                  <p className="text-xs text-[var(--text-subtle)]">Uploading... {uploadProgress}%</p>
                ) : null}
              </Card>
            </div>

            {isClosed ? (
              <Card className="space-y-4">
                <h3 className="text-lg font-semibold">Leave a review</h3>
                <div className="space-y-3">
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    placeholder="Rating (1-5)"
                  />
                  <Textarea
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share feedback about the project..."
                  />
                  <label className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                    <input type="checkbox" checked={consent} onChange={() => setConsent((c) => !c)} />
                    I consent to a public review.
                  </label>
                  <Button onClick={submitReview} disabled={!reviewComment.trim()}>
                    Submit review
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="space-y-2">
                <p className="text-xs text-[var(--text-subtle)]">
                  Reviews unlock after project closure. The owner will notify you when the project closes.
                </p>
              </Card>
            )}
          </>
        )}
      </div>
    </main>
  );
}
