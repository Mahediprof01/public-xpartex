// Inquiry types based on the API specification

export interface CreateInquiryRequest {
  quantity: number;
  description: string;
  attachment?: string; // URL after file upload
  productId: string;
  buyerId: string;
}

export interface Seller {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  title: string;
}

export interface Wholesale {
  id: string;
  description: Array<{
    title: string;
    value: string;
  }>;
  size: string;
  moq: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

export interface Retail {
  id: string;
  size: string;
  product: string;
  createdAt: string;
  updatedAt: string;
}

export interface B2B {
  id: string;
  description: Array<{
    title: string;
    value: string;
  }>;
  size: string;
  moq: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

export interface Product {
  id: string;
  name: string;
  img: string;
  seller: Seller;
  category: Category;
  price: string;
  stockQuantity: number;
  productDescription: string;
  productType: string;
  productStatus: string;
  productSubCategory: string;
  hsnCode: string;
  skuCode: string;
  materialType: string;
  composition: string;
  gsm: string;
  yarnCount: string;
  pattern: string;
  certifications: string[];
  unitOfMeasurement: string;
  availableQuantity: number;
  manufacturer: boolean;
  originCountry: string;
  productionCapacity: string;
  additionalImages: string[];
  tags: string[];
  weight: number;
  deliveryOptions: string[];
  discountPrice: number;
  colorVariants: string[];
  returnPolicy: string;
  packagingDetails: string;
  leadTime: string;
  negotiablePrice: boolean;
  sampleAvailability: boolean;
  customBiddingOption: boolean;
  createdAt: string;
  updatedAt: string;
  wholesales: Wholesale[];
  retails: Retail[];
  b2bs: B2B[];
}

export interface Buyer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryResponse {
  id: string;
  quantity: number;
  description: string;
  attachment: string;
  product: Product;
  buyer: Buyer;
}

export interface InquiryApiResponse {
  success: boolean;
  message: string;
  data?: InquiryResponse;
  error?: string;
}