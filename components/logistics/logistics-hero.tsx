import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, Globe, Shield } from "lucide-react"

export function LogisticsHero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Global <span className="gradient-primary bg-clip-text text-transparent">Logistics</span> Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Seamless end-to-end logistics services for your garment business. From factory to your doorstep, we handle
              everything with care, speed, and reliability.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Global Network</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                <span className="text-gray-700">Secure Handling</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="gradient-primary gradient-primary-hover text-white px-8 py-3">
                Get Shipping Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-8 py-3 bg-transparent">
                Track Shipment
              </Button>
            </div>
          </div>

          <div className="relative">
            <img src="/garment-export.jpg" alt="Global logistics network" className="rounded-2xl shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
