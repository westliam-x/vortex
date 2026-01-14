import { useCallback, useEffect, useState } from "react";
import { axiosInstance, makeRequest } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import type { VortexFile } from "@/types/vortex";

export const useVortexFiles = (projectId?: string) => {
  const [files, setFiles] = useState<VortexFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchFiles = useCallback(async (signal?: AbortSignal) => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await makeRequest<VortexFile[]>({
        url: `${API_ROUTES.VORTEX.SUMMARY}/${projectId}/files`,
        method: "GET",
        config: signal ? { signal } : undefined,
      });
      setFiles(response ?? []);
    } catch (err) {
      if (signal?.aborted || (err instanceof Error && err.message === "aborted")) return;
      setError(err instanceof Error ? err.message : "Failed to load files");
      setFiles([]);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    fetchFiles(controller.signal);
    return () => controller.abort();
  }, [projectId, fetchFiles]);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!projectId) return;
      setUploadProgress(0);
      const formData = new FormData();
      formData.append("file", file);
      await axiosInstance.post(
        `${API_ROUTES.VORTEX.SUMMARY}/${projectId}/files`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (evt) => {
            if (!evt.total) return;
            const percent = Math.round((evt.loaded / evt.total) * 100);
            setUploadProgress(percent);
          },
        }
      );
      await fetchFiles();
      setUploadProgress(0);
    },
    [projectId, fetchFiles]
  );

  return { files, loading, error, uploadProgress, fetchFiles, uploadFile };
};
