import { useCallback, useEffect, useState } from "react";
import { makeRequest, axiosInstance } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import type { VortexFile, VortexMessage } from "@/types/vortex";

type GuestProject = {
  id: string;
  title: string;
  description?: string;
  status: "Pending" | "In Progress" | "Completed" | "Archived";
  deadline?: string;
};

export const useGuestVortex = (token: string) => {
  const [project, setProject] = useState<GuestProject | null>(null);
  const [accessStep, setAccessStep] = useState<"request" | "verify" | "ready">("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [messages, setMessages] = useState<VortexMessage[]>([]);
  const [files, setFiles] = useState<VortexFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tokenValid = token.length >= 10;
  const isClosed = project?.status === "Completed" || project?.status === "Archived";

  const fetchSummary = useCallback(async () => {
    const response = await makeRequest<{ project: GuestProject }>({
      url: `${API_ROUTES.VORTEX.SUMMARY}/guest/${token}/summary`,
      method: "GET",
    });
    setProject(response.project);
  }, [token]);

  const fetchMessages = useCallback(async () => {
    const response = await makeRequest<VortexMessage[]>({
      url: `${API_ROUTES.VORTEX.SUMMARY}/guest/${token}/messages`,
      method: "GET",
    });
    setMessages(response);
  }, [token]);

  const fetchFiles = useCallback(async () => {
    const response = await makeRequest<VortexFile[]>({
      url: `${API_ROUTES.VORTEX.SUMMARY}/guest/${token}/files`,
      method: "GET",
    });
    setFiles(response);
  }, [token]);

  const bootstrapGuest = useCallback(async () => {
    if (!tokenValid) return;
    setLoading(true);
    setError(null);
    try {
      await fetchSummary();
      await fetchMessages();
      await fetchFiles();
      setAccessStep("ready");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Access required";
      if (message.toLowerCase().includes("guest token")) {
        setAccessStep("request");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFiles, fetchMessages, fetchSummary, tokenValid]);

  useEffect(() => {
    bootstrapGuest();
  }, [bootstrapGuest]);

  const requestAccess = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await makeRequest({
        url: `${API_ROUTES.VORTEX.SUMMARY}/guest/${token}/request-access`,
        method: "POST",
        data: { email },
      });
      setAccessStep("verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request access");
    } finally {
      setLoading(false);
    }
  }, [email, token]);

  const verifyAccess = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await makeRequest({
        url: `${API_ROUTES.VORTEX.SUMMARY}/guest/${token}/verify-access`,
        method: "POST",
        data: { email, otp },
      });
      await bootstrapGuest();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify access");
    } finally {
      setLoading(false);
    }
  }, [bootstrapGuest, email, otp, token]);

  const sendMessage = useCallback(
    async (body: string) => {
      if (!body.trim()) return;
      const created = await makeRequest<VortexMessage>({
        url: `${API_ROUTES.VORTEX.SUMMARY}/guest/${token}/messages`,
        method: "POST",
        data: { body: body.trim() },
      });
      setMessages((prev) => [created, ...prev]);
    },
    [token]
  );

  const uploadFile = useCallback(
    async (file: File) => {
      setUploadProgress(0);
      const formData = new FormData();
      formData.append("file", file);
      await axiosInstance.post(
        `${API_ROUTES.VORTEX.SUMMARY}/guest/${token}/files`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (evt) => {
            if (!evt.total) return;
            setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
          },
        }
      );
      await fetchFiles();
      setUploadProgress(0);
    },
    [fetchFiles, token]
  );

  const submitReview = useCallback(async () => {
    if (!project || !reviewComment.trim()) return;
    await makeRequest({
      url: `${API_ROUTES.REVIEWS.SUBMIT}/${project.id}/submit`,
      method: "POST",
      data: {
        rating: reviewRating,
        comment: reviewComment.trim(),
        clientConsentPublic: consent,
        clientName: email || undefined,
      },
    });
  }, [consent, email, project, reviewComment, reviewRating]);

  return {
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
    refresh: bootstrapGuest,
  };
};
