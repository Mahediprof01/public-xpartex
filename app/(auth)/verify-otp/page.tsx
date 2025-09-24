import { VerifyOtpForm } from "@/components/auth/verify-otp-form"
import { AuthPageLayout } from "@/components/auth/auth-page-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verify OTP | Xpartex - Garment & Textile Platform",
  description: "Verify your email address with the OTP code sent to complete your registration on Xpartex.",
}

export default function VerifyOtpPage() {
  return (
    <AuthPageLayout
      imageUrl="/garment-factory.jpg"
      imageAlt="A bustling garment factory with workers and machinery"
    >
      <VerifyOtpForm />
    </AuthPageLayout>
  )
}