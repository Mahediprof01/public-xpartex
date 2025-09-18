import { notFound } from "next/navigation"
import CourseHeader from "@/components/courses/course-header"
import CourseContent from "@/components/courses/course-content"
import CourseCurriculum from "@/components/courses/course-curriculum"
import CourseEnrollment from "@/components/courses/course-enrollment"
import RelatedCourses from "@/components/courses/related-courses"

// Mock course data
const mockCourse = {
  id: "1",
  title: "Complete Fashion Design Masterclass",
  instructor: "Sarah Johnson",
  rating: 4.8,
  students: 12547,
  duration: "8 weeks",
  level: "Intermediate",
  price: 199,
  originalPrice: 299,
  description: "Master the art of fashion design from concept to creation...",
  curriculum: [
    { title: "Introduction to Fashion Design", duration: "2 hours", lessons: 8 },
    { title: "Sketching and Illustration", duration: "3 hours", lessons: 12 },
    { title: "Pattern Making Basics", duration: "4 hours", lessons: 15 },
    { title: "Fabric Selection and Properties", duration: "2.5 hours", lessons: 10 },
  ],
}

export default async function CourseDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  
  if (!mockCourse) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CourseHeader course={mockCourse} />
            <CourseContent course={mockCourse} />
            <CourseCurriculum course={mockCourse} />
          </div>

          <div className="space-y-8">
            <CourseEnrollment course={mockCourse} />
            <RelatedCourses />
          </div>
        </div>
      </div>
    </div>
  )
}
