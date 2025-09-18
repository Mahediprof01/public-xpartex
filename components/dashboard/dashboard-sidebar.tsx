"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  Home,
  FileText, 
  Package,
  Store,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Home",
    href: "/profile",
    icon: Home
  },
  {
    title: "Request for Quotation",
    href: "/profile/rfq",
    icon: FileText
  },
  {
    title: "Products",
    href: "/profile/products",
    icon: Package
  },
  {
    title: "Store",
    href: "/profile/store",
    icon: Store
  }
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center" aria-label="Go to homepage">
                  <div className="w-30 h-10 p-1  rounded-lg flex items-center justify-center overflow-hidden">
                    {/* Next.js Image for optimized loading; object-contain keeps logo visible */}
                    <Image src="/logo.png" alt="Xpartex logo" width={200} height={200} className="object-contain" priority />
                  </div>
                </Link>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 h-8 w-8"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-gray-500")} />
                  {!collapsed && (
                    <span className="flex-1">{item.title}</span>
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Settings at bottom */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/profile/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className="h-5 w-5 text-gray-500" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  )
}