"use client"

import { Users, BookOpen, Star, FileText } from "lucide-react"
import { StatsCard } from "@/components/ui/stats-card"

export function AuthorStats() {
  const stats = [
    { 
      title: "Expert Authors", 
      value: 15, 
      icon: Users,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0
    },
    { 
      title: "Published Books", 
      value: 85, 
      icon: BookOpen,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.1
    },
    { 
      title: "Total Readers", 
      value: 75000, 
      icon: FileText,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.2
    },
    { 
      title: "Average Rating", 
      value: 4.7, 
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
