"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  Package,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

interface UserProfileDropdownProps {
  className?: string
}

export function UserProfileDropdown({ className }: UserProfileDropdownProps) {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const menuItems = [
    {
      group: "Account",
      items: [
        {
          icon: User,
          label: "Dashboard",
          href: "/profile",
          description: "Dashboard and account settings"
        },
        {
          icon: Package,
          label: "My Orders",
          href: "/orders",
          description: "Track your purchases"
        },
        {
          icon: Heart,
          label: "Wishlist",
          href: "/wishlist",
          description: "Saved items"
        },
        // Addresses removed - delivery addresses will be managed from profile settings
      ]
    },
    {
      group: "Business",
      items: [
        {
          icon: ShoppingBag,
          label: "My RFQs",
          href: "/my-rfqs",
          description: "Your quotation requests"
        },
        {
          icon: CreditCard,
          label: "Payment Methods",
          href: "/payment-methods",
          description: "Manage payments"
        }
      ]
    },
    {
      group: "Support",
      items: [
        // Notifications moved to header action
        {
          icon: Settings,
          label: "Settings",
          href: "/settings",
          description: "App preferences"
        },
        {
          icon: HelpCircle,
          label: "Help & Support",
          href: "/help",
          description: "Get assistance"
        }
      ]
    }
  ]

  return (
    <div className={cn("relative", className)}>
      {/* Profile trigger button */}
      <Button
        variant="ghost"
        size="sm"
        className="hover:bg-sky-50 hover:text-sky-700 transition-all duration-200 rounded-full px-3 py-2 font-medium group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.fullName}
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
              ) : (
                user.firstName.charAt(0).toUpperCase()
              )}
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <span className="hidden md:inline text-sm font-medium">
            {user.firstName}
          </span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </div>
      </Button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-2xl border border-gray-100 rounded-xl z-50 overflow-hidden">
            {/* User info header */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-lg font-semibold overflow-hidden">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.fullName}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    user.firstName.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {user.fullName}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu sections */}
            <div className="py-2 max-h-96 overflow-y-auto">
              {menuItems.map((group, groupIndex) => (
                <div key={group.group}>
                  {groupIndex > 0 && <div className="my-2 border-t border-gray-100" />}
                  
                  <div className="px-3 py-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {group.group}
                    </p>
                  </div>
                  
                  {group.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-200">
                          <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500 truncate">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ))}

              {/* Logout button */}
              <div className="border-t border-gray-100 mt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 group w-full"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors duration-200">
                    <LogOut className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">Sign Out</div>
                    <div className="text-xs text-red-500">
                      Log out of your account
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}