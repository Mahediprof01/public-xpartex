"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Filter,
  Search,
  Edit,
  Trash2,
  Flag,
  Calendar,
  User,
  BookOpen
} from "lucide-react"

export default function CourseReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRating, setSelectedRating] = useState("all")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 0, title: "", content: "" })

  const myReviews = [
    {
      id: 1,
      courseTitle: "Advanced React Development",
      instructor: "Sarah Johnson",
      rating: 5,
      title: "Excellent course with practical examples",
      content: "This course exceeded my expectations. The instructor explains complex concepts clearly and provides real-world examples. The projects were challenging but very rewarding.",
      date: "2025-01-15",
      likes: 12,
      dislikes: 0,
      replies: 3,
      helpful: true,
      verified: true
    },
    {
      id: 2,
      courseTitle: "JavaScript Fundamentals",
      instructor: "Mike Chen",
      rating: 4,
      title: "Good foundation course",
      content: "Great for beginners. Covers all the essential topics. Could use more advanced examples in the later sections.",
      date: "2024-12-20",
      likes: 8,
      dislikes: 1,
      replies: 1,
      helpful: false,
      verified: true
    }
  ]

  const allReviews = [
    {
      id: 3,
      courseTitle: "Advanced React Development",
      instructor: "Sarah Johnson",
      studentName: "Alex Chen",
      studentAvatar: "/avatars/alex.jpg",
      rating: 5,
      title: "Outstanding course!",
      content: "The best React course I've taken. Sarah's teaching style is engaging and the content is up-to-date with the latest React features.",
      date: "2025-01-10",
      likes: 25,
      dislikes: 2,
      replies: 7,
      helpful: true,
      verified: true
    },
    {
      id: 4,
      courseTitle: "Advanced React Development",
      instructor: "Sarah Johnson",
      studentName: "Maria Garcia",
      studentAvatar: "/avatars/maria.jpg",
      rating: 4,
      title: "Very comprehensive",
      content: "Covers a lot of ground. Some sections could be more detailed, but overall a solid course for intermediate developers.",
      date: "2025-01-08",
      likes: 15,
      dislikes: 3,
      replies: 2,
      helpful: false,
      verified: true
    },
    {
      id: 5,
      courseTitle: "JavaScript Fundamentals",
      instructor: "Mike Chen",
      studentName: "John Smith",
      studentAvatar: "/avatars/john.jpg",
      rating: 5,
      title: "Perfect for beginners",
      content: "Started with zero JavaScript knowledge and now I feel confident building web applications. Highly recommended!",
      date: "2024-12-25",
      likes: 20,
      dislikes: 0,
      replies: 5,
      helpful: true,
      verified: true
    }
  ]

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const filteredReviews = allReviews.filter(review => {
    const matchesSearch = review.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRating = selectedRating === "all" || review.rating.toString() === selectedRating
    
    return matchesSearch && matchesRating
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Course Reviews</h1>
        <p className="text-orange-100">Share your experience and read what others say</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-yellow-600">My Reviews</p>
                <p className="text-xl font-bold text-yellow-900">{myReviews.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <ThumbsUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Helpful Votes</p>
                <p className="text-xl font-bold text-green-900">20</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Replies</p>
                <p className="text-xl font-bold text-blue-900">4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Avg Rating</p>
                <p className="text-xl font-bold text-purple-900">4.5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Reviews Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              My Reviews
            </CardTitle>
            <Button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Write Review
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Review Form */}
          {showReviewForm && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Review Title</label>
                  <Input
                    placeholder="Summarize your experience..."
                    value={newReview.title}
                    onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Review Content</label>
                  <Textarea
                    placeholder="Share your detailed thoughts about the course..."
                    rows={4}
                    value={newReview.content}
                    onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Submit Review
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* My Reviews List */}
          {myReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{review.courseTitle}</h3>
                    <p className="text-sm text-gray-600">by {review.instructor}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-600">{review.date}</span>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs">Verified</Badge>
                  )}
                </div>
                
                <h4 className="font-medium mb-2">{review.title}</h4>
                <p className="text-gray-700 mb-3">{review.content}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {review.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4" />
                    {review.dislikes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {review.replies} replies
                  </div>
                  {review.helpful && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Marked as Helpful
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* All Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            All Reviews
          </CardTitle>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "5", "4", "3", "2", "1"].map((rating) => (
                <Button
                  key={rating}
                  variant={selectedRating === rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRating(rating)}
                  className="flex items-center gap-1"
                >
                  {rating === "all" ? (
                    "All"
                  ) : (
                    <>
                      {rating} <Star className="h-3 w-3" />
                    </>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.studentAvatar} />
                    <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{review.studentName}</h4>
                        <p className="text-sm text-gray-600">{review.courseTitle}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-600">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600">{review.date}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    
                    <h5 className="font-medium mb-2">{review.title}</h5>
                    <p className="text-gray-700 mb-3">{review.content}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:text-green-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {review.likes}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:text-red-600">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        {review.dislikes}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-600 hover:text-blue-600">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Reply ({review.replies})
                      </Button>
                      {review.helpful && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Helpful
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
