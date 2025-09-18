import Link from "next/link"

const relatedJobs = [
  {
    id: "2",
    title: "Production Manager",
    company: "Global Textiles Ltd",
    salary: "$65,000 - $85,000",
  },
  {
    id: "3",
    title: "Pattern Maker",
    company: "Artisan Garments",
    salary: "$45,000 - $60,000",
  },
  {
    id: "4",
    title: "Quality Control Specialist",
    company: "Premium Fashion Co",
    salary: "$50,000 - $65,000",
  },
]

export default function RelatedJobs() {
  return (
    <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold mb-6">Related Jobs</h3>

      <div className="space-y-4">
        {relatedJobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <div className="p-4 border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-colors cursor-pointer">
              <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
              <p className="text-sm text-sky-600 mb-2">{job.company}</p>
              <p className="text-sm text-gray-600">{job.salary}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/jobs">
        <button className="w-full mt-4 text-sky-600 hover:text-sky-700 font-medium">View All Jobs →</button>
      </Link>
    </div>
  )
}
