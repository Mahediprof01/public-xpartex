"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn, PasswordValidation } from "@/lib/utils"

interface PasswordInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  showStrengthIndicator?: boolean
  validation?: PasswordValidation
  className?: string
  error?: string
}

export function PasswordInput({
  id,
  label,
  value,
  onChange,
  placeholder = "Enter your password",
  showStrengthIndicator = false,
  validation,
  className,
  error
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const getStrengthColor = (strength: PasswordValidation["strength"]) => {
    switch (strength) {
      case "weak": return "bg-red-500"
      case "medium": return "bg-yellow-500"
      case "strong": return "bg-blue-500"
      case "very-strong": return "bg-green-500"
      default: return "bg-gray-200"
    }
  }

  const getStrengthText = (strength: PasswordValidation["strength"]) => {
    switch (strength) {
      case "weak": return "Weak"
      case "medium": return "Medium"
      case "strong": return "Strong"
      case "very-strong": return "Very Strong"
      default: return ""
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "pr-12",
            error && "border-red-500 focus:ring-red-500"
          )}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-500" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </div>
      
      {showStrengthIndicator && validation && value && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  getStrengthColor(validation.strength)
                )}
                style={{ width: `${(validation.score / 5) * 100}%` }}
              />
            </div>
            <span className={cn(
              "text-xs font-medium",
              validation.strength === "weak" && "text-red-600",
              validation.strength === "medium" && "text-yellow-600",
              validation.strength === "strong" && "text-blue-600",
              validation.strength === "very-strong" && "text-green-600"
            )}>
              {getStrengthText(validation.strength)}
            </span>
          </div>
          
          {validation.errors.length > 0 && (
            <div className="space-y-1">
              {validation.errors.map((error, index) => (
                <p key={index} className="text-xs text-red-600">
                  • {error}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
      
      {error && !showStrengthIndicator && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}