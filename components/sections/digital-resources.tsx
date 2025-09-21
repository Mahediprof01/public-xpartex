import { FileText, Video, ImageIcon, Download, Calculator, Settings, CheckSquare, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { digitalResourcesData } from "@/data/digital-resources"
import Link from "next/link"
import Image from "next/image"

export function DigitalResources() {
  // Use the real resource objects so we can render thumbnails and price/discount
  const resources = digitalResourcesData.slice(0, 6)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Digital Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential tools, templates, and guides to streamline your garment business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource) => {
            const discount = Math.round(((resource.originalPrice - resource.price) / (resource.originalPrice || 1)) * 100)
            return (
              <div key={resource.id}>
                <Link href={`/digital-resources/${resource.id}`}>
                  <div className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                    <div className="relative h-48">
                      <Image src={resource.thumbnail || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />

                      {discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
                          {discount}% OFF
                        </div>
                      )}

                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-white text-gray-700 text-xs rounded-full font-medium">{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                      <p className="text-sky-600 font-medium mb-3">by {resource.author?.name || 'Author'}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{resource.stats?.rating ?? '-'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{resource.stats?.totalDownloads?.toLocaleString() ?? 0}</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500 mb-3">File size: {resource.fileSize}</div>

                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-gray-900">{resource.price === 0 ? 'Free' : `BDT ${resource.price.toLocaleString()}`}</div>
                        <div>
                          <Button className="cursor-pointer gradient-primary gradient-primary-hover text-white">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 bg-transparent" asChild>
            <a href="/digital-resources">
              Explore All Resources
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
