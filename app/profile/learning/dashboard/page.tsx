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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Track your learning progress and access your educational resources
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              {enrolledCourses.length - completedCourses} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalProgress)}%</div>
            <Progress value={totalProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCertificates}</div>
            <p className="text-xs text-muted-foreground">
              Earned certificates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Digital Assets</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentAssets.length}</div>
            <p className="text-xs text-muted-foreground">
              eBooks & resources
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Current Courses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </div>
            <Link href="/profile/learning/courses">
              <Button variant="outline" size="sm">
                View All Courses
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.slice(0, 2).map((course) => (
              <div key={course.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-600">by {course.instructor}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                  <Progress value={course.progress} />
                  <p className="text-xs text-gray-500">{course.estimatedTime}</p>
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
