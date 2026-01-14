"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge, Button, Card, EmptyState, Input } from "@/components/ui";
import { format } from "date-fns";
import Link from "next/link";
import { DashboardLayout } from "@/layouts";
import { Paperclip, SendHorizontal, Wallet } from "lucide-react";
import { toast } from "react-toastify";
import { useProjectDetails } from "@/hooks/projects/useProjectDetails";
import { useVortexMessages } from "@/hooks/vortex/useVortexMessages";
import { useVortexFiles } from "@/hooks/vortex/useVortexFiles";
import { useVortexPayments } from "@/hooks/vortex/useVortexPayments";
import { useVortexReview } from "@/hooks/vortex/useVortexReview";

const tabList = [
  "Overview",
  "Messages",
  "Files",
  "Payments",
  "Reviews",
] as const;
type TabKey = (typeof tabList)[number];

const ProjectDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");
  const projectId = typeof id === "string" ? id : undefined;
  const { project, client, loading: loadingProject, shareUrl, enableShare, closeProject } =
    useProjectDetails(projectId);
  const { messages, loading: loadingMessages, fetchMessages, sendMessage } = useVortexMessages(
    project?.id,
    project
      ? [
          {
            projectId: project.id,
            authorType: "owner",
            body: "Kickoff notes shared.",
            createdAt: project.createdAt,
          },
        ]
      : []
  );
  const { files, loading: loadingFiles, uploadProgress, fetchFiles, uploadFile } =
    useVortexFiles(project?.id);
  const {
    payments,
    paid,
    outstanding,
    progress,
    loading: loadingPayments,
    fetchPayments,
  } = useVortexPayments(project?.id, project?.budget ?? 0);
  const { review, loading: loadingReview, fetchReview, updateReviewStatus } =
    useVortexReview(project?.id);
  const [messageBody, setMessageBody] = useState("");
  const [showOriginal, setShowOriginal] = useState<Record<string, boolean>>({});

  const isClosed =
    project?.status === "Completed" || project?.status === "Archived";
  useEffect(() => {
    if (!project) return;
    if (activeTab === "Messages") fetchMessages();
    if (activeTab === "Files") fetchFiles();
    if (activeTab === "Payments") fetchPayments();
    if (activeTab === "Reviews") fetchReview();
  }, [activeTab, project, fetchMessages, fetchFiles, fetchPayments, fetchReview]);

  if (!project && !loadingProject) {
    return (
      <DashboardLayout>
        <EmptyState
          title="Project not found"
          description="We could not locate that project. Try another ID or go back."
          action={
            <Link href="/projects">
              <Button variant="secondary">Back to projects</Button>
            </Link>
          }
        />
      </DashboardLayout>
    );
  }

  const submitMessage = async () => {
    if (!project || !messageBody.trim()) return;
    try {
      await sendMessage(messageBody);
      setMessageBody("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    }
  };

  const handleEnableShare = async () => {
    if (!project) return;
    try {
      await enableShare();
      toast.success("Share link enabled");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to enable share link"
      );
    }
  };

  const handleCloseProject = async () => {
    if (!project) return;
    try {
      await closeProject();
      toast.success("Project closed");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to close project"
      );
    }
  };

  const handleReviewAction = async (action: "approve" | "reject") => {
    if (!project) return;
    try {
      await updateReviewStatus(action);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update review"
      );
    }
  };

  const handleUploadFile = async (file: File) => {
    try {
      await uploadFile(file);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload file"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-[var(--text-subtle)]">Vortex space</p>
          <h1 className="text-2xl font-semibold text-[var(--text)]">
            Project collaboration hub
          </h1>
        </div>
        <Link
          href="/projects"
          className="text-sm text-[var(--text-subtle)] hover:text-[var(--text)]"
        >
          Back to Projects
        </Link>

        <Card className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[var(--text)]">
                {project?.title ?? "Loading project"}
              </h1>
              <p className="text-sm text-[var(--text-muted)]">
                {project?.description || "No description provided yet."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={handleEnableShare}>
                Enable Vortex share link
              </Button>
              <Button variant="ghost" disabled={isClosed}>
                Archive
              </Button>
              {!isClosed ? (
                <Button onClick={handleCloseProject}>Mark complete</Button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              tone={project?.status === "Completed" ? "success" : "warning"}
            >
              {project?.status ?? "Pending"}
            </Badge>
            <Badge tone="info">{project?.type ?? "Paid"} project</Badge>
            <Badge>{project?.priority ?? "Priority unset"}</Badge>
            {shareUrl ? <Badge tone="info">Share: {shareUrl}</Badge> : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[var(--text-subtle)]">Client</p>
              <p className="text-[var(--text)]">{client?.name ?? "Client"}</p>
            </div>
            <div>
              <p className="text-[var(--text-subtle)]">Deadline</p>
              <p className="text-[var(--text)]">
                {project?.endDate
                  ? format(new Date(project.endDate), "dd MMM yyyy")
                  : project?.deadline
                  ? format(new Date(project.deadline), "dd MMM yyyy")
                  : "No due date"}
              </p>
            </div>
            <div>
              <p className="text-[var(--text-subtle)]">Tech stack</p>
              <p className="text-[var(--text)]">
                {project?.techStack?.join(", ") || "Not specified"}
              </p>
            </div>
          </div>
        </Card>

        <div className="flex flex-wrap gap-2">
          {tabList.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm ${
                activeTab === tab
                  ? "bg-[var(--accent-soft)] border border-[var(--accent-strong)]/40 text-[var(--text)]"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 space-y-3">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                Overview
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                This Vortex space keeps milestones, key decisions, and approvals
                tied to the project timeline.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[var(--text-subtle)]">Visibility</p>
                  <p className="text-[var(--text)]">
                    {project?.isPublic ? "Public" : "Private"}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-subtle)]">Assigned</p>
                  <p className="text-[var(--text)]">
                    {project?.assignedTo?.length
                      ? project.assignedTo.length
                      : 2}{" "}
                    people
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-subtle)]">Last update</p>
                  <p className="text-[var(--text)]">
                    {project?.updatedAt ?? project?.createdAt}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="space-y-3">
              <h3 className="text-sm font-semibold text-[var(--text)]">
                Next actions
              </h3>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                <li>Share onboarding checklist with client.</li>
                <li>Confirm final asset delivery schedule.</li>
                <li>Collect remaining payment before close.</li>
              </ul>
            </Card>
          </div>
        ) : null}

        {activeTab === "Messages" ? (
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Messages
            </h2>
            <div className="space-y-4">
              {loadingMessages ? (
                <p className="text-sm text-[var(--text-muted)]">
                  Loading messages...
                </p>
              ) : messages.length > 0 ? (
                messages.map((item) => {
                  const key =
                    item._id ?? item.id ?? item.createdAt ?? item.body;
                  const show = showOriginal[key] ?? false;
                  return (
                    <div
                      key={key}
                      className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3"
                    >
                      <div className="flex items-center justify-between text-xs text-[var(--text-subtle)]">
                        <span>{item.authorType}</span>
                        <span>
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleString()
                            : "Just now"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--text)]">
                        {item.body}
                      </p>
                      {item.originalText ? (
                        <button
                          type="button"
                          className="mt-2 text-xs text-[var(--accent)]"
                          onClick={() =>
                            setShowOriginal((prev) => ({
                              ...prev,
                              [key]: !show,
                            }))
                          }
                        >
                          {show ? "Hide original" : "Show original"}
                        </button>
                      ) : null}
                      {show && item.originalText ? (
                        <p className="mt-2 text-xs text-[var(--text-subtle)]">
                          {item.originalText}
                        </p>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <EmptyState
                  title="No messages yet"
                  description="Start the conversation with your client."
                />
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Write an update..."
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
              />
              <Button
                className="gap-2"
                onClick={submitMessage}
                disabled={!messageBody.trim()}
              >
                <SendHorizontal size={16} />
                Send
              </Button>
            </div>
          </Card>
        ) : null}

        {activeTab === "Files" ? (
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">Files</h2>
            <div className="space-y-3">
              {loadingFiles ? (
                <p className="text-sm text-[var(--text-muted)]">
                  Loading files...
                </p>
              ) : files.length > 0 ? (
                files.map((file) => {
                  const key = file._id ?? file.id ?? file.fileName;
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-muted)]"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Paperclip size={16} />
                        <a
                          href={file.url}
                          className="underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {file.fileName}
                        </a>
                      </span>
                      <span>{Math.round(file.size / 1024)} KB</span>
                    </div>
                  );
                })
              ) : (
                <EmptyState
                  title="No files yet"
                  description="Upload files to share with your client."
                />
              )}
            </div>
            <label className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)] cursor-pointer hover:bg-[var(--surface-2)]">
              <Paperclip size={16} />
              Upload file
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleUploadFile(file);
                  }
                }}
              />
            </label>
            {uploadProgress > 0 ? (
              <p className="text-xs text-[var(--text-subtle)]">
                Uploading... {uploadProgress}%
              </p>
            ) : null}
          </Card>
        ) : null}

        {activeTab === "Payments" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                Payments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[var(--text-subtle)]">Total</p>
                  <p className="text-[var(--text)]">
                    {payments.currency} {payments.total}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-subtle)]">Paid</p>
                  <p className="text-[var(--success)]">
                    {payments.currency} {paid}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-subtle)]">Outstanding</p>
                  <p className="text-[var(--warning)]">
                    {payments.currency} {outstanding}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-[var(--text-subtle)] mb-2">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-2)]">
                  <div
                    className="h-2 rounded-full bg-[var(--accent-strong)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="space-y-3">
                {loadingPayments ? (
                  <p className="text-sm text-[var(--text-muted)]">
                    Loading payments...
                  </p>
                ) : payments.events.length > 0 ? (
                  payments.events.map((event) => (
                    <div
                      key={event._id ?? event.id ?? event.note}
                      className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-muted)]"
                    >
                      <span>{event.note || "Payment event"}</span>
                      <span>
                        {event.currency} {event.amount}
                      </span>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No payments yet"
                    description="Track payment events for this project."
                  />
                )}
              </div>
              <p className="text-xs text-[var(--text-subtle)]">
                Currency conversion display is informational only.
              </p>
            </Card>
            <Card className="space-y-4">
              <div className="flex items-center gap-2">
                <Wallet size={18} className="text-[var(--accent)]" />
                <h3 className="text-sm font-semibold text-[var(--text)]">
                  Wallet details
                </h3>
              </div>
              <div className="text-sm text-[var(--text-muted)] space-y-2">
                <p>Primary payout: Vortex Wallet</p>
                <p>Estimated fees: 1.2%</p>
                <p>Next payout: Jan 28, 2025</p>
              </div>
              <Button variant="secondary" className="gap-2">
                Connect Blaaiz wallet
              </Button>
            </Card>
          </div>
        ) : null}

        {activeTab === "Reviews" ? (
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              Reviews
            </h2>
            {!isClosed ? (
              <EmptyState
                title="Reviews are locked"
                description="Close the project to unlock the client review form."
              />
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-4 text-sm text-[var(--text-muted)]">
                  Reviews are immutable after submission. Client approval is
                  required before they are public.
                </div>
                {loadingReview ? (
                  <p className="text-sm text-[var(--text-muted)]">
                    Loading review...
                  </p>
                ) : review ? (
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-4 space-y-3">
                    <p className="text-sm text-[var(--text)]">
                      {review.comment}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[var(--text-subtle)]">
                      <span>Rating {review.rating}/5</span>
                      <span>Status: {review.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleReviewAction("approve")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleReviewAction("reject")}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ) : (
                  <EmptyState
                    title="No review yet"
                    description="Share the Vortex link so the client can submit a review."
                  />
                )}
              </div>
            )}
          </Card>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;
