import { Building, Users, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JobPortal() {
  const stats = [
    {
      icon: Building,
      number: "500+",
      label: "Companies Hiring",
    },
    {
      icon: Users,
      number: "2,000+",
      label: "Active Job Seekers",
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Success Rate",
    },
    {
      icon: Award,
      number: "1,200+",
      label: "Jobs Filled",
    },
  ]

  const jobCategories = [
    { name: "Fashion Design", count: 45, color: "bg-pink-100 text-pink-700" },
    { name: "Production Management", count: 32, color: "bg-blue-100 text-blue-700" },
    { name: "Quality Control", count: 28, color: "bg-green-100 text-green-700" },
    { name: "Textile Engineering", count: 22, color: "bg-purple-100 text-purple-700" },
    { name: "Sales & Marketing", count: 38, color: "bg-orange-100 text-orange-700" },
    { name: "Supply Chain", count: 19, color: "bg-cyan-100 text-cyan-700" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Job Portal</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your dream career in the garment industry or hire top talent for your company
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="gradient-primary p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Job Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Job Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {jobCategories.map((category) => (
              <div
                key={category.name}
                className="bg-white border rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.count} open positions</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>{category.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Take the Next Step?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're looking for your next career opportunity or need to hire skilled professionals, our job
            portal connects the right people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gradient-primary gradient-primary-hover text-white px-8 py-3">Find Jobs</Button>
            <Button variant="outline" className="px-8 py-3 bg-transparent">
              Post a Job
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
