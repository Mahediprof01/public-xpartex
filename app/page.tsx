import { Hero } from "@/components/layout/hero"
import { InfoStrip } from "@/components/layout/info-strip"
import { OurServices } from "@/components/sections/our-services"
import { QuotationProduct } from "@/components/sections/quotation-product"
import { Products } from "@/components/sections/products"
import { ProductsSection } from "@/components/sections/products-section"
import { TopSupplier } from "@/components/sections/top-supplier"
import { ProfessionalConnection } from "@/components/sections/professional-connection"
import { RentalServices } from "@/components/sections/rental-services"
import { HireExperts } from "@/components/sections/hire-experts"
import { FreelancingJobs } from "@/components/sections/freelancing-jobs"
import { JobPortal } from "@/components/sections/job-portal"
import { OnlineCourses } from "@/components/sections/online-courses"
import { EBooks } from "@/components/sections/e-books"
import { DigitalResources } from "@/components/sections/digital-resources"
import { News } from "@/components/sections/news"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <InfoStrip />
      <OurServices />
      <ProductsSection />
      <QuotationProduct />
      <Products />
      <TopSupplier />
      <ProfessionalConnection />
      <RentalServices />
      <HireExperts />
      <FreelancingJobs />
      <JobPortal />
      <OnlineCourses />
      <EBooks />
      <DigitalResources />
      <News />
    </div>
  )
}
