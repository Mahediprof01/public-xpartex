"use client"

import { useEffect } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { ProductCard } from "../../../components/ui/product-card"
import { useProductStore } from "../../../actions/product/store"
import { formatPrice } from "../../../actions/product/business"
import { ProductResponse } from "../../../actions/product/type"
import { Product } from "../../../types"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Filter,
  Plus,
  Package,
  Eye,
  Edit,
  MoreHorizontal,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react"

const productData = [
  {
    id: "PRD-001",
    name: "Premium Cotton T-Shirt",
    image: "/cotton-t-shirt.jpg",
    category: "Apparel",
    price: "BDT 450.00",
    moq: 200,
    status: "active",
    stock: 1250,
    views: 1420,
    orders: 45,
    rating: 4.8,
    lastUpdated: "2 hours ago"
  },
  {
    id: "PRD-002", 
    name: "Classic Polo Shirt",
    image: "/classic-polo-shirt.png",
    category: "Apparel",
    price: "BDT 680.00", 
    moq: 150,
    status: "active",
    stock: 890,
    views: 2100,
    orders: 67,
    rating: 4.6,
    lastUpdated: "1 day ago"
  },
  {
    id: "PRD-003",
    name: "Denim Jeans - Slim Fit",
    image: "/denim-jeans.png",
    category: "Apparel",
    price: "BDT 1,250.00",
    moq: 100,
    status: "pending",
    stock: 0,
    views: 890,
    orders: 23,
    rating: 4.9,
    lastUpdated: "3 days ago"
  }
]

export default function ProductsPage() {
  const {
    products,
    isLoading,
    error,
    successMessage,
    fetchProducts,
    clearError,
    clearSuccess
  } = useProductStore()

  // Transform API product to ProductCard format
  const transformProductForCard = (product: ProductResponse): Product => {
    return {
      id: product.id,
      title: product.name,
      images: [product.img, ...(product.additionalImages || [])],
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

  // Helper function to safely render category
  const getCategoryName = (category: any) => {
    if (typeof category === 'string') {
      return category || 'No Category'
    }
    if (typeof category === 'object' && category) {
      return category.title || category.name || 'No Category'
    }
    return 'No Category'
  }

  // Helper function to safely render any value as string
  const safeRender = (value: any, fallback: string = 'N/A') => {
    if (value === null || value === undefined) {
      return fallback
    }
    if (typeof value === 'object') {
      return fallback
    }
    return String(value)
  }

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Clear messages after some time
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => clearSuccess(), 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, clearSuccess])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "draft": return "bg-gray-100 text-gray-800"
      case "inactive": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />
      case "pending": return <AlertCircle className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-600">Manage your product listings and inventory</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  Import Products
                </Button>
                <Link href="/profile/products/add">
                  <Button className="gradient-primary gradient-primary-hover text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </Link>
              </div>
            </div>

            {/* Alert Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{String(error)}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert className="border-green-500 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{String(successMessage)}</AlertDescription>
              </Alert>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : products.length}
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3" />
                    +12 this month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active</p>
                      <p className="text-2xl font-bold text-green-600">
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : products.filter(p => p.stockQuantity > 0).length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Approval</p>
                      <p className="text-2xl font-bold text-yellow-600">15</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-blue-600">24.5K</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3" />
                    +18% this week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Product Management Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">
                    All Products ({products.length})
                  </TabsTrigger>
                  <TabsTrigger value="active">
                    Active ({products.filter(p => p.stockQuantity > 0).length})
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending ({products.filter(p => (p as any).productStatus === "pending" || (p as any).productStatus === "draft").length})
                  </TabsTrigger>
                  <TabsTrigger value="drafts">
                    Drafts ({products.filter(p => (p as any).productStatus === "draft").length})
                  </TabsTrigger>
                </TabsList>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="space-y-4">
                {/* Product Grid */}
                <div>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No products yet</h3>
                      <p className="text-gray-600 mb-6">Start by adding your first product to showcase your inventory</p>
                      <Link href="/profile/products/add">
                        <Button className="gradient-primary text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Product
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                      {products.map((product) => (
                        <div key={product.id} className="relative group cursor-pointer">
                          <ProductCard {...transformProductForCard(product)} />
                          
                          {/* Action Overlay */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <div className="flex flex-col gap-1">
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Status Badge Overlay */}
                          <div className="absolute top-2 left-2 z-10">
                            <Badge className={getStatusColor(product.stockQuantity > 0 ? "active" : "inactive")}>
                              <span className="flex items-center gap-1 text-xs">
                                {getStatusIcon(product.stockQuantity > 0 ? "active" : "inactive")}
                                {product.stockQuantity > 0 ? "Active" : "Out of Stock"}
                              </span>
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="active">
                <div>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : products.filter(product => product.stockQuantity > 0).length === 0 ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No active products</h3>
                      <p className="text-gray-600">Products with stock will appear here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                      {products
                        .filter(product => product.stockQuantity > 0)
                        .map((product) => (
                          <div key={product.id} className="relative group cursor-pointer">
                            <ProductCard {...transformProductForCard(product)} />
                            
                            {/* Action Overlay */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                              <div className="flex flex-col gap-1">
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="pending">
                <div>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : products.filter(product => (product as any).productStatus === "pending" || (product as any).productStatus === "draft").length === 0 ? (
                    <div className="text-center py-12">
                      <AlertCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No pending products</h3>
                      <p className="text-gray-600">Products waiting for approval will appear here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                      {products
                        .filter(product => (product as any).productStatus === "pending" || (product as any).productStatus === "draft")
                        .map((product) => (
                          <div key={product.id} className="relative group cursor-pointer">
                            <ProductCard {...transformProductForCard(product)} />
                            
                            {/* Action Overlay */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                              <div className="flex flex-col gap-1">
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Status Badge Overlay */}
                            <div className="absolute top-2 left-2 z-10">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <span className="flex items-center gap-1 text-xs">
                                  <AlertCircle className="h-3 w-3" />
                                  Pending
                                </span>
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="drafts">
                <div>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : products.filter(product => (product as any).productStatus === "draft").length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No draft products</h3>
                      <p className="text-gray-600">Save products as drafts to continue editing later</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                      {products
                        .filter(product => (product as any).productStatus === "draft")
                        .map((product) => (
                          <div key={product.id} className="relative group cursor-pointer">
                            <ProductCard {...transformProductForCard(product)} />
                            
                            {/* Action Overlay */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                              <div className="flex flex-col gap-1">
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-white/95 backdrop-blur-sm hover:bg-white shadow-sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Status Badge Overlay */}
                            <div className="absolute top-2 left-2 z-10">
                              <Badge className="bg-gray-100 text-gray-800">
                                <span className="flex items-center gap-1 text-xs">
                                  <Package className="h-3 w-3" />
                                  Draft
                                </span>
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
    </div>
  )
}