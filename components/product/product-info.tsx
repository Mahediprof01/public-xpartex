"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Share2, MessageCircle, Truck, Shield, Clock, Plus, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Product } from "@/types"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart, calculateTieredPrice } = useCart()
  const [quantity, setQuantity] = useState(product.moq)
  const [isFavorited, setIsFavorited] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
    })}`;
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "flash":
        return "destructive";
      case "super":
        return "default";
      case "new":
        return "secondary";
      default:
        return "default";
    }
  };

  const { pricePerUnit, tier } = calculateTieredPrice(product, quantity)
  const totalPrice = quantity * pricePerUnit

  const handleAddToCart = async (cartType: "main" | "sample" = "main") => {
    setAddingToCart(true)
    try {
      addToCart(product, quantity, cartType)
      // Could show success message here
    } finally {
      setAddingToCart(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Badges */}
      {product.badges.length > 0 && (
        <div className="flex gap-2">
          {product.badges.map((badge: string) => (
            <Badge
              key={badge}
              variant={getBadgeVariant(badge)}
              className="font-medium capitalize"
            >
              {badge === "flash" ? "Flash Deal" : badge}
            </Badge>
          ))}
        </div>
      )}

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.title}
        </h1>
        <p className="text-gray-600">Product ID: {product.id}</p>
      </div>

      {/* Price */}
      <div className="border-t border-b border-gray-200 py-6">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-gray-500">per piece</span>
        </div>
        <p className="text-sm text-gray-600">
          MOQ: {product.moq.toLocaleString()} pieces • Available:{" "}
          {product.availableQuantity.toLocaleString()} pieces
        </p>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(product.moq, quantity - 100))}
              className="px-3 py-2 hover:bg-gray-50"
              disabled={quantity <= product.moq}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(
                    product.moq,
                    Number.parseInt(e.target.value) || product.moq
                  )
                )
              }
              className="w-24 px-3 py-2 text-center border-0 focus:ring-0"
              min={product.moq}
            />
            <button
              onClick={() => setQuantity(quantity + 100)}
              className="px-3 py-2 hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-600">
            Min order: {product.moq.toLocaleString()}
          </span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              Total: {formatPrice(totalPrice, product.currency)}
            </span>
            {tier && (
              <Badge variant="secondary" className="text-xs">
                Tier price: {formatPrice(pricePerUnit, product.currency)} each
              </Badge>
            )}
          </div>
          {pricePerUnit !== product.price && (
            <p className="text-sm text-green-600">
              Savings: {formatPrice((product.price - pricePerUnit) * quantity, product.currency)}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button 
            className="flex-1 gradient-primary gradient-primary-hover text-white py-3"
            onClick={() => handleAddToCart("main")}
            disabled={addingToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {addingToCart ? "Adding..." : "Add to Cart"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="py-3 bg-transparent"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button variant="outline" size="icon" className="py-3 bg-transparent">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 py-3 bg-transparent"
            onClick={() => handleAddToCart("sample")}
            disabled={addingToCart}
          >
            Request Sample
          </Button>
          <Button variant="outline" className="flex-1 py-3 bg-transparent">
            <MessageCircle className="h-5 w-5 mr-2" />
            Custom Quote
          </Button>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Truck className="h-5 w-5 text-sky-600" />
          <div>
            <p className="font-medium text-gray-900">Fast Shipping</p>
            <p className="text-sm text-gray-600">
              Delivery in {product.leadTimeDays} days
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Shield className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">Quality Guaranteed</p>
            <p className="text-sm text-gray-600">100% quality assurance</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <Clock className="h-5 w-5 text-orange-600" />
          <div>
            <p className="font-medium text-gray-900">Quick Response</p>
            <p className="text-sm text-gray-600">
              Supplier responds within 2 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
