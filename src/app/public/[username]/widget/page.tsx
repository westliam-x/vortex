import type { Metadata } from "next";
import { PortfolioWidget } from "@/features/portfolioWidget";

export const metadata: Metadata = {
  title: "Vortex Widget",
};

export default function Page() {
  return <PortfolioWidget />;
}
