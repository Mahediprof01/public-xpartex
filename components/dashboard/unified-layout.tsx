"use client"

import { UnifiedSidebar } from "./unified-sidebar"
import { UnifiedHeader } from "./unified-header"

interface UnifiedLayoutProps {
  children: React.ReactNode
}

export function UnifiedLayout({ children }: UnifiedLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <UnifiedSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <UnifiedHeader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
