"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  BookOpen,
  CreditCard,
  Settings,
  Users,
  MessageCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openItems, setOpenItems] = useState<string[]>([])

  const categories = [
    { id: "all", name: "All Categories", icon: HelpCircle, count: 24 },
    { id: "courses", name: "Courses & Learning", icon: BookOpen, count: 8 },
    { id: "billing", name: "Billing & Payments", icon: CreditCard, count: 6 },
    { id: "technical", name: "Technical Support", icon: Settings, count: 5 },
    { id: "account", name: "Account Management", icon: Users, count: 5 }
  ]

  const faqs = [
    {
      id: "1",
      category: "courses",
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll be guided through the payment process and will have immediate access to the course materials upon successful enrollment."
    },
    {
      id: "2",
      category: "courses",
      question: "Can I access courses on mobile devices?",
      answer: "Yes! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers. You can also download our mobile app for an optimized learning experience on the go."
    },
    {
      id: "3",
      category: "courses",
      question: "Do I get a certificate upon course completion?",
      answer: "Yes, you'll receive a digital certificate of completion for each course you finish. These certificates are industry-recognized and can be shared on your LinkedIn profile or included in your resume."
    },
    {
      id: "4",
      category: "billing",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and local payment methods including bKash, Nagad, and Rocket for Bangladesh customers."
    },
    {
      id: "5",
      category: "billing",
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with a course within 30 days of purchase, you can request a full refund through your account dashboard or by contacting our support team."
    },
    {
      id: "6",
      category: "technical",
      question: "I'm having trouble accessing my course. What should I do?",
      answer: "First, try refreshing your browser and clearing your cache. If the issue persists, check your internet connection. If you're still having trouble, contact our technical support team at support@xpartex.com with details about the issue."
    },
    {
      id: "7",
      category: "technical",
      question: "What are the system requirements for the platform?",
      answer: "Our platform works on any modern web browser (Chrome, Firefox, Safari, Edge) with an internet connection. For the best experience, we recommend using the latest version of your preferred browser and having a stable internet connection of at least 5 Mbps."
    },
    {
      id: "8",
      category: "account",
      question: "How do I reset my password?",
      answer: "Click on the 'Forgot Password' link on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      id: "9",
      category: "account",
      question: "Can I change my email address?",
      answer: "Yes, you can update your email address in your account settings. Go to your profile, click on 'Edit Profile', and update your email address. You'll need to verify the new email address before the change takes effect."
    },
    {
      id: "10",
      category: "courses",
      question: "How long do I have access to a course after purchase?",
      answer: "Once you purchase a course, you have lifetime access to all course materials, including any future updates. You can learn at your own pace and revisit the content whenever you need to."
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Help Center
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find answers to frequently asked questions and get the help you need
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 w-5 h-5 z-10 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300 focus:bg-white/20 relative z-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <category.icon className="w-5 h-5 mr-3" />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory === "all" 
                    ? "All Questions" 
                    : categories.find(c => c.id === selectedCategory)?.name
                  }
                </h2>
                <p className="text-gray-600">
                  Showing {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Collapsible
                      open={openItems.includes(faq.id)}
                      onOpenChange={() => toggleItem(faq.id)}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-medium text-gray-900 text-left">
                                {faq.question}
                              </CardTitle>
                              {openItems.includes(faq.id) ? (
                                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                              )}
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </motion.div>
                ))}
              </div>

              {/* No Results */}
              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or browse different categories.
                  </p>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still need help?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary gradient-primary-hover text-white">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Guides
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
