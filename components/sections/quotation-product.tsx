"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/ui/product-card"
import { useProductStore } from "@/actions/product/store"
import { ProductResponse } from "@/actions/product/type"
import type { Product } from "@/types"
import { Loader2 } from "lucide-react"

export function QuotationProduct() {
  const { products, isLoading, fetchProducts } = useProductStore()
  const [quotationProducts, setQuotationProducts] = useState<Product[]>([])

  // Transform API product to ProductCard format
  const transformProductForCard = (product: ProductResponse): Product => {
    // Ensure images is always a valid array
    const mainImage = product.img || "/placeholder.svg?height=240&width=320&query=garment product";
    const additionalImages = product.additionalImages || [];
    const allImages = [mainImage, ...additionalImages].filter(Boolean);
    
    return {
      id: product.id,
      title: product.name || 'Untitled Product',
      images: allImages.length > 0 ? allImages : ["/placeholder.svg?height=240&width=320&query=garment product"],
      supplierId: product.seller?.id || 'unknown',
      supplierName: product.seller?.firstName ? `${product.seller.firstName} ${product.seller.lastName}` : 'Unknown Supplier',
      price: parseFloat(product.price) || 0,
      currency: "BDT" as const,
      moq: (product as any).moq || 1,
      badges: [] as ("flash" | "super" | "new")[],
      description: product.productDescription || "",
      specs: [],
      availableQuantity: product.stockQuantity || 0,
      leadTimeDays: 7,
      productTypes: {
        [product.productType]: {
          enabled: true,
          price: parseFloat(product.price) || 0,
          moq: (product as any).moq || 1
        }
      },
      primaryType: product.productType,
      category: product.category?.title || 'No Category'
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    if (products.length > 0) {
      // Transform and limit to first 4 products for quotation display
      const transformedProducts = products
        .slice(0, 4)
        .map(transformProductForCard)
      setQuotationProducts(transformedProducts)
    }
  }, [products])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Quotation Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant quotes on popular products from verified suppliers
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
          </div>
        ) : quotationProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available for quotation at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quotationProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <a href="/products" className="text-sky-600 hover:text-sky-700 font-medium">View More Products →</a>
        </div>
      </div>
    </section>
  )
}
