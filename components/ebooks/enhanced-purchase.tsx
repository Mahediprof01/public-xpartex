"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Download, 
  Eye, 
  Heart, 
  Share2,
  Shield,
  Gift,
  Lock,
  FileText,
  Smartphone,
  Printer,
  Clock,
  BookOpen
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Ebook } from "@/types/ebook"
import Image from "next/image"

interface EnhancedPurchaseProps {
  ebook: Ebook
}

export function EnhancedPurchase({ ebook }: EnhancedPurchaseProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const discount = Math.round(((ebook.originalPrice - ebook.price) / ebook.originalPrice) * 100)
  const savings = ebook.originalPrice - ebook.price

  const formatPrice = (price: number) => {
    if (ebook.currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
  }

  const features = [
    {
      icon: <FileText className="w-4 h-4" />,
      text: `${ebook.pages} pages`
    },
    {
      icon: <Download className="w-4 h-4" />,
      text: `${ebook.format.join(", ")} formats`
    },
    {
      icon: <Smartphone className="w-4 h-4" />,
      text: ebook.offlineReading ? "Offline reading" : "Online only"
    },
    {
      icon: <Printer className="w-4 h-4" />,
      text: ebook.printingAllowed ? "Printing allowed" : "No printing"
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Instant download"
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: `${ebook.chapters.length} chapters`
    }
  ]

  return (
    <div className="sticky top-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden shadow-lg">
          {/* E-book Cover Preview */}
          <div className="relative aspect-[3/4] max-h-80">
            <Image
              src={ebook.cover}
              alt={ebook.title}
              fill
              className="object-cover"
            />
            
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 rounded-full w-16 h-16 p-0"
              >
                <Eye className="w-6 h-6" />
              </Button>
            </div>
            
            {discount > 0 && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-500 text-white border-0 font-bold">
                  {discount}% OFF
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Pricing */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(ebook.price)}
                </span>
                {ebook.originalPrice > ebook.price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(ebook.originalPrice)}
                  </span>
                )}
              </div>
              
              {savings > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  Save {formatPrice(savings)} today!
                </p>
              )}
            </div>

            {/* Purchase Buttons */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-semibold h-12"
              >
                <Download className="w-4 h-4 mr-2" />
                Buy & Download Now
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "border-red-300 text-red-600" : ""}
                >
                  <Heart className={`w-4 h-4 mr-1 ${isWishlisted ? 'fill-current' : ''}`} />
                  Wishlist
                </Button>
                
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>

              {/* Preview Button */}
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Preview Sample Pages
              </Button>
            </div>

            {/* Money Back Guarantee */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">30-Day Money-Back Guarantee</span>
              </div>
              <p className="text-sm text-green-700">
                Full refund if you're not satisfied
              </p>
            </div>

            <Separator />

            {/* E-book Features */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">This e-book includes:</h4>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="text-sky-500">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Download Formats */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Available Formats:</h4>
              <div className="flex flex-wrap gap-2">
                {ebook.format.map((format, index) => (
                  <Badge key={index} variant="outline" className="text-gray-600">
                    {format}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Gift Option */}
            <div className="text-center">
              <Button variant="outline" className="w-full">
                <Gift className="w-4 h-4 mr-2" />
                Gift This E-book
              </Button>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock className="w-3 h-3" />
              <span>Secure payment with SSL encryption</span>
            </div>

            {/* File Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">File Information:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>File Size:</span>
                  <span className="font-medium">{ebook.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pages:</span>
                  <span className="font-medium">{ebook.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span className="font-medium">{ebook.language}</span>
                </div>
                <div className="flex justify-between">
                  <span>Publisher:</span>
                  <span className="font-medium">{ebook.publisher}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card className="mt-6">
          <CardHeader>
            <h4 className="font-semibold text-gray-900">Need multiple copies?</h4>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Get bulk discounts for educational institutions and corporate training.
            </p>
            <Button variant="outline" className="w-full">
              Contact for Bulk Pricing
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
