"use client"

import { BuyerLayout } from "../../../components/dashboard/buyer-layout"
import { BuyerDashboardHome } from "../../../components/dashboard/buyer-dashboard-home"

export default function BuyerDashboardPage() {
  return (
    <BuyerLayout>
      <BuyerDashboardHome />
    </BuyerLayout>
  )
}