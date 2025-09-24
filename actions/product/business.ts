"use client";

import { CreateProductRequest, ProductFormData, ProductType, DescriptionItem, SizeItem } from "./type";


export function transformFormDataToApiRequest(
  formData: ProductFormData,
  sellerId: string
): CreateProductRequest {
  const baseRequest: CreateProductRequest = {
    name: formData.name,
    img: formData.img,
    sellerId,
    categoryId: formData.categoryId,
    price: formData.price,
    stockQuantity: formData.stockQuantity,
    productDescription: formData.productDescription,
    productStatus: formData.productStatus,
    productType: formData.productType,
    unitOfMeasurement: formData.unitOfMeasurement,
    availableQuantity: formData.availableQuantity,
    weight: formData.weight,
  };

  // Add optional fields if they have values
  if (formData.productSubCategory?.trim()) {
    baseRequest.productSubCategory = formData.productSubCategory;
  }
  if (formData.hsnCode?.trim()) {
    baseRequest.hsnCode = formData.hsnCode;
  }
  if (formData.skuCode?.trim()) {
    baseRequest.skuCode = formData.skuCode;
  }
  if (formData.materialType?.trim()) {
    baseRequest.materialType = formData.materialType;
  }
  if (formData.composition?.trim()) {
    baseRequest.composition = formData.composition;
  }
  if (formData.gsm?.trim()) {
    baseRequest.gsm = formData.gsm;
  }
  if (formData.yarnCount?.trim()) {
    baseRequest.yarnCount = formData.yarnCount;
  }
  if (formData.pattern?.trim()) {
    baseRequest.pattern = formData.pattern;
  }
  if (formData.certifications && Array.isArray(formData.certifications) && formData.certifications.length > 0 && formData.certifications.some(cert => cert.trim())) {
    baseRequest.certifications = formData.certifications.filter(cert => cert.trim());
  }
  if (formData.manufacturer !== undefined) {
    baseRequest.manufacturer = formData.manufacturer;
  }
  if (formData.originCountry?.trim()) {
    baseRequest.originCountry = formData.originCountry;
  }
  if (formData.productionCapacity?.trim()) {
    baseRequest.productionCapacity = formData.productionCapacity;
  }

  // Add existing arrays if they have values
  if (formData.description && Array.isArray(formData.description) && formData.description.length > 0 && formData.description.some(desc => desc.title.trim() || desc.value.trim())) {
    baseRequest.description = formData.description.filter(desc => desc.title.trim() || desc.value.trim());
  }
  if (formData.size && Array.isArray(formData.size) && formData.size.length > 0 && formData.size.some(size => size.productsize.trim() || size.productQuantity.trim())) {
    baseRequest.size = formData.size.filter(size => size.productsize.trim() || size.productQuantity.trim());
  }
  if (formData.additionalImages && Array.isArray(formData.additionalImages) && formData.additionalImages.length > 0 && formData.additionalImages.some(img => img.trim())) {
    baseRequest.additionalImages = formData.additionalImages.filter(img => img.trim());
  }
  if (formData.tags && Array.isArray(formData.tags) && formData.tags.length > 0 && formData.tags.some(tag => tag.trim())) {
    baseRequest.tags = formData.tags.filter(tag => tag.trim());
  }
  if (formData.deliveryOptions && Array.isArray(formData.deliveryOptions) && formData.deliveryOptions.length > 0 && formData.deliveryOptions.some(option => option.trim())) {
    baseRequest.deliveryOptions = formData.deliveryOptions.filter(option => option.trim());
  }
  if (formData.colorVariants && Array.isArray(formData.colorVariants) && formData.colorVariants.length > 0 && formData.colorVariants.some(color => color.trim())) {
    baseRequest.colorVariants = formData.colorVariants.filter(color => color.trim());
  }

  // Add discount price if provided
  if (formData.discountPrice > 0) {
    baseRequest.discountPrice = formData.discountPrice;
  }

  // Add string fields if they have values
  if (formData.returnPolicy?.trim()) {
    baseRequest.returnPolicy = formData.returnPolicy;
  }
  if (formData.packagingDetails?.trim()) {
    baseRequest.packagingDetails = formData.packagingDetails;
  }
  if (formData.leadTime?.trim()) {
    baseRequest.leadTime = formData.leadTime;
  }

  // Add conditional fields based on product type
  if (formData.productType === "wholesale" || formData.productType === "b2b") {
    if (formData.moq !== undefined) {
      baseRequest.moq = formData.moq;
    }
    if (formData.negotiablePrice !== undefined) {
      baseRequest.negotiablePrice = formData.negotiablePrice;
    }
    if (formData.sampleAvailability !== undefined) {
      baseRequest.sampleAvailability = formData.sampleAvailability;
    }
    if (formData.customBiddingOption !== undefined) {
      baseRequest.customBiddingOption = formData.customBiddingOption;
    }
  }

  return baseRequest;
}

/**
 * Validate product form data based on product type
 */
