"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MessageCircle, Calendar, Package } from "lucide-react"

export function RFQList() {
  const [filter, setFilter] = useState("all")

  // Mock RFQ data
  const rfqs = [
    {
      id: "RFQ-001",
      title: "Custom Cotton T-Shirts for Corporate Event",
      category: "T-Shirts",
      quantity: 1000,
      status: "active",
      quotesReceived: 5,
      createdDate: "2024-12-15",
      expiryDate: "2024-12-25",
      targetPrice: 450,
      description: "Need high-quality cotton t-shirts with custom logo printing for corporate event...",
    },
    {
      id: "RFQ-002",
      title: "Premium Polo Shirts for Retail",
      category: "Polo Shirts",
      quantity: 500,
      status: "pending",
      quotesReceived: 2,
      createdDate: "2024-12-12",
      expiryDate: "2024-12-22",
      targetPrice: 680,
      description: "Looking for premium quality polo shirts in multiple colors and sizes...",
    },
    {
      id: "RFQ-003",
      title: "Winter Hoodies Collection",
      category: "Hoodies",
      quantity: 300,
      status: "completed",
      quotesReceived: 8,
      createdDate: "2024-12-08",
      expiryDate: "2024-12-18",
      targetPrice: 1200,
      description: "Warm winter hoodies with fleece lining for seasonal collection...",
    },
    {
      id: "RFQ-004",
      title: "Sustainable Denim Jeans",
      category: "Jeans",
      quantity: 800,
      status: "expired",
      quotesReceived: 3,
      createdDate: "2024-12-01",
      expiryDate: "2024-12-11",
      targetPrice: 1500,
      description: "Eco-friendly denim jeans made from sustainable materials...",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "expired":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredRFQs = filter === "all" ? rfqs : rfqs.filter((rfq) => rfq.status === filter)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My RFQs</h2>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {["all", "active", "pending", "completed", "expired"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className={filter === status ? "gradient-primary text-white" : "bg-transparent"}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredRFQs.map((rfq) => (
          <div key={rfq.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{rfq.title}</h3>
                  <Badge className={`${getStatusColor(rfq.status)} border-0`}>{rfq.status}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{rfq.description}</p>
              </div>
              <div className="text-right ml-4">
                <div className="text-sm text-gray-500">RFQ ID</div>
                <div className="font-medium text-gray-900">{rfq.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="h-4 w-4" />
                <span>{rfq.quantity.toLocaleString()} pieces</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MessageCircle className="h-4 w-4" />
                <span>{rfq.quotesReceived} quotes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Created: {rfq.createdDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Expires: {rfq.expiryDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Target Price:</span>
                <span className="font-semibold text-gray-900">BDT {rfq.targetPrice.toLocaleString()}</span>
                <span className="text-sm text-gray-600">Category:</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{rfq.category}</span>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {rfq.quotesReceived > 0 && (
                  <Button size="sm" className="gradient-primary gradient-primary-hover text-white">
                    View Quotes ({rfq.quotesReceived})
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRFQs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No RFQs Found</h3>
          <p className="text-gray-600">
            {filter === "all" ? "You haven't created any RFQs yet." : `No ${filter} RFQs found.`}
          </p>
        </div>
      )}
    </div>
  )
}
