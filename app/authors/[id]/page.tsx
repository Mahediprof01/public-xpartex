import { notFound } from "next/navigation"
import { AuthorHero } from "@/components/authors/author-hero"
import { AuthorAbout } from "@/components/authors/author-about"
import { AuthorBooks } from "@/components/authors/author-books"
import { AuthorStats } from "@/components/authors/author-stats"
import { AuthorReviews } from "@/components/authors/author-reviews"
import { getAuthorById } from "@/data/authors"

interface AuthorPageProps {
  params: {
    id: string
  }
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const { id } = params
  
  // Get author data by ID
  const author = getAuthorById(id)
  
  if (!author) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Author Hero Section */}
      <AuthorHero author={author} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="mb-16">
          <AuthorStats author={author} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Author Content */}
          <div className="lg:col-span-2 space-y-12">
            <AuthorAbout author={author} />
            <AuthorReviews author={author} />
          </div>

          {/* Right Column - Books */}
          <div className="lg:col-span-1">
            <AuthorBooks author={author} />
          </div>
        </div>
      </div>
    </div>
  )
}
