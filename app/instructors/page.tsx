"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Users, BookOpen, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InstructorGrid } from "@/components/instructors/instructor-grid"
import { InstructorStats } from "@/components/instructors/instructor-stats-overview"

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const expertiseAreas = [
    { id: "all", name: "All Expertise", count: 25 },
    { id: "fashion-design", name: "Fashion Design", count: 8 },
    { id: "manufacturing", name: "Manufacturing", count: 6 },
    { id: "business", name: "Business Strategy", count: 5 },
    { id: "sustainability", name: "Sustainability", count: 4 },
    { id: "quality-control", name: "Quality Control", count: 2 },
  ]

  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "students", label: "Most Students" },
    { value: "courses", label: "Most Courses" },
    { value: "experience", label: "Most Experience" },
    { value: "newest", label: "Newest First" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Expert Instructors
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Learn from industry professionals with years of real-world experience
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 w-5 h-5 z-10 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search instructors by name, expertise, or experience..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300 focus:bg-white/20 relative z-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="mb-16">
          <InstructorStats />
        </div>

        {/* Filters and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Expertise Filter */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Expertise Areas
                </h3>
                <div className="space-y-2">
                  {expertiseAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setSelectedExpertise(area.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedExpertise === area.id
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{area.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {area.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        sortBy === option.value
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Platform Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Instructors</span>
                    <span className="font-semibold text-gray-900">25</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Students</span>
                    <span className="font-semibold text-gray-900">150K+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedExpertise === "all" ? "All Instructors" : expertiseAreas.find(a => a.id === selectedExpertise)?.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing {expertiseAreas.find(a => a.id === selectedExpertise)?.count || 25} instructors
                </p>
              </div>
            </div>

            {/* Instructors Grid */}
            <InstructorGrid 
              searchQuery={searchQuery}
              selectedExpertise={selectedExpertise}
              sortBy={sortBy}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
