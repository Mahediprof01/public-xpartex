"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BookOpen,
  Clock,
  Play,
  Star,
  Search,
  Filter,
  Calendar,
  User,
  Award,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  status: "in-progress" | "completed" | "not-started";
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

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
        thumbnail: "/course-production.jpg",
        category: "Programming",
        rating: 4.8,
        enrolledDate: "2024-01-15",
        estimatedTime: "8 hours remaining",
        description: "Master advanced React concepts including hooks, context, and performance optimization.",
        duration: "32 hours",
        level: "Advanced",
        status: "in-progress",
      },
      {
        id: "2",
        title: "Digital Marketing Fundamentals",
        instructor: "Sarah Johnson",
        progress: 45,
        totalLessons: 16,
        completedLessons: 7,
        thumbnail: "/course-production.jpg",
        category: "Marketing",
        rating: 4.6,
        enrolledDate: "2024-02-01",
        estimatedTime: "12 hours remaining",
        description: "Learn the basics of digital marketing including SEO, social media, and content marketing.",
        duration: "20 hours",
        level: "Beginner",
        status: "in-progress",
      },
      {
        id: "3",
        title: "UI/UX Design Principles",
        instructor: "Mike Chen",
        progress: 100,
        totalLessons: 18,
        completedLessons: 18,
        thumbnail: "/course-sustainable.jpg",
        category: "Design",
        rating: 4.9,
        enrolledDate: "2023-12-10",
        estimatedTime: "Completed",
        description: "Complete guide to user interface and user experience design principles.",
        duration: "25 hours",
        level: "Intermediate",
        status: "completed",
      },
      {
        id: "4",
        title: "Python for Data Science",
        instructor: "Dr. Emily Rodriguez",
        progress: 0,
        totalLessons: 30,
        completedLessons: 0,
        thumbnail: "/course-patt.jpg",
        category: "Programming",
        rating: 4.7,
        enrolledDate: "2024-02-15",
        estimatedTime: "40 hours",
        description: "Learn Python programming for data analysis, visualization, and machine learning.",
        duration: "40 hours",
        level: "Intermediate",
        status: "not-started",
      },
    ];

    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter courses based on search and filters
  useEffect(() => {
    let filtered = courses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(course => course.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, statusFilter, categoryFilter]);

  const getStatusBadge = (status: string, progress: number) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-gradient-to-r from-cyan-500 to-blue-400 text-white shadow-lg">In Progress</Badge>;
      case "not-started":
        return <Badge className="bg-sky-100 text-sky-700 border-sky-300">Not Started</Badge>;
      default:
        return null;
    }
  };

  const categories = [...new Set(courses.map(course => course.category))];

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
              <h1 className="text-4xl font-bold tracking-tight">My Learning Journey 📚</h1>
              <p className="text-lg text-sky-100 max-w-2xl">
                Explore your enrolled courses, track progress, and continue building your skills
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-sky-100">Total Courses</p>
                  <p className="text-2xl font-bold">{courses.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-sky-100">In Progress</p>
                  <p className="text-2xl font-bold">{courses.filter(c => c.status === 'in-progress').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-sky-100">Completed</p>
                  <p className="text-2xl font-bold">{courses.filter(c => c.status === 'completed').length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-sky-100">Avg Progress</p>
                  <p className="text-2xl font-bold">{Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length || 0)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses, instructors, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200">
            <div className="aspect-video bg-gradient-to-br from-sky-100 to-cyan-200 relative">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-course.jpg";
                }}
              />
              <div className="absolute top-2 right-2">
                {getStatusBadge(course.status, course.progress)}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <CardHeader className="pb-3 bg-white/50 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-sky-700 transition-colors duration-200">{course.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1 text-sky-600">
                    <User className="h-3 w-3" />
                    {course.instructor}
                  </CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200 border-sky-300">{course.category}</Badge>
                <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 border-cyan-300">{course.level}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 bg-white/70 backdrop-blur-sm">
              <p className="text-sm text-sky-700 line-clamp-2">{course.description}</p>

              <div className="flex items-center justify-between text-sm text-sky-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
              </div>

              {course.status !== "not-started" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-sky-600">
                    <span className="font-medium">Progress</span>
                    <span className="font-semibold">{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                  <div className="relative">
                    <Progress value={course.progress} className="h-2 bg-sky-200" />
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full transition-all duration-500"
                         style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {course.status === "completed" ? (
                  <>
                    <Link href={`/profile/learning/courses/certificates?courseId=${course.id}`} className="flex-1">
                      <Button variant="outline" className="w-full border-sky-300 text-sky-700 hover:bg-sky-50 hover:border-sky-400" size="sm">
                        <Award className="h-4 w-4 mr-2" />
                        Certificate
                      </Button>
                    </Link>
                    <Link href={`/profile/learning/courses/reviews?courseId=${course.id}`}>
                      <Button variant="outline" className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400" size="sm">
                        <Star className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href={`/profile/learning/courses/viewer?id=${course.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white shadow-lg" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        {course.status === "not-started" ? "Start" : "Continue"}
                      </Button>
                    </Link>
                    <Link href={`/profile/learning/courses/${course.id}`}>
                      <Button variant="outline" className="border-sky-300 text-sky-700 hover:bg-sky-50 hover:border-sky-400" size="sm">
                        Details
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your filters to see more courses."
                : "You haven't enrolled in any courses yet."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
