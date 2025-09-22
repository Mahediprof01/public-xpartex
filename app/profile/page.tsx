"use client"

import { UnifiedLayout } from "../../components/dashboard/unified-layout"
import { DashboardHome } from "../../components/dashboard/dashboard-home"

export default function ProfilePage() {
  return (
    <UnifiedLayout>
      <div className="p-6 bg-gray-50">
        <DashboardHome />
      </div>
    </UnifiedLayout>
  )
}