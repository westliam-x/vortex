"use client";

import { Review } from "@/types/reviews";
import { useState } from "react";
import { ReviewTable } from "./components";
import { DashboardLayout } from "@/layouts";
// Mock data
const mockReviews: Review[] = [
  {
    id: "r1",
    clientId: "1",
    projectId: "p1",
    rating: 5,
    comment: "Absolutely amazing work, very professional!",
    createdAt: "2025-07-10T12:30:00Z",
    status: "Approved",
    featured: true,
  },
  {
    id: "r2",
    clientId: "2",
    projectId: "p3",
    rating: 3,
    comment: "Good delivery, but could improve communication.",
    createdAt: "2025-07-08T10:15:00Z",
    status: "Pending",
  },
];

const ReviewsPage = () =>{
  const [reviews] = useState<Review[]>(mockReviews);

  return (
   <DashboardLayout>
     <div className="p-6 text-white max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cyan-400">Client Reviews</h1>
        <p className="text-gray-400 text-sm">See what your clients are saying</p>
      </div>
      <ReviewTable reviews={reviews} />
    </div>
   </DashboardLayout>
  );
}

export default ReviewsPage;

