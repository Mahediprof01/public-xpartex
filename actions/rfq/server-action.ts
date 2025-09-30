"use server";

import { api } from "@/config/fetch-request";
import { RFQ_ENDPOINTS, buildEndpoint } from "@/constant/api-path";
import { CreateRFQRequest, RFQResponse, RFQApiResponse, RFQListApiResponse } from "./type";

export async function createRFQ(data: CreateRFQRequest): Promise<RFQApiResponse> {
  try {
    console.log('Creating RFQ with data:', JSON.stringify(data, null, 2));

    const response = await api.post<RFQResponse>(
      RFQ_ENDPOINTS.CREATE,
      {
        title: data.title,
        status: data.status,
        quantity: data.quantity,
        unit: data.unit,
        leadTime: data.leadTime,
        file: data.file || undefined,
        region: data.region,
        buyerId: data.buyerId,
        productId: data.productId,
        deliveryTerms: data.deliveryTerms,
        paymentTerms: data.paymentTerms,
        warrantyPeriod: data.warrantyPeriod,
        currency: data.currency,
        shippingAddress: data.shippingAddress,
        specialInstructions: data.specialInstructions || undefined,
      }
    );

    console.log('RFQ created successfully:', JSON.stringify(response, null, 2));

    return {
      success: response.success,
      message: response.message || "RFQ created successfully",
      data: response.data,
    };
  } catch (error: any) {
    console.error('Error creating RFQ:', error);
    
    // Handle different error types
    let errorMessage = "Failed to create RFQ";
    
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

export async function getRFQById(id: string): Promise<RFQApiResponse> {
  try {
    console.log('🔍 [RFQ] Starting RFQ fetch with ID:', id);

    const endpoint = buildEndpoint(RFQ_ENDPOINTS.GET_BY_ID, { id });
    console.log('🔍 [RFQ] Built endpoint:', endpoint);
    console.log('🔍 [RFQ] Full URL would be:', `${process.env.API_URL || "http://localhost:3000"}${endpoint}`);

    const response = await api.get<RFQResponse>(endpoint);
    
    console.log('🔍 [RFQ] Raw API response:', JSON.stringify(response, null, 2));

    if (response.success && response.data) {
      console.log('✅ [RFQ] RFQ fetched successfully:', response.data.id);
      return {
        success: true,
        message: response.message || "RFQ fetched successfully",
        data: response.data,
      };
    } else {
      console.error('❌ [RFQ] API returned unsuccessful response:', response);
      return {
        success: false,
        message: response.message || response.error || "Failed to fetch RFQ",
        error: response.error || "Unknown error",
      };
    }
  } catch (error: any) {
    console.error('❌ [RFQ] Exception during RFQ fetch:', error);
    console.error('❌ [RFQ] Error details:', {
      message: error?.message,
      status: error?.status,
      response: error?.response,
      stack: error?.stack
    });
    
    // Handle different error types
    let errorMessage = "Failed to fetch RFQ";
    
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

export async function getRFQList(): Promise<RFQListApiResponse> {
  try {
    console.log('🔍 [RFQ] Starting RFQ list fetch');

    const response = await api.get<RFQResponse[]>(RFQ_ENDPOINTS.LIST);
    
    console.log('🔍 [RFQ] Raw API response:', JSON.stringify(response, null, 2));

    if (response.success && response.data) {
      console.log('✅ [RFQ] RFQ list fetched successfully, count:', response.data.length);
      return {
        success: true,
        message: response.message || "RFQ list fetched successfully",
        data: response.data,
      };
    } else {
      console.error('❌ [RFQ] API returned unsuccessful response:', response);
      return {
        success: false,
        message: response.message || response.error || "Failed to fetch RFQ list",
        error: response.error || "Unknown error",
      };
    }
  } catch (error: any) {
    console.error('❌ [RFQ] Exception during RFQ list fetch:', error);
    console.error('❌ [RFQ] Error details:', {
      message: error?.message,
      status: error?.status,
      response: error?.response,
      stack: error?.stack
    });
    
    // Handle different error types
    let errorMessage = "Failed to fetch RFQ list";
    
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

export async function getRFQListByBuyer(buyerId: string): Promise<RFQListApiResponse> {
  try {
    console.log('🔍 [RFQ] Starting RFQ list fetch for buyer:', buyerId);

    const endpoint = buildEndpoint(RFQ_ENDPOINTS.GET_BY_BUYER, { buyerId });
    console.log('🔍 [RFQ] Built endpoint:', endpoint);

    const response = await api.get<RFQResponse[]>(endpoint);
    
    console.log('🔍 [RFQ] Raw API response for buyer:', JSON.stringify(response, null, 2));

    if (response.success) {
      // Handle both cases: data exists or is empty/null
      const rfqData = response.data || [];
      console.log('✅ [RFQ] RFQ list fetched successfully for buyer, count:', rfqData.length);
      return {
        success: true,
        message: response.message || "RFQ list fetched successfully",
        data: rfqData,
      };
    } else {
      // Check if it's a 404 or "not found" type error (which means no RFQs exist)
      const isNotFoundError = response.message?.toLowerCase().includes('not found') ||
                              response.message?.toLowerCase().includes('no data') ||
                              response.error?.toLowerCase().includes('not found');
      
      if (isNotFoundError) {
        console.log('ℹ️ [RFQ] No RFQs found for buyer - treating as empty result');
        return {
          success: true,
          message: "No RFQs found for this buyer",
          data: [],
        };
      } else {
        console.error('❌ [RFQ] API returned unsuccessful response:', response);
        return {
          success: false,
          message: response.message || response.error || "Failed to fetch RFQ list for buyer",
          error: response.error || "Unknown error",
        };
      }
    }
  } catch (error: any) {
    console.error('❌ [RFQ] Exception during RFQ list fetch for buyer:', error);
    console.error('❌ [RFQ] Error details:', {
      message: error?.message,
      status: error?.status,
      response: error?.response,
      stack: error?.stack
    });
    
    // Check if it's a 404 error (no RFQs found for buyer)
    if (error?.status === 404 || error?.response?.status === 404) {
      console.log('ℹ️ [RFQ] 404 error - treating as no RFQs found for buyer');
      return {
        success: true,
        message: "No RFQs found for this buyer",
        data: [],
      };
    }
    
    // Handle different error types
    let errorMessage = "Failed to fetch RFQ list for buyer";
    
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