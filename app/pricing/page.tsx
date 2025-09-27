"use client"

import { motion } from "framer-motion"
import { Check, Star, Zap, Crown, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import Link from "next/link"

const freelancerPlans = [
  {
    name: "Starter",
    icon: Star,
    description: "Perfect for new freelancers",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "5 proposals per month",
      "Basic profile customization",
      "Standard support",
      "Payment protection",
      "Basic project tools"
    ],
    limitations: [
      "Limited to 5 active projects",
      "Standard fee: 10%",
      "No priority support"
    ],
    popular: false,
    cta: "Get Started Free"
  },
  {
    name: "Professional",
    icon: Zap,
    description: "For established freelancers",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Unlimited proposals",
      "Advanced profile features",
      "Priority support",
      "Payment protection",
      "Advanced project tools",
      "Portfolio showcase",
      "Client referrals",
      "Analytics dashboard"
    ],
    limitations: [
      "Reduced fee: 5%",
      "Up to 20 active projects"
    ],
    popular: true,
    cta: "Start Professional"
  },
  {
    name: "Enterprise",
    icon: Crown,
    description: "For agencies and teams",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Everything in Professional",
      "Team collaboration tools",
      "White-label solutions",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced reporting",
      "Priority project placement",
      "Custom contracts"
    ],
    limitations: [
      "Lowest fee: 3%",
      "Unlimited active projects"
    ],
    popular: false,
    cta: "Contact Sales"
  }
]

const clientPlans = [
  {
    name: "Basic",
    icon: Star,
    description: "For occasional hiring",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "3 job posts per month",
      "Basic project management",
      "Standard support",
      "Payment protection",
      "Freelancer search"
    ],
    limitations: [
      "Standard fee: 3%",
      "Basic filtering options"
    ],
    popular: false,
    cta: "Start Hiring Free"
  },
  {
    name: "Growth",
    icon: Zap,
    description: "For regular hiring needs",
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      "Unlimited job posts",
      "Advanced project management",
      "Priority support",
      "Payment protection",
      "Advanced freelancer search",
      "Team collaboration",
      "Custom workflows",
      "Hiring analytics"
    ],
    limitations: [
      "Reduced fee: 2%",
      "Priority placement"
    ],
    popular: true,
    cta: "Start Growth Plan"
  },
  {
    name: "Enterprise",
    icon: Crown,
    description: "For large organizations",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced reporting",
      "White-label solutions",
      "Bulk hiring tools",
      "Contract management",
      "Compliance tools"
    ],
    limitations: [
      "Lowest fee: 1%",
      "Priority support"
    ],
    popular: false,
    cta: "Contact Sales"
  }
]

const faqs = [
  {
    question: "Can I change my plan anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. For enterprise clients, we also support invoicing."
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees for any of our plans. You only pay the monthly or annual subscription fee."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked."
  },
  {
    question: "What happens to my projects if I downgrade?",
    answer: "Your existing projects will continue normally. However, you may be limited in creating new projects based on your new plan limits."
  }
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [userType, setUserType] = useState<"freelancer" | "client">("freelancer")

  const currentPlans = userType === "freelancer" ? freelancerPlans : clientPlans

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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. No hidden fees, no surprises.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${!isYearly ? 'text-white font-medium' : 'text-sky-200'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-green-500"
              />
              <span className={`text-sm ${isYearly ? 'text-white font-medium' : 'text-sky-200'}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge className="bg-green-500 text-white border-green-500">
                  Save 20%
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Type Toggle */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={userType === "freelancer" ? "default" : "ghost"}
                onClick={() => setUserType("freelancer")}
                className="px-8"
              >
                For Freelancers
              </Button>
              <Button
                variant={userType === "client" ? "default" : "ghost"}
                onClick={() => setUserType("client")}
                className="px-8"
              >
                For Clients
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {currentPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card className={`h-full ${plan.popular ? 'border-2 border-sky-500 shadow-lg' : 'border border-gray-200'}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-sky-500 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className={`h-16 w-16 ${plan.popular ? 'bg-sky-100' : 'bg-gray-100'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className={`h-8 w-8 ${plan.popular ? 'text-sky-600' : 'text-gray-600'}`} />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                    
                    <div className="mt-6">
                      <div className="text-4xl font-bold text-gray-900">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        {plan.monthlyPrice > 0 && (
                          <span className="text-lg font-normal text-gray-600">
                            /{isYearly ? 'year' : 'month'}
                          </span>
                        )}
                      </div>
                      {plan.monthlyPrice > 0 && isYearly && (
                        <div className="text-sm text-gray-500 mt-1">
                          ${Math.round((plan.yearlyPrice / 12) * 100) / 100}/month billed annually
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations && plan.limitations.length > 0 && (
                      <div className="border-t border-gray-200 pt-6 mb-8">
                        <h4 className="font-medium text-gray-900 mb-3">Plan Details:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
                              <span className="text-gray-600 text-sm">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'gradient-primary gradient-primary-hover text-white' : ''}`}
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              All Plans Include
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every plan comes with these essential features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Payments",
                description: "Bank-level security for all transactions"
              },
              {
                icon: Star,
                title: "Quality Guarantee",
                description: "Satisfaction guaranteed or money back"
              },
              {
                icon: Zap,
                title: "Fast Matching",
                description: "AI-powered freelancer matching"
              },
              {
                icon: Crown,
                title: "Premium Support",
                description: "24/7 customer support available"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="text-center"
              >
                <div className="h-16 w-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
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
              Join thousands of successful freelancers and clients today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-sky-600 hover:bg-gray-100 px-8"
              >
                <Link href="/freelancer-auth/signup">
                  Start Free Trial
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-sky-600 px-8"
              >
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}