"use client"

import { motion } from "framer-motion"
import { FileText, Calendar, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TermsPage() {
  const lastUpdated = "January 15, 2024"

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: `By accessing and using XparTex ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: "definitions",
      title: "2. Definitions",
      content: `"Platform" refers to the XparTex website and mobile applications. "User" refers to any individual who accesses or uses the Platform. "Content" refers to all materials, courses, videos, text, and other information available on the Platform. "Services" refers to all features and functionalities provided by XparTex.`
    },
    {
      id: "user-accounts",
      title: "3. User Accounts",
      content: `To access certain features of the Platform, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.`
    },
    {
      id: "course-access",
      title: "4. Course Access and Usage",
      content: `Upon successful enrollment and payment, you will receive access to the purchased course content. Course access is for personal, non-commercial use only. You may not share, distribute, or resell course content. Course access is typically provided for the lifetime of the course, unless otherwise specified.`
    },
    {
      id: "payments",
      title: "5. Payments and Refunds",
      content: `All course fees are clearly displayed before purchase. Payments are processed securely through our payment partners. We offer a 30-day money-back guarantee for most courses. Refund requests must be submitted within the specified timeframe and meet our refund policy criteria.`
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property",
      content: `All content on the Platform, including courses, videos, text, graphics, and software, is owned by XparTex or our content partners and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without explicit permission.`
    },
    {
      id: "user-conduct",
      title: "7. User Conduct",
      content: `You agree not to use the Platform for any unlawful purpose or in any way that could damage, disable, or impair the Platform. Prohibited activities include but are not limited to: sharing account credentials, attempting to gain unauthorized access, posting inappropriate content, or engaging in harassment of other users.`
    },
    {
      id: "privacy",
      title: "8. Privacy and Data Protection",
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy.`
    },
    {
      id: "disclaimers",
      title: "9. Disclaimers",
      content: `The Platform and all content are provided "as is" without warranties of any kind. We do not guarantee that the Platform will be error-free or uninterrupted. While we strive to provide accurate and up-to-date content, we make no warranties about the completeness or accuracy of the information provided.`
    },
    {
      id: "limitation-liability",
      title: "10. Limitation of Liability",
      content: `To the maximum extent permitted by law, XparTex shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform. Our total liability shall not exceed the amount you paid for the specific service that gave rise to the claim.`
    },
    {
      id: "termination",
      title: "11. Termination",
      content: `We reserve the right to terminate or suspend your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.`
    },
    {
      id: "changes",
      title: "12. Changes to Terms",
      content: `We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Platform. Your continued use of the Platform after such modifications constitutes acceptance of the updated Terms.`
    },
    {
      id: "governing-law",
      title: "13. Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the laws of Bangladesh. Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts of Bangladesh.`
    },
    {
      id: "contact",
      title: "14. Contact Information",
      content: `If you have any questions about these Terms, please contact us at legal@xpartex.com or through our contact page. We will respond to your inquiries within 48 hours during business days.`
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
              <FileText className="w-16 h-16 text-blue-300 mr-4" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Terms & Conditions
              </h1>
            </motion.div>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Please read these terms carefully before using our platform
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

      {/* Important Notice */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Important Notice</h3>
              <p className="text-amber-800 text-sm">
                By using XparTex, you agree to these terms and conditions. Please read them carefully. 
                If you do not agree with any part of these terms, you should not use our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
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
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Table of Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm py-1 transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terms Sections */}
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
                    <CardTitle className="text-xl text-gray-900">
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
                Questions About These Terms?
              </h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms & Conditions, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                <Badge variant="outline" className="border-blue-300 text-blue-700">
                  Email: legal@xpartex.com
                </Badge>
                <Badge variant="outline" className="border-blue-300 text-blue-700">
                  Response time: 48 hours
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
