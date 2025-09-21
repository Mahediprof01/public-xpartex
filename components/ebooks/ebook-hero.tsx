"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Star, 
  Download, 
  BookOpen, 
  Eye, 
  Heart, 
  Share2,
  ChevronRight,
  Calendar,
  FileText,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ebook } from "@/types/ebook"
import Image from "next/image"

interface EbookHeroProps {
  ebook: Ebook
}

export function EbookHero({ ebook }: EbookHeroProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "E-Books", href: "/ebooks" },
    { label: ebook.category, href: `/ebooks?category=${ebook.category}` },
    { label: ebook.title, href: "#", current: true }
  ]

  const discount = Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100)

  const formatPrice = (price: number) => {
    if (ebook.currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-slate-300 mb-8">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
              <a 
                href={item.href}
                className={`hover:text-white transition-colors ${
                  item.current ? 'text-white font-medium' : ''
                }`}
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - E-book Cover and Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative">
                <Image
                  src={ebook.cover}
                  alt={ebook.title}
                  width={400}
                  height={600}
                  className="w-full rounded-lg shadow-2xl"
                />
                
                {discount > 0 && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-500 text-white border-0 font-bold">
                      {discount}% OFF
                    </Badge>
                  </div>
                )}

                {ebook.stats.downloads > 10000 && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 text-white border-0 font-bold">
                      Bestseller
                    </Badge>
                  </div>
                )}
              </div>

              {/* Preview Button */}
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Pages
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - E-book Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <div>
              <Badge variant="outline" className="border-sky-400 text-sky-400">
                {ebook.category}
              </Badge>
            </div>

            {/* Title and Subtitle */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {ebook.title}
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                {ebook.subtitle}
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <Image
                src={ebook.author.avatar}
                alt={ebook.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-lg">{ebook.author.name}</p>
                <p className="text-slate-400">{ebook.author.title}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-bold">{ebook.stats.rating}</span>
                </div>
                <p className="text-xs text-slate-400">
                  ({ebook.stats.totalReviews} reviews)
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Download className="w-4 h-4 text-sky-400" />
                  <span className="font-bold">{ebook.stats.downloads.toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-400">Downloads</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BookOpen className="w-4 h-4 text-green-400" />
                  <span className="font-bold">{ebook.pages}</span>
                </div>
                <p className="text-xs text-slate-400">Pages</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="font-bold">{ebook.language}</span>
                </div>
                <p className="text-xs text-slate-400">Language</p>
              </div>
            </div>

            {/* E-book Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>{ebook.fileSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Published {ebook.publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-slate-400" />
                <span>{ebook.format.join(", ")}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  {formatPrice(ebook.price)}
                </span>
                {ebook.originalPrice > ebook.price && (
                  <span className="text-xl text-slate-400 line-through">
                    {formatPrice(ebook.originalPrice)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <Badge className="bg-red-500 text-white">
                  Save {formatPrice(ebook.originalPrice - ebook.price)}
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-semibold px-8"
              >
                <Download className="w-4 h-4 mr-2" />
                Buy Now - {formatPrice(ebook.price)}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current text-red-400' : ''}`} />
                Wishlist
              </Button>
              
              <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Key Features */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">What's Included:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {ebook.features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
