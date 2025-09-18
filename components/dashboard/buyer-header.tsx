"use client"

import Link from "next/link"
import { Bell, HelpCircle, User, Globe, LogOut, Search, MessageSquare, ShoppingCart, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { useRoleStore } from "@/stores/role-store"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BuyerHeader() {
  const { user, logout } = useAuth()
  const { toggleRole } = useRoleStore()

  const handleRoleSwitch = () => {
    toggleRole()
    // Navigate to seller dashboard
    window.location.href = "/profile"
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Switch to Seller Button */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="font-semibold"
            onClick={handleRoleSwitch}
          >
            Switch to Seller
          </Button>
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search products, suppliers..." 
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Language/Region Selector */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
            <Globe className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700">Deliver to BD</span>
          </div>

          {/* Quick Action Icons */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profile/buyer/messages" className="relative">
              <MessageSquare className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                3
              </Badge>
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/profile/buyer/orders" className="relative">
              <Package className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/help">
              <HelpCircle className="h-5 w-5" />
            </Link>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-semibold">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.firstName}</p>
                  <p className="text-xs text-gray-500">Buyer</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile/buyer/settings" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}