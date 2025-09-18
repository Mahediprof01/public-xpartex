"use client"

import Link from "next/link"
import Image from "next/image"

interface AuthPageLayoutProps {
  children: React.ReactNode
  imageUrl: string
  imageAlt: string
}

export function AuthPageLayout({ children, imageUrl, imageAlt }: AuthPageLayoutProps) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex flex-col p-6 lg:p-10">
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Xpartex Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}