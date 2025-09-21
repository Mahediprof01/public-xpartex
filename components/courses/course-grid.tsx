"use client"

import { motion } from "framer-motion"
import CourseCard from "./course-card"

const mockCourses = [
  {
    id: "1",
    title: "Complete Fashion Design Masterclass",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12547,
    duration: "8 weeks",
    level: "Intermediate",
    price: 199,
    originalPrice: 299,
    image: "/course-fashion-design.jpg",
  },
  {
    id: "2",
    title: "Textile Production Management",
    instructor: "Michael Chen",
    rating: 4.6,
    students: 8934,
    duration: "6 weeks",
    level: "Advanced",
    price: 149,
    originalPrice: 199,
    image: "/course-production.jpg",
  },
  {
    id: "3",
    title: "Sustainable Fashion Business",
    instructor: "Emma Rodriguez",
    rating: 4.9,
    students: 15623,
    duration: "10 weeks",
    level: "Beginner",
    price: 99,
    originalPrice: 149,
    image: "/course-sustainable.jpg",
  },
]

export default function CourseGrid() {
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
    <div className="space-y-6">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-semibold">Available Courses ({mockCourses.length})</h2>
        <select className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors">
          <option>Sort by: Most Popular</option>
          <option>Sort by: Newest</option>
          <option>Sort by: Price Low to High</option>
          <option>Sort by: Price High to Low</option>
          <option>Sort by: Rating</option>
        </select>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mockCourses.map((course) => (
          <motion.div
            key={course.id}
            variants={itemVariants}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
