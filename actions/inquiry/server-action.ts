"use server";

import { api } from "@/config/fetch-request";
import { INQUIRY_ENDPOINTS, buildEndpoint } from "@/constant/api-path";
import { CreateInquiryRequest, InquiryResponse, InquiryApiResponse } from "./type";

export async function createInquiry(data: CreateInquiryRequest): Promise<InquiryApiResponse> {
  try {
    console.log('Creating inquiry with data:', data);

    const response = await api.post<InquiryResponse>(
      INQUIRY_ENDPOINTS.CREATE,
      {
        quantity: data.quantity,
        description: data.description,
        attachment: data.attachment || undefined,
        productId: data.productId,
        buyerId: data.buyerId,
      }
    );

    console.log('Inquiry created successfully:', response);

    return {
      success: response.success,
      message: response.message || "Inquiry created successfully",
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error creating inquiry:', error);
    
    // Handle different error types
    let errorMessage = "Failed to create inquiry";
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

export async function getInquiryById(id: string): Promise<InquiryApiResponse> {
  try {
    console.log('Fetching inquiry with id:', id);

    const endpoint = buildEndpoint(INQUIRY_ENDPOINTS.GET_BY_ID, { id });
    const response = await api.get<InquiryResponse>(endpoint);

    console.log('Inquiry fetched successfully:', response);

    return {
      success: response.success,
      message: response.message || "Inquiry fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error fetching inquiry:', error);
    
    // Handle different error types
    let errorMessage = "Failed to fetch inquiry";
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

export async function getAllInquiries(): Promise<{success: boolean; message: string; data?: InquiryResponse[]; error?: string}> {
  try {
    console.log('Fetching all inquiries');

    const response = await api.get<InquiryResponse[]>(INQUIRY_ENDPOINTS.LIST);

    console.log('Inquiries fetched successfully:', JSON.stringify(response, null, 2));
    
    // Also log individual inquiry details to see full structure
    if (response.data && Array.isArray(response.data)) {
      response.data.forEach((inquiry, index) => {
        console.log(`Inquiry ${index + 1} full details:`, JSON.stringify(inquiry, null, 2));
        console.log(`Product details:`, JSON.stringify(inquiry.product, null, 2));
        console.log(`Buyer details:`, JSON.stringify(inquiry.buyer, null, 2));
      });
    }

    return {
      success: response.success,
      message: response.message || "Inquiries fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error fetching inquiries:', error);
    
    // Handle different error types
    let errorMessage = "Failed to fetch inquiries";
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

export async function getInquiriesByBuyer(buyerId: string): Promise<{success: boolean; message: string; data?: InquiryResponse[]; error?: string}> {
  try {
    console.log('Fetching inquiries for buyer:', buyerId);

    const endpoint = buildEndpoint(INQUIRY_ENDPOINTS.GET_BY_BUYER, { buyerId });
    const response = await api.get<InquiryResponse[]>(endpoint);

    console.log('Buyer inquiries fetched successfully:', response);

    return {
      success: response.success,
      message: response.message || "Buyer inquiries fetched successfully",
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error fetching buyer inquiries:', error);
    
    // Handle different error types
    let errorMessage = "Failed to fetch buyer inquiries";
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

