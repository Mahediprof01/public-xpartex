import Link from "next/link"
import Image from "next/image"
import { Clock, Users, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Course {
  id: string
  title: string
  instructor: string
  rating: number
  students: number
  duration: string
  level: string
  price: number
  originalPrice: number
  image: string
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
        <div className="relative h-48">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />

          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button size="sm" className="cursor-pointer gradient-primary gradient-primary-hover text-white">
              <Play className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>

          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full font-medium">{course.level}</span>
          </div>

          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
              {discount}% OFF
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-sky-600 font-medium mb-3">by {course.instructor}</p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">BDT {course.price.toLocaleString()}</div>
            <Button className="cursor-pointer gradient-primary gradient-primary-hover text-white">Enroll Now</Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
