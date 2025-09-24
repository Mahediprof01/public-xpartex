"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  Download,
  Star,
  Users,
  Calendar,
  Target,
  Trophy,
  Brain,
  Zap,
  Rocket,
} from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  thumbnail: string;
  category: string;
  rating: number;
  enrolledDate: string;
  estimatedTime: string;
}

interface Asset {
  id: string;
  title: string;
  type: "ebook" | "template" | "resource";
  downloadCount: number;
  size: string;
  purchaseDate: string;
}

export default function LearningDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [recentAssets, setRecentAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: "1",
        title: "Advanced React Development",
        instructor: "John Smith",
        progress: 75,
        totalLessons: 24,
        completedLessons: 18,
        thumbnail: "/course-thumbnails/react.jpg",
        category: "Programming",
        rating: 4.8,
        enrolledDate: "2024-01-15",
        estimatedTime: "8 hours remaining",
      },
      {
        id: "2",
        title: "Digital Marketing Fundamentals",
        instructor: "Sarah Johnson",
        progress: 45,
        totalLessons: 16,
        completedLessons: 7,
        thumbnail: "/course-thumbnails/marketing.jpg",
        category: "Marketing",
        rating: 4.6,
        enrolledDate: "2024-02-01",
        estimatedTime: "12 hours remaining",
      },
    ];

    const mockAssets: Asset[] = [
      {
        id: "1",
        title: "React Best Practices Guide",
        type: "ebook",
        downloadCount: 3,
        size: "2.4 MB",
        purchaseDate: "2024-01-20",
      },
      {
        id: "2",
        title: "Marketing Templates Pack",
        type: "template",
        downloadCount: 1,
        size: "15.2 MB",
        purchaseDate: "2024-02-05",
      },
    ];

    setTimeout(() => {
      setEnrolledCourses(mockCourses);
      setRecentAssets(mockAssets);
      setLoading(false);
    }, 1000);
  }, []);

  const totalProgress = enrolledCourses.length > 0 
    ? enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length 
    : 0;

  const completedCourses = enrolledCourses.filter(course => course.progress === 100).length;
  const totalCertificates = completedCourses; // Assuming 1 certificate per completed course

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-700">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-cyan-400 to-blue-500 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Welcome back, Learner! 🎓</h1>
              <p className="text-lg text-sky-100 max-w-2xl">
                Continue your learning journey and unlock new skills. You're making great progress!
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Brain className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-sky-100">Active Courses</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-sky-100">Certificates</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-sky-100">Learning Streak</p>
                  <p className="text-2xl font-bold">12 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sky-600 font-medium">Enrolled Courses</p>
                <p className="text-3xl font-bold text-sky-900 mt-1">{enrolledCourses.length}</p>
                <p className="text-xs text-sky-600 mt-1">
                  {enrolledCourses.length - completedCourses} in progress
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-600 font-medium">Overall Progress</p>
                <p className="text-3xl font-bold text-cyan-900 mt-1">{Math.round(totalProgress)}%</p>
                <div className="mt-2">
                  <Progress value={totalProgress} className="h-2" />
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Certificates</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">{totalCertificates}</p>
                <p className="text-xs text-blue-600 mt-1">
                  Earned certificates
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Digital Assets</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{recentAssets.length}</p>
                <p className="text-xs text-slate-600 mt-1">
                  eBooks & resources
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Download className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Courses */}
      <Card className="overflow-hidden bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200">
        <CardHeader className="bg-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-sky-600" />
                Continue Learning
              </CardTitle>
              <CardDescription className="text-gray-600">Pick up where you left off and keep growing</CardDescription>
            </div>
            <Link href="/profile/learning/courses">
              <Button variant="outline" size="sm" className="hover:bg-sky-50 hover:border-sky-300 transition-colors duration-200">
                View All Courses
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.slice(0, 2).map((course, index) => (
              <div
                key={course.id}
                className="group relative bg-white border border-gray-200 rounded-xl p-6 space-y-4 hover:shadow-xl hover:border-sky-300 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Course Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-sky-900 transition-colors duration-200">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">by {course.instructor}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <Badge
                        variant="secondary"
                        className="bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors duration-200"
                      >
                        {course.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium">Progress</span>
                    <span className="text-sky-600 font-semibold">{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                  <div className="relative">
                    <Progress value={course.progress} className="h-3 bg-gray-200" />
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full transition-all duration-500"
                         style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.estimatedTime}
                    </p>
                    <span className="text-sm font-bold text-sky-600">{Math.round(course.progress)}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/profile/learning/courses/viewer?id=${course.id}`} className="flex-1">
                    <Button className="w-full" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </Link>
                  <Link href={`/profile/learning/courses/${course.id}`}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Assets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Assets</CardTitle>
              <CardDescription>Your latest downloads and purchases</CardDescription>
            </div>
            <Link href="/profile/learning/assets">
              <Button variant="outline" size="sm">
                View All Assets
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAssets.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {asset.type === "ebook" ? (
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Download className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{asset.title}</h4>
                    <p className="text-sm text-gray-600">
                      {asset.size} • Downloaded {asset.downloadCount} times
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
