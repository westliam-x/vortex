"use client";

import Link from "next/link";
import Image from "next/image";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-12">
      <Image
        src="/images/unauthorized.svg"
        alt="Unauthorized"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-5xl font-bold mb-4">401</h1>
      <p className="text-lg mb-2">You don’t have access to this page.</p>
      <p className="text-gray-400 mb-6">Maybe try logging in with proper credentials.</p>
      <Link
        href="/login"
        className="px-5 py-2.5 bg-[#985EFF] text-white rounded-md hover:bg-[#7f4fd6] transition"
      >
        Go to Login
      </Link>
    </div>
  );
}
