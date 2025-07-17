"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-12">
      <Image
        src="/illustrations/lost.svg"
        alt="Lost in space"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-2">You seem to be lost...</p>
      <p className="text-gray-400 mb-6">
        Let’s find your way back home — don’t get lost in the vortex 🌌
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-[#985EFF] text-white rounded-md hover:bg-[#7f4fd6] transition"
      >
        Take me home
      </Link>
    </div>
  );
}
