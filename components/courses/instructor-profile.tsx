"use client"

import { motion } from "framer-motion"
import { 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  ExternalLink,
  Linkedin,
  Twitter,
  Globe
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CourseInstructor } from "@/types/course"
import Image from "next/image"

interface InstructorProfileProps {
  instructor: CourseInstructor
}

export function InstructorProfile({ instructor }: InstructorProfileProps) {
  const mockOtherCourses = [
    {
      id: "1",
      title: "Advanced Pattern Making Techniques",
      students: 8500,
      rating: 4.7,
      thumbnail: "/course-patt.jpg"
    },
    {
      id: "2", 
      title: "Fashion Illustration Masterclass",
      students: 12300,
      rating: 4.9,
      thumbnail: "/course-patt.jpg"
    },
    {
      id: "3",
      title: "Sustainable Fashion Design",
      students: 6700,
      rating: 4.6,
      thumbnail: "/course-sustainable.jpg"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Instructor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instructor Header */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-shrink-0">
              <Image
                src={instructor.avatar}
                alt={instructor.name}
                width={64}
                height={64}
                className="rounded-full mx-auto sm:mx-0"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                <a
                  href={`/instructors/sarah-johnson`}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {instructor.name}
                </a>
              </h3>
              <p className="text-xs text-sky-600 font-medium mb-2">
                {instructor.title}
              </p>

              {/* Stats (single line) */}
              <div className="flex items-center justify-center sm:justify-start gap-8 mb-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <div className="leading-none">
                    <div className="font-semibold text-gray-900">{instructor.rating}</div>
                    <div className="text-xs text-gray-600">Instructor Rating</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-500" />
                  <div className="leading-none">
                    <div className="font-semibold text-gray-900">{instructor.totalStudents.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  <div className="leading-none">
                    <div className="font-semibold text-gray-900">{instructor.totalCourses}</div>
                    <div className="text-xs text-gray-600">Courses</div>
                  </div>
                </div>
              </div>

              {/* Social icons on their own line */}
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                {instructor.socialLinks.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={instructor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {instructor.socialLinks.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={instructor.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {instructor.socialLinks.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={instructor.socialLinks.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
                      <Globe className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">About {instructor.name}</h4>
            <p className="text-gray-700 leading-relaxed">{instructor.bio}</p>
          </div>

          {/* Experience */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
            <p className="text-gray-700 leading-relaxed">{instructor.experience}</p>
          </div>

          {/* Credentials */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Credentials & Achievements</h4>
            <div className="space-y-2">
              {instructor.credentials.map((credential, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{credential}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Courses */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">More Courses by {instructor.name}</h4>
            <div className="space-y-4">
              {mockOtherCourses.map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:border-sky-300 hover:bg-sky-50/50 transition-colors cursor-pointer">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    width={60}
                    height={40}
                    className="rounded object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 truncate">{course.title}</h5>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
