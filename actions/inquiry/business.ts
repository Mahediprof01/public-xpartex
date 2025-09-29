// Business logic for inquiry operations
import { CreateInquiryRequest, InquiryResponse } from "./type";

/**
 * Validates inquiry data before submission
 */
export function validateInquiryData(data: CreateInquiryRequest): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate quantity
  if (!data.quantity || data.quantity < 1) {
    errors.push("Quantity must be at least 1");
  }

  // Validate description
  if (!data.description || data.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters");
  }

  // Validate buyer ID
  if (!data.buyerId || data.buyerId.trim().length === 0) {
    errors.push("Buyer ID is required");
  }

  // Validate product ID
  if (!data.productId || data.productId.trim().length === 0) {
    errors.push("Product ID is required");
  }

  // Validate attachment size if present
  if (data.attachment && data.attachment instanceof File) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (data.attachment.size > maxSize) {
      errors.push("Attachment size must be less than 10MB");
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(data.attachment.type)) {
      errors.push(
        "Invalid file type. Allowed types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG"
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Formats inquiry data for API submission
 */
export function formatInquiryForAPI(
  data: CreateInquiryRequest
): CreateInquiryRequest {
  return {
    ...data,
    description: data.description.trim(),
    // Ensure numeric values are properly formatted
    quantity: Number(data.quantity),
  };
}

/**
 * Formats inquiry response for UI display
 */
export function formatInquiryForUI(inquiry: InquiryResponse): InquiryResponse {
  return {
    ...inquiry,
    // Format dates for display
    createdAt: new Date(inquiry.createdAt).toLocaleDateString(),
    updatedAt: new Date(inquiry.updatedAt).toLocaleDateString(),
  };
}
