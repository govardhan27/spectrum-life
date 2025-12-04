import type { GPContactFormData } from "@types";

export interface BookingState {
  gpContactDetails: GPContactFormData | null;
  isConfirmed: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface GPContact {
  id: string;
  gpName: string;
  email: string;
  contactNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface APISuccessResponse {
  success: true;
  data: GPContact;
}

export interface APIErrorResponse {
  success: false;
  error: string;
}

export type APIResponse = APISuccessResponse | APIErrorResponse;
