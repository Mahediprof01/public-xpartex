"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Define routes that should not show header and footer
  const excludedRoutePrefixes = [
    '/login',
    '/register',
    '/reset-password',
    '/forgot-password',
    '/freelancer-auth',
    // Dashboard/profile routes should render without main site header/footer
    '/profile',
    '/account',
  ]

  const isExcludedRoute = excludedRoutePrefixes.some(route => pathname?.startsWith(route))

  if (isExcludedRoute) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}