import type { Metadata } from "next";
import { PublicProfile } from "@/features/publicProfile";

type PageProps = {
  params: Promise<{ username: string }>;
};

const toDisplayName = (username: string) =>
  decodeURIComponent(username)
    .split(/[-_]/g)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${toDisplayName(username)} on Vortex`,
  };
}

export default function Page() {
  return <PublicProfile />;
}
