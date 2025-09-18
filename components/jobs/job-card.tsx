import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  postedDate: string
  description: string
}

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-sky-600 font-medium">{job.company}</p>
          </div>
          <span className="bg-sky-100 text-sky-800 px-3 py-1 text-sm font-medium">{job.type}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
          <span>📅 {new Date(job.postedDate).toLocaleDateString()}</span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex justify-between items-center">
          <button className="text-sky-600 hover:text-sky-700 font-medium">View Details →</button>
          <button className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white px-4 py-2 text-sm hover:from-sky-600 hover:to-cyan-500 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </Link>
  )
}
