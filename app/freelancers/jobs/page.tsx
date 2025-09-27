"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Briefcase, MapPin, Clock, DollarSign, Filter, Grid3X3, List, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { JobCard, JobCardProps } from "@/components/freelancer/job-card"
import { Filters } from "@/components/freelancer/filters"

// Mock data for freelancer jobs
const mockJobs: JobCardProps[] = [
  {
    id: "1",
    title: "Fashion Designer for Summer Collection",
    company: "Trendy Apparel Ltd.",
    companyLogo: "/placeholder-logo.png",
    location: "Remote",
    type: "Contract",
    budget: "BDT 50,000 - 80,000",
    duration: "2 months",
    skills: ["Fashion Design", "Adobe Illustrator", "Trend Analysis", "Color Theory", "Sketching"],
    postedTime: "2 hours ago",
    applications: 12,
    description: "We are looking for a creative fashion designer to develop our summer collection 2024. The ideal candidate should have experience in women's apparel and contemporary fashion trends.",
    urgent: true,
    verified: true
  },
  {
    id: "2",
    title: "Quality Control Specialist",
    company: "Bengal Textiles",
    companyLogo: "/placeholder-logo.png",
    location: "Dhaka, Bangladesh",
    type: "Part-time",
    budget: "BDT 35,000 - 45,000",
    duration: "3 months",
    skills: ["Quality Assurance", "Textile Testing", "Documentation", "ISO Standards"],
    postedTime: "5 hours ago",
    applications: 8,
    description: "Seeking an experienced QC specialist to ensure our textile products meet international quality standards. Must have experience with testing procedures and documentation.",
    verified: true
  },
  {
    id: "3",
    title: "Pattern Maker for Kids Clothing",
    company: "Little Stars Fashion",
    companyLogo: "/placeholder-logo.png",
    location: "Chittagong, Bangladesh",
    type: "Freelance",
    budget: "BDT 25,000 - 40,000",
    duration: "1 month",
    skills: ["Pattern Making", "Grading", "Technical Drawing", "CAD Software"],
    postedTime: "1 day ago",
    applications: 15,
    description: "Looking for a skilled pattern maker to create patterns for our new children's clothing line. Experience with grading and technical specifications required."
  },
  {
    id: "4",
    title: "Sustainable Fashion Consultant",
    company: "EcoWear International",
    companyLogo: "/placeholder-logo.png",
    location: "Remote",
    type: "Contract",
    budget: "BDT 80,000 - 120,000",
    duration: "4 months",
    skills: ["Sustainable Design", "Eco Materials", "Supply Chain", "Certification", "Research"],
    postedTime: "2 days ago",
    applications: 6,
    description: "We need a sustainability expert to help transform our fashion brand into an eco-friendly operation. Experience with sustainable materials and certifications essential.",
    urgent: false,
    verified: true
  },
  {
    id: "5",
    title: "Embroidery Design Specialist",
    company: "Heritage Crafts Ltd.",
    companyLogo: "/placeholder-logo.png",
    location: "Sylhet, Bangladesh",
    type: "Freelance",
    budget: "BDT 20,000 - 35,000",
    duration: "6 weeks",
    skills: ["Embroidery Design", "Traditional Crafts", "Digital Design", "Color Matching"],
    postedTime: "3 days ago",
    applications: 22,
    description: "Create beautiful embroidery designs for traditional and contemporary garments. Must have experience with both hand and machine embroidery techniques."
  },
  {
    id: "6",
    title: "Technical Fashion Illustrator",
    company: "Fashion Forward Studios",
    companyLogo: "/placeholder-logo.png",
    location: "Remote",
    type: "Part-time",
    budget: "BDT 40,000 - 55,000",
    duration: "2 months",
    skills: ["Fashion Illustration", "Adobe Creative Suite", "Technical Drawing", "Flat Sketches"],
    postedTime: "4 days ago",
    applications: 18,
    description: "Seeking a talented illustrator to create technical fashion drawings and illustrations for our design team. Proficiency in Adobe Illustrator is mandatory.",
    verified: true
  },
  {
    id: "7",
    title: "Textile Print Designer",
    company: "Print Paradise",
    companyLogo: "/placeholder-logo.png",
    location: "Dhaka, Bangladesh",
    type: "Contract",
    budget: "BDT 60,000 - 90,000",
    duration: "3 months",
    skills: ["Print Design", "Repeat Patterns", "Color Separation", "Screen Printing", "Digital Printing"],
    postedTime: "1 week ago",
    applications: 14,
    description: "Design innovative textile prints for our fashion and home decor collections. Experience with both traditional and digital printing techniques required.",
    urgent: true
  },
  {
    id: "8",
    title: "Production Planning Coordinator",
    company: "Global Garments Ltd.",
    companyLogo: "/placeholder-logo.png",
    location: "Gazipur, Bangladesh",
    type: "Full-time",
    budget: "BDT 45,000 - 65,000",
    duration: "Ongoing",
    skills: ["Production Planning", "Supply Chain", "Project Management", "ERP Systems"],
    postedTime: "1 week ago",
    applications: 9,
    description: "Coordinate production planning activities for our manufacturing facility. Must have experience with garment production processes and ERP systems.",
    verified: true
  }
]

