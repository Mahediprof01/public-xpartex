"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

import { PasswordInput } from "@/components/auth/password-input"
import { SocialAuthSection } from "@/components/auth/social-auth"
import { Loader2 } from "lucide-react"
import { registerUser } from "@/actions/auth/server-action"
import toast from "react-hot-toast"
import * as yup from "yup"

// Form data interface
interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  address: string
  agreeToTerms: boolean
}

// Yup validation schema
const validationSchema = yup.object({
  firstName: yup.string().required("First name is required").min(2, "Too short"),
  lastName: yup.string().required("Last name is required").min(2, "Too short"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  phoneNumber: yup.string().matches(/^[+]?[\d\s()-]{10,}$/, "Invalid phone number").required("Phone number is required"),
  address: yup.string().min(10, "Address too short").required("Address is required"),
  agreeToTerms: yup.boolean().oneOf([true], "You must agree to terms")
})

export function RegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    agreeToTerms: false
  })

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validate with Yup
    try {
      await validationSchema.validate(formData, { abortEarly: false })
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {}
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message
          }
        })
        setErrors(validationErrors)
        toast.error("Please check the form and fix the highlighted errors.")
        return
      }
    }

    setIsLoading(true)

    const response = await registerUser({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      phoneNumber: formData.phoneNumber.trim(),
      address: formData.address.trim(),
      registrationdate: new Date().toISOString()
    })

    if (response.success) {
      toast.success("Your account has been created. Please login to continue.")
      // Redirect to login page directly
      router.push("/login")
    } else {
      toast.error(response.error || "Registration failed. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Enter your information to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="John"
                disabled={isLoading}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="Doe"
                disabled={isLoading}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="john.doe@example.com"
              disabled={isLoading}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <PasswordInput
              id="password"
              label="Password"
              value={formData.password}
              onChange={(value) => updateField("password", value)}
              placeholder="Enter password"
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(value) => updateField("confirmPassword", value)}
              placeholder="Confirm password"
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
              placeholder="+8801234567890"
              disabled={isLoading}
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="123 Main Street, Dhaka"
              disabled={isLoading}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => updateField("agreeToTerms", checked as boolean)}
              disabled={isLoading}
            />
            <Label
              htmlFor="agreeToTerms"
              className="text-sm font-normal cursor-pointer"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Create Account
          </Button>
        </form>

        {/* Social Auth */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialAuthSection
          onGoogleAuth={async () => {}}
          onLinkedInAuth={async () => {}}
        />

        {/* Login Link */}
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}