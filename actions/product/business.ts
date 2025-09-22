"use client";

import { CreateProductRequest, ProductFormData, ProductType, DescriptionItem } from "./type";

/**
 * Business logic for product operations
 */

/**
 * Transform form data to API request format
 */
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
    description: formData.description,
    productType: formData.productType,
  };

  // Add conditional fields based on product type
  if (formData.productType === "retail") {
    // For retail, size is optional, moq is not included
    if (formData.size) {
      baseRequest.size = formData.size;
    }
  } else if (formData.productType === "wholesale" || formData.productType === "b2b") {
    // For wholesale and b2b, both size and moq are required
    baseRequest.size = formData.size;
    baseRequest.moq = formData.moq;
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

  // Common validations
  if (!formData.name.trim()) {
    errors.name = "Product name is required";
  }

  if (!formData.img.trim()) {
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

  if (!formData.description || formData.description.length === 0) {
    errors.description = "At least one description item is required";
  } else {
    // Validate each description item
    formData.description.forEach((item, index) => {
      if (!item.title.trim()) {
        errors[`description_${index}_title`] = `Description item ${index + 1} title is required`;
      }
      if (!item.value.trim()) {
        errors[`description_${index}_value`] = `Description item ${index + 1} value is required`;
      }
    });
  }

  // Type-specific validations
  if (formData.productType === "wholesale" || formData.productType === "b2b") {
    if (!formData.size?.trim()) {
      errors.size = "Size is required for wholesale and B2B products";
    }

    if (!formData.moq || formData.moq <= 0) {
      errors.moq = "Minimum order quantity must be greater than 0";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
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
    "description",
    "productType"
  ];

  if (productType === "wholesale" || productType === "b2b") {
    return [...baseFields, "size", "moq"];
  }

  if (productType === "retail") {
    return [...baseFields, "size"];
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
