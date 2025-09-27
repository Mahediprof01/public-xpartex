"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign,
  Star,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Users,
  Calendar,
  Eye,
  Bell
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for jobs
const jobs = [
  {
    id: 1,
    title: "E-commerce Platform Development",
    company: "TechStyle Fashion",
    description: "We need an experienced developer to build a comprehensive e-commerce platform for our fashion retail business. Must have experience with React, Node.js, and payment integration.",
    budget: "$3,000 - $8,000",
    type: "Fixed Price",
    duration: "2-3 months",
    location: "Remote",
    postedTime: "2 hours ago",
    proposals: 12,
    skills: ["React", "Node.js", "MongoDB", "Payment Gateway"],
    featured: true,
    saved: false
  },
  {
    id: 2,
    title: "Textile Supply Chain Management System",
    company: "Global Textiles Ltd",
    description: "Looking for a full-stack developer to create a supply chain management system for textile manufacturing. Experience with inventory management and logistics preferred.",
    budget: "$5,000 - $12,000",
    type: "Fixed Price",
    duration: "3-4 months",
    location: "Remote",
    postedTime: "1 day ago",
    proposals: 8,
    skills: ["Vue.js", "Laravel", "MySQL", "API Development"],
    featured: false,
    saved: true
  },
  {
    id: 3,
    title: "Fashion Brand Mobile App Design",
    company: "Elegant Threads",
    description: "Seeking a UI/UX designer to create a mobile app for our fashion brand. Must understand modern design trends and have experience with fashion/retail apps.",
    budget: "$1,500 - $3,000",
    type: "Fixed Price",
    duration: "1-2 months",
    location: "Remote",
    postedTime: "3 days ago",
    proposals: 24,
    skills: ["UI Design", "UX Design", "Figma", "Mobile Design"],
    featured: false,
    saved: false
  },
  {
    id: 4,
    title: "Garment Factory Management Portal",
    company: "ManufacturePro",
    description: "Need a web application to manage garment factory operations including order tracking, quality control, and production scheduling.",
    budget: "$2,500 - $6,000",
    type: "Fixed Price",
    duration: "2-3 months",
    location: "Remote",
    postedTime: "5 days ago",
    proposals: 15,
    skills: ["Angular", "Spring Boot", "PostgreSQL", "Charts"],
    featured: false,
    saved: false
  },
  {
    id: 5,
    title: "Digital Marketing for Fashion Startup",
    company: "StyleForward",
    description: "Looking for a digital marketing specialist to help promote our new sustainable fashion brand. Experience with social media marketing and influencer outreach required.",
    budget: "$800 - $2,000",
    type: "Hourly",
    duration: "Ongoing",
    location: "Remote",
    postedTime: "1 week ago",
    proposals: 32,
    skills: ["Social Media Marketing", "SEO", "Content Creation", "Analytics"],
    featured: false,
    saved: false
  }
]

export default function FindJobs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [budgetRange, setBudgetRange] = useState("all")
  const [jobType, setJobType] = useState("all")
  const [savedJobs, setSavedJobs] = useState<number[]>([2])

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = category === "all" || 
                           (category === "development" && (job.skills.includes("React") || job.skills.includes("Vue.js") || job.skills.includes("Angular"))) ||
                           (category === "design" && job.skills.includes("UI Design")) ||
                           (category === "marketing" && job.skills.includes("Social Media Marketing"))
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Jobs</h1>
          <p className="text-gray-600 mt-1">Discover opportunities in textile, fashion, and e-commerce</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Saved ({savedJobs.length})
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, skills, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={budgetRange} onValueChange={setBudgetRange}>
              <SelectTrigger>
                <SelectValue placeholder="Budget Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budgets</SelectItem>
                <SelectItem value="low">Under $1,000</SelectItem>
                <SelectItem value="medium">$1,000 - $5,000</SelectItem>
                <SelectItem value="high">$5,000+</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fixed">Fixed Price</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
        <Select defaultValue="recent">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="budget-high">Highest Budget</SelectItem>
            <SelectItem value="budget-low">Lowest Budget</SelectItem>
            <SelectItem value="proposals">Fewest Proposals</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className={`hover:shadow-md transition-shadow ${job.featured ? 'ring-2 ring-blue-200 border-blue-300' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    {job.featured && (
                      <Badge className="bg-blue-100 text-blue-700">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-medium text-gray-700">{job.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{job.proposals} proposals</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 ml-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSaveJob(job.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {savedJobs.includes(job.id) ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">{job.company}</div>
                    <div className="text-xs text-gray-500">{job.postedTime}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load More Jobs
        </Button>
      </div>

      {/* Job Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Get Job Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Never miss an opportunity! Set up job alerts based on your skills and preferences.
          </p>
          <div className="flex gap-4">
            <Input placeholder="Enter keywords (e.g., React, UI Design)" className="flex-1" />
            <Button>Create Alert</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}