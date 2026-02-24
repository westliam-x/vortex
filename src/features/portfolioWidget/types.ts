export type WidgetReview = {
  id: string;
  clientName: string;
  projectName: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
};

export type PortfolioWidgetData = {
  username: string;
  displayName: string;
  avgRating: number;
  verifiedReviewsCount: number;
  reviews: WidgetReview[];
};
