"use server";

import { api } from "@/config/fetch-request";
import { INQUIRY_ENDPOINTS } from "@/constant/api-path";
import { CreateInquiryRequest, InquiryResponse } from "./type";
import { validateInquiryData, formatInquiryForAPI } from "./business";

export async function createInquiry(data: CreateInquiryRequest): Promise<{ 
  success: boolean; 
  message: string; 
  data?: InquiryResponse;
  error?: string 
}> {
  try {
    // Validate data before processing
    const validation = validateInquiryData(data);
    if (!validation.isValid) {
      return {
        success: false,
        message: "Validation failed",
        error: validation.errors.join(", ")
      };
    }

    // Format data for API
    const formattedData = formatInquiryForAPI(data);

    // Check if attachment is a File object, then use FormData
    if (formattedData.attachment instanceof File) {
      const formData = new FormData();
      
      // Add all fields to FormData
      formData.append('quantity', formattedData.quantity.toString());
      formData.append('description', formattedData.description);
      formData.append('buyerId', formattedData.buyerId);
      formData.append('productId', formattedData.productId);
      formData.append('attachment', formattedData.attachment);
      
      const response = await api.postFormData<InquiryResponse>(INQUIRY_ENDPOINTS.CREATE, formData);
      return response;
    } else {
      // Use regular JSON post for requests without file attachments
      const response = await api.post<InquiryResponse>(INQUIRY_ENDPOINTS.CREATE, formattedData);
      return response;
    }
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to create inquiry",
      error: error?.message || "Unknown error occurred"
    };
  }
}
