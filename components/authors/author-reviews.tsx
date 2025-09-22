"use client"

import { motion } from "framer-motion"
import { Star, ThumbsUp, Flag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Author } from "@/data/authors"
import Image from "next/image"

interface AuthorReviewsProps {
  author: Author
}

export function AuthorReviews({ author }: AuthorReviewsProps) {
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
            Reader Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Rating Summary */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{author.rating}</div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(author.rating) 
                        ? "text-yellow-400 fill-current" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{author.totalReviews.toLocaleString()} total reviews</p>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {author.reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex space-x-4">
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
                          <h4 className="font-medium text-gray-900 flex items-center">
                            {review.readerName}
                            {review.verified && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Verified Purchase
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
                      
                      {/* Book Name */}
                      <div className="mb-3">
                        <Badge variant="outline" className="text-xs">
                          {review.bookName}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful</span>
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
            <div className="text-center pt-6">
              <Button variant="outline">
                Load More Reviews
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
