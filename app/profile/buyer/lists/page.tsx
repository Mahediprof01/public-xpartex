"use client"

import { UnifiedLayout } from "../../../../components/dashboard/unified-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Badge } from "../../../../components/ui/badge"
import Image from "next/image"
import { Search, Filter, Heart, Trash2, Share, ShoppingCart } from "lucide-react"

const favoriteProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    image: "/cotton-t-shirt.jpg",
    supplier: "Premium Textiles Ltd.",
    price: "$3.50 - $4.20",
    minOrder: "200 pcs",
    rating: 4.8,
    reviews: 245,
    addedDate: "2024-09-10"
  },
  {
    id: 2,
    name: "Denim Jeans - Slim Fit",
    image: "/denim-jeans.png",
    supplier: "Global Garments Co.",
    price: "$12.50 - $15.80",
    minOrder: "100 pcs",
    rating: 4.6,
    reviews: 189,
    addedDate: "2024-09-08"
  },
  {
    id: 3,
    name: "Classic Polo Shirt",
    image: "/classic-polo-shirt.png",
    supplier: "Fashion Forward Inc.",
    price: "$8.75 - $11.20",
    minOrder: "150 pcs",
    rating: 4.9,
    reviews: 328,
    addedDate: "2024-09-05"
  }
]

export default function FavoritesPage() {
  return (
    <UnifiedLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
              <p className="text-gray-600">Products and suppliers you've saved for later</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                Share List
              </Button>
              <Button className="gradient-primary gradient-primary-hover text-white">
                Create New List
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search favorites..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Favorites Grid */}
          {favoriteProducts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Heart className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-600 mb-6">Start exploring and save products you're interested in</p>
                <Button asChild>
                  <a href="/products">Browse Products</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {/* Product Image */}
                    <div className="relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        <Heart className="h-3 w-3 mr-1 fill-current" />
                        Favorite
                      </Badge>
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        by {product.supplier}
                      </p>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400 text-sm">
                          {"★".repeat(Math.floor(product.rating))}
                        </div>
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="text-lg font-bold text-blue-600 mb-1">
                          {product.price}
                        </div>
                        <div className="text-sm text-gray-600">
                          MOQ: {product.minOrder}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 mb-4">
                        Added on {new Date(product.addedDate).toLocaleDateString()}
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" variant="outline">
                          Contact Supplier
                        </Button>
                        <Button className="flex-1 gradient-primary gradient-primary-hover text-white">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Inquire
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </UnifiedLayout>
  )
}