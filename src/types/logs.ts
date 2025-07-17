export interface LogEntry {
  _id: string;
  action: string;
  actor: {
    id: string;
    name: string;
    role?: string;
  };
  target: {
    type: "Project" | "Client" | "TeamMember" | "System";
    name: string;
    id?: string;
  };
  details?: string;
  timestamp: string; // ISO string
  status?: "success" | "failure";
}
