"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createRFQ } from "./server-action";
import { CreateRFQRequest, RFQResponse } from "./type";

// RFQ state interface
interface RFQState {
  isCreating: boolean;
  isLoading: boolean;
  rfqs: RFQResponse[];
  currentRFQ: RFQResponse | null;
  error: string | null;
  successMessage: string | null;
  // Modal states
  isQuoteModalOpen: boolean;
  selectedInquiryForQuote: any | null; // Using any to match InquiryResponse type
}

// RFQ actions interface
interface RFQActions {
  createRFQ: (data: CreateRFQRequest) => Promise<{
    success: boolean;
    message: string;
    error?: string;
    data?: RFQResponse;
  }>;
  // Modal actions
  openQuoteModal: (inquiry: any) => void;
  closeQuoteModal: () => void;
  // Utility actions
  clearError: () => void;
  clearSuccess: () => void;
  reset: () => void;
}

interface RFQStore extends RFQState, RFQActions {}

const initialState: RFQState = {
  isCreating: false,
  isLoading: false,
  rfqs: [],
  currentRFQ: null,
  error: null,
  successMessage: null,
  isQuoteModalOpen: false,
  selectedInquiryForQuote: null,
};

export const useRFQStore = create<RFQStore>()(
  immer((set, get) => ({
    ...initialState,

    createRFQ: async (data) => {
      set((state) => {
        state.isCreating = true;
        state.error = null;
        state.successMessage = null;
      });

      try {
        console.log('RFQ Store: Creating RFQ with data:', JSON.stringify(data, null, 2));
        
        const response = await createRFQ(data);
        
        console.log('RFQ Store: Server response:', JSON.stringify(response, null, 2));

        set((state) => {
          state.isCreating = false;
          
          if (response.success && response.data) {
            state.rfqs.push(response.data);
            state.currentRFQ = response.data;
            state.successMessage = response.message;
            state.error = null;
          } else {
            state.error = response.message;
            state.successMessage = null;
          }
        });

        return response;
      } catch (error) {
        console.error('RFQ Store: Unexpected error during RFQ creation:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        
        set((state) => {
          state.isCreating = false;
          state.error = errorMessage;
          state.successMessage = null;
        });

        return {
          success: false,
          message: errorMessage,
          error: errorMessage,
        };
      }
    },

    openQuoteModal: (inquiry) => {
      set((state) => {
        state.selectedInquiryForQuote = inquiry;
        state.isQuoteModalOpen = true;
        state.error = null;
      });
    },

    closeQuoteModal: () => {
      set((state) => {
        state.isQuoteModalOpen = false;
        state.selectedInquiryForQuote = null;
      });
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
      set(() => ({ ...initialState }));
    },
  }))
);

// Selector hooks for better performance
export const useRFQModal = () => {
  const isQuoteModalOpen = useRFQStore(state => state.isQuoteModalOpen);
  const selectedInquiryForQuote = useRFQStore(state => state.selectedInquiryForQuote);
  const openQuoteModal = useRFQStore(state => state.openQuoteModal);
  const closeQuoteModal = useRFQStore(state => state.closeQuoteModal);

  return {
    isQuoteModalOpen,
    selectedInquiryForQuote,
    openQuoteModal,
    closeQuoteModal,
  };
};

export const useRFQCreation = () => {
  const isCreating = useRFQStore(state => state.isCreating);
  const createRFQ = useRFQStore(state => state.createRFQ);
  const error = useRFQStore(state => state.error);
  const successMessage = useRFQStore(state => state.successMessage);
  const clearError = useRFQStore(state => state.clearError);
  const clearSuccess = useRFQStore(state => state.clearSuccess);

  return {
    isCreating,
    createRFQ,
    error,
    successMessage,
    clearError,
    clearSuccess,
  };
};