"use client"

import { motion } from "framer-motion"
import { 
  CheckCircle, 
  BookOpen, 
  Users, 
  Target,
  FileText,
  Download,
  Smartphone,
  Printer
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ebook } from "@/types/ebook"

interface EbookOverviewProps {
  ebook: Ebook
}

export function EbookOverview({ ebook }: EbookOverviewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Description */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>About This E-Book</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg">
              {ebook.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* What You'll Learn */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              What You'll Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ebook.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table of Contents */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-500" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ebook.chapters.map((chapter, index) => (
                <div 
                  key={chapter.id} 
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-sky-300 hover:bg-sky-50/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-sky-600 bg-sky-100 px-2 py-1 rounded">
                        Chapter {index + 1}
                      </span>
                      {chapter.isPreview && (
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          Preview
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{chapter.title}</h4>
                    <p className="text-sm text-gray-600">{chapter.description}</p>
                  </div>
                  
                  <div className="text-right text-sm text-gray-500 ml-4">
                    <div>{chapter.pages} pages</div>
                    {chapter.duration && (
                      <div>{chapter.duration}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Features */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ebook.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Target Audience */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              Who This E-Book Is For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ebook.targetAudience.map((audience, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{audience}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* E-book Details */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              E-book Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Format & Access</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Available formats: {ebook.format.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">
                      {ebook.offlineReading ? "Offline reading supported" : "Online reading only"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">
                      {ebook.printingAllowed ? "Printing allowed" : "No printing"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Publication Info</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Publisher:</span> {ebook.publisher}
                  </div>
                  <div>
                    <span className="font-medium">Published:</span> {ebook.publishedDate}
                  </div>
                  <div>
                    <span className="font-medium">Edition:</span> {ebook.edition}
                  </div>
                  {ebook.isbn && (
                    <div>
                      <span className="font-medium">ISBN:</span> {ebook.isbn}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Technical Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">File Size:</span> {ebook.fileSize}
                  </div>
                  <div>
                    <span className="font-medium">Pages:</span> {ebook.pages}
                  </div>
                  <div>
                    <span className="font-medium">Language:</span> {ebook.language}
                  </div>
                  <div>
                    <span className="font-medium">Downloads:</span> {ebook.downloadFormats.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tags */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Topics Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {ebook.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-gray-600">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
