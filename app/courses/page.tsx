import { Suspense } from "react"
import CourseFilters from "@/components/courses/course-filters"
import CourseGrid from "@/components/courses/course-grid"
import CourseStats from "@/components/courses/course-stats"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Master Garments Industry Skills</h1>
            <p className="text-xl mb-8">Learn from industry experts and advance your career</p>
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search courses, skills, or topics"
                  className="flex-1 px-4 py-3 text-gray-900 border-0 focus:ring-2 focus:ring-white/20"
                />
                <select className="w-48 px-4 py-3 text-gray-900 border-0 focus:ring-2 focus:ring-white/20">
                  <option>All Categories</option>
                  <option>Fashion Design</option>
                  <option>Production</option>
                  <option>Business</option>
                </select>
                <button className="px-8 py-3 bg-white text-sky-600 font-semibold hover:bg-gray-100 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CourseStats />

        <div className="flex gap-8 mt-8">
          <aside className="w-80 flex-shrink-0">
            <CourseFilters />
          </aside>

          <main className="flex-1">
            <Suspense fallback={<div>Loading courses...</div>}>
              <CourseGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
