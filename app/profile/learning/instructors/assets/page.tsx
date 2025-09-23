"use client";

import React, { useState } from "react";
import { UnifiedLayout } from "@/components/dashboard/unified-layout";
import {
  Upload,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  FileText,
  BookOpen,
  Download,
  Share,
  Folder,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

// Mock data for eBooks
const mockEbooks = [
  {
    id: "1",
    title: "Fashion Design Fundamentals",
    subtitle: "Complete Guide to Fashion Design Principles",
    thumbnail: "/course-fashion-design.jpg",
    fileType: "PDF",
    fileSize: "24.5 MB",
    status: "Published",
    course: "Complete Fashion Design Masterclass",
    module: "Introduction to Fashion Design",
    lesson: "Welcome to Fashion Design",
    uploadDate: "2024-01-15",
    downloads: 1247,
    pages: 156,
    description:
      "A comprehensive guide covering all fundamental aspects of fashion design.",
  },
  {
    id: "2",
    title: "Color Theory in Fashion",
    subtitle: "Master Color Application in Design",
    thumbnail: "/course-fashion-design.jpg",
    fileType: "PDF",
    fileSize: "18.2 MB",
    status: "Draft",
    course: "Complete Fashion Design Masterclass",
    module: "Color Theory & Application",
    lesson: null,
    uploadDate: "2024-01-20",
    downloads: 0,
    pages: 98,
    description:
      "An in-depth exploration of color theory and its practical application.",
  },
];

const mockCourses = [
  {
    id: "1",
    title: "Complete Fashion Design Masterclass",
    modules: [
      {
        id: "1",
        title: "Introduction to Fashion Design",
        lessons: [
          { id: "1", title: "Welcome to Fashion Design" },
          { id: "2", title: "Basic Concepts" },
        ],
      },
      {
        id: "2",
        title: "Color Theory & Application",
        lessons: [
          { id: "3", title: "Understanding Color Theory" },
          { id: "4", title: "Color Applications" },
        ],
      },
    ],
  },
];

export default function Page() {
  const [ebooks, setEbooks] = useState(mockEbooks);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEbooks, setSelectedEbooks] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [selectedEbookForAssignment, setSelectedEbookForAssignment] =
    useState<any>(null);
  const [assignmentData, setAssignmentData] = useState({
    course: "",
    module: "",
    lesson: "",
  });

  // Filter and search logic
  const filteredEbooks = ebooks
    .filter((ebook) => {
      const matchesSearch =
        ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        ebook.status.toLowerCase() === filterStatus.toLowerCase();
      const matchesCourse =
        filterCourse === "all" || ebook.course === filterCourse;
      return matchesSearch && matchesStatus && matchesCourse;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "uploadDate":
          return (
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
        case "downloads":
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

  const handleSelectEbook = (ebookId: string) => {
    setSelectedEbooks((prev) =>
      prev.includes(ebookId)
        ? prev.filter((id) => id !== ebookId)
        : [...prev, ebookId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEbooks(
      selectedEbooks.length === filteredEbooks.length
        ? []
        : filteredEbooks.map((ebook) => ebook.id)
    );
  };

  const openAssignmentModal = (ebook: any) => {
    setSelectedEbookForAssignment(ebook);
    setIsAssignmentModalOpen(true);
  };

  const handleAssignment = () => {
    console.log(
      "Assigning ebook:",
      selectedEbookForAssignment,
      "to:",
      assignmentData
    );
    setIsAssignmentModalOpen(false);
    setAssignmentData({ course: "", module: "", lesson: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-700 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    return <FileText className="h-5 w-5 text-red-500" />;
  };

  return (
    <UnifiedLayout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00BFFF] to-blue-500 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Manage Ebooks
                </h1>
                <p className="text-sm text-gray-600">
                  Upload, organize, and assign eBooks to your courses
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Dialog
              open={isUploadModalOpen}
              onOpenChange={setIsUploadModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Ebook
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload New Ebook</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, EPUB, MOBI up to 100MB
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="ebook-title">Title</Label>
                    <Input id="ebook-title" placeholder="Enter ebook title" />
                  </div>
                  <div>
                    <Label htmlFor="ebook-description">Description</Label>
                    <Textarea
                      id="ebook-description"
                      placeholder="Enter description"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsUploadModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-[#00BFFF] hover:bg-blue-500 text-white">
                    Upload Ebook
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search ebooks by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterCourse} onValueChange={setFilterCourse}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.title}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="uploadDate">Upload Date</SelectItem>
                    <SelectItem value="downloads">Downloads</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid"
                        ? "bg-[#00BFFF] hover:bg-blue-500 text-white"
                        : ""
                    }
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list"
                        ? "bg-[#00BFFF] hover:bg-blue-500 text-white"
                        : ""
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedEbooks.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedEbooks.length} ebook
                    {selectedEbooks.length > 1 ? "s" : ""} selected
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      Publish
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      Assign
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ebooks Display - Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEbooks.map((ebook) => (
              <Card
                key={ebook.id}
                className="shadow-lg border-0 hover:shadow-xl transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={ebook.thumbnail}
                    alt={ebook.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <Checkbox
                      checked={selectedEbooks.includes(ebook.id)}
                      onCheckedChange={() => handleSelectEbook(ebook.id)}
                      className="bg-white/90"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={getStatusColor(ebook.status)}>
                      {ebook.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    {getFileTypeIcon(ebook.fileType)}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {ebook.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {ebook.subtitle}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Folder className="h-3 w-3" />
                        {ebook.fileSize}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {ebook.downloads}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Course:</span>{" "}
                      {ebook.course}
                    </div>
                    {ebook.module && (
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Module:</span>{" "}
                        {ebook.module}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-[#00BFFF] hover:bg-blue-500 text-white"
                      onClick={() => openAssignmentModal(ebook)}
                    >
                      <Share className="h-3 w-3 mr-1" />
                      Assign
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="px-2">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* List View */
          <Card className="shadow-lg border-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 text-left">
                        <Checkbox
                          checked={
                            selectedEbooks.length === filteredEbooks.length &&
                            filteredEbooks.length > 0
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-gray-900">
                        Ebook
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-gray-900">
                        Course
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-gray-900">
                        Module
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-gray-900">
                        File Size
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-gray-900">
                        Downloads
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-gray-900">
                        Status
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEbooks.map((ebook) => (
                      <tr
                        key={ebook.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <Checkbox
                            checked={selectedEbooks.includes(ebook.id)}
                            onCheckedChange={() => handleSelectEbook(ebook.id)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={ebook.thumbnail}
                              alt={ebook.title}
                              className="w-12 h-16 object-cover rounded"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {ebook.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {ebook.subtitle}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                {getFileTypeIcon(ebook.fileType)}
                                <span className="text-xs text-gray-500">
                                  {ebook.fileType}
                                </span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">
                                  {ebook.pages} pages
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {ebook.course}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {ebook.module || "-"}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {ebook.fileSize}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {ebook.downloads.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(ebook.status)}>
                            {ebook.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="bg-[#00BFFF] hover:bg-blue-500 text-white"
                              onClick={() => openAssignmentModal(ebook)}
                            >
                              <Share className="h-3 w-3 mr-1" />
                              Assign
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="px-2"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assignment Modal */}
        <Dialog
          open={isAssignmentModalOpen}
          onOpenChange={setIsAssignmentModalOpen}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Ebook to Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedEbookForAssignment && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={selectedEbookForAssignment.thumbnail}
                    alt={selectedEbookForAssignment.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {selectedEbookForAssignment.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedEbookForAssignment.subtitle}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="course-select">Course</Label>
                <Select
                  value={assignmentData.course}
                  onValueChange={(value) =>
                    setAssignmentData({
                      ...assignmentData,
                      course: value,
                      module: "",
                      lesson: "",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.title}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {assignmentData.course && (
                <div>
                  <Label htmlFor="module-select">Module</Label>
                  <Select
                    value={assignmentData.module}
                    onValueChange={(value) =>
                      setAssignmentData({
                        ...assignmentData,
                        module: value,
                        lesson: "",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select module" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCourses
                        .find((c) => c.title === assignmentData.course)
                        ?.modules.map((module) => (
                          <SelectItem key={module.id} value={module.title}>
                            {module.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {assignmentData.module && (
                <div>
                  <Label htmlFor="lesson-select">Lesson (Optional)</Label>
                  <Select
                    value={assignmentData.lesson}
                    onValueChange={(value) =>
                      setAssignmentData({ ...assignmentData, lesson: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lesson" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific lesson</SelectItem>
                      {mockCourses
                        .find((c) => c.title === assignmentData.course)
                        ?.modules.find((m) => m.title === assignmentData.module)
                        ?.lessons.map((lesson) => (
                          <SelectItem key={lesson.id} value={lesson.title}>
                            {lesson.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAssignmentModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#00BFFF] hover:bg-blue-500 text-white"
                onClick={handleAssignment}
                disabled={!assignmentData.course || !assignmentData.module}
              >
                Assign Ebook
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Empty State */}
        {filteredEbooks.length === 0 && (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No ebooks found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== "all" || filterCourse !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by uploading your first ebook"}
              </p>
              {!searchTerm &&
                filterStatus === "all" &&
                filterCourse === "all" && (
                  <Button
                    className="bg-[#00BFFF] hover:bg-blue-500 text-white"
                    onClick={() => setIsUploadModalOpen(true)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Your First Ebook
                  </Button>
                )}
            </CardContent>
          </Card>
        )}
      </div>
    </UnifiedLayout>
  );
}
