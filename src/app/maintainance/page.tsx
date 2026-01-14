"use client";

import Image from "next/image";
import Link from "next/link";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] text-center px-6 py-12">
      <Image
        src="/illustrations/maintenance.svg"
        alt="Maintenance"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-4xl font-semibold mb-4">We&apos;ll Be Back Soon</h1>
      <p className="text-[var(--text-muted)] mb-6 max-w-md">
        We are performing routine maintenance. Everything will be back online shortly.
      </p>
      <span className="text-sm mb-5 text-[var(--text-subtle)]">Need to head back?</span>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[var(--accent-strong)] text-[#041017] rounded-md hover:bg-[var(--accent)] transition"
      >
        Home
      </Link>
    </div>
  );
}
