"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin, Briefcase, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function FreelancerSignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState<"freelancer" | "client">("freelancer")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    
    // Profile Info
    title: "",
    location: "",
    experience: "",
    skills: "",
    hourlyRate: "",
    description: "",
    
    // Agreement
    agreeToTerms: false,
    agreeToNewsletter: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Join Xpartex as a {accountType === "freelancer" ? "Freelancer" : "Client"}
            </h1>
            <p className="text-gray-600">
              Create your account and start {accountType === "freelancer" ? "finding amazing projects" : "hiring talented freelancers"}
            </p>
          </motion.div>
        </div>

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
            >
              I'm a Freelancer
            </Button>
            <Button
              variant={accountType === "client" ? "default" : "ghost"}
              onClick={() => setAccountType("client")}
              className="px-6"
            >
              I'm a Client
            </Button>
          </div>
        </motion.div>

        {/* Progress Steps */}
        {accountType === "freelancer" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                      i === step
                        ? "bg-sky-600 text-white"
                        : i < step
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-colors ${
                        i < step ? "bg-green-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">
                {accountType === "freelancer" ? (
                  step === 1 ? "Basic Information" :
                  step === 2 ? "Professional Details" : "Complete Your Profile"
                ) : "Create Your Account"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1 or Client Form: Basic Information */}
                {(step === 1 || accountType === "client") && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

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
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+880 1XX XXX XXXX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
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
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Professional Details (Freelancers only) */}
                {step === 2 && accountType === "freelancer" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="title"
                          type="text"
                          placeholder="e.g., Fashion Designer, Pattern Maker"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="location"
                            type="text"
                            placeholder="City, Country"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Select onValueChange={(value) => handleInputChange("experience", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="25"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                        min="5"
                        step="5"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Input
                        id="skills"
                        type="text"
                        placeholder="Fashion Design, Adobe Illustrator, Pattern Making"
                        value={formData.skills}
                        onChange={(e) => handleInputChange("skills", e.target.value)}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Complete Profile (Freelancers only) */}
                {step === 3 && accountType === "freelancer" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="description">Professional Summary</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell clients about your experience, skills, and what makes you unique..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sky-400 transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Upload your profile picture</p>
                        <Button variant="outline" size="sm">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Terms and Conditions */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", !!checked)}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to Xpartex's{" "}
                      <Link href="/terms" className="text-sky-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-sky-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.agreeToNewsletter}
                      onCheckedChange={(checked) => handleInputChange("agreeToNewsletter", !!checked)}
                    />
                    <Label htmlFor="newsletter" className="text-sm text-gray-600">
                      Send me helpful emails about finding work and platform updates
                    </Label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  {accountType === "freelancer" && step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                  )}
                  
                  {accountType === "freelancer" && step < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-1 gradient-primary gradient-primary-hover text-white"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex-1 gradient-primary gradient-primary-hover text-white"
                    >
                      Create Account
                    </Button>
                  )}
                </div>
              </form>

              <div className="text-center mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/freelancer-auth/login"
                    className="text-sky-600 font-medium hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}