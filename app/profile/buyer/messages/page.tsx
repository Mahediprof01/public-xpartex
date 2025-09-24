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

const messageData = [
  {
    id: 1,
    supplier: "Premium Textiles Ltd.",
    subject: "Re: Cotton T-Shirt Inquiry",
    message:
      "Thank you for your inquiry. We can provide the cotton t-shirts as per your requirements...",
    time: "2 hours ago",
    unread: true,
    avatar: "PT",
  },
  {
    id: 2,
    supplier: "Global Garments Co.",
    subject: "Quotation for Denim Jeans",
    message:
      "Please find attached our quotation for 500 pieces of denim jeans...",
    time: "1 day ago",
    unread: false,
    avatar: "GG",
  },
  {
    id: 3,
    supplier: "Fashion Forward Inc.",
    subject: "Sample Approval Required",
    message:
      "We have prepared the samples according to your specifications. Please review...",
    time: "3 days ago",
    unread: true,
    avatar: "FF",
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
            <p className="text-gray-600">
              Communicate with suppliers and manage inquiries
            </p>
          </div>
          <Button className="gradient-primary gradient-primary-hover text-white">
            New Message
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
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
                  {messageData.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        message.unread ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {message.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">
                              {message.supplier}
                            </h3>
                            {message.unread && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {message.subject}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {message.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                      PT
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Premium Textiles Ltd.
                      </h3>
                      <p className="text-sm text-gray-600">
                        Re: Cotton T-Shirt Inquiry
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
                  {/* Message Thread */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                        PT
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">
                            Premium Textiles Ltd.
                          </span>
                          <span className="text-xs text-gray-500">
                            2 hours ago
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Thank you for your inquiry regarding cotton t-shirts.
                          We are pleased to inform you that we can provide
                          high-quality cotton t-shirts as per your requirements.
                          <br />
                          <br />
                          Our specifications:
                          <br />• Material: 100% Cotton, 180 GSM
                          <br />• Colors: Available in 15+ colors
                          <br />• Sizes: XS to XXL
                          <br />• MOQ: 200 pieces per design
                          <br />• Lead time: 15-20 days
                          <br />• FOB Price: $3.50 - $4.20 per piece
                          <br />
                          <br />
                          We would be happy to send you samples for quality
                          evaluation. Please let us know your preferred colors
                          and sizes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Your Message */}
                  <div className="bg-blue-50 rounded-lg p-4 ml-12">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                        ME
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">You</span>
                          <span className="text-xs text-gray-500">
                            1 day ago
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Hello, I am interested in cotton t-shirts for my
                          retail business. Could you please provide quotations
                          for the following requirements:
                          <br />
                          <br />
                          • Quantity: 500 pieces • Colors: White, Black, Navy
                          Blue • Sizes: S, M, L, XL • Material: 100% Cotton
                          <br />
                          <br />
                          Please include pricing, minimum order quantity, and
                          delivery timeline.
                        </p>
                      </div>
                    </div>
                  </div>
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
