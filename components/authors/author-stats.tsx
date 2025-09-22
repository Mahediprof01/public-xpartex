"use client"

import { Users, BookOpen, Star, MessageSquare } from "lucide-react"
import { StatsCard } from "@/components/ui/stats-card"
import { Author } from "@/data/authors"

interface AuthorStatsProps {
  author: Author
}

export function AuthorStats({ author }: AuthorStatsProps) {
  const stats = [
    { 
      title: "Total Readers", 
      value: author.totalReaders, 
      icon: Users,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0
    },
    { 
      title: "Books Published", 
      value: author.totalBooks, 
      icon: BookOpen,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.1
    },
    { 
      title: "Average Rating", 
      value: author.rating, 
      suffix: "★",
      icon: Star,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.2,
      decimal: 1
    },
    { 
      title: "Total Reviews", 
      value: author.totalReviews, 
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
