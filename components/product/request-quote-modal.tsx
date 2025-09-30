"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useInquiryStore } from "@/actions/inquiry/store";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export interface QuoteRequestData {
  quantity: number;
  description: string;
  attachment: File | null;
  buyerId: string;
  productId: string;
}

export function RequestQuoteModal({
  isOpen,
  onClose,
  productId,
  productName,
}: RequestQuoteModalProps) {
  const { user } = useAuth();
  const {
    createInquiry,
    isCreating,
    error,
    successMessage,
    clearError,
    clearSuccess,
  } = useInquiryStore();
  const [formData, setFormData] = useState({
    quantity: 1,
    description: "",
    attachment: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: string,
    value: string | number | File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setErrors({ attachment: "File size must be less than 10MB" });
        return;
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

      if (!allowedTypes.includes(file.type)) {
        setErrors({
          attachment:
            "Invalid file type. Allowed types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG",
        });
        return;
      }

      // Clear any previous attachment errors
      if (errors.attachment) {
        setErrors((prev) => ({ ...prev, attachment: "" }));
      }
    }

    handleInputChange("attachment", file);
  };

  const removeAttachment = () => {
    handleInputChange("attachment", null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user?.id) {
      setErrors({ general: "You must be logged in to request a quote" });
      return;
    }

    try {
      console.log("Submitting inquiry with data:", {
        quantity: formData.quantity,
        description: formData.description.trim(),
        attachment: formData.attachment,
        buyerId: user.id,
        productId: productId,
      });

      const response = await createInquiry({
        quantity: formData.quantity,
        description: formData.description.trim(),
        attachment: formData.attachment,
        buyerId: user.id,
        productId: productId,
      });

      console.log("Inquiry response:", response);

      if (response.success) {
        // Show success message
        alert(
          successMessage ||
            "Quote request submitted successfully! Our team will contact you soon."
        );
        clearSuccess();
        handleClose(); // Close modal on success
      } else {
        // Show error message
        alert(error || "Failed to submit quote request. Please try again.");
        clearError();
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);
      alert("Failed to submit quote request. Please try again.");
    }
  };

  const handleClose = () => {
    setFormData({
      quantity: 1,
      description: "",
      attachment: null,
    });
    setErrors({});
    clearError();
    clearSuccess();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Quote</DialogTitle>
          <DialogDescription>
            Submit a quote request for <strong>{productName}</strong>. Our team
            will review your requirements and provide a competitive quote.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quantity Field */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) =>
                handleInputChange("quantity", parseInt(e.target.value) || 1)
              }
              className={errors.quantity ? "border-red-500" : ""}
              placeholder="Enter quantity needed"
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={errors.description ? "border-red-500" : ""}
              placeholder="Please describe your requirements, specifications, delivery timeline, and any other relevant details..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
            <p className="text-xs text-gray-500">
              Minimum 10 characters. Include specifications, delivery
              requirements, and any special requests.
            </p>
          </div>

          {/* Attachment Field */}
          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment (Optional)</Label>
            {formData.attachment ? (
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                <FileText className="h-5 w-5 text-gray-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {formData.attachment.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(formData.attachment.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeAttachment}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="mt-2">
                    <Label
                      htmlFor="attachment"
                      className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-500"
                    >
                      Upload a file
                    </Label>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB)
                    </p>
                  </div>
                  <Input
                    id="attachment"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                </div>
              </div>
            )}
            {errors.attachment && (
              <p className="text-sm text-red-500">{errors.attachment}</p>
            )}
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Quote Request"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
