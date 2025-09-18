"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Cart, CartItem, Product, TierPricing } from "@/types"
import { useAuth } from "@/contexts/auth-context"
import { getCookie, setCookie } from "@/lib/utils"

interface CartContextType {
  cart: Cart | null
  sampleCart: Cart | null
  addToCart: (product: Product, quantity: number, type?: "main" | "sample", customizations?: CartItem['customizations']) => void
  removeFromCart: (itemId: string, cartType?: "main" | "sample") => void
  updateQuantity: (itemId: string, quantity: number, cartType?: "main" | "sample") => void
  moveToWishlist: (itemId: string, cartType?: "main" | "sample") => void
  clearCart: (cartType?: "main" | "sample") => void
  getCartTotal: (cartType?: "main" | "sample") => number
  getCartItemCount: (cartType?: "main" | "sample") => number
  getMOQViolations: (cartType?: "main" | "sample") => string[]
  calculateTieredPrice: (product: Product, quantity: number) => { pricePerUnit: number; tier?: TierPricing }
  importBulkOrder: (csvData: string) => Promise<{ success: boolean; errors: string[] }>
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

const TAX_RATE = 0.15 // 15% VAT
const SHIPPING_THRESHOLD = 10000 // Free shipping above 10,000 BDT

export function CartProvider({ children }: CartProviderProps) {
  const { user, isAuthenticated } = useAuth()
  const [cart, setCart] = useState<Cart | null>(null)
  const [sampleCart, setSampleCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize carts on mount
  useEffect(() => {
    const initializeCarts = () => {
      try {
        // Load from localStorage/cookies
        const mainCartData = getCookie("main_cart")
        const sampleCartData = getCookie("sample_cart")

        if (mainCartData) {
          const parsedCart = JSON.parse(mainCartData)
          setCart(parsedCart)
        }

        if (sampleCartData) {
          const parsedSampleCart = JSON.parse(sampleCartData)
          setSampleCart(parsedSampleCart)
        }

        // Create empty carts if none exist (for both authenticated and guest users)
        if (!mainCartData) {
          const newCart = createEmptyCart(user?.id || "guest", "main")
          setCart(newCart)
          persistCart(newCart, "main")
        }

        if (!sampleCartData) {
          const newSampleCart = createEmptyCart(user?.id || "guest", "sample")
          setSampleCart(newSampleCart)
          persistCart(newSampleCart, "sample")
        }
      } catch (error) {
        console.error("Failed to initialize carts:", error)
        // Create new empty carts on error (for both authenticated and guest users)
        const newCart = createEmptyCart(user?.id || "guest", "main")
        const newSampleCart = createEmptyCart(user?.id || "guest", "sample")
        setCart(newCart)
        setSampleCart(newSampleCart)
      } finally {
        setIsLoading(false)
      }
    }

    initializeCarts()
  }, [user])

  const createEmptyCart = (userId: string, type: "main" | "sample"): Cart => {
    const now = new Date()
    return {
      id: `${type}_cart_${Date.now()}`,
      userId,
      items: [],
      type,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: "BDT",
      moqViolations: [],
      createdAt: now,
      updatedAt: now
    }
  }

  const persistCart = (cartData: Cart, type: "main" | "sample") => {
    try {
      const cookieName = type === "main" ? "main_cart" : "sample_cart"
      setCookie(cookieName, JSON.stringify(cartData), 7) // 7 days
    } catch (error) {
      console.error(`Failed to persist ${type} cart:`, error)
    }
  }

  const calculateTieredPrice = (product: Product, quantity: number): { pricePerUnit: number; tier?: TierPricing } => {
    if (!product.tieredPricing || product.tieredPricing.length === 0) {
      return { pricePerUnit: product.price }
    }

    // Find the appropriate tier
    let applicableTier: TierPricing | undefined
    for (const tier of product.tieredPricing.sort((a, b) => b.minQuantity - a.minQuantity)) {
      if (quantity >= tier.minQuantity) {
        if (!tier.maxQuantity || quantity <= tier.maxQuantity) {
          applicableTier = tier
          break
        }
      }
    }

    return {
      pricePerUnit: applicableTier?.pricePerUnit || product.price,
      tier: applicableTier
    }
  }

  const calculateCartTotals = (items: CartItem[]): { subtotal: number; tax: number; shipping: number; total: number } => {
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)
    const tax = subtotal * TAX_RATE
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : 500 // 500 BDT shipping fee
    const total = subtotal + tax + shipping

    return { subtotal, tax, shipping, total }
  }

  const checkMOQViolations = (items: CartItem[]): string[] => {
    const violations: string[] = []
    
    items.forEach(item => {
      if (item.quantity < item.product.moq) {
        violations.push(
          `${item.product.title}: Need ${item.product.moq - item.quantity} more units to meet MOQ of ${item.product.moq}`
        )
      }
    })

    return violations
  }

  const updateCartState = (cartType: "main" | "sample", updatedItems: CartItem[]) => {
    const totals = calculateCartTotals(updatedItems)
    const moqViolations = checkMOQViolations(updatedItems)
    
    const updatedCart: Cart = {
      ...(cartType === "main" ? cart! : sampleCart!),
      items: updatedItems,
      ...totals,
      moqViolations,
      updatedAt: new Date()
    }

    if (cartType === "main") {
      setCart(updatedCart)
      persistCart(updatedCart, "main")
    } else {
      setSampleCart(updatedCart)
      persistCart(updatedCart, "sample")
    }

    return updatedCart
  }

  const addToCart = (
    product: Product, 
    quantity: number, 
    type: "main" | "sample" = "main",
    customizations?: CartItem['customizations']
  ) => {
    const targetCart = type === "main" ? cart : sampleCart
    if (!targetCart) return

    const { pricePerUnit, tier } = calculateTieredPrice(product, quantity)
    
    // Check if item already exists
    const existingItemIndex = targetCart.items.findIndex(item => 
      item.productId === product.id && 
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
    )

    let updatedItems: CartItem[]

    if (existingItemIndex >= 0) {
      // Update existing item
      updatedItems = [...targetCart.items]
      const existingItem = updatedItems[existingItemIndex]
      const newQuantity = existingItem.quantity + quantity
      const newPricing = calculateTieredPrice(product, newQuantity)
      
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
        unitPrice: newPricing.pricePerUnit,
        subtotal: newQuantity * newPricing.pricePerUnit,
        tieredPrice: newPricing.tier ? {
          tier: newPricing.tier.minQuantity,
          pricePerUnit: newPricing.tier.pricePerUnit,
          minQuantity: newPricing.tier.minQuantity
        } : undefined,
        moqWarning: newQuantity < product.moq
      }
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `item_${Date.now()}_${Math.random()}`,
        productId: product.id,
        product,
        quantity,
        unitPrice: pricePerUnit,
        subtotal: quantity * pricePerUnit,
        tieredPrice: tier ? {
          tier: tier.minQuantity,
          pricePerUnit: tier.pricePerUnit,
          minQuantity: tier.minQuantity
        } : undefined,
        customizations,
        moqWarning: quantity < product.moq,
        estimatedDelivery: new Date(Date.now() + product.leadTimeDays * 24 * 60 * 60 * 1000),
        addedAt: new Date()
      }

      updatedItems = [...targetCart.items, newItem]
    }

