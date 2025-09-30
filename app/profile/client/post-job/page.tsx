"use client";

import { useState } from "react";
import {
  Plus,
  Briefcase,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  Users,
  FileText,
  Star,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostJobModal } from "@/components/client/post-job-modal";
import Link from "next/link";

export default function PostJobPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data for existing jobs
  const existingJobs = [
    {
      id: 1,
      title: "Sewing Machine Operator Needed",
      description:
        "Looking for an experienced sewing machine operator to work on men's shirts production line. Must be able to operate industrial sewing machines and maintain high quality standards.",
      budget: "৳20,000 - ৳30,000/month",
      duration: "6 months",
      location: "Dhaka, Bangladesh",
      category: "Production",
      status: "Active",
      proposals: 10,
      posted: "2 days ago",
      skills: ["Sewing", "Quality Control", "Machine Operation", "Teamwork"],
    },
    {
      id: 2,
      title: "Pattern Maker for Women's Wear",
      description:
        "Seeking a skilled pattern maker to develop patterns for new women's dress designs. Experience with CAD pattern software preferred.",
      budget: "৳15,000 - ৳25,000/project",
      duration: "1 month",
      location: "Narayanganj, Bangladesh",
      category: "Design",
      status: "Active",
      proposals: 7,
      posted: "5 days ago",
      skills: [
        "Pattern Making",
        "CAD",
        "Garment Design",
        "Attention to Detail",
      ],
    },
    {
      id: 3,
      title: "Quality Assurance Inspector",
      description:
        "Require a QA inspector to oversee final inspection of finished garments. Must have experience in garments industry and knowledge of AQL standards.",
      budget: "৳18,000 - ৳28,000/month",
      duration: "3 months",
      location: "Chittagong, Bangladesh",
      category: "Quality Control",
      status: "In Review",
      proposals: 12,
      posted: "3 days ago",
      skills: ["Quality Assurance", "AQL", "Inspection", "Reporting"],
    },
    {
      id: 4,
      title: "Textile Printing Specialist",
      description:
        "Looking for a textile printing expert to manage screen printing for t-shirt orders. Must be familiar with color mixing and print quality checks.",
      budget: "৳10,000 - ৳20,000/order",
      duration: "2 weeks",
      location: "Gazipur, Bangladesh",
      category: "Printing",
      status: "Completed",
      proposals: 5,
      posted: "2 weeks ago",
      skills: ["Screen Printing", "Color Mixing", "Textile Printing", "QC"],
    },
  ];

  const stats = [
    {
      label: "Total Jobs Posted",
      value: "24",
      change: "+3 this month",
      icon: Briefcase,
      color: "white",
    },
    {
      label: "Active Jobs",
      value: "8",
      change: "3 in review",
      icon: Clock,
      color: "bg-purple-500",
    },
    {
      label: "Total Proposals",
      value: "156",
      change: "+12 this week",
      icon: FileText,
      color: "bg-indigo-500",
    },
    {
      label: "Hired Freelancers",
      value: "18",
      change: "95% success rate",
      icon: Users,
      color: "bg-violet-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 mb-6"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Job Management Hub
              </h1>
              <p className="text-cyan-100 text-lg">
                Post new jobs, manage existing ones, and find the perfect
                freelancers for your projects.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 text-lg font-semibold shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg"
            >
              <div
                className={`absolute top-0 right-0 w-20 h-20 ${stat.color} opacity-10 rounded-bl-3xl`}
              ></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div
                    className={`p-3 rounded-xl flex items-center justify-center`}
                    style={{
                      background:
                        stat.color === "bg-blue-500"
                          ? "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)"
                          : stat.color === "bg-green-500"
                          ? "linear-gradient(135deg, #10b981 0%, #6ee7b7 100%)"
                          : stat.color === "bg-yellow-500"
                          ? "linear-gradient(135deg, #f59e42 0%, #fde68a 100%)"
                          : stat.color === "bg-red-500"
                          ? "linear-gradient(135deg, #ef4444 0%, #fca5a5 100%)"
                          : "#f1f5f9",
                      boxShadow: "0 2px 8px 0 rgba(59,130,246,0.08)",
                    }}
                  >
                    {Icon ? (
                      <Icon
                        className={`h-8 w-8 ${
                          stat.color.replace("bg-", "text-") || "text-blue-500"
                        } drop-shadow`}
                        style={{
                          color: stat.color.startsWith("bg-")
                            ? undefined
                            : stat.color,
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))",
                        }}
                        aria-label={stat.label + " icon"}
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Jobs Management Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Your Job Posts
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid" ? "bg-blue-50 border-blue-200" : ""
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list" ? "bg-blue-50 border-blue-200" : ""
                }
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {existingJobs.map((job) => (
                <Card
                  key={job.id}
                  className="group hover:shadow-lg transition-all duration-200 border border-gray-100"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {job.posted}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span>{job.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {job.proposals} proposals
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {job.category}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-cyan-600 hover:to-blue-500">
                      <Link
                        href={`/profile/client/post-job/${job.id}`}
                        className="flex items-center gap-2"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {existingJobs.map((job) => (
                <Card
                  key={job.id}
                  className="group hover:shadow-md transition-all duration-200 border border-gray-100"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {job.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {job.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.budget}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{job.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{job.proposals} proposals</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {job.posted}
                        </span>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-cyan-600 hover:to-blue-500"
                        >
                          <Link
                            href={`/profile/client/post-job/${job.id}`}
                            className="flex items-center gap-2"
                          >
                            View Details
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
