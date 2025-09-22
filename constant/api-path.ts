// Essential authentication endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/signup",
  LOGIN: "/auth/signin",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
} as const;

// Product management endpoints
export const PRODUCT_ENDPOINTS = {
  CREATE: "/product",
  LIST: "/product",
  GET_BY_ID: "/product/{id}",
  UPDATE: "/product/{id}",
  DELETE: "/product/{id}",
} as const;

// Category management endpoints
export const CATEGORY_ENDPOINTS = {
  LIST: "/category",
} as const;

// Helper function to build endpoint with parameters
export const buildEndpoint = (endpoint: string, params?: Record<string, string | number>) => {
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