    updateCartState(type, updatedItems)
  }

  const removeFromCart = (itemId: string, cartType: "main" | "sample" = "main") => {
    const targetCart = cartType === "main" ? cart : sampleCart
    if (!targetCart) return

    const updatedItems = targetCart.items.filter(item => item.id !== itemId)
    updateCartState(cartType, updatedItems)
  }

  const updateQuantity = (itemId: string, quantity: number, cartType: "main" | "sample" = "main") => {
    const targetCart = cartType === "main" ? cart : sampleCart
    if (!targetCart || quantity <= 0) return

    const updatedItems = targetCart.items.map(item => {
      if (item.id === itemId) {
        const newPricing = calculateTieredPrice(item.product, quantity)
        return {
          ...item,
          quantity,
          unitPrice: newPricing.pricePerUnit,
          subtotal: quantity * newPricing.pricePerUnit,
          tieredPrice: newPricing.tier ? {
            tier: newPricing.tier.minQuantity,
            pricePerUnit: newPricing.tier.pricePerUnit,
            minQuantity: newPricing.tier.minQuantity
          } : undefined,
          moqWarning: quantity < item.product.moq,
          estimatedDelivery: new Date(Date.now() + item.product.leadTimeDays * 24 * 60 * 60 * 1000)
        }
      }
      return item
    })

    updateCartState(cartType, updatedItems)
  }

  const moveToWishlist = (itemId: string, cartType: "main" | "sample" = "main") => {
    // TODO: Implement wishlist functionality
    removeFromCart(itemId, cartType)
  }

  const clearCart = (cartType: "main" | "sample" = "main") => {
    updateCartState(cartType, [])
  }

  const getCartTotal = (cartType: "main" | "sample" = "main") => {
    const targetCart = cartType === "main" ? cart : sampleCart
    return targetCart?.total || 0
  }

  const getCartItemCount = (cartType: "main" | "sample" = "main") => {
    const targetCart = cartType === "main" ? cart : sampleCart
    return targetCart?.items.reduce((count, item) => count + item.quantity, 0) || 0
  }

  const getMOQViolations = (cartType: "main" | "sample" = "main") => {
    const targetCart = cartType === "main" ? cart : sampleCart
    return targetCart?.moqViolations || []
  }

  const importBulkOrder = async (csvData: string): Promise<{ success: boolean; errors: string[] }> => {
    // TODO: Implement CSV parsing and bulk add to cart
    return { success: true, errors: [] }
  }

  const value: CartContextType = {
    cart,
    sampleCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    moveToWishlist,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getMOQViolations,
    calculateTieredPrice,
    importBulkOrder,
    isLoading
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}