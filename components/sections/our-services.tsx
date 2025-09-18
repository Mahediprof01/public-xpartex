import { Shield, Users, Globe, Award } from "lucide-react"

export function OurServices() {
  const services = [
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "All suppliers are thoroughly vetted and verified for quality and reliability",
    },
    {
      icon: Users,
      title: "B2B Marketplace",
      description: "Connect directly with manufacturers and suppliers worldwide",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access to suppliers and buyers from over 50 countries",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Comprehensive quality control and inspection services",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions for all your garment sourcing and manufacturing needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="text-center group">
              <div className="gradient-primary p-4 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
