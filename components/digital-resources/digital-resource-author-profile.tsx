"use client"

import { motion } from "framer-motion"
import { Star, Download, FileText, ExternalLink, Linkedin, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DigitalResourceAuthor } from "@/types/digital-resource"
import Image from "next/image"

interface DigitalResourceAuthorProfileProps {
  author: DigitalResourceAuthor
}

export function DigitalResourceAuthorProfile({ author }: DigitalResourceAuthorProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            About the Author
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Author Header */}
            <div className="flex items-start space-x-4">
              <Image
                src={author.avatar}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-full border-2 border-gray-200"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{author.name}</h3>
                <p className="text-gray-600 mb-3">{author.title}</p>
                
                {/* Author Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-bold text-gray-900">{author.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <FileText className="w-4 h-4 text-blue-600 mr-1" />
                      <span className="font-bold text-gray-900">{author.totalResources}</span>
                    </div>
                    <p className="text-xs text-gray-600">Resources</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Download className="w-4 h-4 text-green-600 mr-1" />
                      <span className="font-bold text-gray-900">{author.totalDownloads.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-600">Downloads</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-2">
                  {author.socialLinks.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={author.socialLinks.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-1" />
                        Website
                      </a>
                    </Button>
                  )}
                  {author.socialLinks.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Biography</h4>
              <p className="text-gray-700 leading-relaxed">{author.bio}</p>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {author.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Credentials */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Credentials & Achievements</h4>
              <div className="space-y-2">
                {author.credentials.map((credential, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{credential}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow Author */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Follow {author.name}</h4>
                  <p className="text-sm text-gray-600">Get notified about new resources and updates</p>
                </div>
                <Button className="gradient-primary gradient-primary-hover text-white">
                  Follow Author
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
