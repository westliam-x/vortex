"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Paperclip, SendHorizontal, Wallet } from "lucide-react";
import { toast } from "react-toastify";
import { PageHeader, ContentGrid, RightContextPanel } from "@/components/layout";
import { SectionCard } from "@/components/patterns";
import { Button, EmptyState, Input, StatusBadge } from "@/components/ui";
import { getId, getProjectId } from "@/lib/ids";
import { useProject } from "./hooks/useProject";
import { useVortexMessages } from "@/hooks/vortex/useVortexMessages";
import { useVortexFiles } from "@/hooks/vortex/useVortexFiles";
import { useVortexReview } from "@/hooks/vortex/useVortexReview";
import { PaymentEventsDrawer, usePayments } from "@/features/payments";

const tabList = ["Overview", "Messages", "Files", "Payments", "Reviews"] as const;
type TabKey = (typeof tabList)[number];

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = useParams();
  const projectId = typeof id === "string" ? id : undefined;
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");
  const [messageBody, setMessageBody] = useState("");
  const [showOriginal, setShowOriginal] = useState<Record<string, boolean>>({});
  const [paymentsDrawerOpen, setPaymentsDrawerOpen] = useState(false);

  const { project, client, loading: loadingProject, shareUrl, enableShare, closeProject } = useProject(projectId);
  const resolvedProjectId = getProjectId(project);

  const fallbackMessages = resolvedProjectId
    ? [{ projectId: resolvedProjectId, authorType: "owner" as const, body: "Kickoff notes shared.", createdAt: project?.createdAt }]
    : [];

  const { messages, loading: loadingMessages, fetchMessages, sendMessage } = useVortexMessages(
    resolvedProjectId ?? undefined,
    project ? fallbackMessages : []
  );

  const { files, loading: loadingFiles, uploadProgress, fetchFiles, uploadFile } = useVortexFiles(
    resolvedProjectId ?? undefined
  );

  const { payments, paid, outstanding, progress, loading: loadingPayments, fetchPayments } = usePayments(
    resolvedProjectId ?? undefined,
    project?.budget ?? 0
  );

  const { review, loading: loadingReview, fetchReview, updateReviewStatus } = useVortexReview(
    resolvedProjectId ?? undefined
  );

  const isClosed = project?.status === "Completed" || project?.status === "Archived";
  const reviewUiState = (() => {
    if (review?.featured) return "published" as const;
    if (review?.status === "Approved") return "approved" as const;
    if (review?.status === "Pending") return "submitted" as const;
    if (!isClosed || outstanding > 0) return "not_eligible" as const;
    return "eligible" as const;
  })();

  useEffect(() => {
    if (!project) return;
    if (activeTab === "Messages") fetchMessages();
    if (activeTab === "Files") fetchFiles();
    if (activeTab === "Payments") fetchPayments();
    if (activeTab === "Reviews") fetchReview();
  }, [activeTab, project, fetchFiles, fetchMessages, fetchPayments, fetchReview]);

  const metadata = useMemo(
    () => [
      { label: "Client", value: client?.name ?? "Unassigned" },
      {
        label: "Deadline",
        value: project?.deadline ? format(new Date(project.deadline), "dd MMM yyyy") : "Not set",
      },
      { label: "Type", value: project?.type ?? "-" },
      { label: "Priority", value: project?.priority ?? "Normal" },
      { label: "Visibility", value: project?.isPublic ? "Public" : "Private" },
    ],
    [client?.name, project?.deadline, project?.isPublic, project?.priority, project?.type]
  );

  if (!project && !loadingProject) {
    return (
      <EmptyState
        title="Project not found"
        description="We could not locate that project. Try another ID or go back."
        action={
          <Link href="/projects">
            <Button variant="secondary">Back to projects</Button>
          </Link>
        }
      />
    );
  }

  const submitMessage = async () => {
    if (!messageBody.trim()) return;
    try {
      await sendMessage(messageBody);
      setMessageBody("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send message");
    }
  };

  const handleUploadFile = async (file: File) => {
    try {
      await uploadFile(file);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload file");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={project?.title ?? "Project"}
        subtitle={project?.description ?? "Project workspace and collaboration context."}
        secondaryActions={[
          {
            label: "Back",
            variant: "outline",
            onClick: () => router.back(),
          },
        ]}
      />

      <ContentGrid
        main={
          <div className="space-y-4">
            <SectionCard>
              <div className="flex flex-wrap gap-2">
                {tabList.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={
                      activeTab === tab
                        ? "rounded-full border border-[var(--blue)] bg-[var(--surface2)] px-4 py-2 text-sm text-[var(--text)]"
                        : "rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)]"
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </SectionCard>

            {activeTab === "Overview" ? (
              <>
                <SectionCard title="Project Overview">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs text-[var(--muted)]">Tech stack</p>
                      <p className="text-sm text-[var(--text)]">{project?.techStack?.join(", ") || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted)]">Assigned</p>
                      <p className="text-sm text-[var(--text)]">{project?.assignedTo?.length ?? 0} members</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted)]">Budget</p>
                      <p className="text-sm text-[var(--text)]">{project?.budget ? `$${project.budget}` : "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted)]">Last update</p>
                      <p className="text-sm text-[var(--text)]">{project?.updatedAt ?? project?.createdAt ?? "-"}</p>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Next Actions">
                  <ul className="space-y-2 text-sm text-[var(--muted)]">
                    <li>Share onboarding checklist with client.</li>
                    <li>Confirm final asset delivery schedule.</li>
                    <li>Collect remaining payment before close.</li>
                  </ul>
                </SectionCard>
              </>
            ) : null}

            {activeTab === "Messages" ? (
              <SectionCard title="Messages">
                <div className="space-y-3">
                  {loadingMessages ? (
                    <p className="text-sm text-[var(--muted)]">Loading messages...</p>
                  ) : messages.length ? (
                    messages.map((item) => {
                      const key = getId(item) ?? item.createdAt ?? item.body;
                      const show = showOriginal[key] ?? false;
                      return (
                        <div key={key} className="rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-3">
                          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                            <span>{item.authorType}</span>
                            <span>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "Just now"}</span>
                          </div>
                          <p className="mt-2 text-sm text-[var(--text)]">{item.body}</p>
                          {item.originalText ? (
                            <button
                              type="button"
                              className="mt-2 text-xs text-[var(--blue)]"
                              onClick={() => setShowOriginal((prev) => ({ ...prev, [key]: !show }))}
                            >
                              {show ? "Hide original" : "Show original"}
                            </button>
                          ) : null}
                          {show && item.originalText ? (
                            <p className="mt-1 text-xs text-[var(--muted)]">{item.originalText}</p>
                          ) : null}
                        </div>
                      );
                    })
                  ) : (
                    <EmptyState title="No messages yet" description="Start the conversation with your client." />
                  )}

                  <div className="flex flex-col gap-2 md:flex-row">
                    <Input value={messageBody} onChange={(event) => setMessageBody(event.target.value)} placeholder="Write an update..." />
                    <Button onClick={submitMessage} disabled={!messageBody.trim()} className="gap-2">
                      <SendHorizontal size={16} />
                      Send
                    </Button>
                  </div>
                </div>
              </SectionCard>
            ) : null}

            {activeTab === "Files" ? (
              <SectionCard title="Files">
                <div className="space-y-3">
                  {loadingFiles ? (
                    <p className="text-sm text-[var(--muted)]">Loading files...</p>
                  ) : files.length ? (
                    files.map((file) => (
                      <div
                        key={getId(file) ?? file.fileName}
                        className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm"
                      >
                        <span className="inline-flex items-center gap-2 text-[var(--text)]">
                          <Paperclip size={16} />
                          <a href={file.url} target="_blank" rel="noreferrer" className="underline">
                            {file.fileName}
                          </a>
                        </span>
                        <span className="text-[var(--muted)]">{Math.round(file.size / 1024)} KB</span>
                      </div>
                    ))
                  ) : (
                    <EmptyState title="No files yet" description="Upload files to share with your client." />
                  )}
                </div>

                <label className="mt-3 inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface2)]">
                  <Paperclip size={16} />
                  Upload file
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void handleUploadFile(file);
                    }}
                  />
                </label>
                {uploadProgress > 0 ? <p className="mt-2 text-xs text-[var(--muted)]">Uploading... {uploadProgress}%</p> : null}
              </SectionCard>
            ) : null}

            {activeTab === "Payments" ? (
              <SectionCard title="Payments">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-sm">
                  <div>
                    <p className="text-[var(--muted)]">Total</p>
                    <p className="text-[var(--text)]">{payments.currency} {payments.total}</p>
                  </div>
                  <div>
                    <p className="text-[var(--muted)]">Paid</p>
                    <p className="text-[var(--text)]">{payments.currency} {paid}</p>
                  </div>
                  <div>
                    <p className="text-[var(--muted)]">Outstanding</p>
                    <p className="text-[var(--text)]">{payments.currency} {outstanding}</p>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="mb-2 flex items-center justify-between text-xs text-[var(--muted)]">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--surface2)]">
                    <div className="h-2 rounded-full bg-[var(--mint)]" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  {loadingPayments ? (
                    <p className="text-sm text-[var(--muted)]">Loading payments...</p>
                  ) : payments.events.length ? (
                    payments.events.map((event) => (
                      <div
                        key={getId(event) ?? `${event.note}-${event.amount}`}
                        className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface2)] px-4 py-3 text-sm"
                      >
                        <span className="text-[var(--text)]">{event.note || "Payment event"}</span>
                        <span className="text-[var(--muted)]">{event.currency} {event.amount}</span>
                      </div>
                    ))
                  ) : (
                    <EmptyState title="No payments yet" description="Track payment events for this project." />
                  )}
                </div>
              </SectionCard>
            ) : null}

            {activeTab === "Reviews" ? (
              <SectionCard title="Reviews">
                {!isClosed ? (
                  <EmptyState title="Reviews are locked" description="Close the project to unlock the client review form." />
                ) : loadingReview ? (
                  <p className="text-sm text-[var(--muted)]">Loading review...</p>
                ) : review ? (
                  <div className="space-y-3 rounded-lg border border-[var(--border)] bg-[var(--surface2)] p-4">
                    <p className="text-sm text-[var(--text)]">{review.comment}</p>
                    <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                      <span>Rating {review.rating}/5</span>
                      <StatusBadge kind="review" status={review.status} />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => void updateReviewStatus("approve")}>Approve</Button>
                      <Button variant="ghost" onClick={() => void updateReviewStatus("reject")}>Reject</Button>
                    </div>
                  </div>
                ) : (
                  <EmptyState title="No review yet" description="Share the Vortex link so the client can submit a review." />
                )}
              </SectionCard>
            ) : null}
          </div>
        }
        right={
          <RightContextPanel>
            <SectionCard title="Status">
              <div className="space-y-3">
                <StatusBadge kind="project" status={project?.status ?? "Pending"} />
                <p className="text-xs text-[var(--muted)]">Current lifecycle state for this project.</p>
              </div>
            </SectionCard>

            <SectionCard title="Metadata">
              <dl className="space-y-3 text-sm">
                {metadata.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-3">
                    <dt className="text-[var(--muted)]">{item.label}</dt>
                    <dd className="text-right text-[var(--text)]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </SectionCard>

            <SectionCard title="Quick Actions">
              <div className="space-y-2">
                <Button fullWidth variant="secondary" onClick={() => void enableShare()}>
                  Enable share link
                </Button>
                <Button fullWidth variant="outline" onClick={() => setPaymentsDrawerOpen(true)}>
                  Payments
                </Button>
                <Button fullWidth variant="outline" disabled={isClosed} onClick={() => void closeProject()}>
                  Mark complete
                </Button>
                <Link href="/projects" className="block">
                  <Button fullWidth variant="ghost">Back to projects</Button>
                </Link>
                {shareUrl ? (
                  <p className="break-all text-xs text-[var(--muted)]">{shareUrl}</p>
                ) : null}
              </div>
            </SectionCard>

            <SectionCard title="Review">
              <div className="space-y-2">
                {reviewUiState === "submitted" ? <StatusBadge kind="review" status="Pending" /> : null}
                {reviewUiState === "approved" ? <StatusBadge kind="review" status="Approved" /> : null}
                {reviewUiState === "published" ? <StatusBadge kind="review" status="Approved" /> : null}
                {reviewUiState === "published" ? (
                  <p className="text-xs text-[var(--muted)]">Published</p>
                ) : null}
                {reviewUiState === "not_eligible" ? (
                  <>
                    <Button fullWidth variant="secondary" disabled>
                      Submit review
                    </Button>
                    <p className="text-xs text-[var(--muted)]">Unlocks after payment confirms</p>
                  </>
                ) : null}
                {reviewUiState === "eligible" ? (
                  <Button fullWidth variant="secondary" onClick={() => setActiveTab("Reviews")}>
                    Request review
                  </Button>
                ) : null}
                {reviewUiState === "submitted" ? (
                  <Button fullWidth variant="outline" onClick={() => setActiveTab("Reviews")}>
                    Review submitted
                  </Button>
                ) : null}
                {reviewUiState === "approved" ? (
                  <Button fullWidth variant="outline" onClick={() => setActiveTab("Reviews")}>
                    Review approved
                  </Button>
                ) : null}
                {reviewUiState === "published" ? (
                  <Link href="/reviews" className="block">
                    <Button fullWidth variant="outline">View published review</Button>
                  </Link>
                ) : null}
              </div>
            </SectionCard>

            <SectionCard title="Wallet">
              <div className="space-y-2 text-sm text-[var(--muted)]">
                <p className="inline-flex items-center gap-2 text-[var(--text)]"><Wallet size={14} /> Vortex Wallet</p>
                <p>Estimated fees: 1.2%</p>
                <p>Next payout: Jan 28, 2026</p>
              </div>
            </SectionCard>
          </RightContextPanel>
        }
      />

      <PaymentEventsDrawer
        open={paymentsDrawerOpen}
        onOpenChange={setPaymentsDrawerOpen}
        projectId={resolvedProjectId ?? undefined}
      />
    </div>
  );
}