export function validateProductFormData(formData: ProductFormData): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Required field validations
  if (!formData.name.trim()) {
    errors.name = "Product name is required";
  }

  if (!formData.img) {
    errors.img = "Product image is required";
  }

  if (!formData.categoryId.trim()) {
    errors.categoryId = "Category is required";
  }

  if (!formData.price.trim()) {
    errors.price = "Price is required";
  } else {
    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      errors.price = "Price must be a valid positive number";
    }
  }

  if (!formData.stockQuantity || formData.stockQuantity <= 0) {
    errors.stockQuantity = "Stock quantity must be greater than 0";
  }

  if (!formData.productDescription.trim()) {
    errors.productDescription = "Product description is required";
  }

  if (!formData.productType.trim()) {
    errors.productType = "Product type is required";
  }

  if (!formData.productStatus.trim()) {
    errors.productStatus = "Product status is required";
  }

  if (!formData.unitOfMeasurement.trim()) {
    errors.unitOfMeasurement = "Unit of measurement is required";
  }

  if (!formData.availableQuantity || formData.availableQuantity <= 0) {
    errors.availableQuantity = "Available quantity must be greater than 0";
  }

  if (!formData.weight || formData.weight <= 0) {
    errors.weight = "Weight must be greater than 0";
  }

  // Validate MOQ for wholesale and B2B
  if ((formData.productType === "wholesale" || formData.productType === "b2b") && 
      (!formData.moq || formData.moq <= 0)) {
    errors.moq = "MOQ is required and must be greater than 0 for wholesale/B2B products";
  }

  // Validate description items
  if (formData.description && Array.isArray(formData.description) && formData.description.length > 0) {
    formData.description.forEach((desc, index) => {
      const validation = validateDescriptionItem(desc);
      if (!validation.isValid) {
        errors[`description_${index}`] = "Description item must have both title and value";
      }
    });
  }

  // Validate size items
  if (formData.size && Array.isArray(formData.size) && formData.size.length > 0) {
    formData.size.forEach((size, index) => {
      const validation = validateSizeItem(size);
      if (!validation.isValid) {
        errors[`size_${index}`] = "Size item must have both size and quantity";
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Generate SKU based on product data
 */
export function generateSKU(productName: string, categoryId: string, productType: ProductType): string {
  const namePrefix = productName.substring(0, 3).toUpperCase();
  const categoryPrefix = categoryId.substring(0, 3).toUpperCase();
  const typePrefix = productType.substring(0, 1).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  
  return `${namePrefix}-${categoryPrefix}-${typePrefix}-${timestamp}`;
}

/**
 * Format price for display
 */
export function formatPrice(price: string | number, currency: string = "USD"): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) return "Invalid price";
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(numPrice);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(originalPrice: number, discountPrice: number): number {
  if (originalPrice <= 0 || discountPrice >= originalPrice) return 0;
  
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
}

/**
 * Validate image URL
 */
export function validateImageUrl(url: string): boolean {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  } catch {
    return false;
  }
}

/**
 * Get product type display name
 */
export function getProductTypeDisplayName(productType: ProductType): string {
  switch (productType) {
    case "retail":
      return "Retail";
    case "wholesale":
      return "Wholesale";
    case "b2b":
      return "B2B";
    default:
      return "Unknown";
  }
}

/**
 * Get required fields for product type
 */
export function getRequiredFieldsForProductType(productType: ProductType): string[] {
  const baseFields = [
    "name",
    "img",
    "categoryId",
    "price",
    "stockQuantity",
    "productDescription",
    "productStatus",
    "productType",
    "unitOfMeasurement",
    "availableQuantity",
    "weight"
  ];

  if (productType === "wholesale" || productType === "b2b") {
    return [...baseFields, "moq"];
  }

  return baseFields;
}

/**
 * Check if field is required for product type
 */
export function isFieldRequired(fieldName: string, productType: ProductType): boolean {
  const requiredFields = getRequiredFieldsForProductType(productType);
  return requiredFields.includes(fieldName);
}

/**
 * Create a new empty description item
 */
export function createEmptyDescriptionItem(): DescriptionItem {
  return {
    title: "",
    value: ""
  };
}

/**
 * Validate a single description item
 */
export function validateDescriptionItem(item: DescriptionItem): {
  isValid: boolean;
  errors: { title?: string; value?: string };
} {
  const errors: { title?: string; value?: string } = {};

  if (!item.title.trim()) {
    errors.title = "Title is required";
  }

  if (!item.value.trim()) {
    errors.value = "Value is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Convert description items to display string
 */
export function descriptionItemsToString(items: DescriptionItem[]): string {
  return items.map(item => `${item.title}: ${item.value}`).join(", ");
}

/**
 * Create a new empty size item
 */
export function createEmptySizeItem(): SizeItem {
  return {
    productsize: "",
    productQuantity: ""
  };
}

/**
 * Validate a single size item
 */
export function validateSizeItem(item: SizeItem): {
  isValid: boolean;
  errors: { productsize?: string; productQuantity?: string };
} {
  const errors: { productsize?: string; productQuantity?: string } = {};

  if (!item.productsize.trim()) {
    errors.productsize = "Size name is required";
  }

  if (!item.productQuantity.trim()) {
    errors.productQuantity = "Quantity is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
