import { Button } from "@/components/ui/button"
import { Users, MessageCircle, Handshake, TrendingUp } from "lucide-react"

export function ProfessionalConnection() {
  const features = [
    {
      icon: Users,
      title: "Network Building",
      description: "Connect with industry professionals worldwide",
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description: "Chat directly with suppliers and buyers",
    },
    {
      icon: Handshake,
      title: "Partnership Opportunities",
      description: "Find long-term business partnerships",
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Scale your business with the right connections",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Professional Connection</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build meaningful business relationships and expand your professional network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="gradient-primary p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button className="gradient-primary gradient-primary-hover text-white px-8 py-3">
            Join Professional Network
          </Button>
        </div>
      </div>
    </section>
  )
}
