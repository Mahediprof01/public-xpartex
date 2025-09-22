"use client"

import { motion } from "framer-motion"
import { 
  Star, 
  Users, 
  BookOpen, 
  ChevronRight,
  Globe,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Instructor } from "@/data/instructors"
import Image from "next/image"
import Link from "next/link"

interface InstructorHeroProps {
  instructor: Instructor
}

export function InstructorHero({ instructor }: InstructorHeroProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Instructors", href: "/instructors" },
    { label: instructor.name, href: "#", current: true }
  ]

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center space-x-2 text-sm text-blue-200 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
              <Link 
                href={item.href}
                className={`hover:text-white transition-colors ${
                  item.current ? 'text-white font-medium' : ''
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Instructor Image and Basic Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              {/* Instructor Image */}
              <div className="relative inline-block mb-6">
                <div className="w-48 h-48 mx-auto relative">
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    fill
                    className="rounded-full border-4 border-white/20 object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Basic Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="text-2xl font-bold text-white">{instructor.rating}</span>
                    </div>
                    <p className="text-xs text-blue-200">Rating</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-green-400 mr-1" />
                      <span className="text-xl font-bold text-white">
                        {instructor.totalStudents > 1000 ? `${(instructor.totalStudents / 1000).toFixed(1)}k` : instructor.totalStudents}
                      </span>
                    </div>
                    <p className="text-xs text-green-200">Students</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="w-5 h-5 text-purple-400 mr-1" />
                      <span className="text-xl font-bold text-white">{instructor.totalCourses}</span>
                    </div>
                    <p className="text-xs text-purple-200">Courses</p>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mb-6">
                {instructor.socialLinks.website && (
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <a href={instructor.socialLinks.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {instructor.socialLinks.linkedin && (
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <a href={instructor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {instructor.socialLinks.twitter && (
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <a href={instructor.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                {instructor.socialLinks.youtube && (
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <a href={instructor.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                      <Youtube className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>

              {/* Contact Button */}
              <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Instructor
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Instructor Details */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Name and Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {instructor.name}
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                {instructor.title}
              </p>
              
              {/* Experience Badge */}
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-2">
                  {instructor.experience} Experience
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30 px-4 py-2">
                  {instructor.responseTime}
                </Badge>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">About</h3>
              <p className="text-blue-100 leading-relaxed">
                {instructor.bio}
              </p>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {instructor.expertise.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="border-white/30 text-white bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
              <div className="flex gap-2">
                {instructor.languages.map((language, index) => (
                  <Badge 
                    key={index} 
                    className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30"
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
