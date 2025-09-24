"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Users,
  Star,
  DollarSign,
  Award,
  TrendingUp,
  TrendingDown,
  Download,
  BookOpen,
  Target,
  Globe,
  MessageSquare,
  Activity,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieChartIcon,
  Map,
  Trophy,
  CheckCircle,
  Clock,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockAnalytics = {
  metrics: {
    totalEnrollments: 12345,
    revenue: 15230,
    completionRate: 87,
    activeStudents: 8543,
    averageRating: 4.6,
    refundRate: 2.3,
    enrollmentGrowth: 12.5,
    revenueGrowth: 8.2,
    ratingGrowth: -1.2,
  },
  trends: [
    { month: "Jan", enrollments: 1200, revenue: 2000 },
    { month: "Feb", enrollments: 1400, revenue: 2500 },
    { month: "Mar", enrollments: 1100, revenue: 1800 },
    { month: "Apr", enrollments: 1600, revenue: 3000 },
    { month: "May", enrollments: 1500, revenue: 2700 },
    { month: "Jun", enrollments: 1800, revenue: 3200 },
  ],
  engagement: [
    { name: "Not Started", value: 20, count: 2469, color: "#6B7280" },
    { name: "In Progress", value: 50, count: 6172, color: "#00BFFF" },
    { name: "Completed", value: 25, count: 3086, color: "#10B981" },
    { name: "Dropped", value: 5, count: 618, color: "#EF4444" },
  ],
  lessonCompletion: [
    { lesson: "Introduction to Fashion Design", completion: 100 },
    { lesson: "Color Theory & Application", completion: 95 },
    { lesson: "Pattern Making Basics", completion: 87 },
    { lesson: "Fabric Selection Guide", completion: 78 },
    { lesson: "Sewing Techniques", completion: 72 },
    { lesson: "Final Project", completion: 65 },
  ],
  topCourses: [
    {
      title: "Complete Fashion Design Masterclass",
      enrollments: 3200,
      revenue: 5000,
      completion: 82,
    },
    {
      title: "Advanced Textile Management",
      enrollments: 2800,
      revenue: 4200,
      completion: 76,
    },
    {
      title: "Sustainable Fashion Business",
      enrollments: 2200,
      revenue: 3600,
      completion: 71,
    },
  ],
  topCountries: [
    { country: "United States", students: 3920, percentage: 31.8 },
    { country: "United Kingdom", students: 2469, percentage: 20.0 },
    { country: "Canada", students: 1851, percentage: 15.0 },
    { country: "Australia", students: 1234, percentage: 10.0 },
    { country: "Germany", students: 987, percentage: 8.0 },
    { country: "France", students: 617, percentage: 5.0 },
  ],
  ratings: [
    { stars: 5, count: 5678, percentage: 65 },
    { stars: 4, count: 2469, percentage: 28 },
    { stars: 3, count: 617, percentage: 7 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ],
  recentReviews: [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Excellent course! The instructor explains everything clearly and the practical exercises are very helpful.",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Outstanding content quality. I learned so much about fashion design principles.",
    },
    {
      name: "Emma Wilson",
      rating: 4,
      text: "Great course overall, though some sections could be more detailed.",
    },
  ],
  funnelData: [
    { stage: "Course Landing Page", visitors: 10000, dropOff: 0 },
    { stage: "Course Preview", visitors: 7500, dropOff: 25 },
    { stage: "Purchase Decision", visitors: 4500, dropOff: 40 },
    { stage: "First Lesson", visitors: 4000, dropOff: 11 },
    { stage: "Mid Course", visitors: 3200, dropOff: 20 },
    { stage: "Course Completion", visitors: 2800, dropOff: 12 },
  ],
  insights: [
    {
      icon: TrendingUp,
      title: "Increase Completion Rate",
      description:
        "Add more interactive elements to improve student engagement",
      action: "Add quizzes every 3 lessons",
      color: "bg-green-500",
    },
    {
      icon: DollarSign,
      title: "Boost Revenue",
      description:
        "Your top course has 82% completion rate - create similar content",
      action: "Create advanced course series",
      color: "bg-blue-500",
    },
    {
      icon: Users,
      title: "Reduce Drop-offs",
      description: "20% of students drop off after mid-course - add motivation",
      action: "Implement progress rewards",
      color: "bg-orange-500",
    },
  ],
};

const COLORS = ["#6B7280", "#00BFFF", "#10B981", "#EF4444"];

