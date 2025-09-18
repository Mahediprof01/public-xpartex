"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  CreditCard, 
  MapPin, 
  Building2, 
  Truck, 
  FileText, 
  Upload, 
  Download,
  Check,
  AlertTriangle,
  ArrowLeft,
  Lock,
  Calculator
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Address, PaymentMethod, DeliveryMethod, CartItem } from "@/types"

interface CheckoutFormData {
  // Shipping Address
  shippingAddress: Partial<Address>
  // Billing Address
  billingAddress: Partial<Address>
  sameAsBilling: boolean
  // Business Details
  poNumber: string
  businessId: string
  vatNumber: string
  // Delivery
  deliveryMethod: string
  // Payment
  paymentMethod: string
  // Files
  purchaseOrder?: File
  // Notes
  orderNotes: string
}

// Mock data for delivery methods
const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    estimatedDays: 7,
    cost: 0,
    trackingAvailable: true,
    type: "standard"
  },
  {
    id: "express",
    name: "Express Shipping", 
    description: "2-3 business days",
    estimatedDays: 3,
    cost: 1500,
    trackingAvailable: true,
    type: "express"
  },
  {
    id: "freight",
    name: "B2B Freight",
    description: "Large orders, 7-14 days",
    estimatedDays: 14,
    cost: 2500,
    trackingAvailable: true,
    type: "freight"
  }
]

// Mock payment methods
const PAYMENT_METHODS = [
  { id: "credit_card", name: "Credit Card", description: "Visa, Mastercard, Amex" },
  { id: "paypal", name: "PayPal", description: "Pay with your PayPal account" },
  { id: "bank_transfer", name: "Bank Transfer", description: "Direct bank transfer" },
  { id: "net_30", name: "Net 30 Terms", description: "Business credit terms" }
]

