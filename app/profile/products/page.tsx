"use client"

import { DashboardLayout } from "../../../components/dashboard/dashboard-layout"
import { DashboardHeader } from "../../../components/dashboard/dashboard-header"
import { DashboardSidebar } from "../../../components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import Image from "next/image"
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
  CheckCircle
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
    <DashboardLayout>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-6 bg-gray-50">
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
                <Button 
                  className="gradient-primary gradient-primary-hover text-white"
                  onClick={() => window.location.href = '/profile/products/add'}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">148</p>
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
                      <p className="text-2xl font-bold text-green-600">89</p>
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
                  <TabsTrigger value="all">All Products (148)</TabsTrigger>
                  <TabsTrigger value="active">Active (89)</TabsTrigger>
                  <TabsTrigger value="pending">Pending (15)</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts (44)</TabsTrigger>
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
                {/* Product List */}
                <div className="space-y-4">
                  {productData.map((product) => (
                    <Card key={product.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Product Image */}
                          <div className="relative w-20 h-20 flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  ID: {product.id} • {product.category}
                                </p>
                              </div>
                              <Badge className={getStatusColor(product.status)}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(product.status)}
                                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                </span>
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-gray-500">Price</p>
                                <p className="text-sm font-semibold text-blue-600">{product.price}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">MOQ</p>
                                <p className="text-sm font-medium">{product.moq} pcs</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Stock</p>
                                <p className="text-sm font-medium">{product.stock}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Views</p>
                                <p className="text-sm font-medium">{product.views}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Orders</p>
                                <p className="text-sm font-medium">{product.orders}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Rating</p>
                                <p className="text-sm font-medium">⭐ {product.rating}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500">
                                Last updated: {product.lastUpdated}
                              </p>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Active products will be displayed here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Pending approval products will be displayed here...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="drafts">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Draft products will be displayed here...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}