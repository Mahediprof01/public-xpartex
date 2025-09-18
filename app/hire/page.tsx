import HireHero from "@/components/hire/hire-hero"
import HireServices from "@/components/hire/hire-services"
import HireProcess from "@/components/hire/hire-process"
import HireExperts from "@/components/hire/hire-experts"
import HireTestimonials from "@/components/hire/hire-testimonials"

export default function HirePage() {
  return (
    <div className="min-h-screen">
      <HireHero />
      <HireServices />
      <HireProcess />
      <HireExperts />
      <HireTestimonials />
    </div>
  )
}
