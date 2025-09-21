"use client"

import { motion } from "framer-motion"
import { Star, Download, Eye, Heart, Calculator, FileText, Settings, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { digitalResourcesData } from "@/data/digital-resources"
import Image from "next/image"
import Link from "next/link"

interface DigitalResourceGridProps {
  searchQuery: string
  selectedCategory: string
  sortBy: string
  viewMode: "grid" | "list"
}

export function DigitalResourceGrid({ searchQuery, selectedCategory, sortBy, viewMode }: DigitalResourceGridProps) {
  // Transform digitalResourcesData to match the expected format
  const transformedResources = digitalResourcesData.map(resource => ({
    id: resource.id,
    title: resource.title,
    subtitle: resource.subtitle,
    author: {
      name: resource.author.name,
      avatar: resource.author.avatar
    },
    thumbnail: resource.thumbnail,
    category: resource.category,
    type: resource.type,
    rating: resource.stats.rating,
    totalReviews: resource.stats.totalReviews,
    downloads: resource.stats.totalDownloads,
    fileSize: resource.fileSize,
    price: resource.price,
    originalPrice: resource.originalPrice,
    currency: resource.currency,
    description: resource.description,
    isNew: resource.isNew,
    isBestseller: resource.isBestseller,
    isFeatured: resource.isFeatured
  }))

  // Filter resources based on search query and category
  let filteredResources = transformedResources.filter(resource => {
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || 
      resource.category.toLowerCase() === selectedCategory.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  // Sort resources based on sortBy
  filteredResources = filteredResources.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.id).getTime() - new Date(a.id).getTime() // Assuming higher ID means newer
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "popular":
      default:
        return b.downloads - a.downloads
    }
  })

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "calculator":
        return Calculator
      case "template":
        return FileText
      case "tool":
        return Settings
      case "checklist":
        return CheckSquare
      default:
        return FileText
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  if (viewMode === "grid") {
    return (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type)
          const discount = Math.round(((resource.originalPrice - resource.price) / resource.originalPrice) * 100)
          return (
            <motion.div key={resource.id} variants={itemVariants}>
              <Link href={`/digital-resources/${resource.id}`}>
                <div className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                  <div className="relative h-48">
                    <Image src={resource.thumbnail || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />

                    {/* Type / Level badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full font-medium">
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                    </div>

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
                        {discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-sky-600 font-medium mb-3">by {resource.author.name}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{resource.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 mb-3">File size: {resource.fileSize}</div>

                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-gray-900">{formatPrice(resource.price, resource.currency)}</div>
                      <div>
                        <Button className="cursor-pointer gradient-primary gradient-primary-hover text-white">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  // List View
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredResources.map((resource) => {
        const TypeIcon = getTypeIcon(resource.type)
        return (
          <motion.div
            key={resource.id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex gap-6">
                {/* Resource Image */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={resource.thumbnail}
                    alt={resource.title}
                    width={200}
                    height={120}
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                  
                  {/* Type Icon */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                      <TypeIcon className="w-3 h-3 text-gray-700" />
                    </div>
                  </div>
                </div>

                {/* Resource Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {resource.category}
                        </Badge>
                        {resource.isNew && (
                          <Badge className="bg-green-500 text-white text-xs">New</Badge>
                        )}
                        {resource.isBestseller && (
                          <Badge className="bg-orange-500 text-white text-xs">Bestseller</Badge>
                        )}
                      </div>
                      
                      <Link href={`/digital-resources/${resource.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                          {resource.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-2">by {resource.author.name}</p>
                      <p className="text-gray-600 line-clamp-2 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{resource.rating}</span>
                          <span className="ml-1">({resource.totalReviews} reviews)</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          <span>{resource.downloads.toLocaleString()} downloads</span>
                        </div>
                        <span>Size: {resource.fileSize}</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="text-right ml-4">
                      <div className="mb-3">
                        <div className="text-xl font-bold text-gray-900">
                          {formatPrice(resource.price, resource.currency)}
                        </div>
                        {resource.originalPrice > resource.price && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(resource.originalPrice, resource.currency)}
                          </div>
                        )}
                      </div>
                      <Button className="gradient-primary gradient-primary-hover text-white" asChild>
                        <Link href={`/digital-resources/${resource.id}`}>
                          <Download className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
