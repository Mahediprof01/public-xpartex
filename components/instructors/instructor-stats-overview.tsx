"use client"

import { Users, BookOpen, Star, GraduationCap } from "lucide-react"
import { StatsCard } from "@/components/ui/stats-card"

export function InstructorStats() {
  const stats = [
    { 
      title: "Expert Instructors", 
      value: 25, 
      icon: Users,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0
    },
    { 
      title: "Total Courses", 
      value: 150, 
      icon: BookOpen,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.1
    },
    { 
      title: "Students Taught", 
      value: 150000, 
      icon: GraduationCap,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.2
    },
    { 
      title: "Average Rating", 
      value: 4.8, 
      suffix: "★",
      icon: Star,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.3,
      decimal: 1
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
