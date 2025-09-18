"use client"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [activeTab, setActiveTab] = useState("reviews")

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      author: "Ahmed Hassan",
      rating: 5,
      date: "2024-12-10",
      title: "Excellent Quality",
      content:
        "Outstanding quality cotton t-shirts. The fabric is soft, durable, and the printing quality is excellent. Delivery was on time and packaging was professional.",
      helpful: 12,
      verified: true,
    },
    {
      id: "2",
      author: "Sarah Khan",
      rating: 4,
      date: "2024-12-08",
      title: "Good value for money",
      content:
        "Good quality products at competitive prices. The supplier was responsive and helpful throughout the process. Minor delay in delivery but overall satisfied.",
      helpful: 8,
      verified: true,
    },
    {
      id: "3",
      author: "Mohammad Ali",
      rating: 5,
      date: "2024-12-05",
      title: "Highly recommended",
      content:
        "This supplier consistently delivers high-quality products. We've been working with them for over a year and they never disappoint. Great for bulk orders.",
      helpful: 15,
      verified: true,
    },
  ]

  const averageRating = 4.7
  const totalReviews = 156

  const ratingDistribution = [
    { stars: 5, count: 98, percentage: 63 },
    { stars: 4, count: 42, percentage: 27 },
    { stars: 3, count: 12, percentage: 8 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="bg-white rounded-2xl p-6 border mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <span className="text-4xl font-bold text-gray-900">{averageRating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-8">{rating.stars}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${rating.percentage}%` }} />
                </div>
                <span className="text-sm text-gray-600 w-8">{rating.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-6 border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{review.author}</span>
                  {review.verified && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-600 mb-4">{review.content}</p>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="h-4 w-4" />
                Helpful ({review.helpful})
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <ThumbsDown className="h-4 w-4" />
                Not helpful
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </section>
  )
}
