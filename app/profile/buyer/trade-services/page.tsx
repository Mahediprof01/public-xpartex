"use client"

import { BuyerLayout } from "../../../../components/dashboard/buyer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Globe, Truck, Shield } from "lucide-react"

const services = [
  { id: 'TS-001', name: 'Inspection & QC', desc: 'Pre-shipment inspection and quality checks', price: 'Contact for quote' },
  { id: 'TS-002', name: 'Freight Forwarding', desc: 'Door-to-door shipping solutions', price: 'Contact for quote' },
  { id: 'TS-003', name: 'Trade Financing', desc: 'Payment assurance solutions', price: 'Contact for quote' }
]

export default function TradeServicesPage() {
  return (
    <BuyerLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trade Services</h1>
              <p className="text-gray-600">Value-added services to support your sourcing</p>
            </div>
            <div className="flex gap-3">
              <Input placeholder="Search services..." className="w-64" />
              <Button className="gradient-primary gradient-primary-hover text-white">Request Service</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s) => (
              <Card key={s.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{s.name}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-sm text-gray-500">{s.price}</div>
                      <Button size="sm" className="gradient-primary text-white">Request</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </BuyerLayout>
  )
}