export interface Product {
  id: string
  title: string
  images: string[]
  supplierId: string
  supplierName: string
  price: number
  currency: "BDT"
  moq: number
  badges: ("flash" | "super" | "new")[]
  description: string
  specs: { key: string; value: string }[]
  availableQuantity: number
  leadTimeDays: number
  shippingInfo?: {
    freeShipping: boolean
    estimatedDelivery: string
    shippingMethods: string[]
  }
  // Optional fields used in UI
  category?: string
  subcategory?: string
  sku?: string
  certifications?: string[]
  tieredPricing?: TierPricing[]
  categories?: string[]
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  shippingClass?: string
}

export interface Supplier {
  id: string
  name: string
  logo: string
  rating: number
  location: string
  description: string
  contact: {
    email?: string
    phone?: string
  }
}

// Cart & Order Types
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  unitPrice: number
  subtotal: number
  tieredPrice?: {
    tier: number
    pricePerUnit: number
    minQuantity: number
  }
  customizations?: {
    color?: string
    size?: string
    material?: string
    logo?: string
    notes?: string
  }
  moqWarning?: boolean
  estimatedDelivery?: Date
  addedAt: Date
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  type: "sample" | "main"
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: "BDT"
  moqViolations: string[]
  estimatedDelivery?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  type: "shipping" | "billing"
  isDefault: boolean
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  businessId?: string
  vatNumber?: string
}

export interface PaymentMethod {
  id: string
  type: "credit_card" | "paypal" | "bank_transfer" | "net_30"
  isDefault: boolean
  // Credit Card
  cardLast4?: string
  cardBrand?: string
  cardExpiry?: string
  // Bank Transfer
  bankName?: string
  accountNumber?: string
  routingNumber?: string
  // Business Terms
  creditLimit?: number
  creditUsed?: number
  paymentTerms?: string
}

export interface DeliveryMethod {
  id: string
  name: string
  description: string
  estimatedDays: number
  cost: number
  trackingAvailable: boolean
  type: "standard" | "express" | "freight"
}

export interface TierPricing {
  minQuantity: number
  maxQuantity?: number
  pricePerUnit: number
  discount?: number
}

export interface Tax {
  type: "vat" | "sales_tax" | "duty"
  rate: number
  amount: number
  description: string
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  unitPrice: number
  subtotal: number
  customizations?: CartItem['customizations']
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  
  // Pricing
  subtotal: number
  taxes: Tax[]
  shipping: number
  total: number
  currency: "BDT"
  
  // Addresses
  shippingAddress: Address
  billingAddress: Address
  
  // Payment
  paymentMethod: PaymentMethod
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  
  // Business Info
  poNumber?: string
  invoiceNumber?: string
  deliveryMethod: DeliveryMethod
  estimatedDelivery?: Date
  actualDelivery?: Date
  
  // Tracking
  trackingNumber?: string
  trackingUrl?: string
  
  // Files
  attachments?: {
    name: string
    url: string
    type: "po" | "invoice" | "receipt" | "other"
  }[]
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
  shippedAt?: Date
  deliveredAt?: Date
}

export interface RFQRequest {
  id: string
  productList: string[]
  attachments: string[]
  desiredQuantity: number
  leadTime: number
  preferredSuppliers: string[]
  description: string
  createdAt: Date
}

// Authentication Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: "buyer" | "supplier" | "admin"
  isEmailVerified: boolean
  isMfaEnabled: boolean
  createdAt: Date
  lastLoginAt?: Date
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
  mfaCode?: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  confirmPassword: string
  agreeToTerms: boolean
  role: "buyer" | "supplier" | "both"
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordReset {
  token: string
  password: string
  confirmPassword: string
}

export interface EmailVerification {
  token: string
}

export interface SocialAuthProvider {
  provider: "google" | "linkedin"
  clientId: string
}

export interface AuthError {
  code: string
  message: string
  field?: string
}

export interface LoginAttempt {
  email: string
  timestamp: Date
  success: boolean
  ip?: string
}
