import { RegistrationForm } from "@/components/auth/registration-form"
import { AuthPageLayout } from "@/components/auth/auth-page-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Account | Xpartex - Garment & Textile Platform",
  description: "Join Xpartex to connect with suppliers and buyers in the garment and textile industry. Create your free account today.",
}

export default function RegisterPage() {
  return (
    <AuthPageLayout
      imageUrl="/fashion-designer-woman.jpg"
      imageAlt="A fashion designer sketching new clothing designs"
    >
      <RegistrationForm />
    </AuthPageLayout>
  )
}