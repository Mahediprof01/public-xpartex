import { LoginForm } from "@/components/auth/login-form"
import { AuthPageLayout } from "@/components/auth/auth-page-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In | Xpartex - Garment & Textile Platform",
  description: "Sign in to your Xpartex account to access suppliers, products, and business opportunities in the garment and textile industry.",
}

export default function LoginPage() {
  return (
    <AuthPageLayout
      imageUrl="/garment-factory.jpg"
      imageAlt="A bustling garment factory with workers and machinery"
    >
      <LoginForm />
    </AuthPageLayout>
  )
}