// Description item structure
export interface DescriptionItem {
  title: string;
  value: string;
}

// Product creation request matching /product API
export interface CreateProductRequest {
  name: string;
  img: string;
  sellerId: string;
  categoryId: string;
  price: string;
  stockQuantity: number;
  productDescription: string;
  productType: "wholesale" | "retail" | "b2b";
  description: DescriptionItem[];
  size?: string; // Optional for retail, required for wholesale/b2b
  moq?: number; // Optional for retail, required for wholesale/b2b
}

// Product response from API
export interface ProductResponse {
  id: string;
  name: string;
  img: string;
  seller: string;
  category: string;
  price: string;
  stockQuantity: number;
  productDescription: string;
  productType: "wholesale" | "retail" | "b2b";
  createdAt: string;
  updatedAt: string;
}

// Form data interfaces for different product types
export interface BaseProductFormData {
  name: string;
  img: string;
  categoryId: string;
  price: string;
  stockQuantity: number;
  productDescription: string;
  description: DescriptionItem[];
}

export interface RetailProductFormData extends BaseProductFormData {
  productType: "retail";
  size?: string;
}

export interface WholesaleProductFormData extends BaseProductFormData {
  productType: "wholesale";
  size: string;
  moq: number;
}

export interface B2BProductFormData extends BaseProductFormData {
  productType: "b2b";
  size: string;
  moq: number;
}

export type ProductFormData = RetailProductFormData | WholesaleProductFormData | B2BProductFormData;

// Product types
export type ProductType = "wholesale" | "retail" | "b2b";

// Alert types for UI
export type AlertType = "success" | "error" | "warning" | "info";

// Category from API
export interface Category {
  id: string;
  title: string;
}
