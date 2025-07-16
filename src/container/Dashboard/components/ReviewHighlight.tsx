"use client";

import { Star } from "lucide-react";

const ReviewHighlight = () => {
  return (
    <div>
      <div className="bg-[#090909] border border-[#2F2F41] rounded-xl p-4 shadow-inner h-full">
      <div className="flex items-center gap-2 mb-2">
        <Star size={18} className="text-yellow-400" />
        <h2 className="text-white text-lg font-semibold">Featured Review</h2>
      </div>
      <blockquote className="italic text-gray-300 mb-2">
        “Working with you was smooth and professional. My website turned out exactly how I envisioned it.”
      </blockquote>
      <p className="text-xs text-gray-500">— Tobi, Branding Project</p>
    </div>
    </div>
  );
}

export default ReviewHighlight;