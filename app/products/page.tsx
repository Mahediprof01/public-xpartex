"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductFilters } from "@/components/product/product-filters";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  // Mock product data - in real app this would come from API
  const products: Product[] = [
    {
      id: "1",
      title: "Premium Cotton T-Shirt - Unisex",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: "supplier-1",
      supplierName: "Dhaka Textiles Ltd.",
      price: 450.0,
      currency: "BDT" as const,
      moq: 500,
      badges: ["flash", "super"],
      description:
        "High-quality 100% cotton t-shirt with superior comfort and durability",
      specs: [
        { key: "Material", value: "100% Cotton" },
        { key: "Weight", value: "180 GSM" },
        { key: "Colors", value: "12 Available" },
      ],
      availableQuantity: 10000,
      leadTimeDays: 15,
    },
    {
      id: "2",
      title: "Slim Fit Denim Jeans - Premium Quality",
      images: ["/denim-jeans.png"],
      supplierId: "supplier-2",
      supplierName: "Bengal Garments",
      price: 1250.0,
      currency: "BDT" as const,
      moq: 200,
      badges: ["new"],
      description:
        "Modern slim fit jeans with stretch fabric for comfort and style",
      specs: [
        { key: "Material", value: "98% Cotton, 2% Elastane" },
        { key: "Weight", value: "12 oz" },
        { key: "Sizes", value: "28-42" },
      ],
      availableQuantity: 5000,
      leadTimeDays: 20,
    },
    {
      id: "3",
      title: "Business Casual Polo Shirt",
      images: ["/classic-polo-shirt.png"],
      supplierId: "supplier-3",
      supplierName: "Chittagong Apparel",
      price: 680.0,
      currency: "BDT" as const,
      moq: 300,
      badges: ["super"],
      description:
        "Professional polo shirt perfect for business casual environments",
      specs: [
        { key: "Material", value: "Cotton Pique" },
        { key: "Weight", value: "200 GSM" },
        { key: "Collar", value: "Ribbed" },
      ],
      availableQuantity: 8000,
      leadTimeDays: 12,
    },
    {
      id: "4",
      title: "Premium Winter Hoodie",
      images: ["/cozy-hoodie.png"],
      supplierId: "supplier-4",
      supplierName: "Sylhet Fashion House",
      price: 1850.0,
      currency: "BDT" as const,
      moq: 100,
      badges: ["flash"],
      description: "Warm and comfortable hoodie with premium fleece lining",
      specs: [
        { key: "Material", value: "Cotton Fleece" },
        { key: "Weight", value: "320 GSM" },
        { key: "Features", value: "Kangaroo Pocket" },
      ],
      availableQuantity: 3000,
      leadTimeDays: 18,
    },
    // Add more products for pagination demo
    {
      id: "5",
      title: "Sustainable Organic Cotton Tee",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: "supplier-5",
      supplierName: "Eco Garments BD",
      price: 520.0,
      currency: "BDT" as const,
      moq: 300,
      badges: ["new"],
      description:
        "Eco-friendly organic cotton t-shirt with GOTS certification",
      specs: [
        { key: "Material", value: "100% Organic Cotton" },
        { key: "Certification", value: "GOTS Certified" },
        { key: "Weight", value: "160 GSM" },
      ],
      availableQuantity: 6000,
      leadTimeDays: 14,
    },
    {
      id: "6",
      title: "Athletic Performance Wear",
      images: ["/classic-polo-shirt.png"],
      supplierId: "supplier-6",
      supplierName: "Sports Apparel Co.",
      price: 890.0,
      currency: "BDT" as const,
      moq: 250,
      badges: ["new", "super"],
      description:
        "High-performance athletic wear with moisture-wicking technology",
      specs: [
        { key: "Material", value: "Polyester Blend" },
        { key: "Features", value: "Moisture Wicking" },
        { key: "Fit", value: "Athletic Cut" },
      ],
      availableQuantity: 4500,
      leadTimeDays: 16,
    },
  ];

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
            <ProductGrid products={products} viewMode={viewMode} />

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
