"use client"

import { UnifiedLayout } from "../../../../components/dashboard/unified-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Badge } from "../../../../components/ui/badge"
import Image from "next/image"
import { User, MapPin, Phone, Mail } from "lucide-react"

const contacts = [
  { id: 'C-001', name: 'Premium Textiles Ltd.', location: 'Dhaka, Bangladesh', phone: '+8801712345678', email: 'info@premiumtextiles.com' },
  { id: 'C-002', name: 'Global Garments Co.', location: 'Lahore, Pakistan', phone: '+92 300 1234567', email: 'sales@globalgarments.com' }
]

export default function ContactsPage() {
  return (
    <UnifiedLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
              <p className="text-gray-600">Suppliers and contacts you've interacted with</p>
            </div>
            <div className="flex gap-3">
              <Input placeholder="Search contacts..." className="w-64" />
              <Button className="gradient-primary gradient-primary-hover text-white">New Contact</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((c) => (
              <Card key={c.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-sm font-semibold">
                      {c.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{c.name}</h3>
                      <p className="text-sm text-gray-600">{c.location}</p>
                      <div className="text-sm text-gray-700 mt-2">
                        <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {c.phone}</div>
                        <div className="flex items-center gap-2 mt-1"><Mail className="h-4 w-4" /> {c.email}</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Button variant="outline" size="sm">Message</Button>
                      <Button size="sm" className="gradient-primary text-white">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </UnifiedLayout>
  )
}