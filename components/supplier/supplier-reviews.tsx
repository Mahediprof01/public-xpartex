import { Star, ThumbsUp } from "lucide-react"

interface SupplierReviewsProps {
  supplierId: string
}

export function SupplierReviews({ supplierId }: SupplierReviewsProps) {
  // Mock reviews data
  const reviews = [
    {
      id: "1",
      author: "Ahmed Hassan",
      company: "Fashion Forward Ltd.",
      rating: 5,
      date: "2024-12-10",
      title: "Excellent Partnership",
      content:
        "We've been working with Dhaka Textiles for over 2 years. Their quality is consistently excellent and delivery times are reliable. Highly recommended for bulk orders.",
      helpful: 15,
      verified: true,
    },
    {
      id: "2",
      author: "Sarah Johnson",
      company: "Global Apparel Inc.",
      rating: 4,
      date: "2024-12-05",
      title: "Good Quality Products",
      content:
        "Quality products at competitive prices. Communication is good and they're responsive to our requirements. Minor delays sometimes but overall satisfied.",
      helpful: 8,
      verified: true,
    },
    {
      id: "3",
      author: "Mohammad Ali",
      company: "Textile Traders",
      rating: 5,
      date: "2024-11-28",
      title: "Professional Service",
      content:
        "Professional team with great attention to detail. They understand our specifications well and deliver exactly what we need. Great for custom orders.",
      helpful: 12,
      verified: true,
    },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{review.author}</span>
                  <span className="text-sm text-gray-500">from {review.company}</span>
                  {review.verified && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Verified</span>
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
            <p className="text-gray-600 mb-3">{review.content}</p>

            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <ThumbsUp className="h-4 w-4" />
              Helpful ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
