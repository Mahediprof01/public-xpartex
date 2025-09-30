"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Briefcase,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  FileText,
  Tag,
  Clock,
  MessageCircle,
  Handshake,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function JobDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string);

  // Mock: derive a job by id (replace with API fetch later)
  const job = useMemo(
    () => ({
      id: id || "1",
      title: "Sewing Machine Operator Needed",
      description:
        "Looking for an experienced sewing machine operator to work on men's shirts production line. Must be able to operate industrial sewing machines and maintain high quality standards. Responsibilities include stitching, machine maintenance, and ensuring timely completion of orders. Prior experience in garments manufacturing is required.",
      budget: "৳20,000 - ৳30,000/month",
      duration: "6 months",
      location: "Dhaka, Bangladesh",
      category: "Production",
      status: "Active",
      proposals: 10,
      posted: "2 days ago",
      skills: ["Sewing", "Quality Control", "Machine Operation", "Teamwork"],
      attachments: [
        { name: "JobDescription.pdf", sizeMB: 0.8 },
        { name: "FactoryLayout.jpg", sizeMB: 2.3 },
      ],
      client: {
        name: "Garments World Ltd.",
        memberSince: "2019",
        jobsPosted: 18,
        hireRate: "88%",
        location: "Dhaka, Bangladesh",
      },
    }),
    [id]
  );

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
      {/* Header */}
      <div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12" />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8" />
        </div>
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2">
              <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
              <span className="text-xs text-white/80">Posted {job.posted}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {job.title}
            </h1>
            <p className="text-white/90">{job.category}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              <Link
                href="/profile/client/post-job"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Jobs
              </Link>
            </Button>
            <Link href={`/profile/client/post-job/${id}/proposals`}>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <MessageCircle className="h-4 w-4 mr-2" /> Review Proposals
              </Button>
            </Link>

            <Button
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Pencil className="h-4 w-4 mr-2" /> Edit Job
            </Button>
          </div>
        </div>
      </div>

      {/* Meta cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Budget</p>
              <p className="text-lg font-semibold text-gray-900">
                {job.budget}
              </p>
            </div>
            <DollarSign className="h-5 w-5 text-blue-600" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-lg font-semibold text-gray-900">
                {job.duration}
              </p>
            </div>
            <Calendar className="h-5 w-5 text-blue-600" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-lg font-semibold text-gray-900">
                {job.location}
              </p>
            </div>
            <MapPin className="h-5 w-5 text-blue-600" />
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Proposals</p>
              <p className="text-lg font-semibold text-gray-900">
                {job.proposals}
              </p>
            </div>
            <Users className="h-5 w-5 text-blue-600" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Job details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" /> Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  <span>Budget: {job.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Estimated Duration: {job.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>Location: {job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  <span>Category: {job.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-blue-600" /> Required Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" /> Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {job.attachments.length === 0 && (
                <p className="text-sm text-gray-500">
                  No attachments provided.
                </p>
              )}
              {job.attachments.map((f) => (
                <div
                  key={f.name}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-800">{f.name}</span>
                    <span className="text-xs text-gray-500">
                      ({f.sizeMB} MB)
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Client and actions */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" /> About the Client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-900 font-medium">{job.client.name}</p>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <div>
                  Member since:{" "}
                  <span className="font-medium text-gray-900">
                    {job.client.memberSince}
                  </span>
                </div>
                <div>
                  Jobs posted:{" "}
                  <span className="font-medium text-gray-900">
                    {job.client.jobsPosted}
                  </span>
                </div>
                <div>
                  Hire rate:{" "}
                  <span className="font-medium text-gray-900">
                    {job.client.hireRate}
                  </span>
                </div>
                <div>
                  Location:{" "}
                  <span className="font-medium text-gray-900">
                    {job.client.location}
                  </span>
                </div>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <MessageCircle className="h-4 w-4 mr-2" /> Message Client
                </Button>
                <Button variant="outline" className="w-full">
                  <Briefcase className="h-4 w-4 mr-2" /> View All Client Jobs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" /> Proposals Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total proposals</span>
                <span className="font-semibold text-gray-900">
                  {job.proposals}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Shortlisted</span>
                <span className="font-semibold text-gray-900">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Interviewing</span>
                <span className="font-semibold text-gray-900">2</span>
              </div>
              <Link href={`/profile/client/post-job/${id}/proposals`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Review Proposals
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
