"use client";

import Link from "next/link";
import Image from "next/image";

export default function ServerError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] text-center px-6 py-12">
      <Image
        src="/illustrations/error.svg"
        alt="Server Error"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-6xl font-semibold mb-4">500</h1>
      <p className="text-xl mb-2">Something went wrong on our end.</p>
      <p className="text-[var(--text-muted)] mb-6">
        The server is having a moment. We&apos;re on it.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[var(--accent-strong)] text-[#041017] rounded-md hover:bg-[var(--accent)] transition"
      >
        Back to safety
      </Link>
    </div>
  );
}
