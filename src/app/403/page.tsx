"use client";

import Link from "next/link";
import Image from "next/image";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] text-center px-6 py-12">
      <Image
        src="/illustrations/403.svg"
        alt="Forbidden"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-5xl font-semibold mb-4">403</h1>
      <p className="text-lg mb-2">This area is restricted.</p>
      <p className="text-[var(--text-muted)] mb-6">
        Contact your workspace admin if you need access.
      </p>
      <Link
        href="/dashboard"
        className="px-5 py-2.5 bg-[var(--accent-strong)] text-[#041017] rounded-md hover:bg-[var(--accent)] transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
