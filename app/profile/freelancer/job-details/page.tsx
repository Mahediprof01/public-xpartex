"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft,
  DollarSign,
  Clock,
  MapPin,
  Users,
  Star,
  Bookmark,
  BookmarkCheck,
  Send,
  Building,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
  Upload
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function JobDetails() {
  const [saved, setSaved] = useState(false)
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [proposalText, setProposalText] = useState("")
  const [proposalBudget, setProposalBudget] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("")

  // Mock job data
  const job = {
    id: 1,
    title: "E-commerce Platform Development",
    company: "TechStyle Fashion",
    companyRating: 4.8,
    description: `We are looking for an experienced full-stack developer to build a comprehensive e-commerce platform for our fashion retail business. The platform should include:

• User authentication and authorization
• Product catalog with advanced filtering
• Shopping cart and checkout system
• Payment gateway integration (Stripe/PayPal)
• Order management system
• Admin dashboard for inventory management
• Responsive design for mobile and desktop
• SEO optimization

The ideal candidate should have:
- 3+ years of experience with React and Node.js
- Experience with MongoDB or PostgreSQL
- Knowledge of payment gateway integration
- Understanding of e-commerce best practices
- Experience with AWS or similar cloud platforms

This is a great opportunity to work with a growing fashion brand and build a platform from scratch. We value clean code, scalability, and attention to detail.`,
    budget: "$3,000 - $8,000",
    type: "Fixed Price",
    duration: "2-3 months",
    location: "Remote",
    postedTime: "2 hours ago",
    proposals: 12,
    skills: ["React", "Node.js", "MongoDB", "Payment Gateway", "AWS", "Express.js"],
    clientInfo: {
      name: "Sarah Johnson",
      title: "CTO",
      joinDate: "Member since 2022",
      totalSpent: "$45,000",
      hireRate: "85%",
      reviews: 23,
      rating: 4.8
    },
    featured: true
  }

  const handleSubmitProposal = () => {
    // Handle proposal submission logic here
    console.log("Proposal submitted:", {
      proposalText,
      proposalBudget,
      deliveryTime
    })
    setShowProposalForm(false)
    // Show success message or redirect
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Job Search
      </Button>

      {/* Job Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                {job.featured && (
                  <Badge className="bg-blue-100 text-blue-700">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{job.company}</span>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{job.companyRating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{job.postedTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-gray-700">{job.budget}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span>{job.proposals} proposals</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSaved(!saved)}
              >
                {saved ? (
                  <BookmarkCheck className="h-4 w-4 mr-2" />
                ) : (
                  <Bookmark className="h-4 w-4 mr-2" />
                )}
                {saved ? 'Saved' : 'Save Job'}
              </Button>
              <Button onClick={() => setShowProposalForm(true)}>
                <Send className="h-4 w-4 mr-2" />
                Submit Proposal
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-gray-700">
                  {job.description}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Required */}
          <Card>
            <CardHeader>
              <CardTitle>Skills Required</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Proposal Form */}
          {showProposalForm && (
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Proposal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="proposal">Cover Letter</Label>
                  <Textarea
                    id="proposal"
                    placeholder="Describe your approach to this project, your relevant experience, and why you're the best fit..."
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    Tip: Personalize your proposal and highlight relevant experience
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Your Budget</Label>
                    <Input
                      id="budget"
                      placeholder="$3,500"
                      value={proposalBudget}
                      onChange={(e) => setProposalBudget(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery">Delivery Time</Label>
                    <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1week">1 week</SelectItem>
                        <SelectItem value="2weeks">2 weeks</SelectItem>
                        <SelectItem value="1month">1 month</SelectItem>
                        <SelectItem value="2months">2 months</SelectItem>
                        <SelectItem value="3months">3 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Attach Files (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      Upload portfolio samples or relevant documents
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button onClick={handleSubmitProposal} className="flex-1">
                    Submit Proposal
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowProposalForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>About the Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{job.clientInfo.name}</h4>
                <p className="text-sm text-gray-600">{job.clientInfo.title}</p>
                <p className="text-xs text-gray-500 mt-1">{job.clientInfo.joinDate}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Spent</span>
                  <span className="text-sm font-medium">{job.clientInfo.totalSpent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hire Rate</span>
                  <span className="text-sm font-medium text-green-600">{job.clientInfo.hireRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{job.clientInfo.rating}</span>
                    <span className="text-xs text-gray-500">({job.clientInfo.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Job Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">12 proposals submitted</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Last viewed 1 hour ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Client is online</span>
              </div>
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-sm text-gray-900 mb-1">
                  Fashion Store Website
                </h4>
                <p className="text-xs text-gray-600 mb-2">$2,000 - $5,000</p>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="text-xs">React</Badge>
                  <Badge variant="secondary" className="text-xs">Node.js</Badge>
                </div>
              </div>
              
              <div className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-sm text-gray-900 mb-1">
                  Textile B2B Platform
                </h4>
                <p className="text-xs text-gray-600 mb-2">$4,000 - $10,000</p>
                <div className="flex gap-1">
                  <Badge variant="secondary" className="text-xs">Vue.js</Badge>
                  <Badge variant="secondary" className="text-xs">Laravel</Badge>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                View All Similar Jobs
              </Button>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Proposal Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Include relevant portfolio samples</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Ask clarifying questions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Propose a realistic timeline</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Highlight relevant experience</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}