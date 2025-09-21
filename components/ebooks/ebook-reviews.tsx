"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Star, 
  ThumbsUp, 
  Filter,
  ChevronDown,
  MoreHorizontal,
  Flag
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Ebook, EbookReview } from "@/types/ebook"
import Image from "next/image"

interface EbookReviewsProps {
  ebook: Ebook
}

export function EbookReviews({ ebook }: EbookReviewsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all')
  const [showAllReviews, setShowAllReviews] = useState(false)

  const { stats, reviews } = ebook
  const totalReviews = stats.totalReviews
  
  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(selectedFilter))

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 5)

  const getRatingPercentage = (rating: number) => {
    return totalReviews > 0 ? (stats.ratingBreakdown[rating as keyof typeof stats.ratingBreakdown] / totalReviews) * 100 : 0
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Reader Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <div className="text-5xl font-bold text-gray-900">{stats.rating}</div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < Math.floor(stats.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">E-book Rating</p>
                </div>
              </div>
              <p className="text-gray-600">{totalReviews.toLocaleString()} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedFilter(rating.toString() as any)}
                    className={`flex items-center gap-2 text-sm hover:text-sky-600 transition-colors ${
                      selectedFilter === rating.toString() ? 'text-sky-600 font-medium' : 'text-gray-600'
                    }`}
                  >
                    <span>{rating}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  </button>
                  
                  <div className="flex-1">
                    <Progress 
                      value={getRatingPercentage(rating)} 
                      className="h-2"
                    />
                  </div>
                  
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {Math.round(getRatingPercentage(rating))}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-between border-t pt-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                >
                  All
                </Button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Button
                    key={rating}
                    variant={selectedFilter === rating.toString() ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter(rating.toString() as any)}
                  >
                    {rating} <Star className="w-3 h-3 ml-1 text-yellow-400 fill-current" />
                  </Button>
                ))}
              </div>
            </div>
            
            <p className="text-sm text-gray-600">
              Showing {displayedReviews.length} of {filteredReviews.length} reviews
            </p>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-100 pb-6 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={review.readerAvatar}
                    alt={review.readerName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{review.readerName}</h4>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{formatDate(review.date)}</span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                    
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                        <Flag className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {filteredReviews.length > displayedReviews.length && (
            <div className="text-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAllReviews(true)}
                className="flex items-center gap-2"
              >
                Show More Reviews
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
