import JobCard from "./job-card"

const mockJobs = [
  {
    id: "1",
    title: "Senior Fashion Designer",
    company: "StyleCraft Industries",
    location: "New York, NY",
    type: "Full-time",
    salary: "$75,000 - $95,000",
    postedDate: "2024-01-15",
    description: "Join our creative team to design innovative fashion pieces...",
  },
  {
    id: "2",
    title: "Production Manager",
    company: "Global Textiles Ltd",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$65,000 - $85,000",
    postedDate: "2024-01-14",
    description: "Oversee production processes and ensure quality standards...",
  },
  {
    id: "3",
    title: "Pattern Maker",
    company: "Artisan Garments",
    location: "Chicago, IL",
    type: "Contract",
    salary: "$45,000 - $60,000",
    postedDate: "2024-01-13",
    description: "Create precise patterns for various garment types...",
  },
]

export default function JobGrid() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Available Jobs ({mockJobs.length})</h2>
        <select className="p-2 border border-gray-300 focus:ring-2 focus:ring-sky-500">
          <option>Sort by: Most Recent</option>
          <option>Sort by: Salary High to Low</option>
          <option>Sort by: Salary Low to High</option>
          <option>Sort by: Company Name</option>
        </select>
      </div>

      <div className="space-y-4">
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}
