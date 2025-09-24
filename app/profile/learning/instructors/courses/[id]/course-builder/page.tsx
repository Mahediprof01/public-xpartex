"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  Upload,
  Play,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Users,
  Star,
  DollarSign,
  Award,
  Settings,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Video,
  BookOpen,
  Target,
  ArrowLeft,
  Copy,
  Archive,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock course data
const mockCourse = {
  id: "1",
  title: "Complete Fashion Design Masterclass",
  subtitle: "From Concept to Creation - Master Professional Fashion Design",
  description:
    "This comprehensive course covers all aspects of fashion design, from basic concepts to advanced techniques.",
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
  modules: [
    {
      id: "1",
      title: "Introduction to Fashion Design",
      description: "Learn the fundamentals of fashion design",
      order: 1,
      lessons: [
        {
          id: "1",
          title: "Welcome to Fashion Design",
          type: "video",
          duration: "5:30",
          order: 1,
          completed: false,
          stats: { views: 1200, completion: 85 },
        },
        {
          id: "2",
          title: "Fashion Design Principles Quiz",
          type: "quiz",
          duration: "10 min",
          order: 2,
          completed: false,
          stats: { questions: 8, attempts: 450 },
        },
      ],
    },
    {
      id: "2",
      title: "Color Theory & Application",
      description: "Master color theory in fashion design",
      order: 2,
      lessons: [
        {
          id: "3",
          title: "Understanding Color Theory",
          type: "video",
          duration: "12:45",
          order: 1,
          completed: false,
          stats: { views: 980, completion: 72 },
        },
        {
          id: "4",
          title: "Color Palette Assignment",
          type: "assignment",
          duration: "30 min",
          order: 2,
          completed: false,
          stats: { submissions: 340, graded: 280 },
        },
        {
          id: "5",
          title: "Color Theory Quiz",
          type: "quiz",
          duration: "15 min",
          order: 3,
          completed: false,
          stats: { questions: 12, attempts: 380 },
        },
      ],
    },
    {
      id: "3",
      title: "Pattern Making Basics",
      description: "Learn essential pattern making techniques",
      order: 3,
      lessons: [
        {
          id: "6",
          title: "Introduction to Pattern Making",
          type: "video",
          duration: "18:20",
          order: 1,
          completed: false,
          stats: { views: 750, completion: 65 },
        },
        {
          id: "7",
          title: "Basic Pattern Creation",
          type: "video",
          duration: "25:10",
          order: 2,
          completed: false,
          stats: { views: 620, completion: 58 },
        },
        {
          id: "8",
          title: "Pattern Making Assignment",
          type: "assignment",
          duration: "45 min",
          order: 3,
          completed: false,
          stats: { submissions: 280, graded: 210 },
        },
      ],
    },
  ],
};

