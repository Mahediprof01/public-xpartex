import { Suspense } from "react"
import CourseFilters from "@/components/courses/course-filters"
import CourseGrid from "@/components/courses/course-grid"
import CourseStats from "@/components/courses/course-stats"
import { CourseHero } from "@/components/ui/course-hero"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Modern Hero Section */}
      <CourseHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="mb-16">
          <CourseStats />
        </div>

        {/* Courses Section */}
        <div className="flex gap-8">
          <aside className="w-80 flex-shrink-0">
            <CourseFilters />
          </aside>

          <main className="flex-1">
            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading courses...</span>
              </div>
            }>
              <CourseGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
