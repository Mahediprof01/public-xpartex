"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createInquiry } from "./server-action";
import { CreateInquiryRequest, InquiryResponse } from "./type";

// Inquiry state interface
interface InquiryState {
  isCreating: boolean;
  isLoading: boolean;
  inquiries: InquiryResponse[];
  currentInquiry: InquiryResponse | null;
  error: string | null;
  successMessage: string | null;
}

// Inquiry actions interface
interface InquiryActions {
  createInquiry: (
    data: CreateInquiryRequest
  ) => Promise<{
    success: boolean;
    message: string;
    error?: string;
    data?: InquiryResponse;
  }>;
  clearError: () => void;
  clearSuccess: () => void;
  reset: () => void;
}

interface InquiryStore extends InquiryState, InquiryActions {}

const initialState: InquiryState = {
  isCreating: false,
  isLoading: false,
  inquiries: [],
  currentInquiry: null,
  error: null,
  successMessage: null,
};

export const useInquiryStore = create<InquiryStore>()(
  immer((set, get) => ({
    ...initialState,

    createInquiry: async (data) => {
      set((state) => {
        state.isCreating = true;
        state.error = null;
        state.successMessage = null;
      });

      const response = await createInquiry(data);

      set((state) => {
        if (response.success && response.data) {
          state.inquiries.unshift(response.data); // Add new inquiry to the beginning
          state.successMessage =
            "Inquiry submitted successfully! Our team will contact you soon.";
        } else {
          state.error = response.error || "Failed to submit inquiry";
        }
        state.isCreating = false;
      });

      return response;
    },

    clearError: () => {
      set((state) => {
        state.error = null;
      });
    },

    clearSuccess: () => {
      set((state) => {
        state.successMessage = null;
      });
    },

    reset: () => {
      set(() => initialState);
    },
  }))
);

// Selectors
export const selectIsCreating = (state: InquiryStore) => state.isCreating;
export const selectIsLoading = (state: InquiryStore) => state.isLoading;
export const selectInquiries = (state: InquiryStore) => state.inquiries;
export const selectCurrentInquiry = (state: InquiryStore) =>
  state.currentInquiry;
export const selectError = (state: InquiryStore) => state.error;
export const selectSuccessMessage = (state: InquiryStore) =>
  state.successMessage;
