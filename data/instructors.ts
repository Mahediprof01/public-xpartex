export interface Instructor {
  id: string
  name: string
  title: string
  avatar: string
  bio: string
  expertise: string[]
  credentials: string[]
  experience: string
  rating: number
  totalStudents: number
  totalCourses: number
  totalReviews: number
  socialLinks: {
    website?: string
    linkedin?: string
    twitter?: string
    youtube?: string
  }
  courses: InstructorCourse[]
  reviews: InstructorReview[]
  achievements: string[]
  languages: string[]
  responseTime: string
}

export interface InstructorCourse {
  id: string
  title: string
  thumbnail: string
  students: number
  rating: number
  price: number
  currency: string
  level: string
  duration: string
}

export interface InstructorReview {
  id: string
  studentName: string
  studentAvatar: string
  rating: number
  comment: string
  date: string
  courseName: string
  verified: boolean
}

export const instructorsData: Instructor[] = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    title: "Senior Fashion Designer & Industry Expert",
    avatar: "/placeholder.svg?height=120&width=120&text=Sarah+Johnson",
    bio: "With over 15 years of experience in the fashion industry, Sarah has worked with leading brands like Zara, H&M, and Calvin Klein. She specializes in sustainable fashion design and has been teaching fashion design principles for the past 8 years. Her expertise spans from concept development to production management.",
    expertise: [
      "Fashion Design",
      "Pattern Making",
      "Sustainable Fashion",
      "Production Management",
      "Trend Forecasting",
      "Technical Design"
    ],
    credentials: [
      "Master's in Fashion Design from Parsons School of Design",
      "Certified Sustainable Fashion Professional",
      "Former Senior Designer at Calvin Klein (5 years)",
      "Published author of 'Sustainable Fashion Design Principles'",
      "Guest lecturer at Fashion Institute of Technology"
    ],
    experience: "15+ years",
    rating: 4.9,
    totalStudents: 12500,
    totalCourses: 8,
    totalReviews: 2847,
    socialLinks: {
      website: "https://sarahjohnsondesign.com",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahdesigns",
      youtube: "https://youtube.com/sarahfashiondesign"
    },
    courses: [
      {
        id: "1",
        title: "Complete Fashion Design Masterclass",
        thumbnail: "/placeholder.svg?height=200&width=300&text=Fashion+Design",
        students: 4500,
        rating: 4.8,
        price: 15900,
        currency: "BDT",
        level: "Intermediate",
        duration: "12 weeks"
      },
      {
        id: "2",
        title: "Sustainable Fashion Design",
        thumbnail: "/placeholder.svg?height=200&width=300&text=Sustainable+Fashion",
        students: 3200,
        rating: 4.9,
        price: 12900,
        currency: "BDT",
        level: "Advanced",
        duration: "8 weeks"
      },
      {
        id: "3",
        title: "Pattern Making Fundamentals",
        thumbnail: "/placeholder.svg?height=200&width=300&text=Pattern+Making",
        students: 2800,
        rating: 4.7,
        price: 9900,
        currency: "BDT",
        level: "Beginner",
        duration: "6 weeks"
      }
    ],
    reviews: [
      {
        id: "1",
        studentName: "Emily Chen",
        studentAvatar: "/placeholder.svg?height=40&width=40&text=EC",
        rating: 5,
        comment: "Sarah's teaching style is exceptional. She breaks down complex concepts into easy-to-understand steps. The course content is comprehensive and up-to-date with industry standards.",
        date: "2024-01-15",
        courseName: "Complete Fashion Design Masterclass",
        verified: true
      },
      {
        id: "2",
        studentName: "Michael Rodriguez",
        studentAvatar: "/placeholder.svg?height=40&width=40&text=MR",
        rating: 5,
        comment: "Best investment I've made for my career. Sarah's expertise in sustainable fashion opened up new opportunities for me. Highly recommended!",
        date: "2024-01-10",
        courseName: "Sustainable Fashion Design",
        verified: true
      },
      {
        id: "3",
        studentName: "Priya Sharma",
        studentAvatar: "/placeholder.svg?height=40&width=40&text=PS",
        rating: 4,
        comment: "Great course with practical examples. Sarah is very responsive to questions and provides detailed feedback on assignments.",
        date: "2024-01-08",
        courseName: "Pattern Making Fundamentals",
        verified: true
      }
    ],
    achievements: [
      "Fashion Designer of the Year 2022",
      "Sustainable Fashion Innovation Award 2021",
      "Top 10 Fashion Educators 2023",
      "Published 50+ articles on fashion design"
    ],
    languages: ["English", "Spanish", "French"],
    responseTime: "Usually responds within 2 hours"
  }
]

// Helper functions
export function getInstructorById(id: string): Instructor | undefined {
  return instructorsData.find(instructor => instructor.id === id)
}

export function getAllInstructors(): Instructor[] {
  return instructorsData
}
