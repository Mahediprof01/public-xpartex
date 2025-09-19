"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { PasswordInput } from "@/components/auth/password-input"
import { SocialAuthSection } from "@/components/auth/social-auth"
import { Loader2} from "lucide-react"
import { getAuthToken } from "@/actions/auth/server-action"
import toast from "react-hot-toast"
import * as yup from "yup"

interface LoginData {
  email: string
  password: string
  rememberMe: boolean
}

const loginSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(1, "Password is required").required("Password is required")
})

export function LoginForm() {
  const router = useRouter()
  const { login: authLogin } = useAuth() // Use auth context login
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    rememberMe: false
  })

  const updateField = (field: keyof LoginData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      await loginSchema.validate(formData, { abortEarly: false })
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

    try {
      // Use auth context login instead of direct server action
      const success = await authLogin(formData.email, formData.password, formData.rememberMe)

      if (success) {
        toast.success("Welcome back! Redirecting to home page...")
        // Small delay to ensure token is stored before redirect
        setTimeout(async () => {
          // Check if token was stored successfully
          const storedToken = await getAuthToken()
          console.log('Token check after login:', !!storedToken)
          router.push("/")
        }, 100)
      } else {
        toast.error("Invalid email or password. Please try again.")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An unexpected error occurred. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              autoComplete="email"
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
              placeholder="Enter your password"
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => updateField("rememberMe", checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
                Remember me
              </Label>
            </div>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Sign In
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

        {/* Register Link */}
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Create account
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

