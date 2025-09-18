// Essential authentication endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/signup",
  LOGIN: "/auth/signin",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
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

// Export type for the endpoints
export type AuthEndpoint = keyof typeof AUTH_ENDPOINTS;