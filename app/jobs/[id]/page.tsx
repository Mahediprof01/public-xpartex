import { notFound } from "next/navigation"
import JobHeader from "@/components/jobs/job-header"
import JobDescription from "@/components/jobs/job-description"
import JobRequirements from "@/components/jobs/job-requirements"
import JobApplication from "@/components/jobs/job-application"
import RelatedJobs from "@/components/jobs/related-jobs"

// Mock job data
const mockJob = {
  id: "1",
  title: "Senior Fashion Designer",
  company: "StyleCraft Industries",
  location: "New York, NY",
  type: "Full-time",
  salary: "$75,000 - $95,000",
  postedDate: "2024-01-15",
  description: "We are seeking a talented Senior Fashion Designer to join our creative team...",
  requirements: [
    "Bachelor's degree in Fashion Design or related field",
    "5+ years of experience in fashion design",
    "Proficiency in Adobe Creative Suite",
    "Strong understanding of garment construction",
  ],
  benefits: [
    "Health insurance",
    "Dental and vision coverage",
    "401(k) with company match",
    "Flexible work arrangements",
  ],
}

export default async function JobDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  
  // In a real app, fetch job by ID
  if (!mockJob) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <JobHeader job={mockJob} />
            <JobDescription job={mockJob} />
            <JobRequirements job={mockJob} />
          </div>

          <div className="space-y-8">
            <JobApplication job={mockJob} />
            <RelatedJobs />
          </div>
        </div>
      </div>
    </div>
  )
}
