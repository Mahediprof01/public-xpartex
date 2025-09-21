"use client"

import { motion } from "framer-motion"
import { 
  Download, 
  Shield, 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  Gift,
  CreditCard,
  Smartphone,
  HardDrive
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DigitalResource } from "@/types/digital-resource"
import Image from "next/image"

interface DigitalResourcePurchaseProps {
  resource: DigitalResource
}

export function DigitalResourcePurchase({ resource }: DigitalResourcePurchaseProps) {
  const formatPrice = (price: number) => {
    if (resource.currency === 'BDT') {
      return `৳${price.toLocaleString()}`
    }
    return `$${price}`
  }

  const discountPercentage = Math.round(((resource.originalPrice - resource.price) / resource.originalPrice) * 100)

  return (
    <motion.div
      className="sticky top-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="relative w-full h-48 mb-4">
            <Image
              src={resource.thumbnail}
              alt={resource.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <CardTitle className="text-lg">{resource.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Pricing */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(resource.price)}
              </span>
              {resource.originalPrice > resource.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(resource.originalPrice)}
                  </span>
                  <Badge className="bg-red-100 text-red-800">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>
            {resource.originalPrice > resource.price && (
              <p className="text-sm text-green-600">
                Save {formatPrice(resource.originalPrice - resource.price)} today!
              </p>
            )}
          </div>

          {/* Download Button */}
          <Button size="lg" className="w-full gradient-primary gradient-primary-hover text-white">
            <Download className="w-5 h-5 mr-2" />
            Download Now
          </Button>

          {/* Features List */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">This resource includes:</h4>
            <div className="space-y-2">
              {resource.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* File Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">File Details:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">File Size:</span>
                <span className="font-medium">{resource.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Formats:</span>
                <div className="flex gap-1">
                  {resource.downloadFormats.map((format, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {format}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Version:</span>
                <span className="font-medium">{resource.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">{new Date(resource.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Guarantees and Features */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <Shield className="w-4 h-4 text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <Download className="w-4 h-4 text-blue-500" />
              <span>Instant download after purchase</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <RefreshCw className="w-4 h-4 text-purple-500" />
              <span>Free updates for 1 year</span>
            </div>
            {resource.offlineAccess && (
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <HardDrive className="w-4 h-4 text-gray-500" />
                <span>Offline access included</span>
              </div>
            )}
            {resource.commercialUse && (
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Commercial use allowed</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Payment Methods */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Secure Payment:</h4>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
              <CreditCard className="w-4 h-4" />
              <span>Credit Card</span>
              <span>•</span>
              <span>PayPal</span>
              <span>•</span>
              <span>Bank Transfer</span>
            </div>
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
              <Shield className="w-3 h-3" />
              <span>SSL Secured • 256-bit Encryption</span>
            </div>
          </div>

          <Separator />

          {/* Gift Option */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">Gift this resource</span>
              </div>
              <Button variant="outline" size="sm">
                Send as Gift
              </Button>
            </div>
          </div>

          {/* Bulk Purchase */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-center">
              <h4 className="font-semibold text-blue-900 mb-1">Need multiple licenses?</h4>
              <p className="text-sm text-blue-700 mb-3">
                Contact us for bulk pricing and team licenses
              </p>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                Contact Sales
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
