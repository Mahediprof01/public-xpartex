"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  FileText, 
  HelpCircle, 
  Clipboard,
  Clock,
  Eye,
  Lock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Course, CourseModule, CourseLesson } from "@/types/course"

interface EnhancedCurriculumProps {
  course: Course
}

export function EnhancedCurriculum({ course }: EnhancedCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set([course.modules[0]?.id]))

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const expandAll = () => {
    setExpandedModules(new Set(course.modules.map(m => m.id)))
  }

  const collapseAll = () => {
    setExpandedModules(new Set())
  }

  const getIconForLessonType = (type: CourseLesson['type']) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />
      case 'article':
        return <FileText className="w-4 h-4" />
      case 'quiz':
        return <HelpCircle className="w-4 h-4" />
      case 'assignment':
        return <Clipboard className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTotalDuration = () => {
    return course.modules.reduce((total, module) => {
      const moduleDuration = module.lessons.reduce((moduleTotal, lesson) => {
        const minutes = parseInt(lesson.duration.split(' ')[0]) || 0
        return moduleTotal + minutes
      }, 0)
      return total + moduleDuration
    }, 0)
  }

  const getTotalLessons = () => {
    return course.modules.reduce((total, module) => total + module.lessons.length, 0)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Course Curriculum
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={expandAll}>
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll}>
              Collapse All
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>{course.modules.length} modules</span>
          <span>{getTotalLessons()} lessons</span>
          <span>{Math.floor(getTotalDuration() / 60)}h {getTotalDuration() % 60}m total length</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {course.modules.map((module, moduleIndex) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: moduleIndex * 0.1 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Module Header */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {expandedModules.has(module.id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                  <span className="font-semibold text-gray-900">
                    Module {moduleIndex + 1}: {module.title}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{module.lessons.length} lessons</span>
                <span>{module.duration}</span>
              </div>
            </button>

            {/* Module Description */}
            {expandedModules.has(module.id) && module.description && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            )}

            {/* Module Lessons */}
            <AnimatePresence>
              {expandedModules.has(module.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="divide-y divide-gray-100">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: lessonIndex * 0.05 }}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex items-center gap-2 text-gray-500">
                              {getIconForLessonType(lesson.type)}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">
                                  {lesson.title}
                                </span>
                                
                                {lesson.isPreview && (
                                  <Badge variant="outline" className="text-xs">
                                    <Eye className="w-3 h-3 mr-1" />
                                    Preview
                                  </Badge>
                                )}
                                
                                {!lesson.isPreview && (
                                  <Lock className="w-3 h-3 text-gray-400" />
                                )}
                              </div>
                              
                              {lesson.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {lesson.description}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration}</span>
                            </div>
                            
                            {lesson.isPreview && (
                              <Button variant="ghost" size="sm" className="text-sky-600 hover:text-sky-700">
                                Preview
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
