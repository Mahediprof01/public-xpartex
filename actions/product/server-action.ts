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
    const response = await api.post<ProductResponse>(PRODUCT_ENDPOINTS.CREATE, data);
    return response;
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
