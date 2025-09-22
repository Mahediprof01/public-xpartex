export interface Author {
  id: string
  name: string
  title: string
  avatar: string
  bio: string
  expertise: string[]
  credentials: string[]
  experience: string
  rating: number
  totalReaders: number
  totalBooks: number
  totalReviews: number
  socialLinks: {
    website?: string
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  books: AuthorBook[]
  reviews: AuthorReview[]
  achievements: string[]
  languages: string[]
  responseTime: string
}

export interface AuthorBook {
  id: string
  title: string
  thumbnail: string
  readers: number
  rating: number
  price: number
  currency: string
  category: string
  pages: number
}

export interface AuthorReview {
  id: string
  readerName: string
  readerAvatar: string
  rating: number
  comment: string
  date: string
  bookName: string
  verified: boolean
}

export const authorsData: Author[] = [
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    title: "Manufacturing Expert & Industry Consultant",
    avatar: "/placeholder.svg?height=120&width=120&text=Dr+James",
    bio: "Dr. James Wilson is a renowned manufacturing expert with over 20 years of experience in the garment industry. He has consulted for major brands and manufacturers across Asia and Europe. His expertise in lean manufacturing and quality control has helped numerous companies optimize their production processes.",
    expertise: [
      "Manufacturing Processes",
      "Quality Control",
      "Lean Manufacturing",
      "Supply Chain Management",
      "Production Planning",
      "Industrial Engineering"
    ],
    credentials: [
      "PhD in Industrial Engineering from MIT",
      "Certified Lean Six Sigma Black Belt",
      "Former VP of Operations at Nike (8 years)",
      "Author of 12 books on manufacturing excellence",
      "Keynote speaker at 100+ industry conferences"
    ],
    experience: "20+ years",
    rating: 4.8,
    totalReaders: 45000,
    totalBooks: 12,
    totalReviews: 8934,
    socialLinks: {
      website: "https://jameswilsonmanufacturing.com",
      linkedin: "https://linkedin.com/in/drjameswilson",
      twitter: "https://twitter.com/drjameswilson",
      facebook: "https://facebook.com/drjameswilsonofficial"
    },
    books: [
      {
        id: "1",
        title: "Complete Guide to Garment Manufacturing",
        thumbnail: "/placeholder.svg?height=200&width=150&text=Manufacturing+Guide",
        readers: 15000,
        rating: 4.9,
        price: 2500,
        currency: "BDT",
        category: "Manufacturing",
        pages: 450
      },
      {
        id: "2",
        title: "Quality Control in Textile Production",
        thumbnail: "/placeholder.svg?height=200&width=150&text=Quality+Control",
        readers: 12000,
        rating: 4.7,
        price: 2200,
        currency: "BDT",
        category: "Quality Control",
        pages: 380
      },
      {
        id: "3",
        title: "Lean Manufacturing for Fashion Industry",
        thumbnail: "/placeholder.svg?height=200&width=150&text=Lean+Manufacturing",
        readers: 8500,
        rating: 4.8,
        price: 2800,
        currency: "BDT",
        category: "Manufacturing",
        pages: 520
      }
    ],
    reviews: [
      {
        id: "1",
        readerName: "Maria Garcia",
        readerAvatar: "/placeholder.svg?height=40&width=40&text=MG",
        rating: 5,
        comment: "Dr. Wilson's book completely transformed our manufacturing process. The practical insights and real-world examples made it easy to implement the concepts in our factory.",
        date: "2024-01-20",
        bookName: "Complete Guide to Garment Manufacturing",
        verified: true
      },
      {
        id: "2",
        readerName: "Ahmed Hassan",
        readerAvatar: "/placeholder.svg?height=40&width=40&text=AH",
        rating: 5,
        comment: "Excellent resource for anyone in the textile industry. The quality control frameworks presented here are industry-leading and very practical.",
        date: "2024-01-18",
        bookName: "Quality Control in Textile Production",
        verified: true
      },
      {
        id: "3",
        readerName: "Lisa Thompson",
        readerAvatar: "/placeholder.svg?height=40&width=40&text=LT",
        rating: 4,
        comment: "Great book with actionable strategies. Dr. Wilson's expertise really shows through the detailed case studies and step-by-step processes.",
        date: "2024-01-15",
        bookName: "Lean Manufacturing for Fashion Industry",
        verified: true
      }
    ],
    achievements: [
      "Manufacturing Excellence Award 2023",
      "Industry Innovation Leader 2022",
      "Best Business Author 2021",
      "Consulted for 200+ companies worldwide"
    ],
    languages: ["English", "German", "Mandarin"],
    responseTime: "Usually responds within 4 hours"
  },
  {
    id: "emma-davis",
    name: "Emma Davis",
    title: "Fashion Business Strategist & Author",
    avatar: "/placeholder.svg?height=120&width=120&text=Emma+Davis",
    bio: "Emma Davis is a fashion business strategist with 12 years of experience helping fashion brands scale and succeed. She has worked with startups and established brands to develop winning business strategies. Her books focus on practical business advice for fashion entrepreneurs.",
    expertise: [
      "Fashion Business Strategy",
      "Brand Development",
      "Marketing & Sales",
      "E-commerce",
      "Retail Management",
      "Fashion Entrepreneurship"
    ],
    credentials: [
      "MBA from Harvard Business School",
      "Former Strategy Director at LVMH (6 years)",
      "Founder of successful fashion consultancy",
      "Featured in Vogue Business and WWD",
      "Mentor to 50+ fashion startups"
    ],
    experience: "12+ years",
    rating: 4.7,
    totalReaders: 28000,
    totalBooks: 6,
    totalReviews: 4521,
    socialLinks: {
      website: "https://emmadavisfashion.com",
      linkedin: "https://linkedin.com/in/emmadavisfashion",
      twitter: "https://twitter.com/emmafashionbiz"
    },
    books: [
      {
        id: "4",
        title: "Fashion Business Fundamentals",
        thumbnail: "/placeholder.svg?height=200&width=150&text=Business+Fundamentals",
        readers: 10000,
        rating: 4.8,
        price: 1800,
        currency: "BDT",
        category: "Business",
        pages: 320
      },
      {
        id: "5",
        title: "Building a Fashion Brand",
        thumbnail: "/placeholder.svg?height=200&width=150&text=Brand+Building",
        readers: 8500,
        rating: 4.6,
        price: 2100,
        currency: "BDT",
        category: "Branding",
        pages: 280
      }
    ],
    reviews: [
      {
        id: "4",
        readerName: "Sarah Kim",
        readerAvatar: "/placeholder.svg?height=40&width=40&text=SK",
        rating: 5,
        comment: "Emma's insights helped me launch my fashion brand successfully. The step-by-step approach and real examples made all the difference.",
        date: "2024-01-12",
        bookName: "Fashion Business Fundamentals",
        verified: true
      }
    ],
    achievements: [
      "Fashion Business Mentor of the Year 2022",
      "Top 40 Under 40 Fashion Leaders",
      "Published in major fashion publications"
    ],
    languages: ["English", "French"],
    responseTime: "Usually responds within 6 hours"
  }
]

// Helper functions
export function getAuthorById(id: string): Author | undefined {
  return authorsData.find(author => author.id === id)
}

export function getAllAuthors(): Author[] {
  return authorsData
}
