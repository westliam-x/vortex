"use client";

import Link from "next/link";
import Image from "next/image";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-12">
      <Image
        src="/illustrations/403.svg"
        alt="Forbidden"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-5xl font-bold mb-4">403</h1>
      <p className="text-lg mb-2">Access denied.</p>
      <p className="text-gray-400 mb-6">You don’t have permission to view this page.</p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[#985EFF] text-white rounded-md hover:bg-[#7f4fd6] transition"
      >
        Return Home
      </Link>
    </div>
  );
}
