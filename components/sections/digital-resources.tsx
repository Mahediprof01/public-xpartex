import { FileText, Video, ImageIcon, Download, Calculator, Settings, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { digitalResourcesData } from "@/data/digital-resources"

export function DigitalResources() {
  // Transform digitalResourcesData to match the expected format for the home page
  const resources = digitalResourcesData.slice(0, 6).map(resource => {
    const getTypeIcon = (type: string) => {
      switch (type) {
        case "calculator":
          return Calculator
        case "template":
          return FileText
        case "tool":
          return Settings
        case "checklist":
          return CheckSquare
        default:
          return FileText
      }
    }

    return {
      id: resource.id,
      title: resource.title,
      type: resource.type.charAt(0).toUpperCase() + resource.type.slice(1),
      icon: getTypeIcon(resource.type),
      description: resource.description.substring(0, 100) + "...",
      downloads: resource.stats.totalDownloads,
      format: resource.format.join(", "),
      price: resource.price,
    }
  })

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Digital Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential tools, templates, and guides to streamline your garment business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="gradient-primary p-3 rounded-xl">
                  <resource.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <a href={`/digital-resources/${resource.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">{resource.title}</h3>
                    </a>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{resource.type}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{resource.downloads.toLocaleString()}</span>
                    </div>
                    <span>{resource.format}</span>
                  </div>

                  <div className="text-lg font-bold text-gray-900 mb-3">
                    {resource.price === 0 ? "Free" : `৳${resource.price.toLocaleString()}`}
                  </div>

                  <Button size="sm" className="w-full gradient-primary gradient-primary-hover text-white" asChild>
                    <a href={`/digital-resources/${resource.id}`}>
                      <Download className="h-4 w-4 mr-1" />
                      View Details
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
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
