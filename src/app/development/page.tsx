"use client";

import Image from "next/image";

export default function DevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-12">
      <Image
        src="/illustrations/coming-soon.svg"
        alt="Page under development illustration"
        width={320}
        height={320}
        className="mb-8"
        priority
      />
      <h1 className="text-4xl font-bold mb-4">We’ll Be Back Soon!</h1>
      <p className="text-gray-400 mb-6 max-w-md">
        This section is currently under active development. Our team is hard at work building something amazing. 🚀
      </p>
      <span className="text-sm text-gray-500">
        Thanks for your patience we’ll be live shortly 💜
      </span>
      
    </div>
  );
}
