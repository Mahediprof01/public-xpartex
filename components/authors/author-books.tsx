"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Star, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Author } from "@/data/authors"
import Image from "next/image"
import Link from "next/link"

interface AuthorBooksProps {
  author: Author
}

export function AuthorBooks({ author }: AuthorBooksProps) {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Books by {author.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {author.books.map((book, index) => (
              <motion.div
                key={book.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Book Image */}
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-4 max-w-[120px] mx-auto">
                  <Image
                    src={book.thumbnail}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-blue-600 text-white text-xs">
                      {book.category}
                    </Badge>
                  </div>
                </div>

                {/* Book Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-2 text-center">
                    {book.title}
                  </h4>

                  {/* Book Stats */}
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{book.readers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{book.pages} pages</span>
                    </div>
                    <div className="text-center">
                      <span className="font-medium">{formatPrice(book.price, book.currency)}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button size="sm" className="w-full gradient-primary gradient-primary-hover text-white" asChild>
                    <Link href={`/ebooks/${book.id}`}>
                      View Book
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}

            {/* View All Books */}
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/ebooks?author=${author.id}`}>
                  View All Books by {author.name}
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
