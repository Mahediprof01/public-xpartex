"use client"

import { motion } from "framer-motion"
import { 
  Star, 
  Download, 
  Eye, 
  Share2, 
  Heart, 
  ChevronRight,
  Calculator,
  FileText,
  Settings,
  CheckSquare,
  HardDrive,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DigitalResource } from "@/types/digital-resource"
import Image from "next/image"
import Link from "next/link"

interface DigitalResourceHeroProps {
  resource: DigitalResource
}

export function DigitalResourceHero({ resource }: DigitalResourceHeroProps) {
  const formatPrice = (price: number) => {
    if (resource.currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
  }

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

  const TypeIcon = getTypeIcon(resource.type)

  const discountPercentage = Math.round(((resource.originalPrice - resource.price) / resource.originalPrice) * 100)

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center space-x-2 text-sm text-slate-300 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/digital-resources" className="hover:text-white transition-colors">Digital Resources</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white font-medium">{resource.title}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Resource Image and Preview */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Resource Image */}
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={resource.thumbnail}
                  alt={resource.title}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay with Preview Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="lg" className="bg-white/90 text-gray-900 hover:bg-white">
                    <Eye className="w-5 h-5 mr-2" />
                    Preview Resource
                  </Button>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 flex items-center gap-1">
                    <TypeIcon className="w-3 h-3" />
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </Badge>
                </div>

                {/* Status Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {resource.isNew && (
                    <Badge className="bg-green-500 text-white">New</Badge>
                  )}
                  {resource.isBestseller && (
                    <Badge className="bg-orange-500 text-white">Bestseller</Badge>
                  )}
                  {resource.isFeatured && (
                    <Badge className="bg-purple-500 text-white">Featured</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Preview Images */}
            {resource.previewImages && resource.previewImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {resource.previewImages.slice(0, 2).map((image, index) => (
                  <div key={index} className="aspect-[4/3] relative overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column - Resource Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Category and Title */}
            <div>
              <Badge variant="outline" className="mb-3 border-slate-600 text-slate-300">
                {resource.category} • {resource.subcategory}
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                {resource.title}
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                {resource.subtitle}
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Image
                src={resource.author.avatar}
                alt={resource.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-white">{resource.author.name}</h3>
                <p className="text-sm text-slate-300">{resource.author.title}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-2xl font-bold text-white">{resource.stats.rating}</span>
                  </div>
                  <p className="text-sm text-slate-300">{resource.stats.totalReviews} reviews</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Download className="w-5 h-5 text-blue-400 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {resource.stats.totalDownloads.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">downloads</p>
                </CardContent>
              </Card>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Key Features:</h3>
              <div className="grid grid-cols-1 gap-2">
                {resource.keyFeatures.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* File Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2 border border-white/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">File Size:</span>
                <span className="font-medium text-white">{resource.fileSize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Formats:</span>
                <span className="font-medium text-white">{resource.format.join(", ")}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Commercial Use:</span>
                <span className="font-medium text-white">
                  {resource.commercialUse ? "Allowed" : "Not Allowed"}
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-white">
                      {formatPrice(resource.price)}
                    </span>
                    {resource.originalPrice > resource.price && (
                      <>
                        <span className="text-lg text-slate-400 line-through">
                          {formatPrice(resource.originalPrice)}
                        </span>
                        <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                          {discountPercentage}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                  {resource.originalPrice > resource.price && (
                    <p className="text-sm text-green-400 mt-1">
                      Save {formatPrice(resource.originalPrice - resource.price)} today!
                    </p>
                  )}
                </div>
              </div>

                {/* Action Buttons */}
              <div className="space-y-3">
                <Button size="lg" className="w-full gradient-primary gradient-primary-hover text-white">
                  <Download className="w-5 h-5 mr-2" />
                  Download Now - {formatPrice(resource.price)}
                </Button>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="flex-1 border-white/20 text-white hover:bg-white/10">
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Wishlist
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1 border-white/20 text-white hover:bg-white/10">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
