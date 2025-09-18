import { Upload, Palette, Cog, Truck } from "lucide-react"

export function CustomizationProcess() {
  const steps = [
    {
      icon: Upload,
      title: "Submit Requirements",
      description: "Upload your designs, specifications, and requirements through our easy-to-use platform",
    },
    {
      icon: Palette,
      title: "Design & Development",
      description: "Our design team creates samples and technical specifications based on your needs",
    },
    {
      icon: Cog,
      title: "Production",
      description: "Manufacturing begins with strict quality control and regular progress updates",
    },
    {
      icon: Truck,
      title: "Delivery",
      description: "Fast and secure delivery to your location with full tracking and support",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple 4-step process to get your custom garments manufactured quickly and efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="relative mb-6">
                <div className="gradient-primary p-4 rounded-2xl w-16 h-16 mx-auto flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-sky-500 rounded-full flex items-center justify-center text-sky-600 font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
