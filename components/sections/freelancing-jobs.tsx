import { Clock, DollarSign, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FreelancingJobs() {
  const jobs = [
    {
      id: "1",
      title: "Fashion Designer for Summer Collection",
      company: "Trendy Apparel Ltd.",
      location: "Remote",
      type: "Contract",
      budget: "BDT 50,000 - 80,000",
      duration: "2 months",
      skills: ["Fashion Design", "Adobe Illustrator", "Trend Analysis"],
      postedTime: "2 hours ago",
    },
    {
      id: "2",
      title: "Quality Control Specialist",
      company: "Bengal Textiles",
      location: "Dhaka, Bangladesh",
      type: "Part-time",
      budget: "BDT 35,000 - 45,000",
      duration: "3 months",
      skills: ["Quality Assurance", "Textile Testing", "Documentation"],
      postedTime: "5 hours ago",
    },
    {
      id: "3",
      title: "Pattern Maker for Kids Clothing",
      company: "Little Stars Fashion",
      location: "Chittagong, Bangladesh",
      type: "Freelance",
      budget: "BDT 25,000 - 40,000",
      duration: "1 month",
      skills: ["Pattern Making", "Grading", "Technical Drawing"],
      postedTime: "1 day ago",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Freelancing Jobs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find flexible freelance opportunities in the garment industry
          </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-sky-600 font-medium">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">{job.postedTime}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline">Save</Button>
                  <Button className="gradient-primary gradient-primary-hover text-white">Apply Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="px-8 py-3 bg-transparent" asChild>
              <Link href="/freelancers/jobs">
                View All Freelance Jobs
              </Link>
            </Button>
            <Button className="gradient-primary gradient-primary-hover text-white px-8 py-3" asChild>
              <Link href="/freelancers">
                Find Freelancers
              </Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            New to freelancing?{" "}
            <Link href="/how-it-works" className="text-sky-600 hover:underline">
              Learn how it works
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
