"use client"

import { motion } from "framer-motion"
import { Shield, Calendar, Lock, Eye, Database, UserCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2024"

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: Shield,
      content: `This Privacy Policy describes how XparTex ("we," "our," or "us") collects, uses, and protects your personal information when you use our platform. We are committed to protecting your privacy and ensuring the security of your personal data.`
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      icon: Database,
      content: `We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us. This includes your name, email address, payment information, and learning preferences. We also automatically collect certain information about your device and how you interact with our platform.`
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      icon: Eye,
      content: `We use your information to provide and improve our services, process payments, communicate with you, personalize your learning experience, and ensure platform security. We may also use aggregated, non-personal information for analytics and research purposes.`
    },
    {
      id: "information-sharing",
      title: "4. Information Sharing",
      icon: UserCheck,
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform, conducting business, or serving you, provided they agree to keep this information confidential.`
    },
    {
      id: "data-security",
      title: "5. Data Security",
      icon: Lock,
      content: `We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.`
    },
    {
      id: "cookies",
      title: "6. Cookies and Tracking",
      icon: Database,
      content: `We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us remember your preferences, analyze site traffic, and provide personalized content. You can control cookie settings through your browser preferences.`
    },
    {
      id: "your-rights",
      title: "7. Your Rights",
      icon: UserCheck,
      content: `You have the right to access, update, or delete your personal information. You can also opt out of certain communications and request a copy of your data. To exercise these rights, please contact us through the methods provided in this policy.`
    },
    {
      id: "data-retention",
      title: "8. Data Retention",
      icon: Database,
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it by law.`
    },
    {
      id: "international-transfers",
      title: "9. International Data Transfers",
      icon: Shield,
      content: `Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and that appropriate safeguards are in place to protect your information.`
    },
    {
      id: "children-privacy",
      title: "10. Children's Privacy",
      icon: UserCheck,
      content: `Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.`
    },
    {
      id: "changes",
      title: "11. Changes to This Policy",
      icon: Calendar,
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "last updated" date. We encourage you to review this policy periodically.`
    },
    {
      id: "contact",
      title: "12. Contact Us",
      icon: Shield,
      content: `If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@xpartex.com. We will respond to your inquiries within 30 days.`
    }
  ]

  const dataTypes = [
    {
      category: "Account Information",
      items: ["Name", "Email address", "Password (encrypted)", "Profile picture"]
    },
    {
      category: "Payment Information",
      items: ["Billing address", "Payment method details", "Transaction history"]
    },
    {
      category: "Learning Data",
      items: ["Course progress", "Quiz results", "Certificates earned", "Learning preferences"]
    },
    {
      category: "Technical Information",
      items: ["IP address", "Browser type", "Device information", "Usage analytics"]
    }
  ]

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
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="w-16 h-16 text-blue-300 mr-4" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Privacy Policy
              </h1>
            </motion.div>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your privacy is important to us. Learn how we protect and use your data.
            </motion.p>
            
            <motion.div
              className="flex items-center justify-center text-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              <span>Last updated: {lastUpdated}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Commitment */}
      <section className="py-8 bg-green-50 border-b border-green-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3">
            <Lock className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-1">Our Privacy Commitment</h3>
              <p className="text-green-800 text-sm">
                We are committed to protecting your privacy and being transparent about how we collect, 
                use, and share your information. Your trust is important to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data We Collect */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types of Data We Collect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's a transparent overview of the information we collect to provide you with the best learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-center">
                      {type.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table of Contents */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Privacy Policy Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 transition-colors flex items-center"
                    >
                      <section.icon className="w-4 h-4 mr-2" />
                      {section.title}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                      <section.icon className="w-6 h-6 mr-3 text-blue-600" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            className="mt-16 p-8 bg-blue-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Privacy Questions?
              </h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or how we handle your data, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                <Badge variant="outline" className="border-blue-300 text-blue-700">
                  Email: privacy@xpartex.com
                </Badge>
                <Badge variant="outline" className="border-blue-300 text-blue-700">
                  Response time: 30 days
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