export default function FreelancerJobsPage() {
  const [jobs, setJobs] = useState(mockJobs)
  const [filteredJobs, setFilteredJobs] = useState(mockJobs)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = useState("recent")
  const [isLoading, setIsLoading] = useState(false)

  // Filter handlers
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredJobs(jobs)
      return
    }

    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase())) ||
      job.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredJobs(filtered)
  }

  const handleLocationChange = (location: string) => {
    if (location === "all") {
      setFilteredJobs(jobs)
      return
    }

    const filtered = jobs.filter(job => 
      job.location.toLowerCase().includes(location)
    )
    setFilteredJobs(filtered)
  }

  const handleBudgetChange = (range: number[]) => {
    const filtered = jobs.filter(job => {
      // Extract numeric values from budget string (e.g., "BDT 50,000 - 80,000")
      const budgetMatch = job.budget.match(/[\d,]+/g)
      if (budgetMatch) {
        const minBudget = parseInt(budgetMatch[0].replace(/,/g, ''))
        const maxBudget = budgetMatch[1] ? parseInt(budgetMatch[1].replace(/,/g, '')) : minBudget
        // Convert BDT to USD (approximate rate)
        const minUSD = Math.floor(minBudget / 110)
        const maxUSD = Math.floor(maxBudget / 110)
        return minUSD <= range[1] && maxUSD >= range[0]
      }
      return true
    })
    setFilteredJobs(filtered)
  }

  const handleTypeChange = (types: string[]) => {
    if (types.length === 0) {
      setFilteredJobs(jobs)
      return
    }

    const filtered = jobs.filter(job => types.includes(job.type))
    setFilteredJobs(filtered)
  }

  const handleRatingChange = (rating: number) => {
    // For jobs, this could filter by company rating
    // For now, just return all
    setFilteredJobs(jobs)
  }

  const handleSort = (sortValue: string) => {
    setSortBy(sortValue)
    const sorted = [...filteredJobs].sort((a, b) => {
      switch (sortValue) {
        case "recent":
          return new Date(b.postedTime).getTime() - new Date(a.postedTime).getTime()
        case "applications":
          return a.applications - b.applications // Fewer applications = better chance
        case "budget_high":
          // Extract max budget value for sorting
          const aBudget = parseInt(a.budget.match(/[\d,]+/g)?.[1]?.replace(/,/g, '') || a.budget.match(/[\d,]+/g)?.[0]?.replace(/,/g, '') || '0')
          const bBudget = parseInt(b.budget.match(/[\d,]+/g)?.[1]?.replace(/,/g, '') || b.budget.match(/[\d,]+/g)?.[0]?.replace(/,/g, '') || '0')
          return bBudget - aBudget
        case "budget_low":
          const aBudgetLow = parseInt(a.budget.match(/[\d,]+/g)?.[0]?.replace(/,/g, '') || '0')
          const bBudgetLow = parseInt(b.budget.match(/[\d,]+/g)?.[0]?.replace(/,/g, '') || '0')
          return aBudgetLow - bBudgetLow
        default:
          return 0
      }
    })
    setFilteredJobs(sorted)
  }

  const featuredJobs = filteredJobs.filter(job => job.urgent || job.verified).slice(0, 3)
  const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Freelance Opportunities
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Discover exciting freelance projects in the garment and textile industry
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span>{jobs.length} Active Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>{totalApplications} Total Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>New jobs daily</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs */}
      {featuredJobs.length > 0 && (
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Jobs</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {featuredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="applications">Fewest Applications</SelectItem>
                <SelectItem value="budget_high">Highest Budget</SelectItem>
                <SelectItem value="budget_low">Lowest Budget</SelectItem>
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

        {/* Jobs Grid/List */}
        <motion.div
          layout
          className={`grid gap-6 ${viewMode === "grid" ? "lg:grid-cols-2" : "grid-cols-1"}`}
        >
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More Jobs"}
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <Button onClick={() => window.location.reload()}>Reset Filters</Button>
          </div>
        )}
      </div>
    </div>
  )
}