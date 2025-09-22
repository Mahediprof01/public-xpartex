"use client"

import { motion } from "framer-motion"
import { Star, Users, BookOpen, Award, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { authorsData } from "@/data/authors"
import Image from "next/image"
import Link from "next/link"

interface AuthorGridProps {
  searchQuery: string
  selectedExpertise: string
  sortBy: string
}

export function AuthorGrid({ searchQuery, selectedExpertise, sortBy }: AuthorGridProps) {
  // Filter and sort authors based on props
  let filteredAuthors = authorsData

  // Filter by search query
  if (searchQuery) {
    filteredAuthors = filteredAuthors.filter(author =>
      author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  // Filter by expertise
  if (selectedExpertise !== "all") {
    filteredAuthors = filteredAuthors.filter(author =>
      author.expertise.some(skill => 
        skill.toLowerCase().replace(/\s+/g, '-').includes(selectedExpertise)
      )
    )
  }

  // Sort authors
  filteredAuthors = [...filteredAuthors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "readers":
        return b.totalReaders - a.totalReaders
      case "books":
        return b.totalBooks - a.totalBooks
      case "experience":
        return parseInt(b.experience) - parseInt(a.experience)
      case "newest":
        return 0 // Would use creation date if available
      default:
        return 0
    }
  })

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredAuthors.map((author) => (
        <motion.div key={author.id} variants={itemVariants}>
          <Card className="h-full hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              {/* Author Image and Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {author.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium mb-3">
                  {author.title}
                </p>
                
                {/* Experience Badge */}
                <Badge variant="outline" className="mb-4">
                  {author.experience} Experience
                </Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">{author.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="font-bold text-gray-900">
                      {author.totalReaders > 1000 ? `${(author.totalReaders / 1000).toFixed(1)}k` : author.totalReaders}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Readers</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-gray-900">{author.totalBooks}</span>
                  </div>
                  <p className="text-xs text-gray-600">Books</p>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-1 justify-center">
                  {author.expertise.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {author.expertise.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{author.expertise.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Bio Preview */}
              <p className="text-sm text-gray-600 mb-6 line-clamp-3 text-center">
                {author.bio}
              </p>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  className="w-full gradient-primary gradient-primary-hover text-white" 
                  asChild
                >
                  <Link href={`/authors/${author.id}`}>
                    View Profile
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      
      {/* No Results */}
      {filteredAuthors.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-400 mb-4">
            <Users className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No authors found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </motion.div>
  )
}
