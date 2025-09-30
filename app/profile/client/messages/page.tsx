"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Badge } from "../../../../components/ui/badge";
import { Search, MessageSquare, Filter, MoreHorizontal } from "lucide-react";

// Conversation list for client <-> freelancer
const conversationList = [
  {
    id: 1,
    participantName: "Rahim Uddin",
    participantRole: "Freelancer",
    subject: "Re: Sewing Operator Job",
    lastMessage:
      "Thanks for your interest. I can join next week and have 5+ years experience...",
    time: "2 hours ago",
    unread: true,
    avatar: "RU",
  },
  {
    id: 2,
    participantName: "Shila Akter",
    participantRole: "Freelancer",
    subject: "Pattern Maker Proposal",
    lastMessage:
      "Sharing my proposal and timeframe for your pattern making job...",
    time: "1 day ago",
    unread: false,
    avatar: "SA",
  },
  {
    id: 3,
    participantName: "Acme Apparel",
    participantRole: "Client",
    subject: "Contract Update",
    lastMessage:
      "We have reviewed your milestones. Let's finalize the dates...",
    time: "3 days ago",
    unread: true,
    avatar: "AA",
  },
];

// One conversation thread (mock)
const thread = [
  {
    id: "m1",
    senderRole: "Freelancer" as const,
    senderName: "Rahim Uddin",
    time: "2 hours ago",
    text: "Thank you for reaching out. I have worked as a sewing operator for 5+ years and can help you hit daily targets with quality checks. Available to start next week.",
  },
  {
    id: "m2",
    senderRole: "Client" as const,
    senderName: "You",
    time: "1 hour ago",
    text: "Great! Please share your expected monthly compensation and preferred shift timing. Also confirm your experience with men's shirts line.",
  },
];

export default function MessagesPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">Client–Freelancer conversations</p>
          </div>
          <Button className="gradient-primary gradient-primary-hover text-white">
            New Conversation
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search messages..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversationList.map((c) => (
                    <div
                      key={c.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        c.unread ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {c.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900 truncate">
                                {c.participantName}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="text-[10px]"
                              >
                                {c.participantRole}
                              </Badge>
                            </div>
                            {c.unread && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {c.subject}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{c.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversation Detail */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                      RU
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          Rahim Uddin
                        </h3>
                        <Badge variant="secondary" className="text-[10px]">
                          Freelancer
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Re: Sewing Operator Job
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <div className="space-y-4">
                  {thread.map((m) => {
                    const isClient = m.senderRole === "Client";
                    return (
                      <div
                        key={m.id}
                        className={`${
                          isClient ? "bg-blue-50 ml-12" : "bg-gray-50"
                        } rounded-lg p-4`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                              isClient
                                ? "bg-gradient-to-br from-green-500 to-blue-600"
                                : "bg-gradient-to-br from-blue-500 to-purple-600"
                            }`}
                          >
                            {isClient ? "ME" : "RU"}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-gray-900">
                                {m.senderName}
                              </span>
                              <Badge variant="outline" className="text-[10px]">
                                {m.senderRole}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {m.time}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {m.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Box */}
                <div className="mt-6 pt-4 border-t">
                  <div className="space-y-3">
                    <textarea
                      placeholder="Type your message..."
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Attach File
                        </Button>
                      </div>
                      <Button className="gradient-primary gradient-primary-hover text-white">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
