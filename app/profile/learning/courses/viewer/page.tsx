"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Clock,
  CheckCircle,
  FileText,
  Download
} from "lucide-react"

export default function CourseViewerPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [progress, setProgress] = useState(35)

  const course = {
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    totalLessons: 24,
    completedLessons: 8,
    duration: "12 hours",
    progress: 35
  }

  const lessons = [
    { id: 1, title: "Introduction to Advanced React", duration: "15:30", completed: true, type: "video" },
    { id: 2, title: "React Hooks Deep Dive", duration: "22:45", completed: true, type: "video" },
    { id: 3, title: "State Management Patterns", duration: "18:20", completed: true, type: "video" },
    { id: 4, title: "Performance Optimization", duration: "25:10", completed: false, type: "video", current: true },
    { id: 5, title: "Testing React Components", duration: "20:15", completed: false, type: "video" },
    { id: 6, title: "Quiz: React Fundamentals", duration: "10:00", completed: false, type: "quiz" },
  ]

  const discussions = [
    { id: 1, user: "Alex Chen", message: "Great explanation of useEffect!", time: "2 hours ago", replies: 3 },
    { id: 2, user: "Maria Garcia", message: "Can you explain the difference between useMemo and useCallback?", time: "5 hours ago", replies: 7 },
    { id: 3, user: "John Smith", message: "The performance tips are really helpful!", time: "1 day ago", replies: 2 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-cyan-400 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <p className="text-sky-100">Instructor: {course.instructor}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-sky-100">Progress</div>
            <div className="text-2xl font-bold">{course.progress}%</div>
          </div>
        </div>
        <div className="mt-4">
          <Progress value={course.progress} className="h-2 bg-sky-500/30" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden">
            <div className="relative bg-black aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </div>
                  <p className="text-lg font-semibold">Performance Optimization</p>
                  <p className="text-sm text-gray-300">25:10 duration</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center gap-4">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Progress value={45} className="h-1" />
                  </div>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Course Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Lesson Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    In this lesson, we'll explore advanced performance optimization techniques for React applications. 
                    You'll learn about memoization, code splitting, and lazy loading to make your apps faster and more efficient.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">What you'll learn:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>React.memo and when to use it</li>
                      <li>useMemo and useCallback hooks</li>
                      <li>Code splitting with React.lazy</li>
                      <li>Bundle analysis and optimization</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    Lesson Discussions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {discussions.map((discussion) => (
                    <div key={discussion.id} className="border-l-4 border-blue-200 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">{discussion.user}</span>
                        <span className="text-xs text-gray-500">{discussion.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{discussion.message}</p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-xs">
                          Reply
                        </Button>
                        <span className="text-xs text-gray-500">{discussion.replies} replies</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Lesson Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Course Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lessons.map((lesson, index) => (
                <div 
                  key={lesson.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                    lesson.current 
                      ? 'bg-blue-50 border-blue-200' 
                      : lesson.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentLesson(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      lesson.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : lesson.type === 'quiz' ? (
                        <FileText className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{lesson.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {lesson.duration}
                        {lesson.type === 'quiz' && (
                          <Badge variant="secondary" className="text-xs">Quiz</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Course Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span>{course.completedLessons}/{course.totalLessons} lessons</span>
              </div>
              <Progress value={(course.completedLessons / course.totalLessons) * 100} />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Duration</span>
                <span>{course.duration}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
