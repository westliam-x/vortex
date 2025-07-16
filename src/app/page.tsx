"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0C0C1C] text-white px-6">
      {/* Brand Logo / Tagline */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#985EFF] mb-4 text-center">
        ⚡ Vortex
      </h1>
      <p className="text-md md:text-lg text-gray-400 max-w-xl text-center mb-10">
        The smart way to manage your clients, projects, and feedback — all in one hub.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/login"
          className="px-6 py-3 rounded-md bg-[#985EFF] hover:bg-[#af8aee] transition text-white font-medium"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-6 py-3 rounded-md bg-gray-800 border border-gray-600 hover:bg-gray-700 transition text-white font-medium"
        >
          Register
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Vortex. All rights reserved by west.
      </footer>
    </main>
  );
}
