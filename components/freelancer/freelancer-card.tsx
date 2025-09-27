"use client"

import { motion } from "framer-motion"
import { Star, MapPin, Clock, Badge, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export interface FreelancerCardProps {
  id: string
  name: string
  title: string
  avatar: string
  location: string
  rating: number
  reviewCount: number
  hourlyRate: number
  completedJobs: number
  skills: string[]
  isOnline: boolean
  lastActive: string
  description: string
}

export function FreelancerCard({ freelancer }: { freelancer: FreelancerCardProps }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
            <AvatarFallback>{freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          {freelancer.isOnline && (
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <Link href={`/freelancers/${freelancer.id}`} className="group">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-sky-600 transition-colors">
              {freelancer.name}
            </h3>
          </Link>
          <p className="text-gray-600 mb-2">{freelancer.title}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{freelancer.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{freelancer.lastActive}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-900">{freelancer.rating}</span>
              <span className="text-gray-500 text-sm">({freelancer.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge className="h-4 w-4" />
              <span className="text-sm text-gray-600">{freelancer.completedJobs} jobs</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">${freelancer.hourlyRate}</p>
          <p className="text-sm text-gray-500">per hour</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{freelancer.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {freelancer.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            {skill}
          </span>
        ))}
        {freelancer.skills.length > 4 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            +{freelancer.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" size="sm">
          <MessageCircle className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button className="flex-1 gradient-primary gradient-primary-hover text-white" size="sm">
          View Profile
        </Button>
      </div>
    </motion.div>
  )
}