const CourseAnalytics = () => {
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [dateRange, setDateRange] = useState("30d");

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Analytics</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into your course performance
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-40 border-gray-200">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full sm:w-60 border-gray-200">
              <BookOpen className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Courses">All Courses</SelectItem>
              {mockAnalytics.topCourses.map((c, i) => (
                <SelectItem key={i} value={c.title}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="bg-[#00BFFF] hover:bg-blue-500 text-white">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics & At a Glance */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 xl:col-span-2">
          {/* Total Enrollments */}
          <Card className="group transition-all duration-200 border-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 hover:shadow-xl hover:scale-[1.02]">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-[#00BFFF] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-700/80 uppercase tracking-wide">
                  Total Enrollments
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {mockAnalytics.metrics.totalEnrollments.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600 font-medium">
                    +{mockAnalytics.metrics.enrollmentGrowth}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Total Revenue */}
          <Card className="group transition-all duration-200 border-0 bg-gradient-to-br from-green-50 via-white to-emerald-100 hover:shadow-xl hover:scale-[1.02]">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-700/80 uppercase tracking-wide">
                  Total Revenue
                </p>
                <p className="text-xl font-bold text-gray-900">
                  ${mockAnalytics.metrics.revenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600 font-medium">
                    +{mockAnalytics.metrics.revenueGrowth}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Active Students */}
          <Card className="group transition-all duration-200 border-0 bg-gradient-to-br from-cyan-50 via-white to-teal-100 hover:shadow-xl hover:scale-[1.02]">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-cyan-700/80 uppercase tracking-wide">
                  Active Students
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {mockAnalytics.metrics.activeStudents.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">Currently learning</p>
              </div>
            </CardContent>
          </Card>
          {/* Average Rating */}
          <Card className="group transition-all duration-200 border-0 bg-gradient-to-br from-yellow-50 via-white to-orange-100 hover:shadow-xl hover:scale-[1.02]">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Star className="h-5 w-5 text-white fill-current" />
              </div>
              <div>
                <p className="text-xs font-semibold text-yellow-700/80 uppercase tracking-wide">
                  Average Rating
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    {mockAnalytics.metrics.averageRating}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.round(mockAnalytics.metrics.averageRating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-xs text-red-600 font-medium">
                    {mockAnalytics.metrics.ratingGrowth}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Completion Rate */}
          <Card className="group transition-all duration-200 border-0 bg-gradient-to-br from-indigo-50 via-white to-purple-100 hover:shadow-xl hover:scale-[1.02]">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div className="w-full">
                <p className="text-xs font-semibold text-purple-700/80 uppercase tracking-wide">
                  Completion Rate
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    {mockAnalytics.metrics.completionRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-[#00BFFF] to-blue-500 h-2 rounded-full"
                    style={{
                      width: `${mockAnalytics.metrics.completionRate}%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Refund Rate */}
          <Card className="group transition-all duration-200 border-0 bg-gradient-to-br from-pink-50 via-white to-red-100 hover:shadow-xl hover:scale-[1.02]">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-pink-700/80 uppercase tracking-wide">
                  Refund Rate
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {mockAnalytics.metrics.refundRate}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Low refund rate</p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* At a Glance Overview */}
        <div className="flex flex-col h-full">
          <Card className="h-full flex-1 border-0 shadow-xl bg-gradient-to-br from-[#f0f9ff] via-white to-[#f3e8ff] relative overflow-hidden">
            <CardContent className="p-7 flex flex-col h-full justify-center">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-5 w-5 text-[#00BFFF]" />
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                  At a Glance
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span>
                    <span className="font-semibold text-blue-700">
                      {mockAnalytics.metrics.totalEnrollments.toLocaleString()}
                    </span>{" "}
                    enrollments
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-400" />
                  <span>
                    <span className="font-semibold text-green-700">
                      ${mockAnalytics.metrics.revenue.toLocaleString()}
                    </span>{" "}
                    revenue
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>
                    <span className="font-semibold text-yellow-700">
                      {mockAnalytics.metrics.averageRating}
                    </span>{" "}
                    avg rating
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-400" />
                  <span>
                    <span className="font-semibold text-purple-700">
                      {mockAnalytics.metrics.completionRate}%
                    </span>{" "}
                    completion
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <span>
                    <span className="font-semibold text-cyan-700">
                      {mockAnalytics.metrics.activeStudents.toLocaleString()}
                    </span>{" "}
                    active students
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-pink-400" />
                  <span>
                    <span className="font-semibold text-pink-700">
                      {mockAnalytics.metrics.refundRate}%
                    </span>{" "}
                    refund rate
                  </span>
                </li>
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  Enrollments:{" "}
                  {mockAnalytics.metrics.enrollmentGrowth > 0 ? "+" : ""}
                  {mockAnalytics.metrics.enrollmentGrowth}%
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  Revenue: +{mockAnalytics.metrics.revenueGrowth}%
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                  Rating: {mockAnalytics.metrics.ratingGrowth}%
                </span>
              </div>
              {/* Decorative background */}
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <BarChart3 className="h-28 w-28 text-blue-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trends Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#00BFFF]" />
              Enrollment Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.trends}>
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="enrollments"
                  stroke="#00BFFF"
                  strokeWidth={3}
                  dot={{ fill: "#00BFFF", strokeWidth: 2, r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-green-500" />
              Student Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockAnalytics.engagement}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {mockAnalytics.engagement.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Progress Distribution */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0e7ff]">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
              <PieChartIcon className="h-6 w-6 text-[#00BFFF]" />
              <span>Course Progress Distribution</span>
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Visual breakdown of student progress across all courses.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {mockAnalytics.engagement.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-base font-medium text-gray-800">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base text-gray-700 font-semibold">
                      {item.count.toLocaleString()}
                    </span>
                    <Badge
                      className="bg-[#00BFFF]/10 text-[#00BFFF] font-semibold px-3 py-1 rounded-full text-xs"
                      variant="outline"
                    >
                      {item.value}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lesson Completion Rates */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-[#f0fdf4] via-white to-[#e0f2fe]">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="flex items-center gap-3 text-lg font-bold text-gray-900">
              <BarChart3 className="h-6 w-6 text-green-500" />
              <span>Lesson Completion Rates</span>
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Track how students are progressing through individual lessons.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              {mockAnalytics.lessonCompletion.map((lesson, index) => (
                <div
                  key={index}
                  className="space-y-1 px-3 py-2 rounded-lg hover:bg-green-50 transition"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-gray-800 truncate">
                      {lesson.lesson}
                    </span>
                    <span className="text-base text-gray-700 font-semibold">
                      {lesson.completion}%
                    </span>
                  </div>
                  <Progress
                    value={lesson.completion}
                    className="h-2 bg-gray-200"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographical Distribution */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#00BFFF]" />
            Student Distribution by Country
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAnalytics.topCountries.map((country, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00BFFF] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {country.country}
                    </p>
                    <p className="text-sm text-gray-600">
                      {country.students.toLocaleString()} students
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#00BFFF] text-white">
                  {country.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Courses & Ratings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 truncate">
                        {course.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {course.enrollments.toLocaleString()} enrollments
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      ${course.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {course.completion}% completion
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Ratings & Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.ratings.map((rating, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating.stars
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex-1">
                    <Progress value={rating.percentage} className="h-2" />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {rating.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-gray-900">Recent Reviews</h4>
              {mockAnalytics.recentReviews.slice(0, 2).map((review, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">
                      {review.name}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Visualization */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#00BFFF]" />
              <span>Student Journey Funnel</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col items-center">
            {/* Responsive horizontal funnel */}
            <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-8 relative">
              {mockAnalytics.funnelData.map((stage, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 min-w-[120px] z-10"
                >
                  {/* Step Number with shadow and gradient */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00BFFF] to-blue-500 rounded-full flex items-center justify-center shadow-xl mb-2 border-4 border-white">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  {/* Stage Name */}
                  <span className="font-semibold text-gray-900 text-center text-base mb-1">
                    {stage.stage}
                  </span>
                  {/* Visitors */}
                  <span className="text-xl font-bold text-gray-900 mb-1">
                    {stage.visitors.toLocaleString()}
                  </span>
                  {/* Drop-off */}
                  {stage.dropOff > 0 ? (
                    <span className="text-xs text-red-500 font-medium mb-2">
                      -{stage.dropOff}% drop-off
                    </span>
                  ) : (
                    <span className="text-xs text-green-500 font-medium mb-2">
                      Entry Point
                    </span>
                  )}
                </div>
              ))}
              {/* Funnel Connectors (SVG for modern look) */}
              <svg
                className="absolute left-0 top-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
              >
                {mockAnalytics.funnelData.map((_, index) => {
                  if (index === mockAnalytics.funnelData.length - 1)
                    return null;
                  const total = mockAnalytics.funnelData.length;
                  const x1 = ((index + 0.5) / total) * 100;
                  const x2 = ((index + 1.5) / total) * 100;
                  return (
                    <line
                      key={index}
                      x1={`${x1}%`}
                      y1="36"
                      x2={`${x2}%`}
                      y2="36"
                      stroke="#c7d2fe"
                      strokeWidth="4"
                      strokeDasharray="6 4"
                      markerEnd="url(#arrowhead)"
                    />
                  );
                })}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="8"
                    markerHeight="8"
                    refX="8"
                    refY="4"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 4, 0 8" fill="#c7d2fe" />
                  </marker>
                </defs>
              </svg>
            </div>
            {/* Funnel summary */}
            <div className="mt-6 w-full flex flex-col md:flex-row md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00BFFF] inline-block"></span>
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">
                    {mockAnalytics.funnelData[0].visitors.toLocaleString()}
                  </span>{" "}
                  started at{" "}
                  <span className="font-semibold">
                    {mockAnalytics.funnelData[0].stage}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">
                    {mockAnalytics.funnelData[
                      mockAnalytics.funnelData.length - 1
                    ].visitors.toLocaleString()}
                  </span>{" "}
                  reached{" "}
                  <span className="font-semibold">
                    {
                      mockAnalytics.funnelData[
                        mockAnalytics.funnelData.length - 1
                      ].stage
                    }
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">
                    {(
                      100 -
                      (mockAnalytics.funnelData[
                        mockAnalytics.funnelData.length - 1
                      ].visitors /
                        mockAnalytics.funnelData[0].visitors) *
                        100
                    ).toFixed(1)}
                    %
                  </span>{" "}
                  overall drop-off
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Insights */}
      <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#00BFFF]" />
            Actionable Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockAnalytics.insights.map((insight, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 ${insight.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <insight.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {insight.description}
                    </p>
                    <Button
                      size="sm"
                      className="bg-[#00BFFF] hover:bg-blue-500 text-white"
                    >
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseAnalytics;
