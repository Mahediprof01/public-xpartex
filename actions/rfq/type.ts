// RFQ types based on the API specification

export interface CreateRFQRequest {
  title: string;
  status: "open" | "closed" | "pending";
  quantity: number;
  unit: string;
  leadTime: string;
  file?: string;
  region: string;
  buyerId: string;
  productId: string;
  deliveryTerms: string;
  paymentTerms: string;
  warrantyPeriod: string;
  currency: string;
  shippingAddress: string;
  specialInstructions?: string;
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

export interface Buyer {
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
  inquiries: string[];
}

export interface RFQResponse {
  id: string;
  title: string;
  status: string;
  quantity: number;
  unit: string;
  leadTime: string;
  file: string;
  region: string;
  buyer: Buyer;
  rfqBySelerId: Seller;
  product: Product;
  deliveryTerms: string;
  paymentTerms: string;
  warrantyPeriod: string;
  currency: string;
  shippingAddress: string;
  specialInstructions: string;
  createdAt: string;
  updatedAt: string;
}

export interface RFQApiResponse {
  success: boolean;
  message: string;
  data?: RFQResponse;
  error?: string;
}

export interface RFQListApiResponse {
  success: boolean;
  message: string;
  data?: RFQResponse[];
  error?: string;
}