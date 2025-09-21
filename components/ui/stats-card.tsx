"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  icon: LucideIcon
  delay?: number
  className?: string
  iconClassName?: string
  gradient?: string
  decimal?: number
}

export function StatsCard({
  title,
  value,
  suffix = "",
  prefix = "",
  icon: Icon,
  delay = 0,
  className,
  iconClassName,
  gradient = "from-blue-500 to-cyan-500"
  , decimal
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn("group", className)}
    >
      <Card className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            {/* Icon Container */}
            <div className={cn(
              "relative flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br shadow-md group-hover:shadow-lg transition-all duration-300",
              gradient,
              iconClassName
            )}>
              <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />

              {/* Glow effect */}
              <div className={cn(
                "absolute inset-0 rounded-lg bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg",
                gradient
              )} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-2xl font-bold text-gray-900 mb-0.5">
                <AnimatedCounter
                  value={value}
                  suffix={suffix}
                  prefix={prefix}
                  delay={delay + 0.2}
                  duration={2.5}
                  decimal={decimal}
                />
              </div>
              <p className="text-xs font-medium text-gray-600 leading-tight">
                {title}
              </p>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Icon className="w-full h-full text-gray-900" strokeWidth={0.5} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
