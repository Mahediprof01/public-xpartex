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
  ChevronRight,
  MessageSquare,
  ShoppingCart,
  Heart,
  History,
  DollarSign,
  Users,
  Globe,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Seller Management Navigation Items
const sellerNavigationItems = [
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

// Buyer Management Navigation Items
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

export function UnifiedSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [buyerExpanded, setBuyerExpanded] = useState(true)
  const [sellerExpanded, setSellerExpanded] = useState(true)
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
              <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
                <div className="w-30 h-10 p-1 flex items-center justify-center overflow-hidden">
                  <Image src="/logo.png" alt="Xpartex logo" width={200} height={200} className="object-contain" priority />
                </div>
              </Link>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Buyer Management Section */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => !collapsed && setBuyerExpanded(!buyerExpanded)}
            >
              {!collapsed && (
                <>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Buyer Management
                  </h3>
                  {buyerExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </>
              )}
            </div>
            
            {(collapsed || buyerExpanded) && (
              <div className="space-y-1">
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
                  )
                })}
              </div>
            )}
          </div>

          {/* Seller Management Section */}
          <div>
            <div 
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => !collapsed && setSellerExpanded(!sellerExpanded)}
            >
              {!collapsed && (
                <>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Seller Management
                  </h3>
                  {sellerExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </>
              )}
            </div>
            
            {(collapsed || sellerExpanded) && (
              <div className="space-y-1">
                {sellerNavigationItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  const Icon = item.icon
                  
                  return (
                    <Link
                      key={item.href}
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
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Settings at bottom */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/profile/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === "/profile/settings"
              ? "bg-blue-50 text-blue-700 border border-blue-200" 
              : "text-gray-700 hover:bg-gray-100"
          )}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className={cn("h-5 w-5", pathname === "/profile/settings" ? "text-blue-600" : "text-gray-500")} />
          {!collapsed && (
            <span className="flex-1">Settings</span>
          )}
        </Link>
      </div>
    </div>
  )
}
