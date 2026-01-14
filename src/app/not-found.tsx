"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] text-center px-6 py-12">
      <Image
        src="/illustrations/lost.svg"
        alt="Lost in space"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-6xl font-semibold mb-4">404</h1>
      <p className="text-xl mb-2">You seem to be lost.</p>
      <p className="text-[var(--text-muted)] mb-6">
        Let&apos;s get you back to your workspace.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[var(--accent-strong)] text-[#041017] rounded-md hover:bg-[var(--accent)] transition"
      >
        Take me home
      </Link>
    </div>
  );
}
