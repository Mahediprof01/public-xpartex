"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { 
  Briefcase,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Upload,
  MessageSquare,
  Building,
  Star,
  FileText,
  Download,
  Edit,
  Send
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Mock data for contracts
const contracts = [
  {
    id: 1,
    jobTitle: "E-commerce Platform Development",
    client: "TechStyle Fashion",
    clientRating: 4.8,
    contractValue: "$5,500",
    startDate: "2024-12-20",
    endDate: "2025-02-15",
    status: "active",
    progress: 35,
    milestones: [
      {
        id: 1,
        title: "Initial Setup & Architecture",
        description: "Set up project structure, database schema, and basic authentication",
        amount: "$1,100",
        dueDate: "2024-12-30",
        status: "completed",
        completedDate: "2024-12-28"
      },
      {
        id: 2,
        title: "Product Catalog System",
        description: "Build product management, categories, and search functionality",
        amount: "$1,650",
        dueDate: "2025-01-15",
        status: "in_progress",
        completedDate: null
      },
      {
        id: 3,
        title: "Shopping Cart & Checkout",
        description: "Implement cart functionality and payment gateway integration",
        amount: "$1,375",
        dueDate: "2025-01-30",
        status: "pending",
        completedDate: null
      },
      {
        id: 4,
        title: "Admin Dashboard",
        description: "Create admin panel for inventory and order management",
        amount: "$1,375",
        dueDate: "2025-02-15",
        status: "pending",
        completedDate: null
      }
    ],
    totalEarned: "$1,100",
    pendingAmount: "$4,400",
    lastActivity: "Client approved milestone 1",
    activityDate: "2024-12-28"
  },
  {
    id: 2,
    jobTitle: "Textile Supply Chain Management System",
    client: "Global Textiles Ltd",
    clientRating: 4.6,
    contractValue: "$8,200",
    startDate: "2025-01-05",
    endDate: "2025-04-05",
    status: "starting",
    progress: 5,
    milestones: [
      {
        id: 1,
        title: "Requirements Analysis & Planning",
        description: "Analyze business requirements and create technical specifications",
        amount: "$1,640",
        dueDate: "2025-01-20",
        status: "in_progress",
        completedDate: null
      },
      {
        id: 2,
        title: "Database Design & Setup",
        description: "Design database schema for supply chain operations",
        amount: "$1,640",
        dueDate: "2025-02-05",
        status: "pending",
        completedDate: null
      },
      {
        id: 3,
        title: "Inventory Management Module",
        description: "Build inventory tracking and management features",
        amount: "$2,460",
        dueDate: "2025-02-28",
        status: "pending",
        completedDate: null
      },
      {
        id: 4,
        title: "Logistics & Reporting",
        description: "Implement logistics tracking and reporting dashboard",
        amount: "$2,460",
        dueDate: "2025-04-05",
        status: "pending",
        completedDate: null
      }
    ],
    totalEarned: "$0",
    pendingAmount: "$8,200",
    lastActivity: "Contract signed",
    activityDate: "2025-01-02"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-700"
    case "active": return "bg-blue-100 text-blue-700"
    case "starting": return "bg-purple-100 text-purple-700"
    case "paused": return "bg-yellow-100 text-yellow-700"
    case "ended": return "bg-gray-100 text-gray-700"
    default: return "bg-gray-100 text-gray-700"
  }
}

const getMilestoneStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-700 border-green-200"
    case "in_progress": return "bg-blue-100 text-blue-700 border-blue-200"
    case "pending": return "bg-gray-100 text-gray-700 border-gray-200"
    case "overdue": return "bg-red-100 text-red-700 border-red-200"
    default: return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export default function Contracts() {
  const [selectedContract, setSelectedContract] = useState<any>(null)
  const [deliveryNote, setDeliveryNote] = useState("")

  const stats = {
    active: contracts.filter(c => c.status === "active").length,
    totalEarned: contracts.reduce((sum, c) => sum + parseFloat(c.totalEarned.replace("$", "").replace(",", "")), 0),
    pending: contracts.reduce((sum, c) => sum + parseFloat(c.pendingAmount.replace("$", "").replace(",", "")), 0),
    completedMilestones: contracts.flatMap(c => c.milestones).filter(m => m.status === "completed").length
  }

  const handleMilestoneSubmit = (contractId: number, milestoneId: number) => {
    console.log("Submitting milestone:", contractId, milestoneId, deliveryNote)
    setDeliveryNote("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Contracts</h1>
          <p className="text-gray-600 mt-1">Manage your active projects and track progress</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Contract Templates
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Contracts</p>
                <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalEarned.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">${stats.pending.toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Milestones Done</p>
                <p className="text-2xl font-bold text-purple-600">{stats.completedMilestones}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts List */}
      <div className="space-y-6">
        {contracts.map((contract) => (
          <Card key={contract.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{contract.jobTitle}</h3>
                    <Badge className={getStatusColor(contract.status)}>
                      {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{contract.client}</span>
                      <div className="flex items-center gap-1 ml-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{contract.clientRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{contract.startDate} - {contract.endDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium">{contract.contractValue}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Client
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Contract
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{contract.jobTitle}</DialogTitle>
                        <DialogDescription>Contract details and milestones</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Contract Overview */}
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Contract Value</p>
                            <p className="text-lg font-bold text-green-600">{contract.contractValue}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Earned</p>
                            <p className="text-lg font-bold text-blue-600">{contract.totalEarned}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-lg font-bold text-yellow-600">{contract.pendingAmount}</p>
                          </div>
                        </div>
                        
                        {/* Milestones */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900">Project Milestones</h4>
                          {contract.milestones.map((milestone, index) => (
                            <div key={milestone.id} className={`p-4 rounded-lg border ${getMilestoneStatusColor(milestone.status)}`}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-gray-900">{milestone.amount}</p>
                                  <p className="text-xs text-gray-500">Due: {milestone.dueDate}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <Badge className={getMilestoneStatusColor(milestone.status)}>
                                  {milestone.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                                  {milestone.status === "in_progress" && <Clock className="h-3 w-3 mr-1" />}
                                  {milestone.status.replace("_", " ").charAt(0).toUpperCase() + milestone.status.replace("_", " ").slice(1)}
                                </Badge>
                                
                                {milestone.status === "in_progress" && (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button size="sm">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Submit Work
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Submit Milestone Delivery</DialogTitle>
                                        <DialogDescription>{milestone.title}</DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="deliveryNote">Delivery Notes</Label>
                                          <Textarea
                                            id="deliveryNote"
                                            placeholder="Describe what you've completed and any important details..."
                                            value={deliveryNote}
                                            onChange={(e) => setDeliveryNote(e.target.value)}
                                            rows={4}
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Attach Files</Label>
                                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-600">Upload your completed work</p>
                                            <Button variant="outline" size="sm" className="mt-2">
                                              Choose Files
                                            </Button>
                                          </div>
                                        </div>
                                        <Button 
                                          onClick={() => handleMilestoneSubmit(contract.id, milestone.id)}
                                          className="w-full"
                                        >
                                          <Send className="h-4 w-4 mr-2" />
                                          Submit Delivery
                                        </Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                )}
                                
                                {milestone.status === "completed" && (
                                  <div className="text-xs text-gray-600">
                                    Completed: {milestone.completedDate}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Project Progress</span>
                    <span className="text-sm font-medium text-gray-900">{contract.progress}%</span>
                  </div>
                  <Progress value={contract.progress} className="h-2" />
                </div>
                
                {/* Recent Activity */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{contract.lastActivity}</span>
                  </div>
                  <span className="text-gray-500">{contract.activityDate}</span>
                </div>
                
                {/* Quick Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-600">Earned: </span>
                      <span className="font-medium text-green-600">{contract.totalEarned}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Pending: </span>
                      <span className="font-medium text-yellow-600">{contract.pendingAmount}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {contract.milestones.filter(m => m.status === "completed").length}/{contract.milestones.length} milestones completed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No contracts state */}
      {contracts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No active contracts</h3>
            <p className="text-gray-600 mb-4">
              When clients accept your proposals, your contracts will appear here.
            </p>
            <Button>
              Browse Jobs
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            Contract Management Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Communicate regularly</p>
                <p className="text-gray-600">Keep clients updated on progress and ask questions early</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Meet milestone deadlines</p>
                <p className="text-gray-600">Submit work on time to maintain good relationships</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Document everything</p>
                <p className="text-gray-600">Keep records of all communications and deliverables</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Quality first</p>
                <p className="text-gray-600">Always deliver your best work to build reputation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}