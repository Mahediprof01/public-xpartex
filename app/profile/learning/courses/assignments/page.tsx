"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Trophy, 
  Target,
  Calendar,
  Upload,
  Play,
  Pause,
  RotateCcw
} from "lucide-react"

export default function AssignmentsQuizzesPage() {
  const [selectedTab, setSelectedTab] = useState("assignments")
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds

  const assignments = [
    {
      id: 1,
      title: "React Component Architecture",
      course: "Advanced React Development",
      dueDate: "2025-01-15",
      status: "submitted",
      score: 85,
      maxScore: 100,
      submittedAt: "2025-01-10",
      description: "Create a scalable component architecture for a large React application"
    },
    {
      id: 2,
      title: "Performance Optimization Project",
      course: "Advanced React Development",
      dueDate: "2025-01-20",
      status: "pending",
      description: "Optimize a React application for better performance using various techniques"
    },
    {
      id: 3,
      title: "State Management Implementation",
      course: "Advanced React Development",
      dueDate: "2025-01-25",
      status: "draft",
      description: "Implement a custom state management solution using React Context and useReducer"
    }
  ]

  const quizzes = [
    {
      id: 1,
      title: "React Hooks Fundamentals",
      course: "Advanced React Development",
      questions: 15,
      duration: 30,
      attempts: 2,
      maxAttempts: 3,
      bestScore: 92,
      status: "completed",
      lastAttempt: "2025-01-08"
    },
    {
      id: 2,
      title: "Performance Optimization Quiz",
      course: "Advanced React Development",
      questions: 20,
      duration: 45,
      attempts: 0,
      maxAttempts: 2,
      status: "available"
    },
    {
      id: 3,
      title: "Final Assessment",
      course: "Advanced React Development",
      questions: 50,
      duration: 90,
      attempts: 0,
      maxAttempts: 1,
      status: "locked",
      unlockDate: "2025-02-01"
    }
  ]

  const sampleQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of React.memo?",
      options: [
        "To memoize component state",
        "To prevent unnecessary re-renders",
        "To cache API responses",
        "To optimize bundle size"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "When should you use useCallback?",
      options: [
        "Always when defining functions",
        "When passing functions to child components",
        "Only in class components",
        "When functions have dependencies"
      ],
      correct: 1
    }
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'submitted':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'available':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'locked':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Assignments & Quizzes</h1>
        <p className="text-indigo-100">Track your progress and complete assessments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Total Assignments</p>
                <p className="text-xl font-bold text-blue-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600">Completed</p>
                <p className="text-xl font-bold text-green-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Average Score</p>
                <p className="text-xl font-bold text-purple-900">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600">Pending</p>
                <p className="text-xl font-bold text-orange-900">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-4">
          <div className="grid gap-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{assignment.course}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{assignment.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Due: {assignment.dueDate}
                      </div>
                      {assignment.score && (
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          Score: {assignment.score}/{assignment.maxScore}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {assignment.status === 'draft' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Upload className="h-4 w-4 mr-2" />
                          Submit
                        </Button>
                      )}
                      {assignment.status === 'pending' && (
                        <Button size="sm" variant="outline">
                          View Submission
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          {currentQuiz === null ? (
            <div className="grid gap-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <Badge className={getStatusColor(quiz.status)}>
                        {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{quiz.course}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Questions</p>
                        <p className="text-lg font-semibold">{quiz.questions}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="text-lg font-semibold">{quiz.duration} min</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Attempts</p>
                        <p className="text-lg font-semibold">{quiz.attempts}/{quiz.maxAttempts}</p>
                      </div>
                      {quiz.bestScore && (
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Best Score</p>
                          <p className="text-lg font-semibold text-green-600">{quiz.bestScore}%</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      {quiz.status === 'locked' && (
                        <p className="text-sm text-gray-600">
                          Unlocks on {quiz.unlockDate}
                        </p>
                      )}
                      
                      <div className="flex gap-2 ml-auto">
                        {quiz.status === 'available' && quiz.attempts < quiz.maxAttempts && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => setCurrentQuiz(quiz.id)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Quiz
                          </Button>
                        )}
                        {quiz.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            View Results
                          </Button>
                        )}
                        {quiz.attempts > 0 && quiz.attempts < quiz.maxAttempts && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setCurrentQuiz(quiz.id)}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Retake
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Quiz Taking Interface
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Performance Optimization Quiz</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-orange-600">
                      <Clock className="h-4 w-4" />
                      <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentQuiz(null)}
                    >
                      Exit Quiz
                    </Button>
                  </div>
                </div>
                <Progress value={50} className="mt-2" />
                <p className="text-sm text-gray-600">Question 1 of 2</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {sampleQuestions.map((question, index) => (
                  <div key={question.id} className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {index + 1}. {question.question}
                    </h3>
                    <RadioGroup 
                      value={quizAnswers[question.id]} 
                      onValueChange={(value) => setQuizAnswers(prev => ({...prev, [question.id]: value}))}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-${optionIndex}`} />
                          <Label htmlFor={`q${question.id}-${optionIndex}`} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
                
                <div className="flex justify-between pt-6">
                  <Button variant="outline">Previous</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
