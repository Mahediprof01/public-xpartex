"use client"

import { BuyerSidebar } from "./buyer-sidebar"
import { BuyerHeader } from "./buyer-header"

interface BuyerLayoutProps {
  children: React.ReactNode
}

export function BuyerLayout({ children }: BuyerLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <BuyerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <BuyerHeader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}