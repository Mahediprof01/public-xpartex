import { notFound } from "next/navigation"
import { DigitalResourceHero } from "@/components/digital-resources/digital-resource-hero"
import { DigitalResourceOverview } from "@/components/digital-resources/digital-resource-overview"
import { DigitalResourceAuthorProfile } from "@/components/digital-resources/digital-resource-author-profile"
import { DigitalResourceReviews } from "@/components/digital-resources/digital-resource-reviews"
import { DigitalResourcePurchase } from "@/components/digital-resources/digital-resource-purchase"
import { getDigitalResourceById } from "@/data/digital-resources"

export default async function DigitalResourceDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  
  // Get digital resource data by ID
  const resource = getDigitalResourceById(id)
  
  if (!resource) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Digital Resource Hero Section */}
      <DigitalResourceHero resource={resource} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Resource Content */}
          <div className="lg:col-span-2 space-y-12">
            <DigitalResourceOverview resource={resource} />
            <DigitalResourceAuthorProfile author={resource.author} />
            <DigitalResourceReviews resource={resource} />
          </div>

          {/* Right Column - Purchase Card */}
          <div className="lg:col-span-1">
            <DigitalResourcePurchase resource={resource} />
          </div>
        </div>
      </div>
    </div>
  )
}
