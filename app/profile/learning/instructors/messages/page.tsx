"use client";

import React, { useState } from "react";
import { UnifiedLayout } from "../../../../../components/dashboard/unified-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Users,
  Calendar,
  Search,
  MoreHorizontal,
  Heart,
  Share,
  Plus,
  Hash,
  UserPlus,
  Bookmark,
  Clock,
} from "lucide-react";

export default function CommunityEngagementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDiscussionOpen, setIsCreateDiscussionOpen] = useState(false);
  const [discussionForm, setDiscussionForm] = useState({
    title: "",
    content: "",
    tags: "",
  });

  // Mock data for trending discussions
  const trendingDiscussions = [
    {
      id: 1,
      author: "BrainyOlivia",
      avatar: "/placeholder-user.jpg",
      title: "What's the best way to stay consistent with learning?",
      replies: 120,
      tags: ["LearningHabits", "Motivation", "TimeManagement"],
      tagColors: [
        "bg-orange-100 text-orange-700",
        "bg-blue-100 text-blue-700",
        "bg-purple-100 text-purple-700",
      ],
    },
    {
      id: 2,
      author: "Katie02",
      avatar: "/placeholder-user.jpg",
      title:
        "How I landed a freelance gig after completing the Business Strategy course",
      replies: 43,
      tags: ["CareerJourney", "Freelancing", "BusinessCourse"],
      tagColors: [
        "bg-green-100 text-green-700",
        "bg-orange-100 text-orange-700",
        "bg-blue-100 text-blue-700",
      ],
    },
  ];

  // Mock data for peer groups
  const peerGroups = [
    {
      id: 1,
      title: "Business & Leadership Learners",
      description:
        "For future entrepreneurs, marketers, and business strategists.",
      members: 4200,
      image: "/course-fashion-design.jpg",
    },
    {
      id: 2,
      title: "Design & Creative Circle",
      description:
        "A space for UI/UX designers, illustrators, and visual storytellers.",
      members: 3500,
      image: "/course-fashion-design.jpg",
    },
    {
      id: 3,
      title: "Web Developers Unite",
      description: "Frontend, backend, or full-stack — build better, together.",
      members: 5100,
      image: "/course-fashion-design.jpg",
    },
    {
      id: 4,
      title: "Data & AI Explorers",
      description:
        "For analysts, scientists, and curious minds diving into data.",
      members: 2800,
      image: "/course-fashion-design.jpg",
    },
  ];

  // Mock data for trending hashtags
  const trendingHashtags = [
    "LearningStreak",
    "BuiltWithCode",
    "DesignInspo",
    "AskTheCommunity",
    "ChallengeAccepted",
    "CareerSwitch",
    "StudySetup",
    "MyFirstCourse",
    "WomenInTech",
    "DailyWin",
    "101Course",
  ];

  // Mock data for people to follow
  const peopleToFollow = [
    {
      name: "Uchiha_Obito",
      role: "UX Enthusiast",
      avatar: "/placeholder-user.jpg",
    },
    { name: "Karina01", role: "Designer", avatar: "/placeholder-user.jpg" },
    {
      name: "Designerzzz",
      role: "Full-Stack Designer",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "StuartSmart",
      role: "Mobile App Developer",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "OliviaRod01",
      role: "Web Designer",
      avatar: "/placeholder-user.jpg",
    },
  ];

  const handleCreateDiscussion = () => {
    console.log("Creating discussion:", discussionForm);
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message and close the modal
    alert("Discussion created successfully!");
    setIsCreateDiscussionOpen(false);
    setDiscussionForm({ title: "", content: "", tags: "" });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00BFFF]/5 to-blue-50 rounded-2xl p-8 border border-[#00BFFF]/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Community Engagements
            </h1>
            <p className="text-gray-600 text-lg">
              Connect, learn, and grow with fellow learners and instructors
            </p>
          </div>
          <Button
            onClick={() => setIsCreateDiscussionOpen(true)}
            className="bg-[#00BFFF] hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Start Discussion
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-lg">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search discussions, groups, or people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 rounded-xl border-gray-200 focus:border-[#00BFFF] focus:ring-[#00BFFF] text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trending Discussions */}
          <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Trending Discussions
                </h2>
                <Button
                  variant="ghost"
                  className="text-[#00BFFF] hover:text-blue-600 rounded-xl px-4 py-2 font-medium hover:bg-[#00BFFF]/10 transition-all duration-300"
                >
                  See More
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingDiscussions.map((discussion) => (
                  <Card
                    key={discussion.id}
                    className="border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden group hover:border-[#00BFFF]/20"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={discussion.avatar}
                          alt={discussion.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {discussion.author}
                          </p>
                          <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2">
                            {discussion.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-gray-500">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm">
                            {discussion.replies} replies
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {discussion.tags.map((tag, index) => (
                          <Badge
                            key={tag}
                            className={`text-xs ${discussion.tagColors[index]} border-0`}
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Peer Groups */}
          <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Peer Groups
                </h2>
                <Button
                  variant="ghost"
                  className="text-[#00BFFF] hover:text-blue-600 rounded-xl px-4 py-2 font-medium hover:bg-[#00BFFF]/10 transition-all duration-300"
                >
                  See More
                </Button>
              </div>

              <div className="space-y-6">
                {peerGroups.map((group) => (
                  <Card
                    key={group.id}
                    className="border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden group hover:border-[#00BFFF]/20"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={group.image}
                          alt={group.title}
                          className="w-16 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {group.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {group.description}
                          </p>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">
                              {group.members.toLocaleString()} members
                            </span>
                          </div>
                        </div>
                        <Button className="bg-[#00BFFF] hover:bg-blue-500 text-white rounded-xl px-6 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-300">
                          Join Group
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Live Session Announcement */}
          <Card className="bg-gradient-to-br from-[#00BFFF] to-blue-600 text-white border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">
                  Live Session This Friday:
                </h3>
                <h4 className="text-xl font-bold mb-3">Designing for Impact</h4>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">May 24 • 6 PM (GMT)</span>
                </div>
                <p className="text-sm opacity-90">
                  Join our expert-led live workshop on creating meaningful user
                  experiences.
                </p>
              </div>
              <Button className="w-full bg-white text-[#00BFFF] hover:bg-gray-100 rounded-xl py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Save Your Seat
              </Button>
            </CardContent>
          </Card>

          {/* Trending Hashtags */}
          <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Trending Hashtags
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingHashtags.map((hashtag) => (
                  <Badge
                    key={hashtag}
                    variant="secondary"
                    className="text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer rounded-full px-4 py-2 transition-all duration-300 hover:scale-105"
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* People to Follow */}
          <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                People to Follow
              </h3>
              <div className="space-y-4">
                {peopleToFollow.map((person, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {person.name}
                        </p>
                        <p className="text-xs text-gray-500">{person.role}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#00BFFF] hover:text-blue-600 rounded-xl px-4 py-2 font-medium hover:bg-[#00BFFF]/10 transition-all duration-300"
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Discussion Modal */}
      <Dialog
        open={isCreateDiscussionOpen}
        onOpenChange={setIsCreateDiscussionOpen}
      >
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Start a New Discussion
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <Label
                htmlFor="discussion-title"
                className="text-sm font-medium text-gray-700"
              >
                Discussion Title
              </Label>
              <Input
                id="discussion-title"
                placeholder="What would you like to discuss?"
                value={discussionForm.title}
                onChange={(e) =>
                  setDiscussionForm({
                    ...discussionForm,
                    title: e.target.value,
                  })
                }
                className="mt-2 rounded-xl"
              />
            </div>

            <div>
              <Label
                htmlFor="discussion-content"
                className="text-sm font-medium text-gray-700"
              >
                Discussion Content
              </Label>
              <Textarea
                id="discussion-content"
                placeholder="Share your thoughts, ask questions, or start a conversation..."
                value={discussionForm.content}
                onChange={(e) =>
                  setDiscussionForm({
                    ...discussionForm,
                    content: e.target.value,
                  })
                }
                rows={6}
                className="mt-2 rounded-xl"
              />
            </div>

            <div>
              <Label
                htmlFor="discussion-tags"
                className="text-sm font-medium text-gray-700"
              >
                Tags (Optional)
              </Label>
              <Input
                id="discussion-tags"
                placeholder="e.g., LearningHabits, Motivation, TimeManagement"
                value={discussionForm.tags}
                onChange={(e) =>
                  setDiscussionForm({ ...discussionForm, tags: e.target.value })
                }
                className="mt-2 rounded-xl"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple tags with commas
              </p>
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCreateDiscussionOpen(false)}
              className="rounded-xl px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateDiscussion}
              className="bg-[#00BFFF] hover:bg-blue-500 text-white rounded-xl px-6"
              disabled={
                !discussionForm.title.trim() || !discussionForm.content.trim()
              }
            >
              Create Discussion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
