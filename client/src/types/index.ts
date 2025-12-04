// GP Contact Form Data
export interface GPContactFormData {
  gpName: string;
  email: string;
  contactNumber?: string;
}

// Form Validation Errors
export interface GPContactFormErrors {
  gpName?: string;
  email?: string;
  contactNumber?: string;
}

// Booking State
export interface BookingState {
  gpContactDetails: GPContactFormData | null;
  isConfirmed: boolean;
}
