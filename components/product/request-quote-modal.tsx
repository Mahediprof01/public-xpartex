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
import { Loader2, Link } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { createInquiry } from "@/actions/inquiry";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
}

export interface QuoteRequestData {
  quantity: number;
  description: string;
  attachment: string;
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
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    quantity: 1,
    description: "",
    attachment: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = (
    field: string,
    value: string | number
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

  const validateAttachmentUrl = (url: string) => {
    if (!url.trim()) return true; // Optional field
    
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
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

    if (formData.attachment.trim() && !validateAttachmentUrl(formData.attachment)) {
      newErrors.attachment = "Please enter a valid URL";
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

    setIsCreating(true);

    try {
      // Create inquiry
      const result = await createInquiry({
        quantity: formData.quantity,
        description: formData.description,
        attachment: formData.attachment.trim() || undefined,
        productId: productId,
        buyerId: user.id,
      });

      if (result.success) {
        // Show success message
        setSuccessMessage("Quote request submitted successfully! Our team will contact you soon.");
        setErrors({}); // Clear any previous errors
        
        // Auto-close modal after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setErrors({ general: result.error || "Failed to submit quote request" });
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setErrors({ general: "Failed to submit quote request. Please try again." });
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setFormData({
      quantity: 1,
      description: "",
      attachment: "",
    });
    setErrors({});
    setSuccessMessage("");
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

          {/* Attachment URL Field */}
          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment URL (Optional)</Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="attachment"
                type="url"
                value={formData.attachment}
                onChange={(e) => handleInputChange("attachment", e.target.value)}
                className={`pl-10 ${errors.attachment ? "border-red-500" : ""}`}
                placeholder="https://example.com/your-file.pdf"
              />
            </div>
            {errors.attachment && (
              <p className="text-sm text-red-500">{errors.attachment}</p>
            )}
            <p className="text-xs text-gray-500">
              Provide a link to your specification document, drawings, or other relevant files.
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}

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
