export interface EbookChapter {
  id: string
  title: string
  description: string
  pages: number
  duration?: string // estimated reading time
  isPreview: boolean
}

export interface EbookAuthor {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  rating: number
  totalBooks: number
  totalReaders: number
  expertise: string[]
  credentials: string[]
  socialLinks: {
    website?: string
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  otherBooks?: string[] // IDs of other books
}

export interface EbookReview {
  id: string
  readerName: string
  readerAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
  verified: boolean
}

export interface EbookStats {
  totalReaders: number
  rating: number
  totalReviews: number
  downloads: number
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export interface EbookFAQ {
  id: string
  question: string
  answer: string
}

export interface Ebook {
  id: string
  title: string
  subtitle: string
  description: string
  cover: string
  previewPages?: string[] // URLs to preview page images
  author: EbookAuthor
  category: string
  subcategory: string
  language: string
  pages: number
  fileSize: string // e.g., "15.2 MB"
  format: string[] // e.g., ["PDF", "EPUB", "MOBI"]
  price: number
  originalPrice: number
  currency: string
  
  // Content structure
  chapters: EbookChapter[]
  
  // Learning outcomes
  whatYouWillLearn: string[]
  keyFeatures: string[]
  targetAudience: string[]
  
  // Stats and reviews
  stats: EbookStats
  reviews: EbookReview[]
  
  // Additional info
  features: string[]
  downloadFormats: string[]
  offlineReading: boolean
  printingAllowed: boolean
  
  // FAQ
  faq: EbookFAQ[]
  
  // Publishing info
  publisher: string
  publishedDate: string
  isbn?: string
  edition: string
  
  // Metadata
  tags: string[]
  createdAt: string
  updatedAt: string
  isPublished: boolean
}
