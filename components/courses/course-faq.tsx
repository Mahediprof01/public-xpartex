"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Course, CourseFAQ } from "@/types/course"

interface CourseFAQProps {
  course: Course
}

export function CourseFAQSection({ course }: CourseFAQProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const expandAll = () => {
    setExpandedItems(new Set(course.faq.map(item => item.id)))
  }

  const collapseAll = () => {
    setExpandedItems(new Set())
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-500" />
              Frequently Asked Questions
            </CardTitle>
            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="text-sm text-sky-600 hover:text-sky-700 font-medium"
              >
                Expand All
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={collapseAll}
                className="text-sm text-sky-600 hover:text-sky-700 font-medium"
              >
                Collapse All
              </button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {course.faq.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {item.question}
                  </span>
                  
                  <div className="flex-shrink-0">
                    {expandedItems.has(item.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedItems.has(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-8 p-6 bg-sky-50 rounded-lg border border-sky-200">
            <h4 className="font-semibold text-sky-900 mb-2">
              Still have questions?
            </h4>
            <p className="text-sky-700 mb-4">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors font-medium">
                Contact Support
              </button>
              <button className="px-4 py-2 border border-sky-300 text-sky-700 rounded-md hover:bg-sky-100 transition-colors font-medium">
                Browse Help Center
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
