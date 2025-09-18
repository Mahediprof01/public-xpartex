"use client"

import { useRoleStore } from "../../stores/role-store"
import { BuyerLayout } from "../../components/dashboard/buyer-layout"
import { BuyerDashboardHome } from "../../components/dashboard/buyer-dashboard-home"
import { DashboardLayout } from "../../components/dashboard/dashboard-layout"
import { DashboardHeader } from "../../components/dashboard/dashboard-header"
import { DashboardSidebar } from "../../components/dashboard/dashboard-sidebar"
import { DashboardHome } from "../../components/dashboard/dashboard-home"

export default function ProfilePage() {
  const { role } = useRoleStore()

  if (role === 'buyer') {
    return (
      <BuyerLayout>
        <BuyerDashboardHome />
      </BuyerLayout>
    )
  }

  // Seller dashboard (existing)
  return (
    <DashboardLayout>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-6 bg-gray-50">
          <DashboardHome />
        </main>
      </div>
    </DashboardLayout>
  )
}