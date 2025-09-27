"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Users, Filter, Grid3X3, List, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FreelancerCard, FreelancerCardProps } from "@/components/freelancer/freelancer-card"
import { Filters } from "@/components/freelancer/filters"

// Mock data for freelancers
const mockFreelancers: FreelancerCardProps[] = [
  {
    id: "1",
    name: "Sarah Ahmed",
    title: "Senior Fashion Designer",
    avatar: "/placeholder-user.jpg",
    location: "Dhaka, Bangladesh",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 45,
    completedJobs: 89,
    skills: ["Fashion Design", "Adobe Illustrator", "Pattern Making", "Trend Analysis", "3D Design"],
    isOnline: true,
    lastActive: "Online now",
    description: "Experienced fashion designer with 8+ years in the garment industry. Specialized in women's apparel and sustainable fashion solutions."
  },
  {
    id: "2",
    name: "Mohammad Rahman",
    title: "Quality Control Expert",
    avatar: "/placeholder-user.jpg",
    location: "Chittagong, Bangladesh",
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 35,
    completedJobs: 156,
    skills: ["Quality Assurance", "Textile Testing", "Documentation", "ISO Standards", "Process Improvement"],
    isOnline: false,
    lastActive: "2 hours ago",
    description: "Quality control specialist with extensive experience in textile manufacturing. Expert in international quality standards and compliance."
  },
  {
    id: "3",
    name: "Fatema Khatun",
    title: "Pattern Maker & Technical Designer",
    avatar: "/placeholder-user.jpg",
    location: "Dhaka, Bangladesh",
    rating: 5.0,
    reviewCount: 76,
    hourlyRate: 40,
    completedJobs: 64,
    skills: ["Pattern Making", "Grading", "Technical Drawing", "CAD", "Fit Analysis"],
    isOnline: true,
    lastActive: "Online now",
    description: "Expert pattern maker specializing in children's wear and activewear. Proficient in both manual and digital pattern development."
  },
  {
    id: "4",
    name: "Karim Uddin",
    title: "Textile Production Manager",
    avatar: "/placeholder-user.jpg",
    location: "Gazipur, Bangladesh",
    rating: 4.7,
    reviewCount: 143,
    hourlyRate: 50,
    completedJobs: 201,
    skills: ["Production Planning", "Team Management", "Supply Chain", "Lean Manufacturing", "Cost Optimization"],
    isOnline: false,
    lastActive: "1 day ago",
    description: "Seasoned production manager with 12+ years experience managing large-scale textile operations. Expert in efficiency optimization."
  },
  {
    id: "5",
    name: "Rashida Begum",
    title: "Embroidery & Embellishment Specialist",
    avatar: "/placeholder-user.jpg",
    location: "Sylhet, Bangladesh",
    rating: 4.9,
    reviewCount: 89,
    hourlyRate: 30,
    completedJobs: 112,
    skills: ["Hand Embroidery", "Machine Embroidery", "Beadwork", "Sequin Work", "Traditional Crafts"],
    isOnline: true,
    lastActive: "Online now",
    description: "Master craftsperson specializing in traditional Bangladeshi embroidery and modern embellishment techniques for luxury garments."
  },
  {
    id: "6",
    name: "Abdullah Al Mamun",
    title: "Sustainable Fashion Consultant",
    avatar: "/placeholder-user.jpg",
    location: "Remote",
    rating: 4.8,
    reviewCount: 67,
    hourlyRate: 55,
    completedJobs: 43,
    skills: ["Sustainable Design", "Eco-friendly Materials", "Circular Fashion", "Life Cycle Assessment", "Green Manufacturing"],
    isOnline: true,
    lastActive: "Online now",
    description: "Sustainability expert helping fashion brands transition to eco-friendly practices. Consultant for major international brands."
  }
]

export default function FreelancersPage() {
  const [freelancers, setFreelancers] = useState(mockFreelancers)
  const [filteredFreelancers, setFilteredFreelancers] = useState(mockFreelancers)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("rating")
  const [isLoading, setIsLoading] = useState(false)

  // Filter handlers
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredFreelancers(freelancers)
      return
    }

    const filtered = freelancers.filter(freelancer => 
      freelancer.name.toLowerCase().includes(query.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(query.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredFreelancers(filtered)
  }

  const handleLocationChange = (location: string) => {
    if (location === "all") {
      setFilteredFreelancers(freelancers)
      return
    }

    const filtered = freelancers.filter(freelancer => 
      freelancer.location.toLowerCase().includes(location)
    )
    setFilteredFreelancers(filtered)
  }

  const handleBudgetChange = (range: number[]) => {
    const filtered = freelancers.filter(freelancer => 
      freelancer.hourlyRate >= range[0] && freelancer.hourlyRate <= range[1]
    )
    setFilteredFreelancers(filtered)
  }

  const handleTypeChange = (types: string[]) => {
    // This would filter by freelancer availability or type
    // For now, just return all if no types selected
    if (types.length === 0) {
      setFilteredFreelancers(freelancers)
    }
  }

  const handleRatingChange = (rating: number) => {
    if (rating === 0) {
      setFilteredFreelancers(freelancers)
      return
    }

    const filtered = freelancers.filter(freelancer => freelancer.rating >= rating)
    setFilteredFreelancers(filtered)
  }

  const handleSort = (sortValue: string) => {
    setSortBy(sortValue)
    const sorted = [...filteredFreelancers].sort((a, b) => {
      switch (sortValue) {
        case "rating":
          return b.rating - a.rating
        case "hourly_rate_low":
          return a.hourlyRate - b.hourlyRate
        case "hourly_rate_high":
          return b.hourlyRate - a.hourlyRate
        case "completed_jobs":
          return b.completedJobs - a.completedJobs
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
    setFilteredFreelancers(sorted)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Find Expert Freelancers
            </h1>
            <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
              Connect with skilled professionals in the garment industry for your projects
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{freelancers.length}+ Active Freelancers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 bg-green-400 rounded-full"></span>
                <span>{freelancers.filter(f => f.isOnline).length} Online Now</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Filters
          onSearch={handleSearch}
          onLocationChange={handleLocationChange}
          onBudgetChange={handleBudgetChange}
          onTypeChange={handleTypeChange}
          onRatingChange={handleRatingChange}
          className="mb-8"
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600">
              Showing {filteredFreelancers.length} of {freelancers.length} freelancers
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="hourly_rate_low">Lowest Rate</SelectItem>
                <SelectItem value="hourly_rate_high">Highest Rate</SelectItem>
                <SelectItem value="completed_jobs">Most Jobs</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex border border-gray-200 rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Freelancers Grid/List */}
        <motion.div
          layout
          className={`grid gap-6 ${viewMode === "grid" ? "lg:grid-cols-2" : "grid-cols-1"}`}
        >
          {filteredFreelancers.map((freelancer, index) => (
            <motion.div
              key={freelancer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              layout
            >
              <FreelancerCard freelancer={freelancer} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {filteredFreelancers.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More Freelancers"}
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredFreelancers.length === 0 && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No freelancers found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <Button onClick={() => window.location.reload()}>Reset Filters</Button>
          </div>
        )}
      </div>
    </div>
  )
}