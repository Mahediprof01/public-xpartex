"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  Users,
  FileText,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Filter,
  Plus,
  MoreHorizontal,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ManageJobsPage() {
  const jobs = useMemo(
    () => [
      {
        id: 1,
        title: "Sewing Machine Operator Needed",
        category: "Production",
        budget: "$20,000 - $30,000/month",
        duration: "6 months",
        location: "Dhaka, Bangladesh",
        status: "Active",
        proposals: 10,
        posted: "2025-09-27",
      },
      {
        id: 2,
        title: "Pattern Maker for Women's Wear",
        category: "Design",
        budget: "$15,000 - $25,000/project",
        duration: "1 month",
        location: "Narayanganj, Bangladesh",
        status: "Active",
        proposals: 7,
        posted: "2025-09-24",
      },
      {
        id: 3,
        title: "Quality Assurance Inspector",
        category: "Quality Control",
        budget: "$18,000 - $28,000/month",
        duration: "3 months",
        location: "Chittagong, Bangladesh",
        status: "In Review",
        proposals: 12,
        posted: "2025-09-26",
      },
      {
        id: 4,
        title: "Textile Printing Specialist",
        category: "Printing",
        budget: "$10,000 - $20,000/order",
        duration: "2 weeks",
        location: "Gazipur, Bangladesh",
        status: "Completed",
        proposals: 5,
        posted: "2025-09-15",
      },
    ],
    []
  );

  const stats = [
    { label: "Total Jobs", value: 24, icon: Briefcase },
    { label: "Active", value: 8, icon: Users },
    { label: "In Review", value: 3, icon: Clock },
    { label: "Completed", value: 13, icon: FileText },
  ];

  // Dropdown-only filters
  const [status, setStatus] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [duration, setDuration] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const categories = useMemo(
    () => ["Production", "Design", "Quality Control", "Printing"],
    []
  );
  const durations = ["2 weeks", "1 month", "3 months", "6 months"];

  const statusColor = (s: string) => {
    switch (s) {
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

  const toDate = (iso: string) => (iso ? new Date(iso) : null);

  const filtered = useMemo(() => {
    let list = jobs.filter((j) => {
      const matchesStatus = status === "all" ? true : j.status === status;
      const matchesCategory =
        category === "all" ? true : j.category === category;
      const durationOk = duration === "all" ? true : j.duration === duration;
      return matchesStatus && matchesCategory && durationOk;
    });

    switch (sortBy) {
      case "oldest":
        list = list.sort(
          (a, b) =>
            (toDate(a.posted)?.getTime() || 0) -
            (toDate(b.posted)?.getTime() || 0)
        );
        break;
      case "proposals_desc":
        list = list.sort((a, b) => b.proposals - a.proposals);
        break;
      case "budget_desc":
        // no budget numeric parse now; fallback to proposals sort to keep deterministic
        list = list.sort((a, b) => b.proposals - a.proposals);
        break;
      default:
        list = list.sort(
          (a, b) =>
            (toDate(b.posted)?.getTime() || 0) -
            (toDate(a.posted)?.getTime() || 0)
        );
    }

    return list;
  }, [jobs, status, category, duration, sortBy]);

  const resetFilters = () => {
    setStatus("all");
    setCategory("all");
    setDuration("all");
    setSortBy("newest");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Gradient header with liquid glass stat cards */}
      <div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
        }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12" />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Manage Jobs
            </h1>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-50"
              >
                <Link
                  href="/profile/client/post-job"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Post New Job
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => {
              const Icon = s.icon as any;
              return (
                <div
                  key={s.label}
                  className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/20 p-4 shadow-lg backdrop-blur-md bg-clip-padding"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0.10) 100%)",
                    boxShadow:
                      "0 4px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 4px 0 rgba(0,0,0,0.04)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <div className="pointer-events-none absolute -top-12 -right-12 h-24 w-24 rounded-full bg-white/30 blur-xl" />
                  <div className="pointer-events-none absolute -bottom-4 -right-2 opacity-10">
                    <Icon className="h-16 w-16" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">{s.label}</p>
                      <p className="text-2xl font-semibold text-white">
                        {s.value}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-white/30 backdrop-blur-sm ring-1 ring-white/30 shadow-sm">
                      <Icon className="h-5 w-5 text-white/90" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters card - organized and professional */}
      <Card className="border-0 shadow-lg">
        <CardContent className="py-6 px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Optionally trigger filter apply here
            }}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="w-full sm:w-48">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Status
                  </label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="In Review">In Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-48">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Category
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-48">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Duration
                  </label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      {durations.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-48">
                  <label className="block text-xs font-medium text-gray-700 mb-1 ml-1">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="proposals_desc">
                        Most Proposals
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetFilters}
                  className="min-w-[80px]"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-600 hover:to-blue-500 min-w-[80px] flex items-center"
                >
                  <ArrowUpDown className="h-4 w-4" /> Apply
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Jobs table */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-3 w-16 text-center">
                    SL No
                  </TableHead>
                  <TableHead className="px-4 py-3">Job Title</TableHead>
                  <TableHead className="px-4 py-3">Category</TableHead>
                  <TableHead className="px-4 py-3">Budget</TableHead>
                  <TableHead className="px-4 py-3">Duration</TableHead>
                  <TableHead className="px-4 py-3">Location</TableHead>
                  <TableHead className="px-4 py-3">Status</TableHead>
                  <TableHead className="px-4 py-3">Proposals</TableHead>
                  <TableHead className="px-4 py-3">Posted</TableHead>
                  <TableHead className="px-4 py-3 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((job, idx) => (
                  <TableRow key={job.id}>
                    <TableCell className="px-4 py-2 text-gray-700 text-center font-semibold">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="px-4 py-2 font-medium">
                      {job.title}
                    </TableCell>
                    <TableCell className="px-4 py-2">{job.category}</TableCell>
                    <TableCell className="px-4 py-2">
                      <div className="flex items-center gap-1 text-gray-700">
                        {job.budget}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Calendar className="h-4 w-4" /> {job.duration}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <div className="flex items-center gap-1 text-gray-700">
                        <MapPin className="h-4 w-4" /> {job.location}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <Badge className={statusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Users className="h-4 w-4 text-blue-600" />{" "}
                        {job.proposals}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-2">{job.posted}</TableCell>
                    <TableCell className="px-4 py-2 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild>
                            <Link href={`/profile/client/post-job/${job.id}`}>
                              Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/profile/client/post-job/${job.id}/proposals`}
                            >
                              Proposals
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
