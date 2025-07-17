"use client";

import Link from "next/link";
import Image from "next/image";

export default function ServerError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-12">
      <Image
        src="/illustrations/error.svg"
        alt="Server Error"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <p className="text-xl mb-2">Something went wrong on our end.</p>
      <p className="text-gray-400 mb-6">
        The server is having a moment. We’re on it — hang tight.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[#985EFF] text-white rounded-md hover:bg-[#7f4fd6] transition"
      >
        Back to safety
      </Link>
    </div>
  );
}
