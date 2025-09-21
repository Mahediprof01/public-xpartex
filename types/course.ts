export interface CourseLesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'article' | 'quiz' | 'assignment'
  isPreview: boolean
  isCompleted?: boolean
  videoUrl?: string
  description?: string
}

export interface CourseModule {
  id: string
  title: string
  description: string
  duration: string
  lessons: CourseLesson[]
  isExpanded?: boolean
}

export interface CourseInstructor {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  rating: number
  totalStudents: number
  totalCourses: number
  experience: string
  credentials: string[]
  socialLinks: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export interface CourseReview {
  id: string
  studentName: string
  studentAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
  verified: boolean
}

export interface CourseStats {
  totalStudents: number
  rating: number
  totalReviews: number
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export interface CourseFAQ {
  id: string
  question: string
  answer: string
}

export interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  thumbnail: string
  previewVideo?: string
  instructor: CourseInstructor
  category: string
  subcategory: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  language: string
  duration: string
  totalLessons: number
  price: number
  originalPrice: number
  currency: string
  
  // Course content
  modules: CourseModule[]
  
  // Learning outcomes
  whatYouWillLearn: string[]
  requirements: string[]
  targetAudience: string[]
  
  // Stats and reviews
  stats: CourseStats
  reviews: CourseReview[]
  
  // Additional info
  features: string[]
  certificate: boolean
  lifetimeAccess: boolean
  mobileAccess: boolean
  downloadableResources: number
  
  // FAQ
  faq: CourseFAQ[]
  
  // Metadata
  createdAt: string
  updatedAt: string
  isPublished: boolean
  tags: string[]
}
