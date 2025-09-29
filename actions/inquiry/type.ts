// Inquiry request interface for quote requests
export interface CreateInquiryRequest {
  quantity: number;
  description: string;
  attachment?: File | null;
  buyerId: string;
  productId: string;
}

// Inquiry response from API
export interface InquiryResponse {
  id: string;
  quantity: number;
  description: string;
  attachment?: string; // URL to uploaded file
  buyerId: string;
  productId: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
  // Additional fields that might come from API
  supplierId?: string;
  supplierResponse?: string;
  quotedPrice?: number;
  currency?: string;
  estimatedDelivery?: string;
}

// Form data interface for the modal
export interface InquiryFormData {
  quantity: number;
  description: string;
  attachment: File | null;
}

// API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
