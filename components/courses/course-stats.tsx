"use client"

import { BookOpen, Users, GraduationCap, CheckCircle } from "lucide-react"
import { StatsCard } from "@/components/ui/stats-card"

export default function CourseStats() {
  const stats = [
    {
      title: "Total Courses",
      value: 847,
      icon: BookOpen,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0
    },
    {
      title: "Expert Instructors",
      value: 234,
      icon: Users,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.1
    },
    {
      title: "Students Enrolled",
      value: 45678,
      icon: GraduationCap,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.2
    },
    {
      title: "Completion Rate",
      value: 94,
      suffix: "%",
      icon: CheckCircle,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.3
    },
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
        />
      ))}
    </div>
  )
}
