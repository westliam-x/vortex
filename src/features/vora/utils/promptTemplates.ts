import type { VoraQuickActionType } from "../components/VoraQuickActions";

type PromptTemplateContext = {
  projectName?: string;
  clientName?: string;
  deadline?: string;
  invoiceStatus?: string;
  lastActivitySummary?: string;
};

const normalize = (value: string | undefined, fallback: string) => value?.trim() || fallback;

export const generatePromptTemplate = (
  actionType: VoraQuickActionType,
  context: PromptTemplateContext
) => {
  const projectName = normalize(context.projectName, "the project");
  const clientName = normalize(context.clientName, "the client");
  const deadline = normalize(context.deadline, "not specified");
  const invoiceStatus = normalize(context.invoiceStatus, "unknown");
  const activity = normalize(context.lastActivitySummary, "No recent activity summary.");

  const base = (() => {
    switch (actionType) {
      case "payment_follow_up":
        return `Write a professional message to ${clientName} about pending payment for ${projectName}. Keep it clear and respectful. Mention due date if available.`;
      case "deadline_update":
        return `Write a clear update to ${clientName} about progress on ${projectName}. Mention current status and revised timeline if needed.`;
      case "scope_clarification":
        return `Write a message clarifying scope boundaries for ${projectName}. Maintain professionalism and avoid confrontation.`;
      case "work_delivered_notification":
        return `Inform ${clientName} that work for ${projectName} has been delivered. Provide next steps and invite feedback.`;
      case "polite_reminder":
        return `Write a short and polite follow-up regarding ${projectName}. Keep tone friendly but direct.`;
      case "proposal_next_steps":
        return `Suggest next steps for ${projectName}. Encourage alignment and confirm expectations.`;
      default:
        return `Write a client update for ${projectName}.`;
    }
  })();

  return `${base}

Context:
- Project: ${projectName}
- Client: ${clientName}
- Deadline: ${deadline}
- Invoice status: ${invoiceStatus}
- Last activity summary:
${activity}`;
};

export type { PromptTemplateContext };
