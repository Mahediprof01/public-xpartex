"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search,
  Filter,
  Clock,
  DollarSign,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Building,
  FileText,
  TrendingUp,
  ArrowUpRight
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for proposals
const proposals = [
  {
    id: 1,
    jobTitle: "E-commerce Platform Development",
    company: "TechStyle Fashion",
    submittedDate: "2024-12-20",
    status: "under_review",
    budget: "$5,500",
    clientBudget: "$3,000 - $8,000",
    deliveryTime: "8 weeks",
    coverLetter: "I'm excited about this e-commerce project and believe my 5+ years of React and Node.js experience makes me perfect for this role. I've built similar platforms for fashion brands...",
    clientViews: 12,
    lastActivity: "Client viewed 2 hours ago",
    responseTime: "Usually responds within 4 hours"
  },
  {
    id: 2,
    jobTitle: "Textile Supply Chain Management System",
    company: "Global Textiles Ltd",
    submittedDate: "2024-12-18",
    status: "accepted",
    budget: "$8,200",
    clientBudget: "$5,000 - $12,000",
    deliveryTime: "12 weeks",
    coverLetter: "Having worked on several supply chain solutions, I understand the complexities involved in textile manufacturing logistics...",
    clientViews: 8,
    lastActivity: "Contract sent 1 day ago",
    responseTime: "Usually responds within 2 hours"
  },
  {
    id: 3,
    jobTitle: "Fashion Brand Mobile App Design",
    company: "Elegant Threads",
    submittedDate: "2024-12-15",
    status: "declined",
    budget: "$2,000",
    clientBudget: "$1,500 - $3,000",
    deliveryTime: "6 weeks",
    coverLetter: "I specialize in fashion and retail app designs with a keen eye for modern UI/UX trends that appeal to fashion-conscious users...",
    clientViews: 15,
    lastActivity: "Declined 3 days ago",
    responseTime: "Usually responds within 6 hours",
    declineReason: "Selected another freelancer"
  },
  {
    id: 4,
    jobTitle: "Garment Factory Management Portal",
    company: "ManufacturePro",
    submittedDate: "2024-12-12",
    status: "interview",
    budget: "$4,500",
    clientBudget: "$2,500 - $6,000",
    deliveryTime: "10 weeks",
    coverLetter: "Manufacturing management systems require robust architecture and real-time data processing, which aligns perfectly with my expertise...",
    clientViews: 22,
    lastActivity: "Interview scheduled for Dec 28",
    responseTime: "Usually responds within 1 hour",
    interviewDate: "2024-12-28",
    interviewTime: "2:00 PM EST"
  },
  {
    id: 5,
    jobTitle: "Digital Marketing for Fashion Startup",
    company: "StyleForward",
    submittedDate: "2024-12-10",
    status: "submitted",
    budget: "$1,200",
    clientBudget: "$800 - $2,000",
    deliveryTime: "4 weeks",
    coverLetter: "Digital marketing for fashion brands requires understanding both the technical aspects and the creative elements that resonate with target audiences...",
    clientViews: 5,
    lastActivity: "Submitted 7 days ago",
    responseTime: "Usually responds within 12 hours"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "accepted": return "bg-green-100 text-green-700"
    case "declined": return "bg-red-100 text-red-700"
    case "interview": return "bg-blue-100 text-blue-700"
    case "under_review": return "bg-yellow-100 text-yellow-700"
    case "submitted": return "bg-gray-100 text-gray-700"
    default: return "bg-gray-100 text-gray-700"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "accepted": return <CheckCircle className="h-4 w-4" />
    case "declined": return <XCircle className="h-4 w-4" />
    case "interview": return <MessageSquare className="h-4 w-4" />
    case "under_review": return <AlertCircle className="h-4 w-4" />
    case "submitted": return <Clock className="h-4 w-4" />
    default: return <Clock className="h-4 w-4" />
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "accepted": return "Accepted"
    case "declined": return "Declined"
    case "interview": return "Interview"
    case "under_review": return "Under Review"
    case "submitted": return "Submitted"
    default: return "Unknown"
  }
}

export default function MyProposals() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProposal, setSelectedProposal] = useState<any>(null)

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proposal.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: proposals.length,
    accepted: proposals.filter(p => p.status === "accepted").length,
    pending: proposals.filter(p => p.status === "under_review" || p.status === "submitted").length,
    interviews: proposals.filter(p => p.status === "interview").length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
          <p className="text-gray-600 mt-1">Track your submitted proposals and their status</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Proposal Templates
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-blue-600">{stats.interviews}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search proposals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <Card key={proposal.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{proposal.jobTitle}</h3>
                    <Badge className={getStatusColor(proposal.status)}>
                      {getStatusIcon(proposal.status)}
                      <span className="ml-1">{getStatusText(proposal.status)}</span>
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span>{proposal.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Submitted {proposal.submittedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{proposal.clientViews} views</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Your bid: {proposal.budget}</span>
                      <span className="text-gray-500">({proposal.clientBudget})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>Delivery: {proposal.deliveryTime}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-600">
                    <p className="font-medium">{proposal.lastActivity}</p>
                    <p className="text-xs text-gray-500 mt-1">{proposal.responseTime}</p>
                  </div>

                  {proposal.status === "interview" && proposal.interviewDate && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-700">
                        <MessageSquare className="h-4 w-4" />
                        <span className="font-medium">Interview Scheduled</span>
                      </div>
                      <p className="text-sm text-blue-600 mt-1">
                        {proposal.interviewDate} at {proposal.interviewTime}
                      </p>
                    </div>
                  )}

                  {proposal.status === "declined" && proposal.declineReason && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm text-red-700">
                        <span className="font-medium">Declined:</span> {proposal.declineReason}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{proposal.jobTitle}</DialogTitle>
                        <DialogDescription>{proposal.company}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Your Bid</p>
                            <p className="text-lg font-bold text-green-600">{proposal.budget}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Delivery Time</p>
                            <p className="text-lg font-bold text-blue-600">{proposal.deliveryTime}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">Cover Letter</p>
                          <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                            {proposal.coverLetter}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {proposal.status === "accepted" && (
                    <Button size="sm">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      View Contract
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Start applying to jobs to see your proposals here"
              }
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Button>
                Find Jobs to Apply
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Success Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Tips for Better Proposals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Personalize each proposal</p>
                <p className="text-gray-600">Reference specific project details and requirements</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Showcase relevant work</p>
                <p className="text-gray-600">Include portfolio samples that match the project type</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Be competitive but realistic</p>
                <p className="text-gray-600">Price your services appropriately for your skill level</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Follow up professionally</p>
                <p className="text-gray-600">Send polite follow-ups if you don&apos;t hear back</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}