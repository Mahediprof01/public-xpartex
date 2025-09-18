"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Package, 
  Clock,
  CreditCard,
  MapPin,
  Truck,
  Phone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"

// Mock order data - in real app this would come from API/database
const MOCK_ORDER = {
  id: "ORD-2025-001234",
  orderNumber: "XPT-240914-001",
  status: "confirmed",
  total: 125750.00,
  currency: "BDT",
  paymentStatus: "paid",
  paymentMethod: {
    type: "credit_card",
    last4: "4242",
    brand: "visa"
  },
  shippingAddress: {
    firstName: "John",
    lastName: "Doe", 
    company: "Acme Corporation",
    address1: "123 Business Street",
    city: "Dhaka",
    state: "Dhaka",
    postalCode: "1000",
    country: "Bangladesh",
    phone: "+880-123-456-789"
  },
  items: [
    {
      id: "item-1",
      title: "Premium Cotton T-Shirt - Unisex",
      quantity: 500,
      unitPrice: 450.00,
      subtotal: 225000.00,
      supplier: "Dhaka Textiles Ltd."
    },
    {
      id: "item-2", 
      title: "Classic Polo Shirt - Business",
      quantity: 200,
      unitPrice: 650.00,
      subtotal: 130000.00,
      supplier: "Bengal Garments Co."
    }
  ],
  estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  createdAt: new Date(),
  trackingNumber: "XPT123456789",
  invoiceUrl: "/api/orders/ORD-2025-001234/invoice.pdf"
}

export default function CheckoutSuccessPage() {
  const { user } = useAuth()
  const [order, setOrder] = useState(MOCK_ORDER)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    // Simulate email confirmation
    const timer = setTimeout(() => {
      setEmailSent(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const formatPrice = (price: number, currency: string = "BDT") => {
    return `${currency} ${price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-BD", { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "processing": 
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-4">
          Thank you for your business, {user?.firstName}
        </p>
        <p className="text-gray-500">
          Your order <span className="font-medium text-gray-900">{order.orderNumber}</span> has been successfully placed and confirmed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Summary</span>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">by {item.supplier}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>Qty: {item.quantity.toLocaleString()}</span>
                          <span>Unit: {formatPrice(item.unitPrice)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatPrice(item.subtotal)}</div>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </div>
                {order.shippingAddress.company && (
                  <div className="text-gray-600">{order.shippingAddress.company}</div>
                )}
                <div className="text-gray-600">
                  {order.shippingAddress.address1}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                  {order.shippingAddress.country}
                </div>
                {order.shippingAddress.phone && (
                  <div className="flex items-center gap-2 text-gray-600 mt-3">
                    <Phone className="w-4 h-4" />
                    {order.shippingAddress.phone}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">
                    {order.paymentMethod.brand?.toUpperCase()} •••• {order.paymentMethod.last4}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-bold text-lg">{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Order Confirmed</div>
                  <div className="text-sm text-gray-600">Just now</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">Processing</div>
                  <div className="text-sm text-gray-600">1-2 business days</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium">Shipped</div>
                  <div className="text-sm text-gray-600">
                    Est. {formatDate(order.estimatedDelivery)}
                  </div>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="p-3 bg-blue-50 rounded-lg mt-4">
                  <div className="font-medium text-blue-900 mb-1">Tracking Number</div>
                  <div className="text-blue-700 font-mono text-sm">{order.trackingNumber}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Confirmation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {emailSent ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Confirmation email sent to {user?.email}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Sending confirmation email...</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              <Button className="w-full" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Track Order
              </Button>
              <Link href="/orders">
                <Button className="w-full" variant="outline">
                  View All Orders
                </Button>
              </Link>
              <Link href="/products">
                <Button className="w-full gradient-primary gradient-primary-hover text-white">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Customer Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Questions about your order? Our customer support team is here to help.
              </p>
              <Link href="/help">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Important Order Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Order Processing:</strong> Your order will be processed within 1-2 business days. You'll receive a shipping confirmation with tracking details once your items are dispatched.
          </div>
          <div>
            <strong>Delivery Time:</strong> Estimated delivery time is 7-14 business days for standard shipping. Express and freight options may vary.
          </div>
          <div>
            <strong>Quality Assurance:</strong> All items undergo quality inspection before shipping to ensure they meet our standards and your specifications.
          </div>
          <div>
            <strong>Returns & Exchanges:</strong> Need to return or exchange? Contact us within 30 days of delivery for assistance.
          </div>
        </div>
      </div>
    </div>
  )
}