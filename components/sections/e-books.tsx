import { Download, Star, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EBooks() {
  const ebooks = [
    {
      id: "1",
      title: "Complete Guide to Garment Manufacturing",
      author: "Industry Experts",
      rating: 4.9,
      downloads: 5200,
      pages: 250,
      price: 1500,
      cover: "/garment-manufacturing-book-cover.jpg",
      category: "Manufacturing",
    },
    {
      id: "2",
      title: "Fashion Trends 2024: Market Analysis",
      author: "Fashion Research Team",
      rating: 4.7,
      downloads: 3800,
      pages: 180,
      price: 1200,
      cover: "/fashion-trends-book-cover.jpg",
      category: "Trends",
    },
    {
      id: "3",
      title: "Sustainable Textile Production",
      author: "Green Manufacturing Co.",
      rating: 4.8,
      downloads: 2900,
      pages: 320,
      price: 1800,
      cover: "/sustainable-textile-book-cover.jpg",
      category: "Sustainability",
    },
    {
      id: "4",
      title: "Export Guidelines for Garment Industry",
      author: "Trade Specialists",
      rating: 4.6,
      downloads: 4100,
      pages: 200,
      price: 1000,
      cover: "/export-guidelines-book-cover.jpg",
      category: "Export",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">E-Books</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive guides and industry insights to stay ahead in the garment business
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ebooks.map((ebook) => (
            <div
              key={ebook.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border"
            >
              <div className="relative">
                <img src={ebook.cover || "/placeholder.svg"} alt={ebook.title} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 gradient-primary text-white text-xs rounded-full font-medium">
                    {ebook.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{ebook.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {ebook.author}</p>

                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{ebook.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{ebook.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{ebook.pages}p</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">BDT {ebook.price.toLocaleString()}</div>
                  <Button size="sm" className="gradient-primary gradient-primary-hover text-white">
                    <Download className="h-4 w-4 mr-1" />
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 bg-transparent">
            Browse All E-Books
          </Button>
        </div>
      </div>
    </section>
  )
}
