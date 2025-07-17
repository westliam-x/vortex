"use client";

import Image from "next/image";
import Link from "next/link";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-12">
      <Image
        src="/illustrations/maintenance.svg"
        alt="Maintenance"
        width={300}
        height={300}
        className="mb-8"
        priority
      />
      <h1 className="text-4xl font-bold mb-4">We’ll Be Back Soon!</h1>
      <p className="text-gray-400 mb-6 max-w-md">
        Our team is performing some routine maintenance. Sit tight things will be up and running shortly.
      </p>
      <span className="text-sm mb-5 text-gray-500">Let&apos;s take you Home 💜</span>
      <Link
              href="/"
              className="px-5 py-2.5 bg-[#985EFF] text-white rounded-md hover:bg-[#7f4fd6] transition"
            >
               Home
            </Link>
    </div>
  );
}
