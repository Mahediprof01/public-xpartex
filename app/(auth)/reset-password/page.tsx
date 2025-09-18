import { PasswordResetForm } from "@/components/auth/password-reset-form"
import { AuthPageLayout } from "@/components/auth/auth-page-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password | Xpartex - Garment & Textile Platform",
  description: "Reset your password to regain access to your Xpartex account.",
}

export default function ResetPasswordPage() {
  return (
    <AuthPageLayout
      imageUrl="/textile-production-course.jpg"
      imageAlt="Colorful spools of thread in a textile factory"
    >
      <PasswordResetForm />
    </AuthPageLayout>
  )
}