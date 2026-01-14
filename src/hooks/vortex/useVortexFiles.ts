import { useCallback, useState } from "react";
import { axiosInstance } from "@/api/request";
import API_ROUTES from "@/endpoints/routes";
import { safeRequest } from "@/lib";
import type { VortexFile } from "@/types/vortex";

export const useVortexFiles = (projectId?: string) => {
  const [files, setFiles] = useState<VortexFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchFiles = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await safeRequest<VortexFile[]>(
        {
          url: `${API_ROUTES.VORTEX.SUMMARY}/${projectId}/files`,
          method: "GET",
        },
        []
      );
      setFiles(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load files");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

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
