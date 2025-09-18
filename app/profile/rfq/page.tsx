"use client"

import { DashboardLayout } from "../../../components/dashboard/dashboard-layout"
import { DashboardHeader } from "../../../components/dashboard/dashboard-header"
import { DashboardSidebar } from "../../../components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye
} from "lucide-react"

const rfqData = [
  {
    id: "RFQ-001",
    title: "Cotton T-Shirts - Bulk Order",
    category: "Apparel",
    quantity: "5000 pieces",
    budget: "$15,000 - $20,000",
    deadline: "2025-10-15",
    status: "active",
    responses: 12,
    createdAt: "2025-09-10"
  },
  {
    id: "RFQ-002", 
    title: "Denim Jeans Manufacturing",
    category: "Apparel",
    quantity: "2000 pieces",
    budget: "$25,000 - $30,000",
    deadline: "2025-11-01",
    status: "closed",
    responses: 8,
    createdAt: "2025-09-05"
  },
  {
    id: "RFQ-003",
    title: "Polo Shirts Custom Design",
    category: "Apparel", 
    quantity: "1500 pieces",
    budget: "$10,000 - $15,000",
    deadline: "2025-09-30",
    status: "pending",
    responses: 3,
    createdAt: "2025-09-12"
  }
]

export default function RFQPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "closed": return "bg-gray-100 text-gray-800" 
      case "pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />
      case "closed": return <XCircle className="h-4 w-4" />
      case "pending": return <Clock className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
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
                <h1 className="text-2xl font-bold text-gray-900">Request for Quotation</h1>
                <p className="text-gray-600">Manage your RFQ requests and track responses</p>
              </div>
              <Button className="gradient-primary gradient-primary-hover text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create New RFQ
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total RFQs</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active</p>
                      <p className="text-2xl font-bold text-green-600">8</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">4</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Responses</p>
                      <p className="text-2xl font-bold text-blue-600">156</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Search RFQs..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* RFQ List */}
            <div className="space-y-4">
              {rfqData.map((rfq) => (
                <Card key={rfq.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{rfq.title}</h3>
                          <Badge className={getStatusColor(rfq.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(rfq.status)}
                              {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">RFQ ID: {rfq.id}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Category</p>
                            <p className="text-sm font-medium">{rfq.category}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Quantity</p>
                            <p className="text-sm font-medium">{rfq.quantity}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Budget</p>
                            <p className="text-sm font-medium">{rfq.budget}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Deadline</p>
                            <p className="text-sm font-medium">{rfq.deadline}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            {rfq.responses} responses • Created on {rfq.createdAt}
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm" className="gradient-primary gradient-primary-hover text-white">
                              Manage
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}