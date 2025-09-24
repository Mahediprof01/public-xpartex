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
  img: string | File; // Allow both URL string and File object
  sellerId: string;
  categoryId: string;
  price: string;
  stockQuantity: number;
  productDescription: string;
  productType: string;
  productStatus: string;
  productSubCategory?: string;
  hsnCode?: string;
  skuCode?: string;
  materialType?: string;
  composition?: string;
  gsm?: string;
  yarnCount?: string;
  pattern?: string;
  certifications?: string[];
  unitOfMeasurement: string;
  availableQuantity: number;
  manufacturer?: boolean;
  originCountry?: string;
  productionCapacity?: string;
  description?: DescriptionItem[];
  size?: SizeItem[];
  moq?: number;
  additionalImages?: string[];
  tags?: string[];
  weight?: number;
  deliveryOptions?: string[];
  discountPrice?: number;
  colorVariants?: string[];
  returnPolicy?: string;
  packagingDetails?: string;
  leadTime?: string;
  negotiablePrice?: boolean;
  sampleAvailability?: boolean;
  customBiddingOption?: boolean;
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
  productType: string;
  productStatus: string;
  productSubCategory?: string;
  hsnCode?: string;
  skuCode?: string;
  materialType?: string;
  composition?: string;
  gsm?: string;
  yarnCount?: string;
  pattern?: string;
  certifications?: string[];
  unitOfMeasurement?: string;
  availableQuantity?: number;
  manufacturer?: boolean;
  originCountry?: string;
  productionCapacity?: string;
  additionalImages?: string[];
  tags?: string[];
  weight?: number;
  deliveryOptions?: string[];
  discountPrice?: number;
  colorVariants?: string[];
  returnPolicy?: string;
  packagingDetails?: string;
  leadTime?: string;
  negotiablePrice?: boolean;
  sampleAvailability?: boolean;
  customBiddingOption?: boolean;
  createdAt: string;
  updatedAt: string;
  wholesales?: WholesaleItem[];
  retails?: RetailItem[];
  b2bs?: B2BItem[];
}

// Wholesale item structure
export interface WholesaleItem {
  id: string;
  description: DescriptionItem[];
  size: string;
  moq: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

// Retail item structure  
export interface RetailItem {
  id: string;
  size: string;
  product: string;
  createdAt: string;
  updatedAt: string;
}

// B2B item structure
export interface B2BItem {
  id: string;
  description: DescriptionItem[];
  size: string;
  moq: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

// Unified form data interface for all product types
export interface ProductFormData {
  name: string;
  img: string | File; // Allow both URL string and File object
  categoryId: string;
  price: string;
  stockQuantity: number;
  productDescription: string;
  productStatus: string;
  productType: ProductType;
  productSubCategory?: string;
  hsnCode?: string;
  skuCode?: string;
  materialType?: string;
  composition?: string;
  gsm?: string;
  yarnCount?: string;
  pattern?: string;
  certifications: string[];
  unitOfMeasurement: string;
  availableQuantity: number;
  manufacturer?: boolean;
  originCountry?: string;
  productionCapacity?: string;
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

// Product types - now flexible to support any string
export type ProductType = "wholesale" | "retail" | "b2b" | string;

// Alert types for UI
export type AlertType = "success" | "error" | "warning" | "info";

// Category from API
export interface Category {
  id: string;
  title: string;
}
