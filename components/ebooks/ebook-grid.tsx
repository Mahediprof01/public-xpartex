"use client"

import { motion } from "framer-motion"
import { Star, Download, BookOpen, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface EbookGridProps {
  searchQuery: string
  selectedCategory: string
  sortBy: string
  viewMode: "grid" | "list"
}

export function EbookGrid({ searchQuery, selectedCategory, sortBy, viewMode }: EbookGridProps) {
  // Mock e-book data
  const mockEbooks = [
    {
      id: "1",
      title: "Complete Guide to Garment Manufacturing",
      subtitle: "From Design to Production - Industry Best Practices",
      author: {
        name: "Industry Experts",
        avatar: "/production-manager-man.jpg"
      },
      cover: "/garment-manufacturing-book-cover.jpg",
      category: "Manufacturing",
      rating: 4.9,
      totalReviews: 1247,
      downloads: 5200,
      pages: 250,
      price: 1500,
      originalPrice: 2000,
      currency: "BDT",
      description: "Comprehensive guide covering all aspects of garment manufacturing from initial design concepts to final production and quality control.",
      isNew: true,
      isBestseller: false
    },
    {
      id: "2", 
      title: "Fashion Trends 2024: Market Analysis",
      subtitle: "Complete Market Research and Trend Forecasting",
      author: {
        name: "Fashion Research Team",
        avatar: "/fashion-designer-woman.jpg"
      },
      cover: "/fashion-trends-book-cover.jpg",
      category: "Trends",
      rating: 4.7,
      totalReviews: 892,
      downloads: 3800,
      pages: 180,
      price: 1200,
      originalPrice: 1500,
      currency: "BDT",
      description: "In-depth analysis of upcoming fashion trends, consumer behavior, and market opportunities for 2024.",
      isNew: false,
      isBestseller: true
    },
    {
      id: "3",
      title: "Sustainable Textile Production",
      subtitle: "Eco-Friendly Manufacturing Practices",
      author: {
        name: "Green Manufacturing Co.",
        avatar: "/textile-engineer-woman.jpg"
      },
      cover: "/sustainable-textile-book-cover.jpg",
      category: "Sustainability", 
      rating: 4.8,
      totalReviews: 654,
      downloads: 2900,
      pages: 320,
      price: 1800,
      originalPrice: 2200,
      currency: "BDT",
      description: "Learn sustainable manufacturing practices, eco-friendly materials, and green production techniques.",
      isNew: false,
      isBestseller: false
    },
    {
      id: "4",
      title: "Export Guidelines for Garment Industry",
      subtitle: "International Trade and Compliance",
      author: {
        name: "Trade Specialists",
        avatar: "/garment-factory-logo.jpg"
      },
      cover: "/export-guidelines-book-cover.jpg",
      category: "Export",
      rating: 4.6,
      totalReviews: 423,
      downloads: 4100,
      pages: 200,
      price: 1000,
      originalPrice: 1300,
      currency: "BDT",
      description: "Complete guide to international trade regulations, export procedures, and compliance requirements.",
      isNew: false,
      isBestseller: true
    }
  ]

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
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

  if (viewMode === "list") {
    return (
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mockEbooks.map((ebook) => (
          <motion.div key={ebook.id} variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={ebook.cover}
                      alt={ebook.title}
                      width={120}
                      height={160}
                      className="rounded-lg object-cover"
                    />
                    {ebook.isNew && (
                      <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                        New
                      </Badge>
                    )}
                    {ebook.isBestseller && (
                      <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">
                        Bestseller
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link href={`/ebooks/${ebook.id}`}>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-sky-600 transition-colors">
                            {ebook.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-2">{ebook.subtitle}</p>
                        <p className="text-sm text-gray-600">by {ebook.author.name}</p>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-2">{ebook.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{ebook.rating}</span>
                        <span className="text-gray-600">({ebook.totalReviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{ebook.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{ebook.pages} pages</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(ebook.price, ebook.currency)}
                        </span>
                        {ebook.originalPrice > ebook.price && (
                          <span className="text-lg text-gray-500 line-through">
                            {formatPrice(ebook.originalPrice, ebook.currency)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button className="bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white">
                          <Download className="w-4 h-4 mr-1" />
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {mockEbooks.map((ebook) => (
        <motion.div
          key={ebook.id}
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
            <div className="relative">
              <Image
                src={ebook.cover}
                alt={ebook.title}
                width={300}
                height={400}
                className="w-full h-64 object-cover"
              />
              
              {ebook.isNew && (
                <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                  New
                </Badge>
              )}
              {ebook.isBestseller && (
                <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                  Bestseller
                </Badge>
              )}
              
              <div className="absolute top-3 left-3">
                <Badge variant="outline" className="bg-white/90 text-gray-700">
                  {ebook.category}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex-1">
                <Link href={`/ebooks/${ebook.id}`}>
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 hover:text-sky-600 transition-colors">
                    {ebook.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-3">by {ebook.author.name}</p>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span>{ebook.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>{ebook.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{ebook.pages}p</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(ebook.price, ebook.currency)}
                    </span>
                    {ebook.originalPrice > ebook.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(ebook.originalPrice, ebook.currency)}
                      </span>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white">
                    <Download className="w-3 h-3 mr-1" />
                    Buy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
