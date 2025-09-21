"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  className?: string
  suffix?: string
  prefix?: string
  decimal?: number
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  className = "",
  suffix = "",
  prefix = ""
  , decimal
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000
  })
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(value)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [motionValue, isInView, value, delay])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest))
    })

    return unsubscribe
  }, [springValue])

  const formatNumber = (num: number) => {
    if (typeof decimal === 'number' && decimal > 0) {
      return num.toFixed(decimal)
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toLocaleString()
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {prefix}{formatNumber(displayValue)}{suffix}
    </motion.span>
  )
}
