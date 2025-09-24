"use client";

import { useState } from "react";
import {
  Plus,
  Upload,
  BookOpen,
  Users,
  DollarSign,
  Award,
  TrendingUp,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Edit,
  Eye,
  BarChart3,
  Copy,
  Archive,
  Trash2,
  Star,
  Clock,
  Play,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    title: "Complete Fashion Design Masterclass",
    subtitle: "From Concept to Creation - Master Professional Fashion Design",
    thumbnail: "/course-fashion-design.jpg",
    category: "Fashion Design",
    level: "Intermediate",
    status: "published",
    isFeatured: true,
    hasCertification: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
    stats: {
      enrolledStudents: 12547,
      rating: 4.8,
      totalReviews: 892,
      monthlyRevenue: 2840,
      completionRate: 87,
      totalLessons: 45,
      duration: "12 weeks",
    },
  },
  {
    id: "2",
    title: "Textile Production Management",
    subtitle: "Advanced Techniques for Modern Textile Manufacturing",
    thumbnail: "/course-production.jpg",
    category: "Textile Production",
    level: "Advanced",
    status: "published",
    isFeatured: false,
    hasCertification: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-02-18",
    stats: {
      enrolledStudents: 8934,
      rating: 4.6,
      totalReviews: 567,
      monthlyRevenue: 1920,
      completionRate: 82,
      totalLessons: 38,
      duration: "10 weeks",
    },
  },
  {
    id: "3",
    title: "Sustainable Fashion Business",
    subtitle: "Building Eco-Friendly Fashion Brands",
    thumbnail: "/course-sustainable.jpg",
    category: "Business",
    level: "Beginner",
    status: "draft",
    isFeatured: false,
    hasCertification: false,
    createdAt: "2024-02-05",
    updatedAt: "2024-02-22",
    stats: {
      enrolledStudents: 0,
      rating: 0,
      totalReviews: 0,
      monthlyRevenue: 0,
      completionRate: 0,
      totalLessons: 32,
      duration: "8 weeks",
    },
  },
  {
    id: "4",
    title: "Garment Quality Control",
    subtitle: "Professional Quality Assurance in Fashion Manufacturing",
    thumbnail: "/quality-control-course.jpg",
    category: "Quality Control",
    level: "Intermediate",
    status: "published",
    isFeatured: true,
    hasCertification: true,
    createdAt: "2024-01-20",
    updatedAt: "2024-02-15",
    stats: {
      enrolledStudents: 6754,
      rating: 4.9,
      totalReviews: 423,
      monthlyRevenue: 1650,
      completionRate: 91,
      totalLessons: 28,
      duration: "6 weeks",
    },
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // Filter and sort courses
  const filteredCourses = mockCourses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || course.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || course.category === categoryFilter;
      const matchesLevel =
        levelFilter === "all" || course.level === levelFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "popular":
          return b.stats.enrolledStudents - a.stats.enrolledStudents;
        case "revenue":
          return b.stats.monthlyRevenue - a.stats.monthlyRevenue;
        case "rating":
          return b.stats.rating - a.stats.rating;
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-3 w-3" />;
      case "draft":
        return <AlertCircle className="h-3 w-3" />;
      case "archived":
        return <Archive className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 shadow-xl rounded-2xl p-6 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Courses</h1>
            <p className="text-gray-200 mt-1">
              Create, edit, and analyze your course performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Course
            </Button>

            <Button className="bg-[#00BFFF] hover:bg-blue-500">
              <Link
                href="/profile/learning/instructors/courses/create"
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Course Performance Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">
                  My Courses
                </p>
                <p className="text-3xl font-bold text-blue-900">8</p>
                <p className="text-xs text-blue-600 flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 new courses this month
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-200 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700 mb-1">
                  Total Students
                </p>
                <p className="text-3xl font-bold text-emerald-900">12,547</p>
                <p className="text-xs text-emerald-600 flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% enrollment growth
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-200 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-2xl p-6 border border-violet-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-violet-700 mb-1">
                  Monthly Earnings
                </p>
                <p className="text-3xl font-bold text-violet-900">$7,310</p>
                <p className="text-xs text-violet-600 flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% revenue increase
                </p>
              </div>
              <div className="h-12 w-12 bg-violet-200 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-violet-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700 mb-1">
                  Course Rating
                </p>
                <p className="text-3xl font-bold text-amber-900">4.7</p>
                <p className="text-xs text-amber-600 flex items-center mt-2">
                  <Star className="h-3 w-3 mr-1 fill-amber-400 text-amber-400" />
                  Average across all courses
                </p>
              </div>
              <div className="h-12 w-12 bg-amber-200 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-amber-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Fashion Design">Fashion Design</SelectItem>
                  <SelectItem value="Textile Production">
                    Textile Production
                  </SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Quality Control">
                    Quality Control
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="revenue">Highest Revenue</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCourses.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-800">
                  {selectedCourses.length} course
                  {selectedCourses.length > 1 ? "s" : ""} selected
                </span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setSelectedCourses([])}
                >
                  Clear selection
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Course Library Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Your Course Library
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Course Thumbnail with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Course Status & Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <Badge
                      className={`${getStatusColor(
                        course.status
                      )} flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border-0 shadow-sm`}
                    >
                      {getStatusIcon(course.status)}
                      {course.status.charAt(0).toUpperCase() +
                        course.status.slice(1)}
                    </Badge>
                    {course.isFeatured && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full border-0 shadow-sm flex items-center gap-1.5">
                        <Star className="h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                    {course.hasCertification && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full border-0 shadow-sm flex items-center gap-1.5">
                        <Award className="h-3 w-3" />
                        Certificate
                      </Badge>
                    )}
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-4 right-4">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleCourseSelection(course.id)}
                      className="h-5 w-5 rounded border-2 border-white bg-white/20 backdrop-blur-sm text-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  {/* Hover Play Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                </div>

                {/* Course Details (Title, Subtitle, Stats, Category, Level, Last Updated) */}
                <div className="p-6 pt-4">
                  {/* Title & Subtitle */}
                  <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {course.subtitle}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-4 text-xs mb-4 flex-wrap">
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                      <Users className="h-3 w-3 text-blue-600" />
                      <span className="text-blue-800 font-medium">
                        {course.stats.enrolledStudents.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-700 font-medium">
                        {course.stats.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-700 font-medium">
                        {course.stats.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        {course.category}
                      </span>
                    </div>

                    {/* Category & Level Tags */}
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500">
                      Last updated{" "}
                      {new Date(course.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-[#00BFFF] hover:bg-blue-500 text-white rounded-full px-2 hover:text-white"
                        asChild
                      >
                        <Link
                          href={`/profile/learning/instructors/courses/${course.id}`}
                          className="flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                      </Button>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="h-4 w-4 mr-2" />
                          Manage Students
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate Course
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive Course
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Professional List View */
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-700">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCourses(
                          filteredCourses.map((course) => course.id)
                        );
                      } else {
                        setSelectedCourses([]);
                      }
                    }}
                    checked={
                      selectedCourses.length === filteredCourses.length &&
                      filteredCourses.length > 0
                    }
                  />
                </div>
                <div className="col-span-4">Course</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Students</div>
                <div className="col-span-1">Rating</div>
                <div className="col-span-1">Revenue</div>
                <div className="col-span-1">Updated</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Selection Checkbox */}
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => toggleCourseSelection(course.id)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                    </div>

                    {/* Course Info */}
                    <div className="col-span-4 flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        {course.isFeatured && (
                          <div className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs px-1 rounded-full">
                            ⭐
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {course.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                            {course.category}
                          </span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                            {course.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${getStatusColor(
                            course.status
                          )} flex items-center gap-1 text-xs px-2 py-1 rounded-full`}
                        >
                          {getStatusIcon(course.status)}
                          {course.status.charAt(0).toUpperCase() +
                            course.status.slice(1)}
                        </Badge>
                        {course.hasCertification && (
                          <Award className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </div>

                    {/* Students */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">
                          {course.stats.enrolledStudents.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">
                          {course.stats.rating}
                        </span>
                      </div>
                    </div>

                    {/* Revenue */}
                    <div className="col-span-1">
                      <div className="text-sm font-medium text-emerald-600">
                        ${course.stats.monthlyRevenue.toLocaleString()}
                      </div>
                    </div>

                    {/* Updated */}
                    <div className="col-span-1">
                      <div className="text-xs text-gray-500">
                        {new Date(course.updatedAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          title="Edit Course"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Course
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="h-4 w-4 mr-2" />
                              Manage Students
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate Course
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive Course
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ||
              statusFilter !== "all" ||
              categoryFilter !== "all" ||
              levelFilter !== "all"
                ? "Try adjusting your filters to see more courses."
                : "Get started by creating your first course."}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Course
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions FAB */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Button
          size="lg"
          className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
