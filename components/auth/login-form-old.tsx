"use client"

import { useState, useCallback } from "react"
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
import { AuthAlert, AlertType } from "@/components/auth/auth-alert"
import { 
  validateEmail, 
  isAccountLocked, 
  recordLoginAttempt,
  setCookie,
  getCookie,
  initializeGoogleAuth,
  initializeLinkedInAuth,
  cn 
} from "@/lib/utils"
import { LoginCredentials } from "@/types"
import { Loader2, ArrowLeft, Shield } from "lucide-react"

interface LoginFormProps {
  onLogin?: (credentials: LoginCredentials) => Promise<void>
  redirectTo?: string
  className?: string
}

export function LoginForm({ onLogin, redirectTo = "/", className }: LoginFormProps) {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
    rememberMe: false
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null)
  const [showMFA, setShowMFA] = useState(false)
  const [mfaCode, setMfaCode] = useState("")

  // Check if account is locked
  const accountLockStatus = formData.email ? isAccountLocked(formData.email) : { locked: false }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setAlert({ type: "error", message: "Please fill in all required fields." })
      return false
    }

    if (!validateEmail(formData.email)) {
      setAlert({ type: "error", message: "Please enter a valid email address." })
      return false
    }

    if (accountLockStatus.locked) {
      const unlockTime = accountLockStatus.unlockTime?.toLocaleTimeString()
      setAlert({ 
        type: "error", 
        message: `Account temporarily locked due to multiple failed login attempts. Try again after ${unlockTime}.` 
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setAlert(null)

    try {
      // Mock login - in real app, this would call your API
      if (formData.email === "demo@example.com" && formData.password === "Demo123!") {
        // Simulate MFA requirement
        if (!showMFA) {
          setShowMFA(true)
          setAlert({ type: "info", message: "Please enter your 6-digit MFA code sent to your device." })
          setIsLoading(false)
          return
        }

        if (mfaCode.length !== 6) {
          setAlert({ type: "error", message: "Please enter a valid 6-digit MFA code." })
          setIsLoading(false)
          return
        }
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Use auth context for login
      const success = await login(formData.email, formData.password)

      recordLoginAttempt(formData.email, success)

      if (success) {
        // Set remember me cookie if selected
        if (formData.rememberMe) {
          setCookie("remember_token", "mock_token", 30) // 30 days
        }

        if (onLogin) {
          await onLogin({ ...formData, mfaCode: showMFA ? mfaCode : undefined })
        }

        setAlert({ type: "success", message: "Login successful! Redirecting..." })
        setTimeout(() => router.push(redirectTo), 1500)
      } else {
        setAlert({ type: "error", message: "Invalid credentials. Please check your email and password." })
      }
    } catch (error) {
      console.error("Login error:", error)
      setAlert({ type: "error", message: "An unexpected error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuth = useCallback(async (provider: "google" | "linkedin") => {
    setIsLoading(true)
    setAlert(null)

    try {
      if (provider === "google") {
        const auth = await initializeGoogleAuth("your-google-client-id")
        // Handle Google auth
      } else if (provider === "linkedin") {
        const auth = await initializeLinkedInAuth("your-linkedin-client-id")
        // Handle LinkedIn auth
      }

      setAlert({ type: "success", message: `${provider} authentication successful! Redirecting...` })
      setTimeout(() => router.push(redirectTo), 1500)
    } catch (error) {
      console.error(`${provider} auth error:`, error)
      setAlert({ type: "error", message: `Failed to authenticate with ${provider}. Please try again.` })
    } finally {
      setIsLoading(false)
    }
  }, [router, redirectTo])

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setAlert({ type: "warning", message: "Please enter your email address first." })
      return
    }

    if (!validateEmail(formData.email)) {
      setAlert({ type: "error", message: "Please enter a valid email address." })
      return
    }

    setIsLoading(true)
    try {
      // Simulate password reset request
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAlert({ 
        type: "success", 
        message: "Password reset instructions have been sent to your email address." 
      })
    } catch (error) {
      setAlert({ type: "error", message: "Failed to send password reset email. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto border-none shadow-none", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your account to access your dashboard
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {alert && (
          <AuthAlert 
            type={alert.type} 
            message={alert.message}
            className="mb-4"
          />
        )}

        <SocialAuthSection
          onGoogleAuth={() => handleSocialAuth("google")}
          onLinkedInAuth={() => handleSocialAuth("linkedin")}
          disabled={isLoading}
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>

          <PasswordInput
            id="password"
            label="Password *"
            value={formData.password}
            onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
            placeholder="Enter your password"
            className="space-y-2"
          />

          {showMFA && (
            <div className="space-y-2">
              <Label htmlFor="mfa" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Multi-Factor Authentication Code *
              </Label>
              <Input
                id="mfa"
                type="text"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="h-11 text-center text-lg tracking-widest"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                Enter the 6-digit code from your authenticator app or SMS.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                }
                disabled={isLoading}
              />
              <Label 
                htmlFor="remember" 
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember me
              </Label>
            </div>

            <Button
              type="button"
              variant="link"
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="text-sm text-blue-600 hover:text-blue-700 p-0"
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full h-11 gradient-primary gradient-primary-hover text-white font-medium"
            disabled={isLoading || accountLockStatus.locked}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {showMFA ? "Verifying..." : "Signing In..."}
              </>
            ) : (
              showMFA ? "Verify & Sign In" : "Sign In"
            )}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              href="/register" 
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Create one here
            </Link>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}