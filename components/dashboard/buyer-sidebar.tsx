"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  Home,
  MessageSquare,
  ShoppingCart,
  Heart,
  History,
  Package,
  DollarSign,
  Users,
  Globe,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const buyerNavigationItems = [
  {
    title: "Home",
    href: "/profile/buyer",
    icon: Home
  },
  {
    title: "Messages",
    href: "/profile/buyer/messages",
    icon: MessageSquare
  },
  {
    title: "Buying Leads",
    href: "/profile/buyer/leads",
    icon: ShoppingCart
  },
  {
    title: "Orders",
    href: "/profile/buyer/orders",
    icon: Package
  },
  {
    title: "Payment",
    href: "/profile/buyer/payment",
    icon: DollarSign
  },
  {
    title: "Contacts",
    href: "/profile/buyer/contacts",
    icon: Users
  },
  {
    title: "My Lists",
    href: "/profile/buyer/lists",
    icon: Heart
  },
  {
    title: "Trade Services",
    href: "/profile/buyer/trade-services",
    icon: Globe
  },
  {
    title: "Logistics",
    href: "/profile/buyer/logistics",
    icon: Package
  }
]

export function BuyerSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "bg-gray-800 text-white transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
                <div className="w-30 h-10 p-1flex items-center justify-center overflow-hidden">
                  <Image src="/logo.png" alt="Xpartex logo" width={200} height={200} className="object-contain" priority />
                </div>
              </Link>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 h-8 w-8 text-white hover:bg-gray-700"
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
          {buyerNavigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-gray-700 text-white border border-gray-600" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
                title={collapsed ? item.title : undefined}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400")} />
                {!collapsed && (
                  <span className="flex-1">{item.title}</span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Settings at bottom */}
      <div className="p-4 border-t border-gray-700">
        <Link
          href="/profile/buyer/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className="h-5 w-5 text-gray-400" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  )
}