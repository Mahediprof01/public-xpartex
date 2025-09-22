"use client"

import { motion } from "framer-motion"
import { 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  ExternalLink,
  Linkedin,
  Twitter,
  Globe,
  Facebook
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EbookAuthor } from "@/types/ebook"
import Image from "next/image"

interface AuthorProfileProps {
  author: EbookAuthor
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  const mockOtherBooks = [
    {
      id: "1",
      title: "Advanced Manufacturing Techniques",
      readers: 8500,
      rating: 4.7,
      cover: "/placeholder.svg?height=80&width=60&text=Book1"
    },
    {
      id: "2", 
      title: "Quality Control in Textiles",
      readers: 12300,
      rating: 4.9,
      cover: "/placeholder.svg?height=80&width=60&text=Book2"
    },
    {
      id: "3",
      title: "Supply Chain Management",
      readers: 6700,
      rating: 4.6,
      cover: "/placeholder.svg?height=80&width=60&text=Book3"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>About the Author</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Author Header */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <Image
                src={author.avatar}
                alt={author.name}
                width={120}
                height={120}
                className="rounded-full mx-auto sm:mx-0"
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                <a
                  href={`/authors/dr-james-wilson`}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {author.name}
                </a>
              </h3>
              <p className="text-lg text-sky-600 font-medium mb-3">
                {author.title}
              </p>
              
              {/* Author Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">{author.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">Author Rating</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-sky-500" />
                    <span className="font-bold text-gray-900">
                      {author.totalReaders.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">Readers</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span className="font-bold text-gray-900">{author.totalBooks}</span>
                  </div>
                  <p className="text-xs text-gray-600">Books</p>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center justify-center sm:justify-start gap-3">
                {author.socialLinks.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {author.socialLinks.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {author.socialLinks.facebook && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={author.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {author.socialLinks.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={author.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">About {author.name}</h4>
            <p className="text-gray-700 leading-relaxed">{author.bio}</p>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {author.expertise.map((area, index) => (
                <Badge key={index} variant="outline" className="text-sky-600 border-sky-300">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Credentials & Achievements</h4>
            <div className="space-y-2">
              {author.credentials.map((credential, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{credential}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Books */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">More Books by {author.name}</h4>
            <div className="space-y-4">
              {mockOtherBooks.map((book) => (
                <div key={book.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:border-sky-300 hover:bg-sky-50/50 transition-colors cursor-pointer">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={60}
                    height={80}
                    className="rounded object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 truncate">{book.title}</h5>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{book.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{book.readers.toLocaleString()} readers</span>
                      </div>
                    </div>
                  </div>
                  
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Follow Author */}
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-sky-900 mb-2">
              Follow {author.name}
            </h4>
            <p className="text-sky-700 mb-4 text-sm">
              Get notified when new books are published and stay updated with the latest insights.
            </p>
            <Button className="bg-sky-600 hover:bg-sky-700 text-white">
              Follow Author
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
