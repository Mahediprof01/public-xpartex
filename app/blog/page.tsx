"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Posts", count: 24 },
    { id: "fashion-trends", name: "Fashion Trends", count: 8 },
    { id: "manufacturing", name: "Manufacturing", count: 6 },
    { id: "sustainability", name: "Sustainability", count: 5 },
    { id: "business-tips", name: "Business Tips", count: 3 },
    { id: "technology", name: "Technology", count: 2 }
  ]

  const featuredPost = {
    id: "1",
    title: "The Future of Sustainable Fashion Manufacturing",
    excerpt: "Explore how innovative technologies and sustainable practices are reshaping the fashion industry for a greener future.",
    author: "Dr. Sarah Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "sustainability",
    image: "/placeholder.svg?height=400&width=600&text=Featured+Post",
    featured: true
  }

  const blogPosts = [
    {
      id: "2",
      title: "10 Essential Skills Every Fashion Designer Should Master",
      excerpt: "From sketching to pattern making, discover the fundamental skills that will set you apart in the competitive fashion industry.",
      author: "Emma Davis",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=ED",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "fashion-trends",
      image: "/placeholder.svg?height=300&width=400&text=Fashion+Skills"
    },
    {
      id: "3",
      title: "Quality Control Best Practices in Textile Manufacturing",
      excerpt: "Learn industry-standard quality control methods that ensure consistent product quality and customer satisfaction.",
      author: "Michael Chen",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=MC",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "manufacturing",
      image: "/placeholder.svg?height=300&width=400&text=Quality+Control"
    },
    {
      id: "4",
      title: "Building a Successful Fashion Brand in 2024",
      excerpt: "Strategic insights and practical tips for entrepreneurs looking to launch and grow their fashion brands in today's market.",
      author: "Lisa Thompson",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=LT",
      date: "2024-01-08",
      readTime: "9 min read",
      category: "business-tips",
      image: "/placeholder.svg?height=300&width=400&text=Fashion+Brand"
    },
    {
      id: "5",
      title: "The Impact of AI on Fashion Design and Production",
      excerpt: "Discover how artificial intelligence is revolutionizing fashion design, production planning, and customer experience.",
      author: "David Wilson",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=DW",
      date: "2024-01-05",
      readTime: "5 min read",
      category: "technology",
      image: "/placeholder.svg?height=300&width=400&text=AI+Fashion"
    },
    {
      id: "6",
      title: "Sustainable Materials: The Future of Fashion",
      excerpt: "Explore innovative eco-friendly materials that are transforming the fashion industry and reducing environmental impact.",
      author: "Dr. Sarah Johnson",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
      date: "2024-01-03",
      readTime: "6 min read",
      category: "sustainability",
      image: "/placeholder.svg?height=300&width=400&text=Sustainable+Materials"
    },
    {
      id: "7",
      title: "Fashion Week Trends: What to Expect This Season",
      excerpt: "Get insights into the latest trends from major fashion weeks and how they'll influence the industry.",
      author: "Emma Davis",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=ED",
      date: "2024-01-01",
      readTime: "4 min read",
      category: "fashion-trends",
      image: "/placeholder.svg?height=300&width=400&text=Fashion+Week"
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              XparTex Blog
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Insights, trends, and expert knowledge from the fashion and textile industry
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 w-5 h-5 z-10 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300 focus:bg-white/20 relative z-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Article</h2>
            </div>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-square relative">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4">
                    {categories.find(c => c.id === featuredPost.category)?.name}
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Image
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.author}
                        width={32}
                        height={32}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(featuredPost.date).toLocaleDateString()}
                          <Clock className="w-4 h-4 ml-3 mr-1" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="gradient-primary gradient-primary-hover text-white" asChild>
                    <Link href={`/blog/${featuredPost.id}`}>
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory === "all" 
                    ? "Latest Articles" 
                    : categories.find(c => c.id === selectedCategory)?.name
                  }
                </h2>
                <p className="text-gray-600">
                  Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow group">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary">
                            {categories.find(c => c.id === post.category)?.name}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Image
                              src={post.authorAvatar}
                              alt={post.author}
                              width={24}
                              height={24}
                              className="rounded-full mr-2"
                            />
                            <span className="text-sm font-medium text-gray-900">{post.author}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/blog/${post.id}`}>
                              Read More
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* No Results */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse different categories.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
