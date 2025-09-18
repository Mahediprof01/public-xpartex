import ResourcesHero from "@/components/resources/resources-hero"
import ResourcesGrid from "@/components/resources/resources-grid"
import ResourcesCategories from "@/components/resources/resources-categories"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <ResourcesHero />
      <ResourcesCategories />
      <ResourcesGrid />
    </div>
  )
}
