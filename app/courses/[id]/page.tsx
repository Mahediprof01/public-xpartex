import { notFound } from "next/navigation"
import { CourseHero } from "@/components/courses/course-hero"
import { CourseOverview } from "@/components/courses/course-overview"
import { EnhancedCurriculum } from "@/components/courses/enhanced-curriculum"
import { InstructorProfile } from "@/components/courses/instructor-profile"
import { CourseReviews } from "@/components/courses/course-reviews"
import { EnhancedEnrollment } from "@/components/courses/enhanced-enrollment"
import { CourseFAQSection } from "@/components/courses/course-faq"
import RelatedCourses from "@/components/courses/related-courses"
import { Course } from "@/types/course"

// Mock course data
const mockCourse: Course = {
  id: "1",
  title: "Complete Fashion Design Masterclass",
  subtitle: "From Concept to Creation - Master Professional Fashion Design",
  description: "Master the art of fashion design from concept to creation. This comprehensive course covers everything from sketching and illustration to pattern making and garment construction. Learn industry-standard techniques used by professional designers worldwide.",
  thumbnail: "/placeholder.svg?height=400&width=600&text=Fashion+Design+Course",
  previewVideo: "/course-preview.mp4",
  category: "Fashion Design",
  subcategory: "Design Fundamentals",
  level: "Intermediate",
  language: "English",
  duration: "12 weeks",
  totalLessons: 45,
  price: 15900,
  originalPrice: 23900,
  currency: "BDT",

  instructor: {
    id: "instructor-1",
    name: "Sarah Johnson",
    title: "Senior Fashion Designer & Industry Expert",
    bio: "Sarah Johnson is a renowned fashion designer with over 15 years of experience in the industry. She has worked with top fashion houses including Versace, Prada, and Calvin Klein. Sarah holds a Master's degree in Fashion Design from Parsons School of Design and has been teaching fashion design for the past 8 years.",
    avatar: "/placeholder.svg?height=120&width=120&text=Sarah+Johnson",
    rating: 4.9,
    totalStudents: 45000,
    totalCourses: 12,
    experience: "15+ years in fashion design industry, worked with major fashion houses, published author of 'Modern Fashion Design Principles'",
    credentials: [
      "Master's in Fashion Design - Parsons School of Design",
      "Former Senior Designer at Versace (2015-2020)",
      "Published Author - 'Modern Fashion Design Principles'",
      "Winner of Fashion Designer of the Year Award 2019",
      "Certified Fashion Design Instructor"
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      website: "https://sarahjohnsondesign.com"
    }
  },

  modules: [
    {
      id: "module-1",
      title: "Introduction to Fashion Design",
      description: "Get started with the fundamentals of fashion design and industry overview",
      duration: "2 hours",
      lessons: [
        {
          id: "lesson-1-1",
          title: "Welcome to Fashion Design",
          duration: "15 min",
          type: "video",
          isPreview: true,
          description: "Course introduction and what you'll learn"
        },
        {
          id: "lesson-1-2",
          title: "Fashion Industry Overview",
          duration: "25 min",
          type: "video",
          isPreview: false,
          description: "Understanding the modern fashion industry"
        },
        {
          id: "lesson-1-3",
          title: "Design Process Fundamentals",
          duration: "30 min",
          type: "video",
          isPreview: true,
          description: "Step-by-step design process overview"
        }
      ]
    }
  ],

  whatYouWillLearn: [
    "Master professional fashion sketching and illustration techniques",
    "Create detailed technical drawings and specifications",
    "Understand fabric properties and selection criteria",
    "Develop pattern making skills from basic to advanced",
    "Learn garment construction and finishing techniques",
    "Build a professional fashion design portfolio"
  ],

  requirements: [
    "Basic drawing skills (helpful but not required)",
    "Access to sketching materials (pencils, paper, markers)",
    "Computer with internet connection for digital lessons",
    "Enthusiasm to learn and practice fashion design"
  ],

  targetAudience: [
    "Aspiring fashion designers looking to start their career",
    "Fashion students wanting to supplement their education",
    "Creative professionals seeking to transition into fashion",
    "Entrepreneurs planning to start a fashion business",
    "Anyone passionate about fashion and design"
  ],

  stats: {
    totalStudents: 12547,
    rating: 4.8,
    totalReviews: 2847,
    ratingBreakdown: {
      5: 1823,
      4: 712,
      3: 234,
      2: 56,
      1: 22
    }
  },

  reviews: [
    {
      id: "review-1",
      studentName: "Emily Chen",
      studentAvatar: "/placeholder.svg?height=48&width=48&text=EC",
      rating: 5,
      comment: "This course exceeded my expectations! Sarah's teaching style is clear and engaging. The practical exercises really helped me understand the concepts.",
      date: "2024-01-15",
      helpful: 24,
      verified: true
    }
  ],

  features: [
    "45 comprehensive video lessons",
    "Downloadable design templates and worksheets",
    "Access to exclusive design software tutorials",
    "Private student community forum",
    "Direct instructor feedback on assignments",
    "Industry guest speaker sessions"
  ],

  certificate: true,
  lifetimeAccess: true,
  mobileAccess: true,
  downloadableResources: 25,

  faq: [
    {
      id: "faq-1",
      question: "Do I need prior experience in fashion design?",
      answer: "No prior experience is required. This course is designed to take you from beginner to intermediate level, covering all the fundamentals you need to get started."
    },
    {
      id: "faq-2",
      question: "What materials do I need for this course?",
      answer: "You'll need basic sketching materials like pencils, paper, and markers. A complete list of recommended supplies is provided in the first lesson."
    }
  ],

  createdAt: "2024-01-01",
  updatedAt: "2024-01-15",
  isPublished: true,
  tags: ["fashion", "design", "sketching", "pattern-making", "garments"]
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
    <div className="min-h-screen bg-white">
      {/* Course Hero Section */}
      <CourseHero course={mockCourse} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-12">
            <CourseOverview course={mockCourse} />
            <EnhancedCurriculum course={mockCourse} />
            <InstructorProfile instructor={mockCourse.instructor} />
            <CourseReviews course={mockCourse} />
            <CourseFAQSection course={mockCourse} />
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="lg:col-span-1">
            <EnhancedEnrollment course={mockCourse} />
          </div>
        </div>

        {/* Related Courses Section */}
        <div className="mt-16">
          <RelatedCourses />
        </div>
      </div>
    </div>
  )
}
