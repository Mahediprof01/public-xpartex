"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { 
  createProduct as createProductAction, 
  getProducts, 
  getUserProducts,
  getProductById, 
  updateProduct, 
  deleteProduct, 
  getCategories 
} from "./server-action";
import { CreateProductRequest, ProductResponse, ProductFormData, Category } from "./type";

// Product state interface
interface ProductState {
  isCreating: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isLoadingCategories: boolean;
  products: ProductResponse[];
  categories: Category[];
  currentProduct: ProductResponse | null;
  error: string | null;
  successMessage: string | null;
}

// Product actions interface
interface ProductActions {
  createProduct: (data: CreateProductRequest) => Promise<{ success: boolean; message: string; error?: string; data?: ProductResponse }>;
  fetchProducts: () => Promise<{ success: boolean; message: string; error?: string }>;
  fetchUserProducts: () => Promise<{ success: boolean; message: string; error?: string }>;
  fetchProductById: (id: string) => Promise<{ success: boolean; message: string; error?: string }>;
  updateProduct: (id: string, data: Partial<CreateProductRequest>) => Promise<{ success: boolean; message: string; error?: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; message: string; error?: string }>;
  fetchCategories: () => Promise<{ success: boolean; message: string; error?: string }>;
  clearError: () => void;
  clearSuccess: () => void;
  reset: () => void;
}

interface ProductStore extends ProductState, ProductActions {}

const initialState: ProductState = {
  isCreating: false,
  isLoading: false,
  isUpdating: false,
  isDeleting: false,
  isLoadingCategories: false,
  products: [],
  categories: [],
  currentProduct: null,
  error: null,
  successMessage: null,
};

export const useProductStore = create<ProductStore>()(
  immer((set, get) => ({
    ...initialState,

    createProduct: async (data) => {
      set((state) => {
        state.isCreating = true;
        state.error = null;
        state.successMessage = null;
      });

      const response = await createProductAction(data);

      set((state) => {
        if (response.success && response.data) {
          state.products.unshift(response.data); // Add new product to the beginning
          state.successMessage = "Product created successfully!";
        } else {
          state.error = response.error || "Failed to create product";
        }
        state.isCreating = false;
      });

      return response;
    },

    fetchProducts: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      const response = await getProducts();

      set((state) => {
        if (response.success && response.data) {
          state.products = response.data;
        } else {
          state.error = response.error || "Failed to fetch products";
        }
        state.isLoading = false;
      });

      return response;
    },

    fetchUserProducts: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      const response = await getUserProducts();

      set((state) => {
        if (response.success && response.data) {
          state.products = response.data;
        } else {
          state.error = response.error || "Failed to fetch user products";
        }
        state.isLoading = false;
      });

      return response;
    },

    fetchProductById: async (id) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      const response = await getProductById(id);

      set((state) => {
        if (response.success && response.data) {
          state.currentProduct = response.data;
        } else {
          state.error = response.error || "Failed to fetch product";
        }
        state.isLoading = false;
      });

      return response;
    },

    updateProduct: async (id, data) => {
      set((state) => {
        state.isUpdating = true;
        state.error = null;
        state.successMessage = null;
      });

      const response = await updateProduct(id, data);

      set((state) => {
        if (response.success && response.data) {
          // Update product in the list
          const index = state.products.findIndex(p => p.id === id);
          if (index !== -1) {
            state.products[index] = response.data;
          }
          // Update current product if it's the same
          if (state.currentProduct?.id === id) {
            state.currentProduct = response.data;
          }
          state.successMessage = "Product updated successfully!";
        } else {
          state.error = response.error || "Failed to update product";
        }
        state.isUpdating = false;
      });

      return response;
    },

    deleteProduct: async (id) => {
      set((state) => {
        state.isDeleting = true;
        state.error = null;
        state.successMessage = null;
      });

      const response = await deleteProduct(id);

      set((state) => {
        if (response.success) {
          // Remove product from the list
          state.products = state.products.filter(p => p.id !== id);
          // Clear current product if it's the deleted one
          if (state.currentProduct?.id === id) {
            state.currentProduct = null;
          }
          state.successMessage = "Product deleted successfully!";
        } else {
          state.error = response.error || "Failed to delete product";
        }
        state.isDeleting = false;
      });

      return response;
    },

    fetchCategories: async () => {
      set((state) => {
        state.isLoadingCategories = true;
        state.error = null;
      });

      const response = await getCategories();

      set((state) => {
        if (response.success && response.data) {
          state.categories = response.data;
        } else {
          state.error = response.error || "Failed to fetch categories";
        }
        state.isLoadingCategories = false;
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
export const selectIsCreating = (state: ProductStore) => state.isCreating;
export const selectIsLoading = (state: ProductStore) => state.isLoading;
export const selectIsLoadingCategories = (state: ProductStore) => state.isLoadingCategories;
export const selectProducts = (state: ProductStore) => state.products;
export const selectCategories = (state: ProductStore) => state.categories;
export const selectCurrentProduct = (state: ProductStore) => state.currentProduct;
export const selectError = (state: ProductStore) => state.error;
export const selectSuccessMessage = (state: ProductStore) => state.successMessage;
