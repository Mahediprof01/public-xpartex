"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { BuyerDashboardHome } from "../../components/dashboard/buyer-dashboard-home"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    // Always redirect to buyer dashboard as requested by user
    // This ensures buyer management is always the default view
    if (isAuthenticated && user && !isLoading) {
      router.push("/profile/buyer")
    }
  }, [isAuthenticated, user, isLoading, router])

  // Show buyer dashboard home by default while redirecting
  // This ensures smooth user experience without blank page
  return <BuyerDashboardHome />
}