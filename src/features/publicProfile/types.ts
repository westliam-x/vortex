export type PublicProfileReview = {
  id: string;
  projectName: string;
  clientName: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
};

export type PublicProfile = {
  username: string;
  displayName: string;
  headline: string;
  location?: string;
  avatarUrl?: string;
  stack: string[];
  totalProjects: number;
  verifiedReviewsCount: number;
  avgRating: number;
  reviews: PublicProfileReview[];
};
