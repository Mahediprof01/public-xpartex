"use client"

import { motion } from "framer-motion"
import { Award, CheckCircle, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Author } from "@/data/authors"

interface AuthorAboutProps {
  author: Author
}

export function AuthorAbout({ author }: AuthorAboutProps) {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Detailed Bio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            About {author.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            {author.bio}
          </p>
          
          {/* Experience Highlight */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Professional Experience</h4>
            <p className="text-blue-800">{author.experience} in the industry</p>
          </div>
        </CardContent>
      </Card>

      {/* Credentials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2 text-green-600" />
            Credentials & Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {author.credentials.map((credential, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{credential}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2 text-purple-600" />
            Achievements & Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {author.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-purple-50 rounded-lg p-4 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <span className="text-purple-800 text-sm font-medium">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Writing Philosophy */}
      <Card>
        <CardHeader>
          <CardTitle>Writing Philosophy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-6">
            <blockquote className="text-gray-700 italic text-lg leading-relaxed">
              "I believe in making complex industry knowledge accessible to everyone. 
              My books are designed to bridge the gap between academic theory and 
              practical application, providing readers with actionable insights they 
              can implement immediately in their work."
            </blockquote>
            <footer className="mt-4 text-right">
              <cite className="text-gray-600 font-medium">— {author.name}</cite>
            </footer>
          </div>
        </CardContent>
      </Card>

      {/* Areas of Expertise */}
      <Card>
        <CardHeader>
          <CardTitle>Areas of Expertise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {author.expertise.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
