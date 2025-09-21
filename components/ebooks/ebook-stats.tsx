"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Download, Star } from "lucide-react"
import { StatsCard } from "@/components/ui/stats-card"

export function EbookStats() {
  const stats = [
    {
      title: "Total E-Books",
      value: 847,
      icon: BookOpen,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0
    },
    {
      title: "Expert Authors",
      value: 156,
      icon: Users,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.1
    },
    {
      title: "Downloads",
      value: 125000,
      icon: Download,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.2
    },
    {
      title: "Average Rating",
      value: 4.8,
      icon: Star,
      gradient: "from-sky-500 to-cyan-400",
      delay: 0.3,
      suffix: "/5"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
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
    </motion.div>
  )
}
