"use client"

import { motion } from "framer-motion"
import { Search, Filter, MapPin, DollarSign, Briefcase, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

interface FiltersProps {
  onSearch: (query: string) => void
  onLocationChange: (location: string) => void
  onBudgetChange: (range: number[]) => void
  onTypeChange: (types: string[]) => void
  onRatingChange: (rating: number) => void
  className?: string
}

export function Filters({
  onSearch,
  onLocationChange,
  onBudgetChange,
  onTypeChange,
  onRatingChange,
  className
}: FiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [budgetRange, setBudgetRange] = useState([0, 200])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...selectedTypes, type]
      : selectedTypes.filter(t => t !== type)
    setSelectedTypes(newTypes)
    onTypeChange(newTypes)
  }

  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"]
  const locations = ["Remote", "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}
    >
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for jobs, freelancers, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-12 text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
      </form>

      {/* Quick Filters */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sky-600"
        >
          <Filter className="h-4 w-4 mr-2" />
          {isExpanded ? "Hide" : "Show"} Advanced
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            Location
          </label>
          <Select onValueChange={onLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location.toLowerCase()}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Star className="h-4 w-4 inline mr-1" />
            Minimum Rating
          </label>
          <Select onValueChange={(value) => onRatingChange(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="h-4 w-4 inline mr-1" />
            Hourly Rate: ${budgetRange[0]} - ${budgetRange[1]}
          </label>
          <Slider
            value={budgetRange}
            onValueChange={(value) => {
              setBudgetRange(value)
              onBudgetChange(value)
            }}
            max={200}
            min={0}
            step={5}
            className="mt-2"
          />
        </div>
      </div>

      {/* Advanced Filters */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="border-t border-gray-100 pt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Briefcase className="h-4 w-4 inline mr-1" />
              Job Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) => handleTypeChange(type, !!checked)}
                  />
                  <label htmlFor={type} className="text-sm text-gray-700 cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setBudgetRange([0, 200])
                setSelectedTypes([])
                onSearch("")
                onLocationChange("all")
                onBudgetChange([0, 200])
                onTypeChange([])
                onRatingChange(0)
              }}
            >
              Clear All
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}