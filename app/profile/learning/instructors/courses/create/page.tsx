"use client";
import {
  ArrowLeft,
  Upload,
  Plus,
  CheckCircle2,
  DollarSign,
  FileText,
  Award,
  Star,
  Users,
  BookOpen,
  Play,
  Settings,
  Eye,
  Save,
  X,
  Camera,
  Video,
  FileImage,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { UnifiedLayout } from "@/components/dashboard/unified-layout";
import Link from "next/link";

export default function CreateCoursePage() {
  const [courseData, setCourseData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "Beginner",
    language: "English",
    price: "",
    currency: "USD",
    hasCertification: false,
    lifetimeAccess: true,
    mobileAccess: true,
    thumbnail: null as File | null,
    lessons: [] as any[],
    tags: [] as string[],
    requirements: [] as string[],
    whatYouWillLearn: [] as string[],
  });

  const [newTag, setNewTag] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newLearningOutcome, setNewLearningOutcome] = useState("");

  const addTag = () => {
    if (newTag.trim() && !courseData.tags.includes(newTag.trim())) {
      setCourseData({
        ...courseData,
        tags: [...courseData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setCourseData({
      ...courseData,
      tags: courseData.tags.filter((t) => t !== tag),
    });
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setCourseData({
        ...courseData,
        requirements: [...courseData.requirements, newRequirement.trim()],
      });
      setNewRequirement("");
    }
  };

  const addLearningOutcome = () => {
    if (newLearningOutcome.trim()) {
      setCourseData({
        ...courseData,
        whatYouWillLearn: [
          ...courseData.whatYouWillLearn,
          newLearningOutcome.trim(),
        ],
      });
      setNewLearningOutcome("");
    }
  };

  return (
    <UnifiedLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Enhanced Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Link href="/profile/learning/instructors/courses">
                <ArrowLeft className="h-5 w-5 mr-2" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00BFFF] to-blue-500 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Create New Course
                </h1>
                <p className="text-sm text-gray-600">
                  Build and publish your online course
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button
              className="bg-[#00BFFF] hover:bg-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ backgroundColor: "#00BFFF" }}
            >
              <Award className="h-4 w-4 mr-2" />
              Publish Course
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: General Information */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00BFFF] to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  General Information
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Basic details about your course
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-700"
                  >
                    Course Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Complete Fashion Design Masterclass"
                    value={courseData.title}
                    onChange={(e) =>
                      setCourseData({ ...courseData, title: e.target.value })
                    }
                    className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="subtitle"
                    className="text-sm font-medium text-gray-700"
                  >
                    Course Subtitle
                  </Label>
                  <Input
                    id="subtitle"
                    placeholder="e.g., From Concept to Creation - Master Professional Fashion Design"
                    value={courseData.subtitle}
                    onChange={(e) =>
                      setCourseData({ ...courseData, subtitle: e.target.value })
                    }
                    className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                  >
                    Course Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn in this course..."
                    value={courseData.description}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        description: e.target.value,
                      })
                    }
                    className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-700"
                    >
                      Category *
                    </Label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) =>
                        setCourseData({ ...courseData, category: value })
                      }
                    >
                      <SelectTrigger className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion-design">
                          Fashion Design
                        </SelectItem>
                        <SelectItem value="textile-production">
                          Textile Production
                        </SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="quality-control">
                          Quality Control
                        </SelectItem>
                        <SelectItem value="sustainability">
                          Sustainability
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="level"
                      className="text-sm font-medium text-gray-700"
                    >
                      Course Level *
                    </Label>
                    <Select
                      value={courseData.level}
                      onValueChange={(value) =>
                        setCourseData({ ...courseData, level: value })
                      }
                    >
                      <SelectTrigger className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="All Levels">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="language"
                    className="text-sm font-medium text-gray-700"
                  >
                    Language *
                  </Label>
                  <Select
                    value={courseData.language}
                    onValueChange={(value) =>
                      setCourseData({ ...courseData, language: value })
                    }
                  >
                    <SelectTrigger className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Course Tags */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Course Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                    />
                    <Button
                      onClick={addTag}
                      size="sm"
                      className="bg-[#00BFFF] hover:bg-blue-500"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-blue-900"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Curriculum Builder */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00BFFF] to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  Curriculum Builder
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Add lessons, videos, and quizzes to your course
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {courseData.lessons.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                    <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No lessons added yet
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Start building your course by adding your first lesson
                    </p>
                    <Button
                      className="bg-[#00BFFF] hover:bg-blue-500 text-white"
                      onClick={() =>
                        setCourseData({
                          ...courseData,
                          lessons: [
                            ...courseData.lessons,
                            {
                              title: "New Lesson",
                              type: "video",
                              duration: "10 min",
                            },
                          ],
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Lesson
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {courseData.lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#00BFFF] rounded-lg flex items-center justify-center">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-900">
                              {lesson.title || `Lesson ${index + 1}`}
                            </span>
                            <p className="text-xs text-gray-500">
                              {lesson.type} • {lesson.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() =>
                              setCourseData({
                                ...courseData,
                                lessons: courseData.lessons.filter(
                                  (_, i) => i !== index
                                ),
                              })
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full border-dashed border-2 border-gray-300 hover:border-[#00BFFF] hover:bg-blue-50 text-gray-600 hover:text-[#00BFFF]"
                      onClick={() =>
                        setCourseData({
                          ...courseData,
                          lessons: [
                            ...courseData.lessons,
                            {
                              title: "New Lesson",
                              type: "video",
                              duration: "10 min",
                            },
                          ],
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Lesson
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 3: Media Upload */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00BFFF] to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  Media Upload
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Upload course thumbnail and promotional materials
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-40 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                      {courseData.thumbnail ? (
                        <img
                          src={URL.createObjectURL(courseData.thumbnail)}
                          alt="Course Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">No image</p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Course Thumbnail
                      </Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setCourseData({
                            ...courseData,
                            thumbnail: file || null,
                          });
                        }}
                        className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 1280x720px, JPG or PNG format
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Features */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Course Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Checkbox
                        checked={courseData.hasCertification}
                        onCheckedChange={(checked) =>
                          setCourseData({
                            ...courseData,
                            hasCertification: checked as boolean,
                          })
                        }
                        className="border-gray-300 data-[state=checked]:bg-[#00BFFF] data-[state=checked]:border-[#00BFFF]"
                      />
                      <div>
                        <Label className="text-sm font-medium text-gray-900">
                          Certificate of Completion
                        </Label>
                        <p className="text-xs text-gray-500">
                          Students get a certificate when they finish
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Checkbox
                        checked={courseData.lifetimeAccess}
                        onCheckedChange={(checked) =>
                          setCourseData({
                            ...courseData,
                            lifetimeAccess: checked as boolean,
                          })
                        }
                        className="border-gray-300 data-[state=checked]:bg-[#00BFFF] data-[state=checked]:border-[#00BFFF]"
                      />
                      <div>
                        <Label className="text-sm font-medium text-gray-900">
                          Lifetime Access
                        </Label>
                        <p className="text-xs text-gray-500">
                          Students keep access forever
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Checkbox
                        checked={courseData.mobileAccess}
                        onCheckedChange={(checked) =>
                          setCourseData({
                            ...courseData,
                            mobileAccess: checked as boolean,
                          })
                        }
                        className="border-gray-300 data-[state=checked]:bg-[#00BFFF] data-[state=checked]:border-[#00BFFF]"
                      />
                      <div>
                        <Label className="text-sm font-medium text-gray-900">
                          Mobile Access
                        </Label>
                        <p className="text-xs text-gray-500">
                          Available on mobile devices
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Pricing & Settings */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00BFFF] to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  Pricing & Settings
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Set your course price and additional settings
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Course Price *
                    </Label>
                    <div className="flex items-center gap-2">
                      <Select
                        value={courseData.currency}
                        onValueChange={(value) =>
                          setCourseData({ ...courseData, currency: value })
                        }
                      >
                        <SelectTrigger className="w-20 border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="BDT">BDT</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={courseData.price}
                        onChange={(e) =>
                          setCourseData({
                            ...courseData,
                            price: e.target.value,
                          })
                        }
                        className="flex-1 border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Course Requirements
                    </Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a requirement..."
                          value={newRequirement}
                          onChange={(e) => setNewRequirement(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && addRequirement()
                          }
                          className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                        />
                        <Button
                          onClick={addRequirement}
                          size="sm"
                          className="bg-[#00BFFF] hover:bg-blue-500"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {courseData.requirements.map((req, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-800">
                              {req}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">
                    What Students Will Learn
                  </Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a learning outcome..."
                        value={newLearningOutcome}
                        onChange={(e) => setNewLearningOutcome(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && addLearningOutcome()
                        }
                        className="border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF]/20"
                      />
                      <Button
                        onClick={addLearningOutcome}
                        size="sm"
                        className="bg-[#00BFFF] hover:bg-blue-500"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {courseData.whatYouWillLearn.map((outcome, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <Target className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-800">
                            {outcome}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            {/* Live Preview */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  {courseData.thumbnail ? (
                    <img
                      src={URL.createObjectURL(courseData.thumbnail)}
                      alt="Course Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        No thumbnail uploaded
                      </p>
                    </div>
                  )}
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-[#00BFFF] text-white border-0">
                    Preview
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 truncate text-lg">
                  {courseData.title || "Course Title"}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {courseData.subtitle || "Course Subtitle"}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    {courseData.level}
                  </Badge>
                  <Badge variant="outline" className="border-gray-300">
                    {courseData.category || "Category"}
                  </Badge>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>0 Enrolled</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span>0.0</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-medium">
                    <DollarSign className="h-4 w-4" />
                    <span>{courseData.price || "0"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Progress */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#00BFFF]" />
                  Course Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">General Info</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Curriculum</span>
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Media Upload</span>
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Pricing</span>
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>Completion</span>
                    <span className="text-[#00BFFF]">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-[#00BFFF] to-blue-500 h-2 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Guidelines */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                  <BookOpen className="h-5 w-5" />
                  Course Creation Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#00BFFF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Clear Title
                    </p>
                    <p className="text-xs text-blue-700">
                      Use descriptive and engaging course titles
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#00BFFF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Quality Content
                    </p>
                    <p className="text-xs text-blue-700">
                      Add engaging and well-structured lessons
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#00BFFF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Visual Appeal
                    </p>
                    <p className="text-xs text-blue-700">
                      Use high-quality images and thumbnails
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#00BFFF] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Fair Pricing
                    </p>
                    <p className="text-xs text-blue-700">
                      Set competitive and reasonable prices
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
}
