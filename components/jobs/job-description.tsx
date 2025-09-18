interface Job {
  description: string
}

interface JobDescriptionProps {
  job: Job
}

export default function JobDescription({ job }: JobDescriptionProps) {
  return (
    <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-bold mb-6">Job Description</h2>
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed mb-4">
          We are seeking a talented Senior Fashion Designer to join our creative team at StyleCraft Industries. In this
          role, you will be responsible for creating innovative and marketable fashion designs that align with our brand
          vision and customer preferences.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">Key Responsibilities:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Develop creative concepts and design sketches for new collections</li>
          <li>Research fashion trends and market demands</li>
          <li>Collaborate with production teams to ensure design feasibility</li>
          <li>Create technical specifications and detailed drawings</li>
          <li>Participate in fitting sessions and make necessary adjustments</li>
          <li>Work closely with merchandising and marketing teams</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-3">What We Offer:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Competitive salary and performance bonuses</li>
          <li>Comprehensive health and dental insurance</li>
          <li>Creative freedom and professional development opportunities</li>
          <li>Modern design studio with latest technology</li>
          <li>Flexible work arrangements</li>
        </ul>
      </div>
    </div>
  )
}
