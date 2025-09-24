"use client";

import React from "react";
import {
  Users,
  Star,
  Clock,
  Play,
  Award,
  Edit,
  ArrowLeft,
  BookOpen,
  User,
  CheckCircle,
  Eye,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const ViewCourse = ({ course }: { course: any }) => {
  const lessons = course.lessons || [
    {
      id: 1,
      title: "Introduction to Fashion Design",
      duration: "5 min",
      completed: true,
      type: "video",
    },
    {
      id: 2,
      title: "Color Theory & Application",
      duration: "20 min",
      completed: false,
      type: "video",
    },
    {
      id: 3,
      title: "Pattern Making Basics",
      duration: "35 min",
      completed: false,
      type: "video",
    },
    {
      id: 4,
      title: "Fabric Selection Guide",
      duration: "15 min",
      completed: false,
      type: "reading",
    },
    {
      id: 5,
      title: "Sewing Techniques",
      duration: "45 min",
      completed: false,
      type: "video",
    },
    {
      id: 6,
      title: "Final Project",
      duration: "60 min",
      completed: false,
      type: "assignment",
    },
  ];

  const lessonProgress = [
    { lesson: "Introduction", completion: 100 },
    { lesson: "Color Theory", completion: 85 },
    { lesson: "Pattern Making", completion: 70 },
    { lesson: "Fabric Selection", completion: 60 },
    { lesson: "Sewing Techniques", completion: 45 },
    { lesson: "Final Project", completion: 30 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-gray-600">{course.subtitle}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Link
              href={`/profile/learning/instructors/courses/${course.id}/course-builder`}
              className="flex items-baseline"
            >
              <Edit className="h-4 w-4 mr-1" />
              Course Builder
            </Link>
          </Button>
        </div>
      </div>

      {/* Course Hero */}
      <Card className="shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={course.thumbnail || "/placeholder.jpg"}
            alt={course.title}
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
            <h2 className="text-3xl font-bold text-white">{course.title}</h2>
            <p className="text-white/90 mt-1">{course.subtitle}</p>
            <div className="flex items-center gap-2 mt-2">
              {course.isFeatured && (
                <Badge className="bg-purple-600 text-white border-0 flex items-center gap-1">
                  <Star className="h-3 w-3" /> Featured
                </Badge>
              )}
              {course.hasCertification && (
                <Badge className="bg-blue-500 text-white border-0 flex items-center gap-1">
                  <Award className="h-3 w-3" /> Certificate
                </Badge>
              )}
              <Badge
                variant="secondary"
                className="bg-gray-800/60 text-white flex items-center gap-1"
              >
                <Clock className="h-3 w-3" />{" "}
                {course.stats?.duration || "2h 30m"}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Course Overview & Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Course Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{course.description}</p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What you'll learn:
                </h3>
                <ul className="space-y-1">
                  {(
                    course.objectives || [
                      "Master fundamental fashion design principles",
                      "Learn advanced color theory and application",
                      "Understand pattern making and construction",
                      "Develop professional sewing techniques",
                      "Create your own fashion portfolio",
                    ]
                  ).map((obj: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Lessons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-blue-500" />
                Course Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lessons.map((lesson: any) => (
                <div
                  key={lesson.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:shadow transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <Clock className="h-3 w-3" /> {lesson.duration}
                        <Badge variant="secondary" className="text-xs">
                          {lesson.type}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <div>
                    {lesson.completed ? (
                      <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Completed
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1"
                      >
                        <Play className="h-4 w-4" /> Watch
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Instructor Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Instructor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <img
                  src={course.instructor?.avatar || "/placeholder-user.jpg"}
                  alt={course.instructor?.name || "Instructor"}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {course.instructor?.name || "Jane Doe"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {course.instructor?.bio || "Expert Instructor"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Course Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lessonProgress.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {item.lesson}
                    </span>
                    <span className="text-sm text-gray-600">
                      {item.completion}%
                    </span>
                  </div>
                  <Progress value={item.completion} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Mock course data
const mockCourse = {
  id: "1",
  title: "Complete Fashion Design Masterclass",
  subtitle: "From Concept to Creation - Master Professional Fashion Design",
  description:
    "This comprehensive course covers all aspects of fashion design, from basic concepts to advanced techniques. Students will learn about color theory, pattern making, fabric selection, and sewing techniques.",
  thumbnail: "/course-fashion-design.jpg",
  isFeatured: true,
  hasCertification: true,
  stats: {
    enrolledStudents: 2000,
    rating: 4.7,
    duration: "2h 30m",
    monthlyRevenue: 12500,
    completionRate: 78,
    totalLessons: 24,
    totalModules: 6,
  },
  instructor: {
    name: "Jane Doe",
    avatar: "/placeholder-user.jpg",
    bio: "Fashion Design Expert with 10+ years experience",
  },
  objectives: [
    "Master fundamental fashion design principles",
    "Learn advanced color theory and application",
    "Understand pattern making and construction",
    "Develop professional sewing techniques",
    "Create your own fashion portfolio",
  ],
};

export default function CourseDetailPage({
  params,
}: {
  // Accept promise-like params to match Next generated PageProps signature.
  params?: Promise<{ id?: string }>;
}) {
  // Resolve sync params (client components receive sync params at runtime)
  const resolvedParams = (params as any)?.id ? params : undefined
  const course = mockCourse;

  return <ViewCourse course={course} />;
}
