"use client";

import { Star, Quote } from "lucide-react";

const ReviewHighlight = () => {
  return (
    <div className="bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1F] border border-[#2F2F41] rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Star size={20} className="text-yellow-400" />
        <h2 className="text-gray-200 text-lg font-semibold">Featured Review</h2>
      </div>

      {/* Quote */}
      <blockquote className="relative italic text-gray-300 leading-relaxed mb-4">
        <Quote className="absolute -top-3 -left-3 h-5 w-5 text-[#985EFF]/60" />
        Working with you was smooth and professional. My website turned out
        exactly how I envisioned it.”
      </blockquote>

      {/* Reviewer Info */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>— Tobi</span>
        <span className="px-3 py-1 rounded-full bg-[#2F2F41] text-[#985EFF] text-[11px] font-medium">
          Branding Project
        </span>
      </div>
    </div>
  );
};

export default ReviewHighlight;
