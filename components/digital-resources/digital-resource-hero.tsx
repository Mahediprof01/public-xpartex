"use client"

import { useState } from "react"
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
  CheckCircle,
  Shield,
  RefreshCw
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
  const [wishlisted, setWishlisted] = useState(false)
  const [copied, setCopied] = useState(false)

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
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border-blue-400/30">
                <CardContent className="p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-lg font-bold text-white">{resource.stats.rating}</span>
                  </div>
                  <p className="text-xs text-blue-200">{resource.stats.totalReviews} reviews</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border-green-400/30">
                <CardContent className="p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Download className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-lg font-bold text-white">
                      {resource.stats.totalDownloads > 1000 ? `${(resource.stats.totalDownloads / 1000).toFixed(1)}k` : resource.stats.totalDownloads}
                    </span>
                  </div>
                  <p className="text-xs text-green-200">downloads</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border-purple-400/30">
                <CardContent className="p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <FileText className="w-4 h-4 text-purple-400 mr-1" />
                    <span className="text-lg font-bold text-white">{resource.fileSize}</span>
                  </div>
                  <p className="text-xs text-purple-200">file size</p>
                </CardContent>
              </Card>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white text-lg">What's Included:</h3>
              <div className="grid grid-cols-1 gap-3">
                {resource.keyFeatures.slice(0, 4).map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center text-blue-100 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </motion.div>
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
            <motion.div
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-4xl font-bold text-white">
                    {formatPrice(resource.price)}
                  </span>
                  {resource.originalPrice > resource.price && (
                    <>
                      <span className="text-xl text-slate-400 line-through">
                        {formatPrice(resource.originalPrice)}
                      </span>
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 text-sm font-bold animate-pulse">
                        {discountPercentage}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                {resource.originalPrice > resource.price && (
                  <p className="text-green-400 font-medium">
                    🎉 Save {formatPrice(resource.originalPrice - resource.price)} today!
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button size="lg" className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Download className="w-5 h-5 mr-2" />
                  Download Now
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setWishlisted((s) => !s)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-transform transform
                      ${wishlisted ? 'bg-red-600 text-white shadow-md' : 'bg-transparent text-white border border-white/30'}
                      hover:scale-105`}
                    aria-pressed={wishlisted}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'text-white' : 'text-white'}`} />
                    {wishlisted ? 'Wishlisted' : 'Wishlist'}
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(window.location.href)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      } catch (e) {
                        if ((navigator as any).share) {
                          try {
                            await (navigator as any).share({ title: resource.title, url: window.location.href })
                          } catch (err) {
                            // ignore
                          }
                        }
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-transparent text-white border border-white/30 hover:bg-white/5 hover:scale-105 transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    {copied ? 'Copied' : 'Share'}
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-center gap-6 text-sm text-blue-200">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Secure Download</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RefreshCw className="w-4 h-4 text-blue-400" />
                    <span>Free Updates</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
