// Essential authentication endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/signup",
  LOGIN: "/auth/signin",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
  VERIFY_OTP: "/auth/verify-otp",
} as const;

// Product management endpoints
export const PRODUCT_ENDPOINTS = {
  CREATE: "/product",
  LIST: "/product",
  USER_PRODUCTS: "/product/userProduct",
  GET_BY_ID: "/product/{id}",
  UPDATE: "/product/{id}",
  DELETE: "/product/{id}",
} as const;

// Category management endpoints
export const CATEGORY_ENDPOINTS = {
  LIST: "/category",
} as const;

// Inquiry management endpoints
export const INQUIRY_ENDPOINTS = {
  CREATE: "/inquiry",
  GET_BY_ID: "/inquiry/{id}",
  GET_BY_BUYER: "/inquiry/buyer/{buyerId}",
  LIST: "/inquiry",
} as const;

// RFQ management endpoints
export const RFQ_ENDPOINTS = {
  CREATE: "/rfq",
  LIST: "/rfq",
  GET_BY_ID: "/rfq/{id}",
  GET_BY_BUYER: "/rfq/buyer/{buyerId}",
} as const;

// Helper function to build endpoint with parameters
export const buildEndpoint = (
  endpoint: string,
  params?: Record<string, string | number>
) => {
  if (!params) return endpoint;

  let url = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`{${key}}`, String(value));
  });

  return url;
};

// Export types for the endpoints
export type AuthEndpoint = keyof typeof AUTH_ENDPOINTS;
export type ProductEndpoint = keyof typeof PRODUCT_ENDPOINTS;
export type CategoryEndpoint = keyof typeof CATEGORY_ENDPOINTS;
export type InquiryEndpoint = keyof typeof INQUIRY_ENDPOINTS;
export type RFQEndpoint = keyof typeof RFQ_ENDPOINTS;
