"use client"

import { Users, BookOpen, Star, MessageSquare } from "lucide-react"
import { StatsCard } from "@/components/ui/stats-card"
import { Instructor } from "@/data/instructors"

interface InstructorStatsProps {
  instructor: Instructor
}

export function InstructorStats({ instructor }: InstructorStatsProps) {
  const stats = [
    { 
      title: "Total Students", 
      value: instructor.totalStudents, 
      icon: Users,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0
    },
    { 
      title: "Courses Created", 
      value: instructor.totalCourses, 
      icon: BookOpen,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.1
    },
    { 
      title: "Average Rating", 
      value: instructor.rating, 
      suffix: "★",
      icon: Star,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.2,
      decimal: 1
    },
    { 
      title: "Total Reviews", 
      value: instructor.totalReviews, 
      icon: MessageSquare,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.3
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          suffix={stat.suffix}
          icon={stat.icon}
          gradient={stat.gradient}
          delay={stat.delay}
          decimal={stat.decimal}
        />
      ))}
    </div>
  )
}
