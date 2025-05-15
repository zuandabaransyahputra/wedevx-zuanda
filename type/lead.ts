export type LeadStatus = "PENDING" | "REACHED_OUT";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedIn: string;
  visas: string[];
  resumeUrl: string;
  additionalInfo: string;
  status: LeadStatus;
  country: string;
  created_at?: string;
}
