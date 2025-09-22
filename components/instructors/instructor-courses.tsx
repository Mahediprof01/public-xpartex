"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Star, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instructor } from "@/data/instructors"
import Image from "next/image"
import Link from "next/link"

interface InstructorCoursesProps {
  instructor: Instructor
}

export function InstructorCourses({ instructor }: InstructorCoursesProps) {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Courses by {instructor.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {instructor.courses.map((course, index) => (
              <motion.div
                key={course.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Course Image */}
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-blue-600 text-white">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                {/* Course Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-2">
                    {course.title}
                  </h4>

                  {/* Course Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(course.price, course.currency)}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Button size="sm" className="w-full gradient-primary gradient-primary-hover text-white" asChild>
                    <Link href={`/courses/${course.id}`}>
                      View Course
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}

            {/* View All Courses */}
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/courses?instructor=${instructor.id}`}>
                  View All Courses by {instructor.name}
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
