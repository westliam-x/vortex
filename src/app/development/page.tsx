"use client";

import Image from "next/image";

export default function DevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] text-center px-6 py-12">
      <Image
        src="/illustrations/coming-soon.svg"
        alt="Page under development illustration"
        width={320}
        height={320}
        className="mb-8"
        priority
      />
      <h1 className="text-4xl font-semibold mb-4">We&apos;ll Be Back Soon</h1>
      <p className="text-[var(--text-muted)] mb-6 max-w-md">
        This section is currently under active development. Our team is building the next Vortex experience.
      </p>
      <span className="text-sm text-[var(--text-subtle)]">
        Thanks for your patience. We&apos;ll be live shortly.
      </span>
    </div>
  );
}
