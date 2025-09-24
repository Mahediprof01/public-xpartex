"use server";

import { api } from "@/config/fetch-request";
import { PRODUCT_ENDPOINTS, CATEGORY_ENDPOINTS } from "@/constant/api-path";
import { CreateProductRequest, ProductResponse, Category } from "./type";

export async function createProduct(data: CreateProductRequest): Promise<{ 
  success: boolean; 
  message: string; 
  data?: ProductResponse;
  error?: string 
}> {
  try {
    // Check if img is a File object, then use FormData
    if (data.img instanceof File) {
      const formData = new FormData();
      
      // Add all fields to FormData
      formData.append('name', data.name);
      formData.append('img', data.img);
      formData.append('sellerId', data.sellerId);
      formData.append('categoryId', data.categoryId);
      formData.append('price', data.price);
      formData.append('stockQuantity', data.stockQuantity.toString());
      formData.append('productDescription', data.productDescription);
      formData.append('productType', data.productType);
      formData.append('productStatus', data.productStatus);
      formData.append('unitOfMeasurement', data.unitOfMeasurement);
      formData.append('availableQuantity', data.availableQuantity.toString());
      
      if (data.weight !== undefined) formData.append('weight', data.weight.toString());
      
      // Add optional string fields
      if (data.productSubCategory) formData.append('productSubCategory', data.productSubCategory);
      if (data.hsnCode) formData.append('hsnCode', data.hsnCode);
      if (data.skuCode) formData.append('skuCode', data.skuCode);
      if (data.materialType) formData.append('materialType', data.materialType);
      if (data.composition) formData.append('composition', data.composition);
      if (data.gsm) formData.append('gsm', data.gsm);
      if (data.yarnCount) formData.append('yarnCount', data.yarnCount);
      if (data.pattern) formData.append('pattern', data.pattern);
      if (data.originCountry) formData.append('originCountry', data.originCountry);
      if (data.productionCapacity) formData.append('productionCapacity', data.productionCapacity);
      if (data.returnPolicy) formData.append('returnPolicy', data.returnPolicy);
      if (data.packagingDetails) formData.append('packagingDetails', data.packagingDetails);
      if (data.leadTime) formData.append('leadTime', data.leadTime);
      
      // Add boolean fields
      if (data.manufacturer !== undefined) formData.append('manufacturer', data.manufacturer.toString());
      if (data.negotiablePrice !== undefined) formData.append('negotiablePrice', data.negotiablePrice.toString());
      if (data.sampleAvailability !== undefined) formData.append('sampleAvailability', data.sampleAvailability.toString());
      if (data.customBiddingOption !== undefined) formData.append('customBiddingOption', data.customBiddingOption.toString());
      
      // Add numeric fields
      if (data.discountPrice !== undefined) formData.append('discountPrice', data.discountPrice.toString());
      if (data.moq !== undefined) formData.append('moq', data.moq.toString());
      
      // Add array fields
      if (data.certifications) {
        data.certifications.forEach(cert => formData.append('certifications', cert));
      }
      if (data.description) {
        formData.append('description', JSON.stringify(data.description));
      }
      if (data.size) {
        formData.append('size', JSON.stringify(data.size));
      }
      if (data.additionalImages) {
        data.additionalImages.forEach(img => formData.append('additionalImages', img));
      }
      if (data.tags) {
        data.tags.forEach(tag => formData.append('tags', tag));
      }
      if (data.deliveryOptions) {
        data.deliveryOptions.forEach(option => formData.append('deliveryOptions', option));
      }
      if (data.colorVariants) {
        data.colorVariants.forEach(color => formData.append('colorVariants', color));
      }
      
      const response = await api.postFormData<ProductResponse>(PRODUCT_ENDPOINTS.CREATE, formData);
      return response;
    } else {
      // Use regular JSON post for URL-based images
      const response = await api.post<ProductResponse>(PRODUCT_ENDPOINTS.CREATE, data);
      return response;
    }
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to create product",
      error: error?.message || "Unknown error occurred"
    };
  }
}

export async function getProducts(): Promise<{
  success: boolean;
  message: string;
  data?: ProductResponse[];
  error?: string
}> {
  try {
    const response = await api.get<ProductResponse[]>(PRODUCT_ENDPOINTS.LIST);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to fetch products",
      error: error?.message || "Unknown error occurred"
    };
  }
}

export async function getUserProducts(): Promise<{
  success: boolean;
  message: string;
  data?: ProductResponse[];
  error?: string
}> {
  try {
    const response = await api.get<ProductResponse[]>(PRODUCT_ENDPOINTS.USER_PRODUCTS);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to fetch user products",
      error: error?.message || "Unknown error occurred"
    };
  }
}



export async function getProductById(id: string): Promise<{
  success: boolean;
  message: string;
  data?: ProductResponse;
  error?: string
}> {
  try {
    const response = await api.get<ProductResponse>(PRODUCT_ENDPOINTS.GET_BY_ID.replace('{id}', id));
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to fetch product",
      error: error?.message || "Unknown error occurred"
    };
  }
}

export async function updateProduct(id: string, data: Partial<CreateProductRequest>): Promise<{
  success: boolean;
  message: string;
  data?: ProductResponse;
  error?: string
}> {
  try {
    const response = await api.post<ProductResponse>(PRODUCT_ENDPOINTS.UPDATE.replace('{id}', id), data);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to update product",
      error: error?.message || "Unknown error occurred"
    };
  }
}

export async function deleteProduct(id: string): Promise<{
  success: boolean;
  message: string;
  error?: string
}> {
  try {
    const response = await api.post(PRODUCT_ENDPOINTS.DELETE.replace('{id}', id));
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to delete product",
      error: error?.message || "Unknown error occurred"
    };
  }
}

export async function getCategories(): Promise<{
  success: boolean;
  message: string;
  data?: Category[];
  error?: string
}> {
  try {
    const response = await api.get<Category[]>(CATEGORY_ENDPOINTS.LIST);
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to fetch categories",
      error: error?.message || "Unknown error occurred"
    };
  }
}
