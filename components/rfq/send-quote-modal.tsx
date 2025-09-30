"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package, User, MapPin, FileText, DollarSign, Truck, Shield, AlertCircle } from "lucide-react";
import { InquiryResponse } from "@/actions/inquiry/type";
import { CreateRFQRequest } from "@/actions/rfq/type";
import { useRFQCreation } from "@/actions/rfq";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface SendQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: InquiryResponse;
}

export function SendQuoteModal({ isOpen, onClose, inquiry }: SendQuoteModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isCreating, createRFQ, error, successMessage, clearError, clearSuccess } = useRFQCreation();
  const [formData, setFormData] = useState({
    title: `Quote for ${inquiry.product?.name || 'Product'}`,
    status: "open" as const,
    quantity: inquiry.quantity,
    unit: inquiry.product?.unitOfMeasurement || "pcs",
    leadTime: inquiry.product?.leadTime || "7-10 days",
    file: "",
    region: "Dhaka, Bangladesh",
    deliveryTerms: "FOB, Delivered at Destination",
    paymentTerms: "50% advance, 50% on delivery",
    warrantyPeriod: "12 months warranty from date of delivery",
    currency: "USD",
    shippingAddress: "",
    specialInstructions: "",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!user?.id || !inquiry.buyer?.id || !inquiry.product?.id) {
      toast({
        title: "Error",
        description: "Missing required information. Please try again.",
        variant: "destructive",
      });
      return;
    }

    // Clear any previous messages
    clearError();
    clearSuccess();

    try {
      const rfqData: CreateRFQRequest = {
        ...formData,
        buyerId: inquiry.buyer.id,
        productId: inquiry.product.id,
      };

      const response = await createRFQ(rfqData);

      if (response.success) {
        toast({
          title: "Quote Sent Successfully!",
          description: "Your quotation has been sent to the buyer.",
        });
        onClose();
      } else {
        toast({
          title: "Failed to Send Quote",
          description: response.message || "An error occurred while sending the quote.",
          variant: "destructive",
        });
      }
    } catch (unexpectedError) {
      console.error('Unexpected error in modal:', unexpectedError);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Number(amount));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Send Quotation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Inquiry Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5" />
                Inquiry Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Product</Label>
                  <p className="font-medium">{inquiry.product?.name}</p>
                  <Badge variant="secondary">{inquiry.product?.productSubCategory}</Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Requested Quantity</Label>
                  <p className="font-medium">{inquiry.quantity.toLocaleString()} {inquiry.product?.unitOfMeasurement}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Current Price</Label>
                  <p className="font-medium text-green-600">{formatCurrency(inquiry.product?.price || 0)}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Buyer Information
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><span className="text-muted-foreground">Name:</span> {inquiry.buyer?.firstName} {inquiry.buyer?.lastName}</p>
                  <p><span className="text-muted-foreground">Email:</span> {inquiry.buyer?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quote Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quote Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="title">Quote Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter quote title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pcs">Pieces</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="yards">Yards</SelectItem>
                      <SelectItem value="boxes">Boxes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leadTime">Lead Time</Label>
                  <Input
                    id="leadTime"
                    value={formData.leadTime}
                    onChange={(e) => handleInputChange('leadTime', e.target.value)}
                    placeholder="e.g., 7-10 days"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="BDT">BDT</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  placeholder="e.g., Dhaka, Bangladesh"
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Terms & Conditions</h3>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryTerms" className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Delivery Terms
                </Label>
                <Textarea
                  id="deliveryTerms"
                  value={formData.deliveryTerms}
                  onChange={(e) => handleInputChange('deliveryTerms', e.target.value)}
                  placeholder="FOB, CIF, Delivered at destination..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentTerms" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Payment Terms
                </Label>
                <Textarea
                  id="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  placeholder="50% advance, 50% on delivery..."
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warrantyPeriod" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Warranty Period
                </Label>
                <Input
                  id="warrantyPeriod"
                  value={formData.warrantyPeriod}
                  onChange={(e) => handleInputChange('warrantyPeriod', e.target.value)}
                  placeholder="12 months warranty..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingAddress" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </Label>
                <Textarea
                  id="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                  placeholder="Complete shipping address..."
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="specialInstructions" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Special Instructions (Optional)
            </Label>
            <Textarea
              id="specialInstructions"
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              placeholder="Any special handling requirements, notes, or additional information..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isCreating}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isCreating}>
            {isCreating ? "Sending Quote..." : "Send Quote"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}