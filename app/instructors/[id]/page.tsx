import { notFound } from "next/navigation"
import { InstructorHero } from "@/components/instructors/instructor-hero"
import { InstructorAbout } from "@/components/instructors/instructor-about"
import { InstructorCourses } from "@/components/instructors/instructor-courses"
import { InstructorStats } from "@/components/instructors/instructor-stats"
import { InstructorReviews } from "@/components/instructors/instructor-reviews"
import { getInstructorById } from "@/data/instructors"

interface InstructorPageProps {
  params: {
    id: string
  }
}

export default function InstructorPage({ params }: InstructorPageProps) {
  const { id } = params
  
  // Get instructor data by ID
  const instructor = getInstructorById(id)
  
  if (!instructor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Instructor Hero Section */}
      <InstructorHero instructor={instructor} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="mb-16">
          <InstructorStats instructor={instructor} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Instructor Content */}
          <div className="lg:col-span-2 space-y-12">
            <InstructorAbout instructor={instructor} />
            <InstructorReviews instructor={instructor} />
          </div>

          {/* Right Column - Courses */}
          <div className="lg:col-span-1">
            <InstructorCourses instructor={instructor} />
          </div>
        </div>
      </div>
    </div>
  )
}
