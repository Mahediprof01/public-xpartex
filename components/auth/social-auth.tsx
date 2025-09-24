"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2, Linkedin } from "lucide-react"

interface SocialAuthButtonProps {
  provider: "google" | "linkedin"
  onAuth: (provider: string) => Promise<void>
  disabled?: boolean
  className?: string
}

export function SocialAuthButton({ 
  provider, 
  onAuth, 
  disabled = false,
  className 
}: SocialAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (disabled || isLoading) return
    
    setIsLoading(true)
    try {
      await onAuth(provider)
    } finally {
      setIsLoading(false)
    }
  }

  const getProviderDetails = () => {
    switch (provider) {
      case "google":
        return {
          name: "Google",
          bgColor: "bg-white hover:bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-300",
          icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyLjU2IDEyLjI1YzAtLjc4LS4wNy0xLjUzLS4yLTIuMjVIMTJ2NC4yNmg1Ljk2Yy0uMjYgMS4zNy0xLjA0IDIuNTMtMi4yMSAzLjMxdjIuNzdoMy41N2MyLjA4LTEuOTIgMy4yOC00Ljc0IDMuMjgtOC4wOXoiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTEyIDIzYzIuOTcgMCA1LjQ2LS45OCA3LjI4LTIuNjZsLTMuNTctMi43N2MtLjk4LjY2LTIuMjMgMS4wNi0zLjcxIDEuMDYtMi44NiAwLTUuMjktMS45My02LjE2LTQuNTNIMi4xOHYyLjg0QzMuOTkgMjAuNTMgNy43IDIzIDEyIDIzeiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNNS44NCAxNC4wOWMtLjIyLS42Ni0uMzUtMS4zNi0uMzUtMi4wOXMuMTMtMS40My4zNS0yLjA5VjcuMDdIMi4xOEMxLjQzIDguNTUgMSAxMC4yMiAxIDEyczIuNDMgMy40NSAzLjE4IDQuOTNsMS42Ni0yLjg0eiIgZmlsbD0iI0ZCQkMwNSIvPgo8cGF0aCBkPSJNMTIgNS4zOGMxLjYyIDAgMy4wNi41NiA0LjIxIDEuNjRsMy4xNS0zLjE1QzE3LjQ1IDIuMDkgMTQuOTcgMSAxMiAxIDcuNyAxIDMuOTkgMy40NyAyLjE4IDcuMDdsMS42NiAyLjg0QzQuODcgNy4zMSA3LjMgNS4zOCAxMiA1LjM4eiIgZmlsbD0iI0VBNDMzNSIvPgo8L3N2Zz4K"
        }
      case "linkedin":
        return {
          name: "LinkedIn",
          bgColor: "bg-[#0077B5] hover:bg-[#0066A0]",
          textColor: "text-white",
          borderColor: "border-[#0077B5]",
          icon: "linkedin"
        }
      default:
        return {
          name: provider,
          bgColor: "bg-gray-100 hover:bg-gray-200",
          textColor: "text-gray-700",
          borderColor: "border-gray-300",
          icon: ""
        }
    }
  }

  const { name, bgColor, textColor, borderColor, icon } = getProviderDetails()

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        "w-full h-11 font-medium border transition-all duration-200",
        bgColor,
        textColor,
        borderColor,
        "hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        icon === "linkedin" ? (
          <Linkedin className="h-5 w-5 mr-3 text-white" />
        ) : (
          <Image
            src={icon}
            alt={`${name} logo`}
            width={20}
            height={20}
            className="mr-3"
          />
        )
      )}
      Continue with {name}
    </Button>
  )
}

interface SocialAuthSectionProps {
  onGoogleAuth: () => Promise<void>
  onLinkedInAuth: () => Promise<void>
  disabled?: boolean
  className?: string
}

export function SocialAuthSection({
  onGoogleAuth,
  onLinkedInAuth,
  disabled = false,
  className
}: SocialAuthSectionProps) {
  const handleSocialAuth = async (provider: string) => {
    switch (provider) {
      case "google":
        await onGoogleAuth()
        break
      case "linkedin":
        await onLinkedInAuth()
        break
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <SocialAuthButton
        provider="google"
        onAuth={handleSocialAuth}
        disabled={disabled}
      />
      <SocialAuthButton
        provider="linkedin"
        onAuth={handleSocialAuth}
        disabled={disabled}
      />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500 font-medium">
            Or continue with email
          </span>
        </div>
      </div>
    </div>
  )
}