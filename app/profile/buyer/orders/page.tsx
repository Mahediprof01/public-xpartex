"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Badge } from "../../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import Image from "next/image";
import {
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  MessageSquare,
  Download,
} from "lucide-react";

const orderData = [
  {
    id: "ORD-2024-001",
    supplier: "Premium Textiles Ltd.",
    product: "Cotton T-Shirts",
    image: "/cotton-t-shirt.jpg",
    quantity: 500,
    unitPrice: 3.85,
    totalAmount: 1925.0,
    status: "confirming",
    orderDate: "2024-09-10",
    deliveryDate: "2024-09-25",
    trackingNumber: null,
  },
  {
    id: "ORD-2024-002",
    supplier: "Global Garments Co.",
    product: "Denim Jeans",
    image: "/denim-jeans.png",
    quantity: 200,
    unitPrice: 12.5,
    totalAmount: 2500.0,
    status: "preparing",
    orderDate: "2024-09-05",
    deliveryDate: "2024-09-20",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-2024-003",
    supplier: "Fashion Forward Inc.",
    product: "Classic Polo Shirt",
    image: "/classic-polo-shirt.png",
    quantity: 300,
    unitPrice: 8.75,
    totalAmount: 2625.0,
    status: "delivered",
    orderDate: "2024-08-15",
    deliveryDate: "2024-08-30",
    trackingNumber: "TRK987654321",
  },
];

export default function OrdersPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirming":
        return "bg-yellow-100 text-yellow-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "shipping":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirming":
        return <Clock className="h-4 w-4" />;
      case "unpaid":
        return <AlertCircle className="h-4 w-4" />;
      case "preparing":
        return <Package className="h-4 w-4" />;
      case "shipping":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const ordersByStatus = {
    all: orderData,
    confirming: orderData.filter((order) => order.status === "confirming"),
    unpaid: orderData.filter((order) => order.status === "unpaid"),
    preparing: orderData.filter((order) => order.status === "preparing"),
    shipping: orderData.filter((order) => order.status === "shipping"),
    delivered: orderData.filter((order) => order.status === "delivered"),
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-600">
              Track and manage your purchase orders
            </p>
          </div>
          <Button className="gradient-primary gradient-primary-hover text-white">
            Export Orders
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orderData.length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">1</p>
                </div>
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order History</CardTitle>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">
                  All ({ordersByStatus.all.length})
                </TabsTrigger>
                <TabsTrigger value="confirming">
                  Confirming ({ordersByStatus.confirming.length})
                </TabsTrigger>
                <TabsTrigger value="unpaid">
                  Unpaid ({ordersByStatus.unpaid.length})
                </TabsTrigger>
                <TabsTrigger value="preparing">
                  Preparing ({ordersByStatus.preparing.length})
                </TabsTrigger>
                <TabsTrigger value="shipping">
                  Shipping ({ordersByStatus.shipping.length})
                </TabsTrigger>
                <TabsTrigger value="delivered">
                  Delivered ({ordersByStatus.delivered.length})
                </TabsTrigger>
              </TabsList>

              {Object.entries(ordersByStatus).map(([status, orders]) => (
                <TabsContent key={status} value={status} className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No orders found
                      </h3>
                      <p className="text-gray-600">
                        No orders in this category yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card
                          key={order.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              {/* Product Image */}
                              <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={order.image}
                                  alt={order.product}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>

                              {/* Order Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                      {order.product}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                      Order ID: {order.id} • {order.supplier}
                                    </p>
                                  </div>
                                  <Badge
                                    className={getStatusColor(order.status)}
                                  >
                                    <span className="flex items-center gap-1">
                                      {getStatusIcon(order.status)}
                                      {order.status.charAt(0).toUpperCase() +
                                        order.status.slice(1)}
                                    </span>
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Quantity
                                    </p>
                                    <p className="text-sm font-medium">
                                      {order.quantity} pcs
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Unit Price
                                    </p>
                                    <p className="text-sm font-medium">
                                      ${order.unitPrice}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Total Amount
                                    </p>
                                    <p className="text-sm font-semibold text-blue-600">
                                      ${order.totalAmount.toFixed(2)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Order Date
                                    </p>
                                    <p className="text-sm font-medium">
                                      {order.orderDate}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Delivery Date
                                    </p>
                                    <p className="text-sm font-medium">
                                      {order.deliveryDate}
                                    </p>
                                  </div>
                                </div>

                                {order.trackingNumber && (
                                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                    <p className="text-sm text-blue-700">
                                      <strong>Tracking Number:</strong>{" "}
                                      {order.trackingNumber}
                                    </p>
                                  </div>
                                )}

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    {order.status === "delivered" && (
                                      <span className="text-green-600">
                                        ✓ Delivered on {order.deliveryDate}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-4 w-4 mr-1" />
                                      View Details
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <MessageSquare className="h-4 w-4 mr-1" />
                                      Contact Supplier
                                    </Button>
                                    {order.status === "delivered" && (
                                      <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-1" />
                                        Invoice
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
