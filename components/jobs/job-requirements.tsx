interface Job {
  requirements: string[]
  benefits: string[]
}

interface JobRequirementsProps {
  job: Job
}

export default function JobRequirements({ job }: JobRequirementsProps) {
  return (
    <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-bold mb-6">Requirements & Qualifications</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Required Qualifications</h3>
          <ul className="space-y-3">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Benefits & Perks</h3>
          <ul className="space-y-3">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-sky-500 mt-1">★</span>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
