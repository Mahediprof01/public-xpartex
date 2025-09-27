"use client"

import { motion } from "framer-motion"
import { 
  Search, 
  UserCheck, 
  MessageCircle, 
  CreditCard,
  Star,
  Shield,
  Clock,
  Users,
  Briefcase,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Explore thousands of projects or find the perfect freelancer for your needs",
    details: [
      "Advanced search filters",
      "Skill-based matching",
      "Portfolio reviews",
      "Rating system"
    ]
  },
  {
    icon: UserCheck,
    title: "Connect & Hire",
    description: "Review profiles, proposals, and hire the right talent for your project",
    details: [
      "View detailed profiles",
      "Compare proposals",
      "Interview candidates",
      "Secure contracts"
    ]
  },
  {
    icon: MessageCircle,
    title: "Collaborate",
    description: "Work together using our built-in tools and communication features",
    details: [
      "Real-time messaging",
      "File sharing",
      "Project tracking",
      "Milestone management"
    ]
  },
  {
    icon: CreditCard,
    title: "Pay Securely",
    description: "Release payments safely with our escrow system and milestone tracking",
    details: [
      "Secure escrow service",
      "Milestone-based payments",
      "Dispute resolution",
      "Payment protection"
    ]
  }
]

const features = [
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Your payments and data are protected with bank-level security"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our customer support team is available around the clock"
  },
  {
    icon: Star,
    title: "Quality Assured",
    description: "All freelancers are verified and rated by previous clients"
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    description: "Tools and resources to help you grow your business or career"
  }
]

const stats = [
  { value: "50,000+", label: "Active Users" },
  { value: "10,000+", label: "Projects Completed" },
  { value: "95%", label: "Success Rate" },
  { value: "24/7", label: "Platform Support" }
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              How Xpartex Works
            </h1>
            <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
              Connect, collaborate, and succeed in the garment industry with our comprehensive platform
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sky-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is easy. Follow these simple steps to begin your journey
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                )}

                <Card className="relative z-10 hover:shadow-lg transition-shadow h-full">
                  <CardHeader className="text-center">
                    <div className="h-16 w-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-sky-600" />
                    </div>
                    <div className="h-6 w-6 bg-sky-600 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-center">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          {detail}
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

      {/* For Freelancers vs For Clients */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Freelancers */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-green-100">
                <CardHeader className="bg-green-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-green-800">For Freelancers</CardTitle>
                      <p className="text-green-600">Find your next project</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {[
                      "Create your professional profile",
                      "Browse thousands of projects",
                      "Submit winning proposals",
                      "Build long-term client relationships",
                      "Get paid securely and on time",
                      "Access skill development resources"
                    ].map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
                    Start as Freelancer
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* For Clients */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-blue-100">
                <CardHeader className="bg-blue-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-blue-800">For Clients</CardTitle>
                      <p className="text-blue-600">Hire expert talent</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {[
                      "Post your project requirements",
                      "Review qualified freelancer profiles",
                      "Compare proposals and portfolios",
                      "Hire the perfect match",
                      "Track progress with built-in tools",
                      "Pay securely through escrow"
                    ].map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                    Start Hiring
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Xpartex?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the tools, security, and support you need to succeed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="h-16 w-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-sky-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-sky-100 mb-8">
              Join thousands of successful freelancers and clients on Xpartex
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-sky-600 hover:bg-gray-100 px-8"
              >
                <Link href="/freelancer-auth/signup">
                  Start as Freelancer
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-sky-600 px-8"
              >
                <Link href="/freelancer-auth/signup">
                  Start as Client
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}