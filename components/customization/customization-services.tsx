import { Palette, Scissors, Printer, Truck } from "lucide-react"

export function CustomizationServices() {
  const services = [
    {
      icon: Palette,
      title: "Design Services",
      description: "Professional design team to bring your concepts to life",
      features: ["Logo Design", "Pattern Creation", "Color Matching", "Technical Drawings"],
    },
    {
      icon: Scissors,
      title: "Pattern Making",
      description: "Precise pattern development for perfect fit and style",
      features: ["Custom Patterns", "Size Grading", "Fit Adjustments", "Sample Creation"],
    },
    {
      icon: Printer,
      title: "Printing & Embroidery",
      description: "High-quality printing and embroidery services",
      features: ["Screen Printing", "Digital Printing", "Embroidery", "Heat Transfer"],
    },
    {
      icon: Truck,
      title: "Fast Production",
      description: "Rapid manufacturing with quality control",
      features: ["Quick Turnaround", "Quality Control", "Flexible MOQ", "Rush Orders"],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Customization Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive customization solutions to meet all your garment manufacturing needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="gradient-primary p-3 rounded-xl w-fit mb-4">
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
