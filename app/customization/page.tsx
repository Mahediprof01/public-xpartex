import { CustomizationHero } from "@/components/customization/customization-hero"
import { CustomizationServices } from "@/components/customization/customization-services"
import { CustomizationProcess } from "@/components/customization/customization-process"
import { CustomizationPortfolio } from "@/components/customization/customization-portfolio"
import { CustomizationCTA } from "@/components/customization/customization-cta"

export default function CustomizationPage() {
  return (
    <div className="min-h-screen">
      <CustomizationHero />
      <CustomizationServices />
      <CustomizationProcess />
      <CustomizationPortfolio />
      <CustomizationCTA />
    </div>
  )
}
