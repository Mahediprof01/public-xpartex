import { Clock, Users, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CourseCard from "@/components/courses/course-card"

export function OnlineCourses() {
  const courses = [
    {
      id: "1",
      title: "Fashion Design Fundamentals",
      instructor: "Sarah Ahmed",
      rating: 4.8,
      students: 1250,
      duration: "8 weeks",
      price: 4500,
      image: "/fashion-design-course.jpg",
      level: "Beginner",
    },
    {
      id: "2",
      title: "Textile Production Management",
      instructor: "Mohammad Rahman",
      rating: 4.9,
      students: 890,
      duration: "12 weeks",
      price: 6500,
      image: "/textile-production-course.jpg",
      level: "Intermediate",
    },
    {
      id: "3",
      title: "Quality Control in Garments",
      instructor: "Fatima Khan",
      rating: 4.7,
      students: 650,
      duration: "6 weeks",
      price: 3500,
      image: "/quality-control-course.jpg",
      level: "Advanced",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Online Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enhance your skills with expert-led courses designed for the garment industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course as any} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses">
            <Button variant="outline" className="px-8 py-3 bg-transparent cursor-pointer">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
