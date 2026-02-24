export type PricingPlan = {
  id: "free" | "pro" | "business";
  name: string;
  priceMonthly: number;
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    features: [
      "Up to 2 active projects",
      "Client collaboration space",
      "Basic invoices and payments",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 29,
    features: [
      "Unlimited active projects",
      "Advanced Vora drafts and workflows",
      "Priority payment tracking",
      "Review and profile verification tools",
      "Priority support",
    ],
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 79,
    features: [
      "Workspace-level controls",
      "Advanced permissions and audit trails",
      "Custom billing workflows",
      "Team collaboration at scale",
      "Dedicated success support",
    ],
  },
];

export const pricingFaq = [
  {
    question: "Is Vora included?",
    answer:
      "Yes. Vora is available across plans, with advanced drafting and automation features unlocked on paid plans.",
  },
  {
    question: "How do payments work?",
    answer:
      "You can issue invoices, generate collection links, and track payment events directly inside Vortex.",
  },
  {
    question: "Is Signal available on Free?",
    answer:
      "Yes, basic Signal profile visibility is available on Free. Higher-tier plans include expanded collaboration controls.",
  },
];
