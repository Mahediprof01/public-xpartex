"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function FreelancerLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState<"freelancer" | "client">("freelancer")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Login form submitted:", formData)
  }

  const handleGoogleLogin = () => {
    // Handle Google OAuth login
    console.log("Google login clicked")
  }

  const handleLinkedInLogin = () => {
    // Handle LinkedIn OAuth login
    console.log("LinkedIn login clicked")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-md mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your Xpartex account
          </p>
        </motion.div>

        {/* Account Type Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={accountType === "freelancer" ? "default" : "ghost"}
              onClick={() => setAccountType("freelancer")}
              className="px-6"
              size="sm"
            >
              <User className="h-4 w-4 mr-2" />
              Freelancer
            </Button>
            <Button
              variant={accountType === "client" ? "default" : "ghost"}
              onClick={() => setAccountType("client")}
              className="px-6"
              size="sm"
            >
              <Building className="h-4 w-4 mr-2" />
              Client
            </Button>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Sign In as {accountType === "freelancer" ? "Freelancer" : "Client"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Social Login */}
              <div className="space-y-3 mb-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLinkedInLogin}
                >
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Continue with LinkedIn
                </Button>
              </div>

              <div className="relative mb-6">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500">or</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange("rememberMe", !!checked)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  
                  <Link
                    href="/freelancer-auth/forgot-password"
                    className="text-sm text-sky-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary gradient-primary-hover text-white"
                >
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>

              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/freelancer-auth/signup"
                    className="text-sky-600 font-medium hover:underline"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 gap-4 text-center"
        >
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-sky-600 mb-1">50k+</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="bg-white/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 mb-1">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            Need help? Contact our{" "}
            <Link href="/contact" className="text-sky-600 hover:underline">
              support team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}