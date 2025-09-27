"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  MessageSquare,
  Clock,
  CheckCircle2,
  Star,
  Building
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientCompany: "TechStyle Fashion",
    clientRating: 4.8,
    projectTitle: "E-commerce Platform Development",
    lastMessage: "Great work on the initial setup! Can we schedule a call to discuss the next phase?",
    lastMessageTime: "2 hours ago",
    unreadCount: 2,
    isOnline: true,
    avatar: "SJ"
  },
  {
    id: 2,
    clientName: "Michael Chen",
    clientCompany: "Global Textiles Ltd",
    clientRating: 4.6,
    projectTitle: "Supply Chain Management System",
    lastMessage: "I've reviewed your proposal. Looking forward to starting the project!",
    lastMessageTime: "1 day ago",
    unreadCount: 0,
    isOnline: false,
    avatar: "MC"
  },
  {
    id: 3,
    clientName: "Emma Wilson",
    clientCompany: "Elegant Threads",
    clientRating: 4.9,
    projectTitle: "Fashion Brand Mobile App",
    lastMessage: "Could you provide some portfolio samples for mobile app designs?",
    lastMessageTime: "3 days ago",
    unreadCount: 1,
    isOnline: true,
    avatar: "EW"
  },
  {
    id: 4,
    clientName: "David Rodriguez",
    clientCompany: "ManufacturePro",
    clientRating: 4.5,
    projectTitle: "Factory Management Portal",
    lastMessage: "The wireframes look good. Let's proceed with the development.",
    lastMessageTime: "1 week ago",
    unreadCount: 0,
    isOnline: false,
    avatar: "DR"
  }
]

// Mock data for messages in a conversation
const messages = [
  {
    id: 1,
    senderId: "client",
    senderName: "Sarah Johnson",
    content: "Hi! I'm excited to work with you on this e-commerce project. Could you provide a detailed timeline?",
    timestamp: "2024-12-26 10:30 AM",
    isRead: true
  },
  {
    id: 2,
    senderId: "freelancer",
    senderName: "You",
    content: "Hello Sarah! Thank you for choosing me for this project. I'll provide a detailed timeline by end of day. The project looks very interesting and I'm confident we can create something amazing together.",
    timestamp: "2024-12-26 11:15 AM",
    isRead: true
  },
  {
    id: 3,
    senderId: "client",
    senderName: "Sarah Johnson",
    content: "Perfect! Also, do you have experience with Stripe payment integration?",
    timestamp: "2024-12-26 2:45 PM",
    isRead: true
  },
  {
    id: 4,
    senderId: "freelancer",
    senderName: "You",
    content: "Yes, I have extensive experience with Stripe. I've integrated it in several e-commerce projects. I can also set up PayPal as an alternative payment method if needed.",
    timestamp: "2024-12-26 3:20 PM",
    isRead: true
  },
  {
    id: 5,
    senderId: "client",
    senderName: "Sarah Johnson",
    content: "Great work on the initial setup! Can we schedule a call to discuss the next phase?",
    timestamp: "2024-12-27 9:15 AM",
    isRead: false
  },
  {
    id: 6,
    senderId: "client",
    senderName: "Sarah Johnson",
    content: "I'm available this afternoon or tomorrow morning. Let me know what works for you!",
    timestamp: "2024-12-27 9:18 AM",
    isRead: false
  }
]

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter(conv => 
    conv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-200px)] flex">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-500 text-white font-medium">
                      {conversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{conversation.clientName}</h3>
                    <div className="flex items-center gap-1">
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs px-2 py-1">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-1">
                    <Building className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{conversation.clientCompany}</span>
                    <div className="flex items-center gap-1 ml-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500">{conversation.clientRating}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-blue-600 mb-2 truncate">{conversation.projectTitle}</p>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{conversation.lastMessageTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-500 text-white font-medium">
                    {selectedConversation.avatar}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{selectedConversation.clientName}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{selectedConversation.clientCompany}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-500">{selectedConversation.clientRating}</span>
                  </div>
                </div>
                <p className="text-xs text-blue-600">{selectedConversation.projectTitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>View Contract</DropdownMenuItem>
                  <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'freelancer' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${
                message.senderId === 'freelancer' 
                  ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg' 
                  : 'bg-white text-gray-900 rounded-r-lg rounded-tl-lg border border-gray-200'
              } p-3 shadow-sm`}>
                <p className="text-sm">{message.content}</p>
                <div className={`flex items-center gap-2 mt-2 text-xs ${
                  message.senderId === 'freelancer' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <span>{message.timestamp}</span>
                  {message.senderId === 'freelancer' && (
                    <div className="flex items-center">
                      {message.isRead ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
                className="resize-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span>{selectedConversation.isOnline ? 'Online' : 'Last seen 2 hours ago'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}