"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, Target, Download, FileText, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DigitalResource } from "@/types/digital-resource"

interface DigitalResourceOverviewProps {
  resource: DigitalResource
}

export function DigitalResourceOverview({ resource }: DigitalResourceOverviewProps) {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            About This Resource
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-lg">
            {resource.description}
          </p>
        </CardContent>
      </Card>

      {/* What You Will Get */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2 text-green-600" />
            What You Will Get
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resource.whatYouWillGet.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-purple-600" />
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resource.keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mb-2"></div>
                <span className="text-gray-700 text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Requirements and Target Audience */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-orange-600" />
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resource.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{requirement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-600" />
              Who This Is For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resource.targetAudience.map((audience, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Target className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{audience}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">File Size</h4>
              <p className="text-gray-600">{resource.fileSize}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Formats</h4>
              <div className="flex flex-wrap justify-center gap-1">
                {resource.format.map((format, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {format}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Version</h4>
              <p className="text-gray-600">{resource.version}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Last Updated</h4>
              <p className="text-gray-600">{new Date(resource.lastUpdated).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
