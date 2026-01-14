export interface Review {
  id: string;
  clientId: string;         
  projectId: { id: string; name: string };            
  rating: number;               
  comment: string;             
  createdAt: string;          
  status: "Pending" | "Approved" | "Rejected";
  featured?: boolean;  
  clientApproved?: boolean;
  clientConsentPublic?: boolean;
  clientName?: string;
}
