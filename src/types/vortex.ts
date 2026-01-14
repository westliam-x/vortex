export type VortexMessage = {
  _id?: string;
  id?: string;
  projectId: string;
  authorType: "owner" | "member" | "guest";
  authorId?: string;
  guestEmail?: string;
  body: string;
  originalText?: string;
  createdAt?: string;
};

export type VortexFile = {
  _id?: string;
  id?: string;
  projectId: string;
  uploaderType: "owner" | "member" | "guest";
  uploaderId?: string;
  guestEmail?: string;
  fileName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt?: string;
  virusScanStatus?: "pending" | "clean" | "blocked";
};
