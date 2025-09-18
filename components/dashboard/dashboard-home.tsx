"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Star,
  ArrowUpRight,
  BarChart3,
  Users,
  Globe,
  Store
} from "lucide-react"

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-8">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Start your global business journey with Xpartex Selling</h2>
          <p className="text-blue-100 mb-6 max-w-2xl">
            Xpartex.com is a leading ecommerce platform that helps your business to 200+ 
            countries globally. Create seller account today and expose products to 40+ 
            million buyers.
          </p>
          <Button className="bg-white text-blue-700 hover:bg-blue-50">
            Become a seller now
          </Button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full"></div>
        
        {/* Floating illustration */}
        <div className="absolute top-8 right-8 w-48 h-32 bg-white/5 rounded-lg hidden lg:block"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Products</CardTitle>
            <Package className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">89</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +4 new this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$45,231</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Customer Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <p className="text-xs text-gray-600 mt-1">Based on 156 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Tool Cards Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Grow your margins with a suite of tools built for B2B sales
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Set up storefront */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Set up storefront</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600 text-sm">
                Showcase your brand and capabilities online - no design or coding required.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn more
              </Button>
            </CardContent>
          </Card>

          {/* Post products */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle className="text-lg">Post products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600 text-sm">
                Optimize your product listings for SEO with posting suggestions based on site data.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn more
              </Button>
            </CardContent>
          </Card>

          {/* Get traffic */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Get traffic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600 text-sm">
                Increasing awareness and conversions with our marketing tools like Keyword Advertising.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn more
              </Button>
            </CardContent>
          </Card>

          {/* Find new business */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Find new business</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600 text-sm">
                Easily find and connect with buyers in the Request for Quotation (RFQ) market.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn more
              </Button>
            </CardContent>
          </Card>

          {/* Analyze data */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                <BarChart3 className="h-6 w-6 text-cyan-600" />
              </div>
              <CardTitle className="text-lg">Analyze data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600 text-sm">
                Visualize your store's metrics and historical data, and get intelligent suggestions.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn more
              </Button>
            </CardContent>
          </Card>

          {/* Global reach */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle className="text-lg">Global market</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600 text-sm">
                Expand your reach to international markets with our global shipping solutions.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn more
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Industry Report Section */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Add your industry and view the according industry report</h3>
                <p className="text-gray-300 text-sm">Get insights specific to your business sector</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-300">Industry</p>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Please select industry
                </Badge>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Select Industry
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}