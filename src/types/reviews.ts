export interface Review {
  id: string;
  clientId: string;         
  projectId: string;            
  rating: number;               
  comment: string;             
  createdAt: string;          
  status: "Pending" | "Approved" | "Rejected";
  featured?: boolean;  
}
