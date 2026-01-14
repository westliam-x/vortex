export const getId = (value: unknown): string | null => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value !== "object") return null;

  const record = value as { id?: unknown; _id?: unknown };
  if (typeof record.id === "string" && record.id) return record.id;
  if (typeof record._id === "string" && record._id) return record._id;

  return null;
};

export const getProjectId = (project: unknown): string | null => {
  return getId(project);
};
