import { Plane, Ship } from "lucide-react"
import React from 'react'

export function LogisticsServices() {
  const services = [
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective ocean shipping for large volume orders",
      features: ["FCL & LCL Options", "Port-to-Port", "Door-to-Door", "Customs Clearance"],
      timeframe: "15-45 days",
    },
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast international air shipping for urgent shipments",
      features: ["Express Options", "Airport-to-Airport", "Cargo Tracking"],
      timeframe: "1-7 days",
    },
  ]

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold">Logistics Services</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, idx) => (
            <div key={idx} className="p-4 border rounded bg-gray-50">
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogisticsServices
