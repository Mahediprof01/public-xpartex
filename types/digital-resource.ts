export interface DigitalResourceAuthor {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  rating: number
  totalResources: number
  totalDownloads: number
  expertise: string[]
  credentials: string[]
  socialLinks: {
    website?: string
    linkedin?: string
    twitter?: string
  }
}

export interface DigitalResourceCategory {
  id: string
  name: string
  description: string
  icon: string
}

export interface DigitalResourceFeature {
  id: string
  title: string
  description: string
  icon: string
}

export interface DigitalResourceReview {
  id: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: string
  helpful: number
  verified: boolean
}

export interface DigitalResourceStats {
  totalDownloads: number
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

export interface DigitalResourceFAQ {
  id: string
  question: string
  answer: string
}

export interface DigitalResource {
  id: string
  title: string
  subtitle: string
  description: string
  thumbnail: string
  previewImages: string[]
  category: string
  subcategory: string
  type: "template" | "tool" | "guide" | "software" | "checklist" | "calculator"
  format: string[]
  fileSize: string
  price: number
  originalPrice: number
  currency: string
  
  author: DigitalResourceAuthor
  
  whatYouWillGet: string[]
  keyFeatures: string[]
  requirements: string[]
  targetAudience: string[]
  
  stats: DigitalResourceStats
  reviews: DigitalResourceReview[]
  
  features: string[]
  downloadFormats: string[]
  offlineAccess: boolean
  commercialUse: boolean
  
  faq: DigitalResourceFAQ[]
  
  publisher: string
  publishedDate: string
  version: string
  lastUpdated: string
  
  tags: string[]
  createdAt: string
  updatedAt: string
  isPublished: boolean
  isFeatured: boolean
  isNew: boolean
  isBestseller: boolean
}
