import { Button } from "@/components/ui/button"
import { ArrowRight, Palette, Zap, Award } from "lucide-react"

export function CustomizationHero() {
  return (
    <section className="bg-gradient-to-br from-sky-50 to-cyan-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Fast <span className="gradient-primary bg-clip-text text-transparent">Customizations</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform your ideas into reality with our rapid customization services. From design to delivery, we make
              custom garment manufacturing fast, affordable, and hassle-free.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                <span className="text-gray-700">Quick Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-500" />
                <span className="text-gray-700">Custom Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Premium Quality</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="gradient-primary gradient-primary-hover text-white px-8 py-3">
                Start Customization
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-8 py-3 bg-transparent">
                View Portfolio
              </Button>
            </div>
          </div>

          <div className="relative">
            <img src="/garment-factory.jpg" alt="Custom garment manufacturing" className="rounded-2xl shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
