"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Grid, List, SlidersHorizontal, Loader2 } from "lucide-react";
import { useProductStore } from "@/actions/product/store";
import { ProductResponse } from "@/actions/product/type";
import type { Product } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const { products: apiProducts, isLoading, fetchProducts } = useProductStore();
  const [products, setProducts] = useState<Product[]>([]);

  const category = searchParams.get("category");
  const search = searchParams.get("search");

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
      const transformedProducts = apiProducts.map(transformProductForCard)
      setProducts(transformedProducts)
    }
  }, [apiProducts])

  const getPageTitle = () => {
    if (category) {
      return `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    }
    if (search) {
      return `Search Results for "${search}"`;
    }
    return "All Products";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-1">
            {getPageTitle()}
          </h1>
          <p className="text-sm text-gray-500">
            {products.length} products found
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div
            className={`lg:block ${
              showFilters ? "block" : "hidden"
            } w-full lg:w-64 flex-shrink-0`}
          >
            <ProductFilters />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <ProductGrid products={products} viewMode={viewMode} />
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="h-8 px-3 text-xs"
                >
                  Previous
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="h-8 px-3 text-xs gradient-primary gradient-primary-hover text-white"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
