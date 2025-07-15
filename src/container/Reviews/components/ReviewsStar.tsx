import React from "react";

interface Props {
  rating: number;
}

const RatingStars = ({ rating }: Props) => {
  return (
    <span className="text-yellow-400">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
};

export default RatingStars;