export default function CourseBuilderPage({
  params,
}: {
  // Client components receive sync params, but allow optional/promise shape to satisfy Next types
  params: { id?: string } | Promise<{ id?: string }>;
}) {
  const [course, setCourse] = useState(mockCourse);
  const [expandedModules, setExpandedModules] = useState<string[]>(["1"]);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [editingModule, setEditingModule] = useState<any>(null);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<any>(null);

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const addModule = () => {
    setEditingModule({
      title: "",
      description: "",
      order: course.modules.length + 1,
      lessons: [],
    });
    setIsModuleModalOpen(true);
  };

  const addLesson = (moduleId: string) => {
    setEditingLesson({
      title: "",
      type: "video",
      duration: "",
      moduleId: moduleId,
      order:
        (course.modules.find((m) => m.id === moduleId)?.lessons.length ?? 0) +
        1,
    });
    setIsLessonModalOpen(true);
  };

  const saveModule = () => {
    if (editingModule.id) {
      // Update existing module
      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.map((m) =>
          m.id === editingModule.id ? editingModule : m
        ),
      }));
    } else {
      // Add new module
      const newModule = {
        ...editingModule,
        id: Date.now().toString(),
        lessons: [],
      };
      setCourse((prev) => ({
        ...prev,
        modules: [...prev.modules, newModule],
      }));
    }
    setIsModuleModalOpen(false);
    setEditingModule(null);
  };

  const saveLesson = () => {
    if (editingLesson.id) {
      // Update existing lesson
      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.map((module) => ({
          ...module,
          lessons: module.lessons.map((lesson) =>
            lesson.id === editingLesson.id ? editingLesson : lesson
          ),
        })),
      }));
    } else {
      // Add new lesson
      const newLesson = {
        ...editingLesson,
        id: Date.now().toString(),
        completed: false,
        stats: { views: 0, completion: 0 },
      };
      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.map((module) =>
          module.id === editingLesson.moduleId
            ? { ...module, lessons: [...module.lessons, newLesson] }
            : module
        ),
      }));
    }
    setIsLessonModalOpen(false);
    setEditingLesson(null);
  };

  const deleteModule = (moduleId: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.filter((m) => m.id !== moduleId),
    }));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.filter((l) => l.id !== lessonId),
            }
          : module
      ),
    }));
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "quiz":
        return <HelpCircle className="h-4 w-4" />;
      case "assignment":
        return <FileText className="h-4 w-4" />;
      default:
        return <Play className="h-4 w-4" />;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "quiz":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "assignment":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00BFFF] to-blue-500 rounded-xl flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Course Builder
              </h1>
              <p className="text-sm text-gray-600">
                Design and structure your course content
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button className="bg-[#00BFFF] hover:bg-blue-500 text-white">
            <Award className="h-4 w-4 mr-2" />
            Publish Course
          </Button>
        </div>
      </div>

      {/* Course Header Stats */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {course.title}
                </h2>
                <p className="text-gray-600">{course.subtitle}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge className="bg-[#00BFFF] text-white border-0">
                    <Users className="h-3 w-3 mr-1" />
                    {course.stats.enrolledStudents} Students
                  </Badge>
                  <Badge variant="secondary">
                    <Star className="h-3 w-3 mr-1" />
                    {course.stats.rating} Rating
                  </Badge>
                  <Badge variant="secondary">
                    <DollarSign className="h-3 w-3 mr-1" />$
                    {course.stats.monthlyRevenue} Revenue
                  </Badge>
                </div>
              </div>
            </div>

            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              <Edit className="h-4 w-4 mr-2" />
              Edit Course Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Course Structure */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#00BFFF]" />
              Course Structure
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={addModule}
                className="border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {course.modules.map((module, moduleIndex) => (
              <Card
                key={module.id}
                className="border border-gray-200 hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleModuleExpansion(module.id)}
                        className="p-1"
                      >
                        {expandedModules.includes(module.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {module.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {module.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">
                            {module.lessons.length} lessons
                          </span>
                          <span className="text-xs text-gray-500">
                            {module.lessons.reduce((acc, lesson) => {
                              if (lesson.type === "video" && lesson.duration) {
                                const [minutes] = lesson.duration.split(":");
                                return acc + parseInt(minutes || "0");
                              }
                              return acc;
                            }, 0)}{" "}
                            min total
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addLesson(module.id)}
                        className="text-[#00BFFF] hover:bg-[#00BFFF]/10"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Lesson
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingModule(module);
                              setIsModuleModalOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Module
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => deleteModule(module.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Module
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {expandedModules.includes(module.id) && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${getLessonTypeColor(
                                lesson.type
                              )}`}
                            >
                              {getLessonIcon(lesson.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {lesson.title}
                              </h4>
                              <div className="flex items-center gap-3 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {lesson.type}
                                </Badge>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.duration}
                                </span>
                                {lesson.type === "video" && (
                                  <span className="text-xs text-gray-500">
                                    {lesson.stats.views} views
                                  </span>
                                )}
                                {lesson.type === "quiz" && (
                                  <span className="text-xs text-gray-500">
                                    {lesson.stats.questions} questions
                                  </span>
                                )}
                                {lesson.type === "assignment" && (
                                  <span className="text-xs text-gray-500">
                                    {lesson.stats.submissions} submissions
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingLesson(lesson);
                                setIsLessonModalOpen(true);
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteLesson(module.id, lesson.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {module.lessons.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p>No lessons in this module yet</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addLesson(module.id)}
                            className="mt-3 border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add First Lesson
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}

            {course.modules.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No modules created yet
                </h3>
                <p className="mb-4">
                  Start building your course by adding your first module
                </p>
                <Button
                  onClick={addModule}
                  className="bg-[#00BFFF] hover:bg-blue-500 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Module
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Module Builder Modal */}
      <Dialog open={isModuleModalOpen} onOpenChange={setIsModuleModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingModule?.id ? "Edit Module" : "Create New Module"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="module-title">Module Title</Label>
              <Input
                id="module-title"
                value={editingModule?.title || ""}
                onChange={(e) =>
                  setEditingModule({
                    ...editingModule,
                    title: e.target.value,
                  })
                }
                placeholder="Enter module title"
              />
            </div>
            <div>
              <Label htmlFor="module-description">Description</Label>
              <Textarea
                id="module-description"
                value={editingModule?.description || ""}
                onChange={(e) =>
                  setEditingModule({
                    ...editingModule,
                    description: e.target.value,
                  })
                }
                placeholder="Enter module description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModuleModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={saveModule}
              className="bg-[#00BFFF] hover:bg-blue-500 text-white"
            >
              {editingModule?.id ? "Update" : "Create"} Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lesson Builder Modal */}
      <Dialog open={isLessonModalOpen} onOpenChange={setIsLessonModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingLesson?.id ? "Edit Lesson" : "Create New Lesson"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="lesson-title">Lesson Title</Label>
              <Input
                id="lesson-title"
                value={editingLesson?.title || ""}
                onChange={(e) =>
                  setEditingLesson({
                    ...editingLesson,
                    title: e.target.value,
                  })
                }
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <Label htmlFor="lesson-type">Lesson Type</Label>
              <Select
                value={editingLesson?.type || "video"}
                onValueChange={(value) =>
                  setEditingLesson({ ...editingLesson, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lesson type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video Lesson
                    </div>
                  </SelectItem>
                  <SelectItem value="quiz">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      Quiz
                    </div>
                  </SelectItem>
                  <SelectItem value="assignment">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Assignment
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="lesson-duration">Duration</Label>
              <Input
                id="lesson-duration"
                value={editingLesson?.duration || ""}
                onChange={(e) =>
                  setEditingLesson({
                    ...editingLesson,
                    duration: e.target.value,
                  })
                }
                placeholder="e.g., 10:30 or 15 min"
              />
            </div>

            {editingLesson?.type === "video" && (
              <div>
                <Label>Video Upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    MP4, MOV, AVI up to 500MB
                  </p>
                </div>
              </div>
            )}

            {editingLesson?.type === "quiz" && (
              <div>
                <Label htmlFor="quiz-questions">Number of Questions</Label>
                <Input
                  id="quiz-questions"
                  type="number"
                  placeholder="Enter number of questions"
                />
              </div>
            )}

            {editingLesson?.type === "assignment" && (
              <div>
                <Label htmlFor="assignment-instructions">
                  Assignment Instructions
                </Label>
                <Textarea
                  id="assignment-instructions"
                  placeholder="Enter assignment instructions"
                  rows={4}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLessonModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={saveLesson}
              className="bg-[#00BFFF] hover:bg-blue-500 text-white"
            >
              {editingLesson?.id ? "Update" : "Create"} Lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
