"use client"

import { UnifiedLayout } from "../../components/dashboard/unified-layout"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UnifiedLayout>
      <div className="p-6 bg-gray-50">
        {children}
      </div>
    </UnifiedLayout>
  )
}