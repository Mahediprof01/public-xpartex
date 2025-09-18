import { LogisticsHero } from "@/components/logistics/logistics-hero"
import { LogisticsServices } from "@/components/logistics/logistics-services"
import { LogisticsNetwork } from "@/components/logistics/logistics-network"
import { LogisticsTracking } from "@/components/logistics/logistics-tracking"
import { LogisticsCTA } from "@/components/logistics/logistics-cta"

export default function LogisticsPage() {
  return (
    <div className="min-h-screen">
      <LogisticsHero />
      <LogisticsServices />
      <LogisticsNetwork />
      <LogisticsTracking />
      <LogisticsCTA />
    </div>
  )
}
