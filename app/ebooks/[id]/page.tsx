import { notFound } from "next/navigation"
import { EbookHero } from "@/components/ebooks/ebook-hero"
import { EbookOverview } from "@/components/ebooks/ebook-overview"
import { AuthorProfile } from "@/components/ebooks/author-profile"
import { EbookReviews } from "@/components/ebooks/ebook-reviews"
import { EnhancedPurchase } from "@/components/ebooks/enhanced-purchase"
import { Ebook } from "@/types/ebook"

// Mock e-book data
const mockEbook: Ebook = {
  id: "1",
  title: "Complete Guide to Garment Manufacturing",
  subtitle: "From Design to Production - Industry Best Practices",
  description: "Master the complete garment manufacturing process with this comprehensive guide. Learn industry-standard techniques, quality control methods, and production optimization strategies used by leading manufacturers worldwide. This e-book covers everything from initial design concepts to final product delivery.",
  cover: "/placeholder.svg?height=600&width=400&text=Garment+Manufacturing+Guide",
  previewPages: [
    "/placeholder.svg?height=800&width=600&text=Preview+Page+1",
    "/placeholder.svg?height=800&width=600&text=Preview+Page+2"
  ],
  category: "Manufacturing",
  subcategory: "Production Management",
  language: "English",
  pages: 250,
  fileSize: "15.2 MB",
  format: ["PDF", "EPUB", "MOBI"],
  price: 1500,
  originalPrice: 2000,
  currency: "BDT",

  author: {
    id: "author-1",
    name: "Industry Experts",
    title: "Manufacturing Specialists & Industry Consultants",
    bio: "A team of experienced manufacturing professionals with over 50 years of combined experience in the garment industry. Our experts have worked with leading brands and manufacturers across Asia, Europe, and North America, bringing real-world insights and practical knowledge to this comprehensive guide.",
    avatar: "/placeholder.svg?height=120&width=120&text=Industry+Experts",
    rating: 4.9,
    totalBooks: 8,
    totalReaders: 25000,
    expertise: [
      "Garment Manufacturing",
      "Quality Control",
      "Production Planning",
      "Supply Chain Management",
      "Lean Manufacturing"
    ],
    credentials: [
      "Certified Production Manager - Textile Institute",
      "Lean Six Sigma Black Belt",
      "25+ years in garment manufacturing",
      "Consultant for Fortune 500 fashion brands",
      "Published researcher in textile manufacturing"
    ],
    socialLinks: {
      website: "https://industryexperts.com",
      linkedin: "https://linkedin.com/company/industryexperts"
    }
  },

  chapters: [
    {
      id: "chapter-1",
      title: "Introduction to Garment Manufacturing",
      description: "Overview of the garment manufacturing industry, key players, and market trends",
      pages: 25,
      duration: "30 min read",
      isPreview: true
    },
    {
      id: "chapter-2",
      title: "Design and Pattern Development",
      description: "From concept to pattern - the design development process",
      pages: 35,
      duration: "45 min read",
      isPreview: true
    },
    {
      id: "chapter-3",
      title: "Material Selection and Sourcing",
      description: "Choosing the right fabrics, trims, and accessories for your products",
      pages: 30,
      duration: "40 min read",
      isPreview: false
    },
    {
      id: "chapter-4",
      title: "Production Planning and Scheduling",
      description: "Efficient production planning techniques and capacity management",
      pages: 40,
      duration: "50 min read",
      isPreview: false
    },
    {
      id: "chapter-5",
      title: "Quality Control and Assurance",
      description: "Implementing quality systems and inspection procedures",
      pages: 45,
      duration: "55 min read",
      isPreview: false
    },
    {
      id: "chapter-6",
      title: "Cost Management and Optimization",
      description: "Strategies for reducing costs while maintaining quality",
      pages: 35,
      duration: "45 min read",
      isPreview: false
    },
    {
      id: "chapter-7",
      title: "Compliance and Sustainability",
      description: "Meeting international standards and sustainable practices",
      pages: 40,
      duration: "50 min read",
      isPreview: false
    }
  ],

  whatYouWillLearn: [
    "Complete garment manufacturing process from design to delivery",
    "Quality control systems and inspection procedures",
    "Production planning and capacity optimization techniques",
    "Cost management strategies and profit maximization",
    "International compliance requirements and certifications",
    "Sustainable manufacturing practices and eco-friendly processes",
    "Supply chain management and vendor relationships",
    "Technology integration and automation in manufacturing"
  ],

  keyFeatures: [
    "Real-world case studies from leading manufacturers",
    "Step-by-step production workflows and checklists",
    "Quality control templates and inspection forms",
    "Cost calculation spreadsheets and tools",
    "Compliance checklists for major markets",
    "Sustainability assessment frameworks"
  ],

  targetAudience: [
    "Manufacturing managers and production supervisors",
    "Fashion entrepreneurs starting their own brands",
    "Quality control professionals and inspectors",
    "Supply chain managers and procurement specialists",
    "Students studying fashion and textile management",
    "Consultants working with garment manufacturers"
  ],

  stats: {
    totalReaders: 5200,
    rating: 4.9,
    totalReviews: 1247,
    downloads: 5200,
    ratingBreakdown: {
      5: 1023,
      4: 156,
      3: 45,
      2: 15,
      1: 8
    }
  },

  reviews: [
    {
      id: "review-1",
      readerName: "Sarah Manufacturing",
      readerAvatar: "/placeholder.svg?height=48&width=48&text=SM",
      rating: 5,
      comment: "This e-book is incredibly comprehensive and practical. The real-world examples and case studies make it easy to apply the concepts in our manufacturing facility. Highly recommended for anyone in the garment industry.",
      date: "2024-01-15",
      helpful: 34,
      verified: true
    },
    {
      id: "review-2",
      readerName: "Ahmed Production",
      readerAvatar: "/placeholder.svg?height=48&width=48&text=AP",
      rating: 5,
      comment: "Excellent resource for production planning and quality control. The templates and checklists have saved us countless hours and improved our efficiency significantly.",
      date: "2024-01-10",
      helpful: 28,
      verified: true
    }
  ],

  features: [
    "250 pages of comprehensive content",
    "Available in PDF, EPUB, and MOBI formats",
    "Downloadable templates and checklists",
    "Real-world case studies and examples",
    "Quality control inspection forms",
    "Production planning worksheets"
  ],

  downloadFormats: ["PDF", "EPUB", "MOBI"],
  offlineReading: true,
  printingAllowed: true,

  faq: [
    {
      id: "faq-1",
      question: "What formats are available for download?",
      answer: "This e-book is available in PDF, EPUB, and MOBI formats, making it compatible with all major e-readers and devices."
    },
    {
      id: "faq-2",
      question: "Can I print the e-book?",
      answer: "Yes, printing is allowed for personal use. You can print the entire e-book or specific chapters as needed."
    },
    {
      id: "faq-3",
      question: "Are the templates and checklists included?",
      answer: "Yes, all templates, checklists, and worksheets mentioned in the e-book are included as downloadable files."
    }
  ],

  publisher: "Xpartex Publishing",
  publishedDate: "January 2024",
  isbn: "978-1-234567-89-0",
  edition: "1st Edition",

  tags: [
    "garment manufacturing",
    "production management",
    "quality control",
    "textile industry",
    "manufacturing processes",
    "supply chain",
    "cost management",
    "sustainability"
  ],

  createdAt: "2024-01-01",
  updatedAt: "2024-01-15",
  isPublished: true
}

export default async function EbookDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  
  if (!mockEbook) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* E-book Hero Section */}
      <EbookHero ebook={mockEbook} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - E-book Content */}
          <div className="lg:col-span-2 space-y-12">
            <EbookOverview ebook={mockEbook} />
            <AuthorProfile author={mockEbook.author} />
            <EbookReviews ebook={mockEbook} />
          </div>

          {/* Right Column - Purchase Card */}
          <div className="lg:col-span-1">
            <EnhancedPurchase ebook={mockEbook} />
          </div>
        </div>
      </div>
    </div>
  )
}
