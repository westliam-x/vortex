"use client";

import { Star } from "lucide-react";

interface Props {
  rating: number;
}

const RatingStars = ({ rating }: Props) => {
  return (
    <span className="inline-flex items-center gap-1 text-[var(--warning)]">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star key={idx} size={14} fill={idx < rating ? "currentColor" : "none"} />
      ))}
    </span>
  );
};

export default RatingStars;
