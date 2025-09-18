"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Heart, 
  AlertTriangle, 
  Upload, 
  Download,
  Clock,
  Truck,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { CartItem } from "@/types"
import { cn } from "@/lib/utils"

// Safe date formatter: accepts Date | string | number | null | undefined
function safeFormatDate(dateInput: Date | string | number | null | undefined, opts?: Intl.DateTimeFormatOptions) {
  if (!dateInput) return "—"
  try {
    const d = dateInput instanceof Date ? dateInput : new Date(dateInput as any)
    if (isNaN(d.getTime())) return String(dateInput)
    return d.toLocaleDateString("en-BD", opts || {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch (e) {
    return String(dateInput)
  }
}

interface CartItemRowProps {
  item: CartItem
  cartType: "main" | "sample"
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
  onMoveToWishlist: (itemId: string) => void
}

function CartItemRow({ item, cartType, onUpdateQuantity, onRemove, onMoveToWishlist }: CartItemRowProps) {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= item.product.availableQuantity) {
      setQuantity(newQuantity)
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`
  }

  const formatDate = (date: Date | string | number | null | undefined) => safeFormatDate(date)

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={item.product.images[0] || "/placeholder.svg"}
              alt={item.product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <Link 
                  href={`/products/${item.product.id}`}
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {item.product.title}
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  by <Link href={`/suppliers/${item.product.supplierId}`} className="text-blue-600 hover:underline">
                    {item.product.supplierName}
                  </Link>
                </p>
                {item.customizations && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(item.customizations).map(([key, value]) => 
                      value && (
                        <span key={key} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                          {key}: {value}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(item.subtotal)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatPrice(item.unitPrice)} each
                </div>
                {item.tieredPrice && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    Tier pricing: {item.tieredPrice.minQuantity}+ units
                  </Badge>
                )}
              </div>
            </div>

            {/* MOQ Warning */}
            {item.moqWarning && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  Need {item.product.moq - item.quantity} more units to meet MOQ of {item.product.moq.toLocaleString()}
                </AlertDescription>
              </Alert>
            )}

            {/* Quantity and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Qty:</Label>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-20 h-8 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      min={1}
                      max={item.product.availableQuantity}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= item.product.availableQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Estimated Delivery */}
                {item.estimatedDelivery && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Est. delivery: {formatDate(item.estimatedDelivery)}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMoveToWishlist(item.id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Save for Later
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface BulkUploadProps {
  onUpload: (file: File) => void
}

function BulkUpload({ onUpload }: BulkUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Bulk Order Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Upload a CSV or PDF file with your bulk order details for faster processing.
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <Label htmlFor="bulk-upload" className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              Choose file
            </span>
            <span className="text-gray-600"> or drag and drop</span>
          </Label>
          <Input
            id="bulk-upload"
            type="file"
            accept=".csv,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-1">CSV or PDF up to 10MB</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download Template
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CartPage() {
  const { user } = useAuth()
  const { 
    cart, 
    sampleCart, 
    removeFromCart, 
    updateQuantity, 
    moveToWishlist, 
    clearCart,
    getMOQViolations,
    importBulkOrder
  } = useCart()
  
  const [activeTab, setActiveTab] = useState<"main" | "sample">("main")
  const [showBulkUpload, setShowBulkUpload] = useState(false)

  const currentCart = activeTab === "main" ? cart : sampleCart
  const moqViolations = getMOQViolations(activeTab)

  const handleBulkUpload = async (file: File) => {
    try {
      const text = await file.text()
      const result = await importBulkOrder(text)
      if (result.success) {
        // Show success message
      } else {
        // Show errors
      }
    } catch (error) {
      console.error("Bulk upload error:", error)
    }
  }

  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your cart</h2>
          <p className="text-gray-600 mb-6">Please log in to see your saved items and continue shopping.</p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">Manage your items and proceed to checkout</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "main" | "sample")}>
        <TabsList className="mb-6">
          <TabsTrigger value="main" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Main Order ({cart?.items.length || 0})
          </TabsTrigger>
          <TabsTrigger value="sample" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Sample Order ({sampleCart?.items.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="space-y-0">
          <CartContent 
            cart={cart} 
            cartType="main"
            moqViolations={moqViolations}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onMoveToWishlist={moveToWishlist}
            onClearCart={clearCart}
            showBulkUpload={showBulkUpload}
            onToggleBulkUpload={() => setShowBulkUpload(!showBulkUpload)}
            onBulkUpload={handleBulkUpload}
          />
        </TabsContent>

        <TabsContent value="sample" className="space-y-0">
          <CartContent 
            cart={sampleCart} 
            cartType="sample"
            moqViolations={getMOQViolations("sample")}
            onUpdateQuantity={(itemId, quantity) => updateQuantity(itemId, quantity, "sample")}
            onRemoveItem={(itemId) => removeFromCart(itemId, "sample")}
            onMoveToWishlist={(itemId) => moveToWishlist(itemId, "sample")}
            onClearCart={() => clearCart("sample")}
            showBulkUpload={showBulkUpload}
            onToggleBulkUpload={() => setShowBulkUpload(!showBulkUpload)}
            onBulkUpload={handleBulkUpload}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CartContentProps {
  cart: any
  cartType: "main" | "sample"
  moqViolations: string[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onMoveToWishlist: (itemId: string) => void
  onClearCart: () => void
  showBulkUpload: boolean
  onToggleBulkUpload: () => void
  onBulkUpload: (file: File) => void
}

function CartContent({ 
  cart, 
  cartType, 
  moqViolations, 
  onUpdateQuantity, 
  onRemoveItem, 
  onMoveToWishlist, 
  onClearCart,
  showBulkUpload,
  onToggleBulkUpload,
  onBulkUpload
}: CartContentProps) {
  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your {cartType} cart is empty
        </h3>
        <p className="text-gray-600 mb-6">
          {cartType === "main" 
            ? "Add products to your cart to get started with your order."
            : "Add sample products to test before placing your main order."
          }
        </p>
        <div className="space-y-3">
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
          <div>
            <Button variant="outline" onClick={onToggleBulkUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload Order
            </Button>
          </div>
        </div>
        
        {showBulkUpload && (
          <div className="mt-8 max-w-md mx-auto">
            <BulkUpload onUpload={onBulkUpload} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        {/* MOQ Violations */}
        {moqViolations.length > 0 && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <div className="font-medium mb-2">Minimum Order Quantity (MOQ) Requirements:</div>
              <ul className="space-y-1 text-sm">
                {moqViolations.map((violation, index) => (
                  <li key={index}>• {violation}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {cart.items.length} item{cart.items.length !== 1 ? 's' : ''} in your {cartType} cart
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onToggleBulkUpload}>
              <Upload className="h-4 w-4 mr-1" />
              Bulk Upload
            </Button>
            <Button variant="outline" size="sm" onClick={onClearCart}>
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Bulk Upload */}
        {showBulkUpload && (
          <BulkUpload onUpload={onBulkUpload} />
        )}

        {/* Cart Items */}
        <div>
          {cart.items.map((item: CartItem) => (
            <CartItemRow
              key={item.id}
              item={item}
              cartType={cartType}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
              onMoveToWishlist={onMoveToWishlist}
            />
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <Card className="sticky top-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{cart.shipping === 0 ? "Free" : formatPrice(cart.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (15% VAT)</span>
                <span>{formatPrice(cart.tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>

            {/* Delivery Estimate */}
            {cart.estimatedDelivery && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Truck className="h-4 w-4 text-blue-600" />
                <div className="text-sm">
                  <div className="font-medium text-blue-900">Estimated Delivery</div>
                  <div className="text-blue-700">
                    {safeFormatDate(cart.estimatedDelivery, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            <Link href={`/checkout?type=${cartType}`}>
              <Button 
                className="w-full gradient-primary gradient-primary-hover text-white"
                disabled={moqViolations.length > 0}
              >
                {cartType === "sample" ? "Request Samples" : "Proceed to Checkout"}
              </Button>
            </Link>

            {moqViolations.length > 0 && (
              <p className="text-xs text-orange-600 text-center">
                Please meet MOQ requirements to proceed
              </p>
            )}

            {/* Additional Actions */}
            <div className="space-y-2 pt-4 border-t">
              <Link href="/products">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              {cartType === "main" && (
                <Button variant="ghost" className="w-full text-sm">
                  Save Cart for Later
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}