"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { registerUser, loginUser, storeAuthToken } from "./server-action";
import { LoginRequest } from "./type";

// Auth state interface
interface AuthState {
  isRegistering: boolean;
  isLoggingIn: boolean;
  registrationComplete: boolean;
  isAuthenticated: boolean;
  user: any | null;
  error: string | null;
}

// Auth actions interface  
interface AuthActions {
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: string; // Made optional since it's not required
    address: string;
  }) => Promise<{ success: boolean; message: string; error?: string }>;
  login: (data: LoginRequest) => Promise<{ success: boolean; message: string; error?: string }>;
  logout: () => void;
  clearError: () => void;
  reset: () => void;
}


interface AuthStore extends AuthState, AuthActions {}


const initialState: AuthState = {
  isRegistering: false,
  isLoggingIn: false,
  registrationComplete: false,
  isAuthenticated: false,
  user: null,
  error: null,
};


export const useAuthStore = create<AuthStore>()(
  immer((set) => ({

    ...initialState,

    register: async (data) => {
      set((state) => {
        state.isRegistering = true;
        state.error = null;
      });

      const response = await registerUser({
        ...data,
        registrationdate: new Date().toISOString()
      });

      set((state) => {
        if (response.success) {
          state.registrationComplete = true;
        } else {
          state.error = response.error || "Registration failed";
        }
        state.isRegistering = false;
      });

      return response;
    },

    login: async (data) => {
      set((state) => {
        state.isLoggingIn = true;
        state.error = null;
      });

      const response = await loginUser(data);

      set((state) => {
        // Handle different possible response structures from your backend
        const token = response.data?.accessToken ||
                     response.data?.token ||
                     (typeof response.data === 'string' ? response.data : null);

        if (response.success && token && typeof token === 'string') {
          state.isAuthenticated = true;
          // Store token in HTTP-only cookie (async call)
          storeAuthToken(token, false).catch(console.error);

          // Also store in localStorage as fallback for client-side requests
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
            console.log('Token also stored in localStorage via Zustand');
          }

          // Use user data from API response if available, otherwise create mock user
          const apiUser = response.data?.user;
          state.user = {
            id: apiUser?.id || "user-" + Date.now(),
            email: apiUser?.email || data.email,
            firstName: apiUser?.firstName || data.email.split("@")[0],
            lastName: apiUser?.lastName || "User",
            fullName: apiUser?.firstName && apiUser?.lastName
              ? `${apiUser.firstName} ${apiUser.lastName}`
              : data.email.split("@")[0] + " User",
            role: apiUser?.role || "buyer",
            avatar: apiUser?.avatar
          };
        } else {
          state.error = response.error || "Login failed";
        }
        state.isLoggingIn = false;
      });

      return response;
    },

    logout: () => {
      set((state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      });

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_token');
      }
    },

    clearError: () => {
      set((state) => {
        state.error = null;
      });
    },

    reset: () => {
      set(() => initialState);
    },
  }))
);

export const selectIsRegistering = (state: AuthStore) => state.isRegistering;
export const selectRegistrationComplete = (state: AuthStore) => state.registrationComplete;
export const selectError = (state: AuthStore) => state.error;