"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/auth/password-input"
import { AuthAlert, AlertType } from "@/components/auth/auth-alert"
import { 
  validateEmail, 
  validatePassword,
  cn 
} from "@/lib/utils"
import { ArrowLeft, Mail, KeyRound, Loader2 } from "lucide-react"

export function PasswordResetForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [step, setStep] = useState(token ? "reset" : "request") // request | reset | success
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null)

  const passwordValidation = validatePassword(password)

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setAlert(null)

    if (!email || !validateEmail(email)) {
      setAlert({ type: "error", message: "Please enter a valid email address." })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setAlert({ 
        type: "success", 
        message: "If an account with this email exists, you will receive password reset instructions." 
      })
      
      // In a real app, you wouldn't automatically move to success step
      setTimeout(() => setStep("success"), 2000)
    } catch (error) {
      setAlert({ type: "error", message: "Failed to send reset email. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setAlert(null)

    if (!password || !passwordValidation.isValid) {
      setAlert({ type: "error", message: "Please enter a valid password meeting all requirements." })
      return
    }

    if (password !== confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match." })
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setAlert({ type: "success", message: "Password reset successful! Redirecting to login..." })
      setTimeout(() => router.push("/login"), 2000)
    } catch (error) {
      setAlert({ type: "error", message: "Failed to reset password. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  if (step === "success") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <CardDescription>
            We've sent password reset instructions to your email address.
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

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Check your email and follow the instructions to reset your password.
            </p>

            <Button
              onClick={() => setStep("request")}
              variant="outline"
              className="w-full"
            >
              Send Another Reset Email
            </Button>

            <Link 
              href="/login"
              className="inline-block text-sm text-blue-600 hover:text-blue-700"
            >
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (step === "reset") {
    return (
      <Card className="w-full max-w-md mx-auto border-none shadow-none">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <KeyRound className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below
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

          <form onSubmit={handlePasswordReset} className="space-y-4">
            <PasswordInput
              id="new-password"
              label="New Password *"
              value={password}
              onChange={setPassword}
              placeholder="Enter your new password"
              showStrengthIndicator
              validation={passwordValidation}
            />

            <PasswordInput
              id="confirm-new-password"
              label="Confirm New Password *"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm your new password"
              error={confirmPassword && password !== confirmPassword 
                ? "Passwords do not match" 
                : undefined
              }
            />

            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={isLoading || !passwordValidation.isValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <CardTitle className="text-3xl font-bold">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email and we'll send you reset instructions
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

        <form onSubmit={handleRequestReset} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={isLoading}
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Sending Reset Email...
              </>
            ) : (
              "Send Reset Instructions"
            )}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link 
              href="/login" 
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign in here
            </Link>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}