import Link from "next/link"
import Image from "next/image"

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
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
        <div className="relative h-48">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-sm font-semibold">
            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-sky-100 text-sky-800 px-2 py-1 text-xs font-medium">{course.level}</span>
            <span className="text-gray-500 text-sm">{course.duration}</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>

          <p className="text-sky-600 text-sm mb-3">by {course.instructor}</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium ml-1">{course.rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">{course.students.toLocaleString()} students</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">${course.price}</span>
              <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
            </div>
            <button className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white px-4 py-2 text-sm hover:from-sky-600 hover:to-cyan-500 transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
