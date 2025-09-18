"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { registerUser, loginUser } from "./server-action";
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
    role: string;
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
  immer((set, get) => ({

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
        if (response.success) {
          state.isAuthenticated = true;
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