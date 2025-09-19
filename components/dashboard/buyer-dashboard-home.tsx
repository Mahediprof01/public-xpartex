"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { 
  MessageSquare, 
  Package, 
  Heart, 
  History, 
  ShoppingCart,
  ArrowRight,
  Gift,
  HeadphonesIcon
} from "lucide-react"

export function BuyerDashboardHome() {
  const { user } = useAuth()

  const orderStatuses = [
    { label: "All", count: 0, active: true },
    { label: "Confirming", count: 0 },
    { label: "Unpaid", count: 0 },
    { label: "Preparing to ship", count: 0 },
    { label: "Delivering", count: 0 },
    { label: "Refunds & after-sale", count: 0 }
  ]

  const favoriteProducts = [
    {
      id: 1,
      image: "/cotton-t-shirt.jpg",
      price: "$115-148",
      minOrder: "Min. order: 1.0 piece"
    },
    {
      id: 2,
      image: "/denim-jeans.png", 
      price: "$0.19-0.28",
      minOrder: "Min. order: 10 pieces"
    }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Section - User Info & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* User Profile Card */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user?.firstName}</h2>
                  <Link href="/profile/buyer/settings" className="text-blue-600 text-sm hover:underline">
                    Profile
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <HeadphonesIcon className="h-5 w-5" />
                <span className="text-sm font-medium">Online support</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
                <div className="text-sm text-gray-600">Unread messages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
                <div className="text-sm text-gray-600">New quotes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
                <div className="text-sm text-gray-600">Coupons</div>
              </div>
            </div>

            {/* Personalize Section */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Personalize your Xpartex.com experience</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Complete Profile */}
            <div className="mt-4 flex items-center justify-between bg-blue-50 rounded-lg p-4">
              <span className="text-sm text-blue-700">Complete profile</span>
              <ArrowRight className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Favorites Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Favorites</span>
              <Link href="/profile/buyer/favorites" className="text-sm text-blue-600 hover:underline">
                View all
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Gift className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-gray-600 mb-2">No favorites yet</p>
              <Link href="/products" className="text-blue-600 text-sm hover:underline">
                Explore
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Orders</span>
            <Link href="/profile/buyer/orders" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Order Status Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {orderStatuses.map((status) => (
              <Button
                key={status.label}
                variant={status.active ? "default" : "outline"}
                size="sm"
                className={status.active ? "bg-gray-900 text-white" : ""}
              >
                {status.label}
                {status.count > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs">
                    {status.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* No Orders State */}
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <Button asChild>
              <Link href="/products">Start sourcing</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid - Browsing History & Promotions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Browsing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Browsing history</span>
              <Link href="/profile/buyer/history" className="text-sm text-blue-600 hover:underline">
                View all
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border p-3">
                  <div className="relative w-full h-24 mb-2">
                    <Image
                      src={product.image}
                      alt="Product"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="text-sm font-semibold text-blue-600 mb-1">
                    {product.price}
                  </div>
                  <div className="text-xs text-gray-600">
                    {product.minOrder}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Promotion */}
        <Card>
          <CardHeader>
            <CardTitle>Promotion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">Start selling with 30% off Wix plan</h3>
                  <Link href="#" className="text-orange-100 text-sm hover:underline">
                    Learn more →
                  </Link>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Gift className="h-6 w-6" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}