// Description item structure
export interface DescriptionItem {
  title: string;
  value: string;
}

// Size item structure for the new API
export interface SizeItem {
  productsize: string;
  productQuantity: string;
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
  productStatus: string;
  description: DescriptionItem[];
  size: SizeItem[];
  moq?: number; // Optional for retail, required for wholesale/b2b
  additionalImages: string[];
  tags: string[];
  weight: number;
  deliveryOptions: string[];
  discountPrice?: number;
  colorVariants: string[];
  returnPolicy: string;
  packagingDetails: string;
  leadTime: string;
  negotiablePrice?: boolean; // Only for wholesale/b2b
  sampleAvailability?: boolean; // Only for wholesale/b2b
  customBiddingOption?: boolean; // Only for wholesale/b2b
}

// Seller information
export interface Seller {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  address: string;
  registrationdate: string;
  createdAt: string;
  updatedAt: string;
}

// Category information
export interface CategoryInfo {
  id: string;
  title: string;
}

// Product response from API
export interface ProductResponse {
  id: string;
  name: string;
  img: string;
  seller: Seller;
  category: CategoryInfo;
  price: string;
  stockQuantity: number;
  productDescription: string;
  productType: "wholesale" | "retail" | "b2b";
  productStatus: string;
  additionalImages: string[];
  tags: string[];
  weight: number;
  deliveryOptions: string[];
  discountPrice?: number;
  colorVariants: string[];
  returnPolicy: string;
  packagingDetails: string;
  leadTime: string;
  negotiablePrice?: boolean;
  sampleAvailability?: boolean;
  customBiddingOption?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Unified form data interface for all product types
export interface ProductFormData {
  name: string;
  img: string;
  categoryId: string;
  price: string;
  stockQuantity: number;
  productDescription: string;
  productStatus: string;
  productType: ProductType;
  description: DescriptionItem[];
  size: SizeItem[];
  additionalImages: string[];
  tags: string[];
  weight: number;
  deliveryOptions: string[];
  discountPrice: number;
  colorVariants: string[];
  returnPolicy: string;
  packagingDetails: string;
  leadTime: string;
  // Optional fields for wholesale/b2b only
  moq?: number;
  negotiablePrice?: boolean;
  sampleAvailability?: boolean;
  customBiddingOption?: boolean;
}

// Product types
export type ProductType = "wholesale" | "retail" | "b2b";

// Alert types for UI
export type AlertType = "success" | "error" | "warning" | "info";

// Category from API
export interface Category {
  id: string;
  title: string;
}
