"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2,Truck, Shield, Clock} from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Product } from "@/types"
import { ProductOrderingTabs } from "./product-ordering-tabs"

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

  // tiered price is calculated when adding to cart; UI no longer shows a total price here
  // keep calculateTieredPrice available for cart logic or future use
  const { pricePerUnit } = calculateTieredPrice(product, quantity)

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

      {/* Price - Hidden as requested */}
      {/* 
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
      */}

      {/* Product Ordering Tabs */}
      <ProductOrderingTabs product={product} />

      {/* Quick Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent"
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorited ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
        <Button variant="outline" size="icon" className="bg-transparent">
          <Share2 className="h-5 w-5" />
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Request Sample
        </Button>
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
