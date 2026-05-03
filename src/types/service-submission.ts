export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface ServiceSubmission {
  id: string;
  title: string;
  description: string;
  category: string;
  priceHint: string;
  ownerName: string;
  ownerEmail: string;
  status: SubmissionStatus;
  createdAt: string;
  reviewedAt?: string;
}
