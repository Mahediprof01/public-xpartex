"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Play, 
  Clock, 
  Download, 
  Smartphone, 
  Award, 
  Infinity,
  Shield,
  Gift,
  Heart,
  Share2,
  CreditCard,
  Lock
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Course } from "@/types/course"
import Image from "next/image"

interface EnhancedEnrollmentProps {
  course: Course
}

export function EnhancedEnrollment({ course }: EnhancedEnrollmentProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
  const savings = course.originalPrice - course.price

  const formatPrice = (price: number) => {
    if (course.currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
  }

  const features = [
    {
      icon: <Play className="w-4 h-4" />,
      text: `${course.totalLessons} lessons`
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: course.duration
    },
    {
      icon: <Download className="w-4 h-4" />,
      text: `${course.downloadableResources} downloadable resources`
    },
    {
      icon: <Smartphone className="w-4 h-4" />,
      text: course.mobileAccess ? "Mobile access" : "Desktop only"
    },
    {
      icon: <Infinity className="w-4 h-4" />,
      text: course.lifetimeAccess ? "Lifetime access" : "Limited access"
    },
    {
      icon: <Award className="w-4 h-4" />,
      text: course.certificate ? "Certificate of completion" : "No certificate"
    }
  ]

  return (
    <div className="sticky top-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden shadow-lg">
          {/* Course Preview */}
          <div className="relative aspect-video">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
            
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 rounded-full w-16 h-16 p-0"
              >
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>
            
            {discount > 0 && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-500 text-white border-0 font-bold">
                  {discount}% OFF
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Pricing */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(course.price)}
                </span>
                {course.originalPrice > course.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>

              {savings > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  Save {formatPrice(savings)} today!
                </p>
              )}
            </div>

            {/* Enrollment Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-semibold h-12"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Enroll Now
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "border-red-300 text-red-600" : ""}
                >
                  <Heart className={`w-4 h-4 mr-1 ${isWishlisted ? 'fill-current' : ''}`} />
                  Wishlist
                </Button>
                
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">30-Day Money-Back Guarantee</span>
              </div>
              <p className="text-sm text-green-700">
                Full refund if you're not satisfied
              </p>
            </div>

            <Separator />

            {/* Course Features */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">This course includes:</h4>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="text-sky-500">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Gift Option */}
            <div className="text-center">
              <Button variant="outline" className="w-full">
                <Gift className="w-4 h-4 mr-2" />
                Gift This Course
              </Button>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock className="w-3 h-3" />
              <span>Secure payment with SSL encryption</span>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card className="mt-6">
          <CardHeader>
            <h4 className="font-semibold text-gray-900">Training 5 or more people?</h4>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Get your team access to thousands of courses, learning paths, and hands-on practice.
            </p>
            <Button variant="outline" className="w-full">
              Try Xpartex for Business
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
