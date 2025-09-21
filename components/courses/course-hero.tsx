"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Play, 
  Star, 
  Users, 
  Clock, 
  Globe, 
  Award,
  ChevronRight,
  Heart,
  Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Course } from "@/types/course"
import Image from "next/image"

interface CourseHeroProps {
  course: Course
}

export function CourseHero({ course }: CourseHeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [copied, setCopied] = useState(false)

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: course.category, href: `/courses?category=${course.category}` },
    { label: course.title, href: "#", current: true }
  ]

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)

  const formatPrice = (price: number) => {
    if (course.currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-slate-300 mb-6">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
              <a 
                href={item.href}
                className={`hover:text-white transition-colors ${
                  item.current ? 'text-white font-medium' : ''
                }`}
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Course Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Course Title */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="bg-sky-500/20 text-sky-300 border-sky-500/30">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  {course.level}
                </Badge>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3">
                {course.title}
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                {course.subtitle}
              </p>
            </div>

            {/* Course Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(course.stats.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-slate-600'
                      }`} 
                    />
                  ))}
                </div>
                <span className="font-semibold">{course.stats.rating}</span>
                <span className="text-slate-400">
                  ({course.stats.totalReviews.toLocaleString()} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Users className="w-4 h-4" />
                <span>{course.stats.totalStudents.toLocaleString()} students</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4" />
                <span>{course.language}</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="text-sm text-slate-400">Created by</p>
                <p className="font-semibold text-white">{course.instructor.name}</p>
                <p className="text-sm text-slate-300">{course.instructor.title}</p>
              </div>
            </div>

            {/* Course Features */}
            <div className="grid grid-cols-2 gap-4">
              {course.certificate && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="w-4 h-4 text-sky-400" />
                  <span className="text-sm">Certificate included</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-sky-400" />
                <span className="text-sm">{course.lifetimeAccess ? 'Lifetime access' : 'Limited access'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-semibold px-8"
              >
                Enroll Now - {formatPrice(course.price)}
              </Button>
              
              <button
                onClick={() => setWishlisted((s) => !s)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-transform transform
                  ${wishlisted ? 'bg-red-600 text-white shadow-md' : 'bg-transparent text-slate-300 border border-slate-600'}
                  hover:scale-105`}
                aria-pressed={wishlisted}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'text-white' : 'text-slate-300'}`} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>

              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  } catch (e) {
                    // fallback: open native share if available
                    if ((navigator as any).share) {
                      ;(navigator as any).share({ title: course.title, url: window.location.href })
                    }
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-transparent text-slate-300 border border-slate-600 hover:bg-slate-800 hover:scale-105 transition-all"
              >
                <Share2 className="w-4 h-4" />
                {copied ? 'Copied' : 'Share'}
              </button>
            </div>
          </motion.div>

          {/* Right Column - Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
              
              {!isVideoPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={() => setIsVideoPlaying(true)}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 rounded-full w-16 h-16 p-0"
                  >
                    <Play className="w-6 h-6 ml-1" />
                  </Button>
                </div>
              )}
              
              {/* Course Preview Label */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-black/60 text-white border-0">
                  Course Preview
                </Badge>
              </div>
              
              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white border-0 font-bold">
                    {discount}% OFF
                  </Badge>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
