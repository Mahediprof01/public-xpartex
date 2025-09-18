import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function News() {
  const newsArticles = [
    {
      id: "1",
      title: "Bangladesh Garment Industry Shows Strong Growth in Q4 2024",
      excerpt:
        "The garment sector continues to demonstrate resilience with a 15% increase in exports compared to last year...",
      author: "Industry Reporter",
      date: "2024-12-15",
      category: "Industry News",
      image: "/garment-industry-growth-news.jpg",
      readTime: "3 min read",
    },
    {
      id: "2",
      title: "Sustainable Fashion Trends Shaping the Future",
      excerpt:
        "Eco-friendly manufacturing processes and sustainable materials are becoming the new standard in garment production...",
      author: "Sustainability Expert",
      date: "2024-12-12",
      category: "Sustainability",
      image: "/sustainable-fashion-news.jpg",
      readTime: "5 min read",
    },
    {
      id: "3",
      title: "New Trade Agreements Boost Export Opportunities",
      excerpt: "Recent trade agreements with European markets open new doors for Bangladeshi garment manufacturers...",
      author: "Trade Analyst",
      date: "2024-12-10",
      category: "Trade",
      image: "/trade-agreement-news.jpg",
      readTime: "4 min read",
    },
    {
      id: "4",
      title: "Technology Integration in Modern Garment Manufacturing",
      excerpt:
        "AI and automation are revolutionizing production processes, improving efficiency and quality control...",
      author: "Tech Correspondent",
      date: "2024-12-08",
      category: "Technology",
      image: "/garment-technology-news.jpg",
      readTime: "6 min read",
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Industry News</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and developments in the garment industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border"
            >
              <div className="relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 gradient-primary text-white text-sm rounded-full font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <span>{article.readTime}</span>
                </div>

                <Button variant="ghost" className="p-0 h-auto text-sky-600 hover:text-sky-700">
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 bg-transparent">
            View All News
          </Button>
        </div>
      </div>
    </section>
  )
}
