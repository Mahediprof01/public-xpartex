import { Suspense } from "react"
import JobFilters from "@/components/jobs/job-filters"
import JobGrid from "@/components/jobs/job-grid"
import JobStats from "@/components/jobs/job-stats"

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Job in Garments Industry</h1>
            <p className="text-xl mb-8">Connect with top employers and advance your career</p>
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="flex-1 px-4 py-3 text-gray-900 border-0 focus:ring-2 focus:ring-white/20"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-48 px-4 py-3 text-gray-900 border-0 focus:ring-2 focus:ring-white/20"
                />
                <button className="px-8 py-3 bg-white text-sky-600 font-semibold hover:bg-gray-100 transition-colors">
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <JobStats />

        <div className="flex gap-8 mt-8">
          <aside className="w-80 flex-shrink-0">
            <JobFilters />
          </aside>

          <main className="flex-1">
            <Suspense fallback={<div>Loading jobs...</div>}>
              <JobGrid />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