function AddressForm({ 
  address, 
  onChange, 
  type, 
  disabled = false 
}: { 
  address: Partial<Address>
  onChange: (address: Partial<Address>) => void
  type: "shipping" | "billing"
  disabled?: boolean 
}) {
  const handleChange = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor={`${type}-firstName`}>First Name *</Label>
        <Input
          id={`${type}-firstName`}
          value={address.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
          disabled={disabled}
          required
        />
      </div>
      <div>
        <Label htmlFor={`${type}-lastName`}>Last Name *</Label>
        <Input
          id={`${type}-lastName`}
          value={address.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
          disabled={disabled}
          required
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor={`${type}-company`}>Company Name</Label>
        <Input
          id={`${type}-company`}
          value={address.company || ""}
          onChange={(e) => handleChange("company", e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor={`${type}-address1`}>Street Address *</Label>
        <Input
          id={`${type}-address1`}
          value={address.address1 || ""}
          onChange={(e) => handleChange("address1", e.target.value)}
          disabled={disabled}
          required
        />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor={`${type}-address2`}>Apartment, suite, etc.</Label>
        <Input
          id={`${type}-address2`}
          value={address.address2 || ""}
          onChange={(e) => handleChange("address2", e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <Label htmlFor={`${type}-city`}>City *</Label>
        <Input
          id={`${type}-city`}
          value={address.city || ""}
          onChange={(e) => handleChange("city", e.target.value)}
          disabled={disabled}
          required
        />
      </div>
      <div>
        <Label htmlFor={`${type}-state`}>State/Province *</Label>
        <Select 
          value={address.state || ""} 
          onValueChange={(value) => handleChange("state", value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dhaka">Dhaka</SelectItem>
            <SelectItem value="chittagong">Chittagong</SelectItem>
            <SelectItem value="sylhet">Sylhet</SelectItem>
            <SelectItem value="rajshahi">Rajshahi</SelectItem>
            <SelectItem value="khulna">Khulna</SelectItem>
            <SelectItem value="barisal">Barisal</SelectItem>
            <SelectItem value="rangpur">Rangpur</SelectItem>
            <SelectItem value="mymensingh">Mymensingh</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor={`${type}-postalCode`}>Postal Code *</Label>
        <Input
          id={`${type}-postalCode`}
          value={address.postalCode || ""}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          disabled={disabled}
          required
        />
      </div>
      <div>
        <Label htmlFor={`${type}-country`}>Country *</Label>
        <Select 
          value={address.country || "BD"} 
          onValueChange={(value) => handleChange("country", value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BD">Bangladesh</SelectItem>
            <SelectItem value="IN">India</SelectItem>
            <SelectItem value="PK">Pakistan</SelectItem>
            <SelectItem value="US">United States</SelectItem>
            <SelectItem value="GB">United Kingdom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor={`${type}-phone`}>Phone Number</Label>
        <Input
          id={`${type}-phone`}
          value={address.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          disabled={disabled}
          type="tel"
        />
      </div>
    </div>
  )
}

function OrderSummary({ cart, deliveryMethod }: { cart: any, deliveryMethod: DeliveryMethod | null }) {
  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`
  }

  const shippingCost = deliveryMethod?.cost || 0
  const subtotal = cart?.subtotal || 0
  const tax = cart?.tax || 0
  const total = subtotal + tax + shippingCost

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-3">
          {cart?.items.map((item: CartItem) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={item.product.images[0] || "/placeholder.svg"}
                  alt={item.product.title}
                  fill
                  className="object-cover rounded-lg"
                />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                  {item.quantity}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.product.title}</p>
                <p className="text-xs text-gray-500">{item.product.supplierName}</p>
              </div>
              <div className="text-sm font-medium">
                {formatPrice(item.subtotal)}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping ({deliveryMethod?.name || "Standard"})</span>
            <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (15% VAT)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Estimated Delivery */}
        {deliveryMethod && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Truck className="h-4 w-4 text-blue-600" />
            <div className="text-sm">
              <div className="font-medium text-blue-900">Estimated Delivery</div>
              <div className="text-blue-700">
                {deliveryMethod.estimatedDays} business days
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function CheckoutPage() {
  const { user } = useAuth()
  const { cart, sampleCart } = useCart()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const cartType = (searchParams.get("type") as "main" | "sample") || "main"
  const currentCart = cartType === "main" ? cart : sampleCart

  const [formData, setFormData] = useState<CheckoutFormData>({
    shippingAddress: {},
    billingAddress: {},
    sameAsBilling: false,
    poNumber: "",
    businessId: "",
    vatNumber: "",
    deliveryMethod: "standard",
    paymentMethod: "credit_card",
    orderNotes: ""
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedDeliveryMethod = DELIVERY_METHODS.find(m => m.id === formData.deliveryMethod) || null

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=/checkout?type=${cartType}`)
      return
    }

    if (!currentCart || currentCart.items.length === 0) {
      router.push("/cart")
      return
    }
  }, [user, currentCart, router, cartType])

  const updateFormData = (updates: Partial<CheckoutFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const updateShippingAddress = (address: Partial<Address>) => {
    updateFormData({ shippingAddress: address })
    if (formData.sameAsBilling) {
      updateFormData({ billingAddress: address })
    }
  }

  const updateBillingAddress = (address: Partial<Address>) => {
    updateFormData({ billingAddress: address })
  }

  const toggleSameAsBilling = (checked: boolean) => {
    updateFormData({ 
      sameAsBilling: checked,
      billingAddress: checked ? formData.shippingAddress : {}
    })
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Validate shipping address
    if (!formData.shippingAddress.firstName) newErrors.shippingFirstName = "First name is required"
    if (!formData.shippingAddress.lastName) newErrors.shippingLastName = "Last name is required"
    if (!formData.shippingAddress.address1) newErrors.shippingAddress1 = "Address is required"
    if (!formData.shippingAddress.city) newErrors.shippingCity = "City is required"
    if (!formData.shippingAddress.state) newErrors.shippingState = "State is required"
    if (!formData.shippingAddress.postalCode) newErrors.shippingPostalCode = "Postal code is required"

    // Validate billing address if different
    if (!formData.sameAsBilling) {
      if (!formData.billingAddress.firstName) newErrors.billingFirstName = "First name is required"
      if (!formData.billingAddress.lastName) newErrors.billingLastName = "Last name is required"
      if (!formData.billingAddress.address1) newErrors.billingAddress1 = "Address is required"
      if (!formData.billingAddress.city) newErrors.billingCity = "City is required"
      if (!formData.billingAddress.state) newErrors.billingState = "State is required"
      if (!formData.billingAddress.postalCode) newErrors.billingPostalCode = "Postal code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to success page
      router.push("/checkout/success")
      
    } catch (error) {
      console.error("Order processing error:", error)
      setErrors({ general: "Failed to process order. Please try again." })
    } finally {
      setIsProcessing(false)
    }
  }

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`
  }

  if (!user || !currentCart) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Checkout - {cartType === "sample" ? "Sample Order" : "Main Order"}
        </h1>
        <p className="text-gray-600">Complete your order details below</p>
      </div>

      {errors.general && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{errors.general}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AddressForm
                  address={formData.shippingAddress}
                  onChange={updateShippingAddress}
                  type="shipping"
                />
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="same-as-shipping"
                    checked={formData.sameAsBilling}
                    onCheckedChange={toggleSameAsBilling}
                  />
                  <Label htmlFor="same-as-shipping">Same as shipping address</Label>
                </div>
                
                {!formData.sameAsBilling && (
                  <AddressForm
                    address={formData.billingAddress}
                    onChange={updateBillingAddress}
                    type="billing"
                  />
                )}
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="po-number">Purchase Order (PO) Number</Label>
                    <Input
                      id="po-number"
                      value={formData.poNumber}
                      onChange={(e) => updateFormData({ poNumber: e.target.value })}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-id">Business ID</Label>
                    <Input
                      id="business-id"
                      value={formData.businessId}
                      onChange={(e) => updateFormData({ businessId: e.target.value })}
                      placeholder="For tax purposes"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="vat-number">VAT Number</Label>
                  <Input
                    id="vat-number"
                    value={formData.vatNumber}
                    onChange={(e) => updateFormData({ vatNumber: e.target.value })}
                    placeholder="For VAT exemption"
                  />
                </div>

                <div>
                  <Label htmlFor="po-upload">Upload Purchase Order (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <Label htmlFor="po-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Choose file
                      </span>
                      <span className="text-gray-600"> or drag and drop</span>
                    </Label>
                    <Input
                      id="po-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => updateFormData({ purchaseOrder: e.target.files?.[0] })}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC up to 10MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Delivery Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.deliveryMethod}
                  onValueChange={(value) => updateFormData({ deliveryMethod: value })}
                  className="space-y-3"
                >
                  {DELIVERY_METHODS.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex-1">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {method.cost === 0 ? "Free" : formatPrice(method.cost)}
                        </div>
                        {method.trackingAvailable && (
                          <p className="text-xs text-green-600">Tracking available</p>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.paymentMethod}
                  onValueChange={(value) => updateFormData({ paymentMethod: value })}
                  className="space-y-3"
                >
                  {PAYMENT_METHODS.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex-1">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {/* Payment Form Fields */}
                {formData.paymentMethod === "credit_card" && (
                  <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label>Card Number</Label>
                        <Input placeholder="1234 5678 9012 3456" />
                      </div>
                      <div>
                        <Label>Expiry Date</Label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label>CVV</Label>
                        <Input placeholder="123" />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Cardholder Name</Label>
                        <Input placeholder="Name on card" />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "bank_transfer" && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                    <p className="text-sm text-gray-600">
                      Transfer instructions will be provided after order confirmation.
                      Your order will be processed once payment is received.
                    </p>
                  </div>
                )}

                {formData.paymentMethod === "net_30" && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Net 30 Terms</h4>
                    <p className="text-sm text-gray-600">
                      Payment due within 30 days of invoice date.
                      Credit approval may be required for new customers.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Order Notes (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.orderNotes}
                  onChange={(e) => updateFormData({ orderNotes: e.target.value })}
                  placeholder="Special instructions, delivery preferences, etc."
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <OrderSummary cart={currentCart} deliveryMethod={selectedDeliveryMethod} />
            
            {/* Place Order */}
            <Card>
              <CardContent className="p-6">
                <Button
                  type="submit"
                  className="w-full gradient-primary gradient-primary-hover text-white"
                  disabled={isProcessing}
                  size="lg"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {isProcessing ? (
                    "Processing Order..."
                  ) : cartType === "sample" ? (
                    "Request Samples"
                  ) : (
                    `Place Order - ${formatPrice((currentCart?.subtotal || 0) + (currentCart?.tax || 0) + (selectedDeliveryMethod?.cost || 0))}`
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Your information is secure and encrypted
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}