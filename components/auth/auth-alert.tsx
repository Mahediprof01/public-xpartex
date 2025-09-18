"use client"

import { AlertCircle, CheckCircle2, XCircle, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

export type AlertType = "success" | "error" | "warning" | "info"

interface AuthAlertProps {
  type: AlertType
  message: string
  className?: string
}

export function AuthAlert({ type, message, className }: AuthAlertProps) {
  const getAlertConfig = (type: AlertType) => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle2,
          className: "border-green-200 bg-green-50 text-green-800",
          iconColor: "text-green-600"
        }
      case "error":
        return {
          icon: XCircle,
          className: "border-red-200 bg-red-50 text-red-800",
          iconColor: "text-red-600"
        }
      case "warning":
        return {
          icon: AlertCircle,
          className: "border-yellow-200 bg-yellow-50 text-yellow-800",
          iconColor: "text-yellow-600"
        }
      case "info":
        return {
          icon: Info,
          className: "border-blue-200 bg-blue-50 text-blue-800",
          iconColor: "text-blue-600"
        }
    }
  }

  const config = getAlertConfig(type)
  const Icon = config.icon

  return (
    <Alert className={cn(config.className, className)}>
      <Icon className={cn("h-4 w-4", config.iconColor)} />
      <AlertDescription className="font-medium">
        {message}
      </AlertDescription>
    </Alert>
  )
}