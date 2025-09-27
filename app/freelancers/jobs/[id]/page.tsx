"use client"

import { motion } from "framer-motion"
import { notFound } from "next/navigation"
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Users, 
  Calendar,
  Share2,
  Bookmark,
  Flag,
  Building,
  Star,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Send
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for job details
const getJobData = (id: string) => {
  const jobs = {
    "1": {
      id: "1",
      title: "Fashion Designer for Summer Collection",
      company: "Trendy Apparel Ltd.",
      companyLogo: "/placeholder-logo.png",
      location: "Remote",
      type: "Contract",
      budget: "BDT 50,000 - 80,000",
      budgetUSD: "$450 - $730",
      duration: "2 months",
      skills: ["Fashion Design", "Adobe Illustrator", "Trend Analysis", "Color Theory", "Sketching"],
      postedTime: "2 hours ago",
      applications: 12,
      description: `We are looking for a creative and experienced fashion designer to develop our summer collection 2024. The ideal candidate should have experience in women's apparel and contemporary fashion trends.

This is an exciting opportunity to work with a growing fashion brand that values innovation and sustainability. You'll be working closely with our design team to create trendy, market-ready designs that resonate with our target demographic.

**Key Responsibilities:**
- Design a complete summer collection (15-20 pieces)
- Create technical drawings and specifications
- Research and analyze current fashion trends
- Collaborate with the production team
- Present design concepts to stakeholders

**Requirements:**
- 3+ years of experience in fashion design
- Proficiency in Adobe Creative Suite
- Strong understanding of garment construction
- Portfolio showcasing relevant work
- Knowledge of sustainable fashion practices (preferred)

**What We Offer:**
- Competitive project-based compensation
- Flexible remote work arrangement
- Opportunity for long-term collaboration
- Creative freedom and artistic expression
- Professional growth opportunities`,
      urgent: true,
      verified: true,
      companyInfo: {
        name: "Trendy Apparel Ltd.",
        founded: "2015",
        employees: "50-100",
        rating: 4.6,
        reviewCount: 28,
        description: "A leading fashion brand specializing in contemporary women's apparel with a focus on sustainable and ethical fashion practices.",
        location: "Dhaka, Bangladesh",
        website: "www.trendyapparel.com"
      },
      requirements: [
        "3+ years of fashion design experience",
        "Proficiency in Adobe Creative Suite",
        "Portfolio of relevant work",
        "Understanding of garment construction",
        "Knowledge of current fashion trends"
      ],
      benefits: [
        "Competitive project compensation",
        "Flexible remote work",
        "Creative freedom",
        "Potential for ongoing collaboration",
        "Professional references"
      ],
      similarJobs: [
        {
          id: "2",
          title: "Pattern Maker for Kids Clothing",
          company: "Little Stars Fashion",
          budget: "BDT 25,000 - 40,000",
          applications: 15
        },
        {
          id: "3",
          title: "Sustainable Fashion Consultant",
          company: "EcoWear International",
          budget: "BDT 80,000 - 120,000",
          applications: 6
        }
      ],
      applicationProcess: [
        "Submit your proposal with portfolio",
        "Initial screening call",
        "Design challenge (if shortlisted)",
        "Final interview with design team",
        "Project kick-off meeting"
      ]
    },
    "2": {
      id: "2",
      title: "Quality Control Specialist",
      company: "Bengal Textiles",
      companyLogo: "/placeholder-logo.png",
      location: "Dhaka, Bangladesh",
      type: "Part-time",
      budget: "BDT 35,000 - 45,000",
      budgetUSD: "$320 - $410",
      duration: "3 months",
      skills: ["Quality Assurance", "Textile Testing", "Documentation", "ISO Standards"],
      postedTime: "5 hours ago",
      applications: 8,
      description: `Seeking an experienced QC specialist to ensure our textile products meet international quality standards. Must have experience with testing procedures and documentation.

**Key Responsibilities:**
- Conduct quality inspections on textile products
- Maintain detailed quality control documentation
- Implement testing procedures and protocols
- Coordinate with production teams
- Ensure compliance with international standards

**Requirements:**
- 2+ years of QC experience in textiles
- Knowledge of ISO quality standards
- Experience with testing equipment
- Strong attention to detail
- Good documentation skills`,
      urgent: false,
      verified: true,
      companyInfo: {
        name: "Bengal Textiles",
        founded: "2010",
        employees: "100-200",
        rating: 4.4,
        reviewCount: 15,
        description: "Leading textile manufacturer specializing in high-quality fabrics for export markets.",
        location: "Dhaka, Bangladesh",
        website: "www.bengaltextiles.com"
      },
      requirements: [
        "2+ years QC experience in textiles",
        "Knowledge of ISO standards",
        "Experience with testing equipment",
        "Strong attention to detail",
        "Good documentation skills"
      ],
      benefits: [
        "Competitive hourly compensation",
        "Flexible working hours",
        "Learning opportunities",
        "Professional development",
        "Performance bonuses"
      ],
      similarJobs: [
        {
          id: "1",
          title: "Fashion Designer for Summer Collection",
          company: "Trendy Apparel Ltd.",
          budget: "BDT 50,000 - 80,000",
          applications: 12
        }
      ],
      applicationProcess: [
        "Submit your application with CV",
        "Technical assessment",
        "Interview with QC manager",
        "Site visit and final interview",
        "Contract negotiation"
      ]
    }
  }
  
  return jobs[id as keyof typeof jobs]
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const job = getJobData(resolvedParams.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="h-16 w-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <img 
                  src={job.companyLogo} 
                  alt={job.company}
                  className="h-12 w-12 object-contain"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{job.title}</h1>
                  {job.urgent && (
                    <Badge variant="destructive">Urgent</Badge>
                  )}
                  {job.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-lg text-sky-600 font-semibold">{job.company}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{job.companyInfo.rating} ({job.companyInfo.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Posted {job.postedTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose prose-gray max-w-none">
                      {job.description.split('\n\n').map((paragraph, index) => (
                        <div key={index} className="mb-4">
                          {paragraph.startsWith('**') ? (
                            <div className="mb-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {paragraph.replace(/\*\*/g, '')}
                              </h3>
                            </div>
                          ) : paragraph.startsWith('- ') ? (
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {paragraph.split('\n').filter(line => line.startsWith('- ')).map((item, i) => (
                                <li key={i}>{item.substring(2)}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Required Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="company" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-20 w-20 bg-gray-100 rounded-xl flex items-center justify-center">
                        <img 
                          src={job.companyLogo} 
                          alt={job.company}
                          className="h-16 w-16 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.companyInfo.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            <span>Founded {job.companyInfo.founded}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{job.companyInfo.employees} employees</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.companyInfo.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(job.companyInfo.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {job.companyInfo.rating} ({job.companyInfo.reviewCount} reviews)
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{job.companyInfo.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Requirements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="process" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {job.applicationProcess.map((step, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="h-8 w-8 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Apply for this Job</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {job.budgetUSD}
                  </div>
                  <div className="text-lg text-gray-600">
                    {job.budget}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Project Budget
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Applications:</span>
                  <span className="font-medium">{job.applications} submitted</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{job.duration}</span>
                </div>

                <Button className="w-full gradient-primary gradient-primary-hover text-white" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Proposal
                </Button>

                <Button variant="outline" className="w-full" size="lg">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Client
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  By applying, you agree to our terms of service
                </div>
              </CardContent>
            </Card>

            {/* Job Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Job Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Proposals</span>
                  <span className="font-medium">{job.applications}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Interviewing</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Invites sent</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Unanswered invites</span>
                  <span className="font-medium">1</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.similarJobs.map((similarJob) => (
                  <div key={similarJob.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                      {similarJob.title}
                    </h4>
                    <p className="text-sky-600 text-sm mb-2">{similarJob.company}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{similarJob.budget}</span>
                      <span>{similarJob.applications} proposals</span>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" size="sm" className="w-full">
                  View More Similar Jobs
                </Button>
              </CardContent>
            </Card>

            {/* Client Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Client Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-medium">2015</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total jobs posted:</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Hire rate:</span>
                  <span className="font-medium text-green-600">89%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total spent:</span>
                  <span className="font-medium">$52,000+</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}