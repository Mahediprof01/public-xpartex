"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, Globe, MapPin, Menu, X, ChevronDown, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserProfileDropdown } from "@/components/layout/user-profile-dropdown"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

export function Header() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const { getCartItemCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const cartItemCount = getCartItemCount("main")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/60 backdrop-blur backdrop-saturate-150 shadow-lg border border-white/30/ backdrop-filter" 
        : "bg-white/40 backdrop-blur-sm border border-transparent"
    )} style={{backdropFilter: isScrolled ? 'saturate(1.2) blur(8px)' : 'blur(6px)'}}>
      {/* Top utility bar */}
      <div className="px-4 py-2.5">
        <div className="w-full flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <MapPin className="h-4 w-4 text-sky-600 group-hover:text-sky-700 transition-colors" />
              <span className="text-neutral-700 group-hover:text-neutral-900 transition-colors font-medium">
                Deliver to: <span className="text-sky-600">Dhaka, Bangladesh</span>
              </span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <Globe className="h-4 w-4 text-sky-600 group-hover:text-sky-700 transition-colors" />
              <span className="text-neutral-700 group-hover:text-neutral-900 transition-colors font-medium">
                English - <span className="text-sky-600">BDT</span>
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/help" 
              className="text-neutral-600 hover:text-sky-600 transition-colors duration-200 font-medium hover:underline decoration-sky-600 decoration-2 underline-offset-4"
            >
              Help & Support
            </Link>
            <Link 
              href="/become-supplier" 
              className="text-neutral-600 hover:text-sky-600 transition-colors duration-200 font-medium hover:underline decoration-sky-600 decoration-2 underline-offset-4"
            >
              Become a Supplier
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="px-4 py-4">
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group" 
            aria-label="Xpartex"
          >
            <div className="w-35 h-8 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 rounded-md overflow-hidden">
              <div className="p-1">
                <Image
                  src="/logo.png"
                  alt="Xpartex"
                  width={140}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: '/products', label: 'Products' },
              { href: '/suppliers', label: 'Suppliers' },
              { href: '/rfq', label: 'RFQ' },
              { href: '/jobs', label: 'Jobs' },
              { href: '/courses', label: 'Courses' },
              { href: '/resources', label: 'Resources' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group font-semibold text-neutral-800 hover:text-sky-600 transition-colors duration-200 py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <div className="relative group">
              <button className="text-neutral-800 hover:text-sky-600 font-semibold flex items-center gap-2 py-2 transition-colors duration-200 relative">
                Services
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="py-2">
                  <Link 
                    href="/freelancers" 
                    className="flex items-center px-4 py-3 text-sm text-neutral-800 hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200 border-l-2 border-transparent hover:border-sky-500"
                  >
                    <div>
                      <div className="font-medium">Find Freelancers</div>
                      <div className="text-xs text-neutral-500 mt-0.5">Skilled professionals</div>
                    </div>
                  </Link>
                  <Link 
                    href="/freelancers/jobs" 
                    className="flex items-center px-4 py-3 text-sm text-neutral-800 hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200 border-l-2 border-transparent hover:border-sky-500"
                  >
                    <div>
                      <div className="font-medium">Freelance Jobs</div>
                      <div className="text-xs text-neutral-500 mt-0.5">Browse opportunities</div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link 
                    href="/customization" 
                    className="flex items-center px-4 py-3 text-sm text-neutral-800 hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200 border-l-2 border-transparent hover:border-sky-500"
                  >
                    <div>
                      <div className="font-medium">Fast Customizations</div>
                      <div className="text-xs text-neutral-500 mt-0.5">Tailored solutions</div>
                    </div>
                  </Link>
                  <Link 
                    href="/logistics" 
                    className="flex items-center px-4 py-3 text-sm text-neutral-800 hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200 border-l-2 border-transparent hover:border-sky-500"
                  >
                    <div>
                      <div className="font-medium">Logistics</div>
                      <div className="text-xs text-neutral-500 mt-0.5">Shipping & delivery</div>
                    </div>
                  </Link>
                  <Link 
                    href="/hire" 
                    className="flex items-center px-4 py-3 text-sm text-neutral-800 hover:bg-sky-50 hover:text-sky-700 transition-colors duration-200 border-l-2 border-transparent hover:border-sky-500"
                  >
                    <div>
                      <div className="font-medium">Hire Experts</div>
                      <div className="text-xs text-neutral-500 mt-0.5">Professional services</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right side utilities */}
          <div className="flex items-center gap-3">
            {/* Notification button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex hover:bg-white/30 hover:text-neutral-900 transition-all duration-200 rounded-full p-2 relative"
              aria-label="Notifications"
              onClick={() => {
                // TODO: open notifications panel/modal
                console.log("Open notifications")
              }}
            >
              <Bell className="h-5 w-5 text-neutral-800" />
              <span className="absolute -top-1 -right-1 gradient-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-lg" style={{display: 'none'}}>
                0
              </span>
            </Button>

            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex hover:bg-white/30 hover:text-neutral-900 transition-all duration-200 rounded-full px-4 py-2 font-medium group relative"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 text-neutral-800" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 gradient-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
        {isAuthenticated ? (
              <UserProfileDropdown key={`user-${user?.id}-${user?.email}`} />
            ) : (
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="hover:bg-white/30 hover:text-neutral-900 transition-all duration-200 rounded-full px-4 py-2 font-medium group"
                  disabled={isLoading}
                >
                  <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-200 text-neutral-800" />
                  <span className="ml-2 hidden md:inline">Sign In</span>
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-white/30 rounded-full p-2 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <Menu className={cn(
                  "h-5 w-5 absolute transition-all duration-300",
                  isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )} />
                <X className={cn(
                  "h-5 w-5 absolute transition-all duration-300",
                  isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 ease-in-out",
          isMobileMenuOpen 
            ? "max-h-96 opacity-100 mt-4 pb-4 border-t border-gray-200" 
            : "max-h-0 opacity-0"
        )}>
          <nav className="flex flex-col gap-1 pt-4">
            {[
              { href: "/products", label: "Products" },
              { href: "/suppliers", label: "Suppliers" },
              { href: "/rfq", label: "RFQ" },
              { href: "/freelancers", label: "Find Freelancers", indent: true },
              { href: "/freelancers/jobs", label: "Freelance Jobs", indent: true },
              { href: "/customization", label: "Fast Customizations", indent: true },
              { href: "/logistics", label: "Logistics", indent: true },
              { href: "/hire", label: "Hire Experts", indent: true },
              { href: "/jobs", label: "Jobs" },
              { href: "/courses", label: "Courses" },
              { href: "/resources", label: "Resources" },
            ].map((item, index) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:translate-x-1",
                  item.indent && "ml-4 border-l-2 border-gray-200 hover:border-blue-300"
                )}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen ? `slideIn 0.3s ease-out forwards` : undefined 
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-4 px-4 border-t border-gray-200 mt-2">
              <Link href="/cart" className="flex-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg font-medium group relative"
                >
                  <ShoppingCart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Cart
                  {cartItemCount > 0 && (
                    <span className="ml-auto gradient-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
              {/* Mobile notifications */}
              <div className="w-12"></div>
{isAuthenticated ? (
                <div className="flex-1">
                  <UserProfileDropdown className="w-full" />
                </div>
              ) : (
                <Link href="/login" className="flex-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 rounded-lg font-medium group"
                    disabled={isLoading}
                  >
                    <User className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  )
}