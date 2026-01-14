"use client";

import Link from "next/link";
import Image from "next/image";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] text-center px-6 py-12">
      <Image
        src="/illustrations/401.svg"
        alt="Unauthorized"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-5xl font-semibold mb-4">401</h1>
      <p className="text-lg mb-2">You don&apos;t have access to this page.</p>
      <p className="text-[var(--text-muted)] mb-6">
        Try logging in with the right workspace credentials.
      </p>
      <Link
        href="/login"
        className="px-5 py-2.5 bg-[var(--accent-strong)] text-[#041017] rounded-md hover:bg-[var(--accent)] transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
