"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail } from "lucide-react"
import { verifyOtp } from "@/actions/auth/server-action"
import toast from "react-hot-toast"
import * as yup from "yup"

// Form data interface
interface FormData {
  email: string
  otp: string
}

// Yup validation schema
const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  otp: yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required")
})

export function VerifyOtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<FormData>({
    email: "",
    otp: ""
  })

  // Get email from URL params if available (from registration redirect)
  useEffect(() => {
    const emailFromParams = searchParams.get("email")
    if (emailFromParams) {
      setFormData(prev => ({ ...prev, email: emailFromParams }))
    }
  }, [searchParams])

  const updateField = (field: keyof FormData, value: string) => {
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

    const response = await verifyOtp({
      email: formData.email.toLowerCase().trim(),
      otp: formData.otp.trim()
    })

    if (response.success) {
      toast.success("Email verified successfully! Please login to continue.")
      // Redirect to login page after successful verification
      router.push("/login")
    } else {
      toast.error(response.error || "OTP verification failed. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your email address to complete your registration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
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

          {/* OTP */}
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={formData.otp}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value.replace(/\D/g, '')
                updateField("otp", value)
              }}
              placeholder="000000"
              disabled={isLoading}
              className={`text-center text-lg tracking-widest ${errors.otp ? "border-red-500" : ""}`}
            />
            {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}
            <p className="text-xs text-muted-foreground text-center">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Verify Email
          </Button>
        </form>

        {/* Resend OTP Link */}
        <div className="text-center text-sm">
          <p className="text-muted-foreground mb-2">
            Didn't receive the code?
          </p>
          <Button
            variant="ghost"
            className="text-primary hover:underline p-0 h-auto"
            onClick={() => {
              toast("Please contact support to resend the verification code.")
            }}
          >
            Resend Code
          </Button>
        </div>

        {/* Back to Registration Link */}
        <div className="text-center text-sm">
          <Link href="/register" className="text-muted-foreground hover:text-primary hover:underline">
            ← Back to Registration
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}