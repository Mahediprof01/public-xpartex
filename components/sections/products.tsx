"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/ui/product-card"
import { useProductStore } from "@/actions/product/store"
import { ProductResponse } from "@/actions/product/type"
import type { Product } from "@/types"
import { Loader2 } from "lucide-react"

export function Products() {
    const { products: apiProducts, isLoading, fetchProducts } = useProductStore()
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

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
      ...(() => {
        const allowed = ['wholesale', 'retail', 'b2b'] as const;
        const raw = product.productType as unknown as string;
        const primaryType = (allowed.includes(raw as any)
          ? (raw as any)
          : 'wholesale') as Product['primaryType'];

        const productTypes = {
          [primaryType]: {
            enabled: true,
            price: parseFloat(product.price) || 0,
            moq: (product as any).moq || 1,
          },
        } as unknown as Product['productTypes'];

        return { productTypes, primaryType };
      })(),
      category: product.category?.title || 'No Category'
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    if (apiProducts.length > 0) {
      // Transform and limit to first 8 products for homepage display
      const transformedProducts = apiProducts
        .slice(0, 8)
        .map(transformProductForCard)
      setDisplayProducts(transformedProducts)
    }
  }, [apiProducts])

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of quality garments from trusted manufacturers
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                {...product}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <button className="text-sky-600 hover:text-sky-700 font-medium">View All Products →</button>
        </div>
      </div>
    </section>
  )
}