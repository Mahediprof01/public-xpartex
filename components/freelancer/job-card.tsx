"use client"

import { motion } from "framer-motion"
import { Clock, DollarSign, MapPin, Briefcase, Bookmark, Share2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export interface JobCardProps {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Freelance"
  budget: string
  duration: string
  skills: string[]
  postedTime: string
  applications: number
  description: string
  urgent?: boolean
  verified?: boolean
}

export function JobCard({ job }: { job: JobCardProps }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 relative overflow-hidden"
    >
      {job.urgent && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          Urgent
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {job.companyLogo && (
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <img src={job.companyLogo} alt={job.company} className="h-8 w-8 object-contain" />
            </div>
          )}
          <div>
            <Link href={`/freelancers/jobs/${job.id}`} className="group">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-sky-600 transition-colors mb-1">
                {job.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2">
              <p className="text-sky-600 font-medium">{job.company}</p>
              {job.verified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-gray-400" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <span>{job.budget}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{job.duration}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            +{job.skills.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{job.postedTime}</span>
          </div>
          <span>{job.applications} applications</span>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Save Job</Button>
          <Button className="gradient-primary gradient-primary-hover text-white" size="sm">
            Apply Now
          </Button>
        </div>
      </div>
    </motion.div>
  )
}