interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  postedDate: string
}

interface JobHeaderProps {
  job: Job
}

export default function JobHeader({ job }: JobHeaderProps) {
  return (
    <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-xl text-sky-600 font-semibold mb-4">{job.company}</p>
          <div className="flex items-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">📍 {job.location}</span>
            <span className="flex items-center gap-2">💼 {job.type}</span>
            <span className="flex items-center gap-2">💰 {job.salary}</span>
            <span className="flex items-center gap-2">📅 Posted {new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
            Save Job
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-400 text-white hover:from-sky-600 hover:to-cyan-500 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}
