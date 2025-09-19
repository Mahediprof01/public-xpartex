// Essential authentication endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/signup",
  LOGIN: "/auth/signin",
  LOGOUT: "/auth/logout",
<<<<<<< HEAD
  ME: "/auth/me",
=======
>>>>>>> d747eddb0c27675245eb9d5c935e343067568430
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