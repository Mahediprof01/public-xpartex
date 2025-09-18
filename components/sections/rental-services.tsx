import { Clock, Truck, Shield, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RentalServices() {
  const services = [
    {
      icon: Clock,
      title: "Short-term Equipment Rental",
      description: "Rent manufacturing equipment for short projects",
      price: "From BDT 5,000/month",
    },
    {
      icon: Truck,
      title: "Logistics Equipment",
      description: "Transportation and delivery equipment rental",
      price: "From BDT 3,000/day",
    },
    {
      icon: Shield,
      title: "Quality Testing Equipment",
      description: "Professional testing and inspection tools",
      price: "From BDT 2,500/week",
    },
    {
      icon: DollarSign,
      title: "Flexible Payment Plans",
      description: "Customized rental terms and payment options",
      price: "Negotiable rates",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Rental Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access professional equipment and services without the upfront investment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="gradient-primary p-3 rounded-xl">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  <p className="text-sky-600 font-medium mb-4">{service.price}</p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="gradient-primary gradient-primary-hover text-white px-8 py-3">
            Explore All Rental Services
          </Button>
        </div>
      </div>
    </section>
  )
}
