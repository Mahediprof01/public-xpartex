import { FileText, Video, ImageIcon, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DigitalResources() {
  const resources = [
    {
      id: "1",
      title: "Size Chart Templates",
      type: "Template",
      icon: FileText,
      description: "Standard size charts for different garment categories",
      downloads: 2500,
      format: "PDF, Excel",
      price: 0,
    },
    {
      id: "2",
      title: "Quality Control Checklist",
      type: "Checklist",
      icon: FileText,
      description: "Comprehensive QC checklist for garment inspection",
      downloads: 1800,
      format: "PDF",
      price: 500,
    },
    {
      id: "3",
      title: "Production Planning Videos",
      type: "Video Course",
      icon: Video,
      description: "Step-by-step production planning tutorials",
      downloads: 950,
      format: "MP4",
      price: 2500,
    },
    {
      id: "4",
      title: "Fashion Design Mockups",
      type: "Design Assets",
      icon: ImageIcon,
      description: "Professional mockup templates for presentations",
      downloads: 3200,
      format: "PSD, AI",
      price: 1500,
    },
    {
      id: "5",
      title: "Fabric Care Instructions",
      type: "Guide",
      icon: FileText,
      description: "Complete guide for fabric care and maintenance",
      downloads: 1200,
      format: "PDF",
      price: 0,
    },
    {
      id: "6",
      title: "Costing Calculator Tool",
      type: "Tool",
      icon: FileText,
      description: "Excel-based tool for accurate garment costing",
      downloads: 2100,
      format: "Excel",
      price: 1000,
    },
  ]

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
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
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

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">
                      {resource.price === 0 ? "Free" : `BDT ${resource.price.toLocaleString()}`}
                    </div>
                    <Button size="sm" className="gradient-primary gradient-primary-hover text-white">
                      <Download className="h-4 w-4 mr-1" />
                      {resource.price === 0 ? "Download" : "Buy"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 bg-transparent">
            Explore All Resources
          </Button>
        </div>
      </div>
    </section>
  )
}
