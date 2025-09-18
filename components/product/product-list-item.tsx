import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Eye, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types"

interface ProductListItemProps {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
  const { addToCart } = useCart()
  
  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString("en-BD", { minimumFractionDigits: 2 })}`
  }

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "flash":
        return "destructive"
      case "super":
        return "default"
      case "new":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border p-6">
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={product.images[0] || "/placeholder.svg?height=128&width=128&query=garment product"}
            alt={product.title}
            fill
            className="object-cover rounded-xl"
            loading="lazy"
          />
          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.badges.slice(0, 1).map((badge) => (
                <Badge key={badge} variant={getBadgeVariant(badge)} className="text-xs font-medium capitalize">
                  {badge === "flash" ? "Flash Deal" : badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
            <div className="text-xl font-bold text-gray-900">{formatPrice(product.price, product.currency)}</div>
          </div>

          <Link
            href={`/suppliers/${product.supplierId}`}
            className="text-sky-600 hover:text-sky-700 font-medium mb-2 block"
          >
            {product.supplierName}
          </Link>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
            <div>MOQ: {product.moq.toLocaleString()}</div>
            <div>Lead Time: {product.leadTimeDays} days</div>
            <div>Available: {product.availableQuantity.toLocaleString()}</div>
          </div>

          {/* Specifications */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.specs.slice(0, 3).map((spec) => (
              <span key={spec.key} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {spec.key}: {spec.value}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href={`/products/${product.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
            <Button 
              size="sm" 
              className="gradient-primary gradient-primary-hover text-white"
              onClick={() => addToCart(product, product.moq, "main")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="sm">
              Request Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
