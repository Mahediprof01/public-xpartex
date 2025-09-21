"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, Download, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/ui/animated-counter"

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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline space-x-1">
                    <AnimatedCounter
                      value={stat.value}
                      className="text-2xl font-bold text-gray-900"
                      delay={stat.delay}
                    />
                    {stat.suffix && (
                      <span className="text-lg font-semibold text-gray-600">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
