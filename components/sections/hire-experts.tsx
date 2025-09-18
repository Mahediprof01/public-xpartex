import { Star, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HireExperts() {
  const experts = [
    {
      id: "1",
      name: "Sarah Ahmed",
      title: "Fashion Designer",
      rating: 4.9,
      location: "Dhaka, Bangladesh",
      experience: "8+ years",
      hourlyRate: 2500,
      skills: ["Fashion Design", "Pattern Making", "CAD"],
      avatar: "/fashion-designer-woman.jpg",
    },
    {
      id: "2",
      name: "Mohammad Rahman",
      title: "Production Manager",
      rating: 4.8,
      location: "Chittagong, Bangladesh",
      experience: "12+ years",
      hourlyRate: 3000,
      skills: ["Production Planning", "Quality Control", "Team Management"],
      avatar: "/production-manager-man.jpg",
    },
    {
      id: "3",
      name: "Fatima Khan",
      title: "Textile Engineer",
      rating: 4.9,
      location: "Gazipur, Bangladesh",
      experience: "6+ years",
      hourlyRate: 2800,
      skills: ["Textile Technology", "Fabric Analysis", "Process Optimization"],
      avatar: "/textile-engineer-woman.jpg",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Hire Experts</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with experienced professionals to help grow your garment business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border"
            >
              <div className="text-center mb-4">
                <img
                  src={expert.avatar || "/placeholder.svg"}
                  alt={expert.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{expert.name}</h3>
                <p className="text-sky-600 font-medium mb-2">{expert.title}</p>

                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{expert.rating}</span>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{expert.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{expert.experience}</span>
                  </div>
                </div>

                <div className="text-lg font-semibold text-gray-900 mb-4">
                  BDT {expert.hourlyRate.toLocaleString()}/hour
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>

                <Button className="w-full gradient-primary gradient-primary-hover text-white">Hire Now</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 bg-transparent">
            View All Experts
          </Button>
        </div>
      </div>
    </section>
  )
}
