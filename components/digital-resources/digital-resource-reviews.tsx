"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, Flag, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DigitalResource } from "@/types/digital-resource"
import Image from "next/image"

interface DigitalResourceReviewsProps {
  resource: DigitalResource
}

export function DigitalResourceReviews({ resource }: DigitalResourceReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const { stats, reviews } = resource

  // Calculate rating percentages
  const totalReviews = stats.totalReviews
  const ratingPercentages = {
    5: (stats.ratingBreakdown[5] / totalReviews) * 100,
    4: (stats.ratingBreakdown[4] / totalReviews) * 100,
    3: (stats.ratingBreakdown[3] / totalReviews) * 100,
    2: (stats.ratingBreakdown[2] / totalReviews) * 100,
    1: (stats.ratingBreakdown[1] / totalReviews) * 100,
  }

  const filteredReviews = selectedRating 
    ? reviews.filter(review => review.rating === selectedRating)
    : reviews

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
            Reviews & Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Rating */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Rating Summary */}
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stats.rating}</div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(stats.rating) 
                          ? "text-yellow-400 fill-current" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{totalReviews} total reviews</p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                      className={`flex items-center space-x-1 text-sm hover:text-blue-600 transition-colors ${
                        selectedRating === rating ? "text-blue-600 font-medium" : "text-gray-600"
                      }`}
                    >
                      <span>{rating}</span>
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    </button>
                    <div className="flex-1">
                      <Progress 
                        value={ratingPercentages[rating as keyof typeof ratingPercentages]} 
                        className="h-2"
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {stats.ratingBreakdown[rating as keyof typeof stats.ratingBreakdown]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center justify-between border-t pt-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
                <div className="flex space-x-2">
                  <Button
                    variant={selectedRating === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRating(null)}
                  >
                    All
                  </Button>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Button
                      key={rating}
                      variant={selectedRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRating(rating)}
                    >
                      {rating} ★
                    </Button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Showing {filteredReviews.length} of {totalReviews} reviews
              </p>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex space-x-4">
                    <Image
                      src={review.userAvatar}
                      alt={review.userName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 flex items-center">
                            {review.userName}
                            {review.verified && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Verified Download
                              </Badge>
                            )}
                          </h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? "text-yellow-400 fill-current" 
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                          <Flag className="w-4 h-4" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More Reviews */}
            {filteredReviews.length < totalReviews && (
              <div className="text-center pt-6">
                <Button variant="outline">
                  Load More Reviews
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
