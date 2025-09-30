"use server";

import { api } from "@/config/fetch-request";
import { INQUIRY_ENDPOINTS } from "@/constant/api-path";
import { CreateInquiryRequest, InquiryResponse } from "./type";
import { validateInquiryData, formatInquiryForAPI } from "./business";

export async function createInquiry(data: CreateInquiryRequest): Promise<{
  success: boolean;
  message: string;
  data?: InquiryResponse;
  error?: string;
}> {
  try {
    console.log("Creating inquiry with data:", data);
    console.log("API endpoint:", INQUIRY_ENDPOINTS.CREATE);

    // Validate data before processing
    const validation = validateInquiryData(data);
    if (!validation.isValid) {
      console.log("Validation failed:", validation.errors);
      return {
        success: false,
        message: "Validation failed",
        error: validation.errors.join(", "),
      };
    }

    // Format data for API
    const formattedData = formatInquiryForAPI(data);
    console.log("Formatted data:", formattedData);

    // Check if attachment is a File object, then use FormData
    if (formattedData.attachment instanceof File) {
      const formData = new FormData();

      // Try different data structures that the backend might expect
      // Structure 1: Direct fields (current approach)
      formData.append("quantity", formattedData.quantity.toString());
      formData.append("description", formattedData.description);
      formData.append("buyerId", formattedData.buyerId);
      formData.append("productId", formattedData.productId);
      formData.append("attachment", formattedData.attachment);

      // Structure 2: Alternative field names
      formData.append("buyer_id", formattedData.buyerId);
      formData.append("product_id", formattedData.productId);

      // Structure 3: Try wrapping in inquiry object
      formData.append("inquiry[quantity]", formattedData.quantity.toString());
      formData.append("inquiry[description]", formattedData.description);
      formData.append("inquiry[buyerId]", formattedData.buyerId);
      formData.append("inquiry[productId]", formattedData.productId);

      // Log FormData contents for debugging
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      console.log("Sending FormData request to:", INQUIRY_ENDPOINTS.CREATE);
      const response = await api.postFormData<InquiryResponse>(
        INQUIRY_ENDPOINTS.CREATE,
        formData
      );
      console.log("FormData response:", response);
      return response;
    } else {
      // Use regular JSON post for requests without file attachments
      console.log("Sending JSON request to:", INQUIRY_ENDPOINTS.CREATE);
      console.log(
        "JSON data being sent:",
        JSON.stringify(formattedData, null, 2)
      );

      // Try different data structures that the backend might expect
      const requestData = {
        // Structure 1: Direct fields
        ...formattedData,

        // Structure 2: Alternative field names
        product_id: formattedData.productId,
        buyer_id: formattedData.buyerId,

        // Structure 3: Wrapped in inquiry object
        inquiry: {
          quantity: formattedData.quantity,
          description: formattedData.description,
          buyerId: formattedData.buyerId,
          productId: formattedData.productId,
        },

        // Structure 4: Simple object without attachment field
        simple: {
          quantity: formattedData.quantity,
          description: formattedData.description,
          buyerId: formattedData.buyerId,
          productId: formattedData.productId,
        },
      };

      console.log(
        "Request data structure:",
        JSON.stringify(requestData, null, 2)
      );

      const response = await api.post<InquiryResponse>(
        INQUIRY_ENDPOINTS.CREATE,
        requestData
      );
      console.log("JSON response:", response);
      return response;
    }
  } catch (error: any) {
    console.error("Error in createInquiry:", error);
    return {
      success: false,
      message: "Failed to create inquiry",
      error: error?.message || "Unknown error occurred",
    };
  }
}
