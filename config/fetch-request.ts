import { HOST } from "@/constant";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Get auth token from cookies (server-side safe)
async function getAuthTokenServer(): Promise<string | null> {
  if (typeof window !== 'undefined') return null;
  
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    return token?.value || null;
  } catch {
    return null;
  }
}

// Get auth token from client-side storage
function getAuthTokenClient(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    // Check localStorage or sessionStorage
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    return token;
  } catch {
    return null;
  }
}

export const api = {
  post: async <T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> => {
    try {
      // Get auth token (server or client)
      const token = await getAuthTokenServer() || getAuthTokenClient();
      
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      
      // Add auth header if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${HOST}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        cache: 'no-store', // Prevent caching for authentication requests
      });

      let responseData: any;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (response.ok) {
        return {
          success: true,
          message: "Request successful",
          data: responseData,
        };
      }

      return {
        success: false,
        message: "Request failed",
        error: typeof responseData === "string" ? responseData : responseData?.message || "Unknown error",
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Network error",
        error: error?.message || "Network error occurred",
      };
    }
  },
};

export default api;
