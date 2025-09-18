"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, Globe, Clock } from "lucide-react"

interface ContactSupplierProps {
  supplier: any
}

export function ContactSupplier({ supplier }: ContactSupplierProps) {
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Supplier</h3>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-700">{supplier.contact.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-700">{supplier.contact.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-700">{supplier.contact.website}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-700">{supplier.businessHours}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="w-full gradient-primary gradient-primary-hover text-white">
          <MessageCircle className="h-4 w-4 mr-2" />
          Send Message
        </Button>
        <Button variant="outline" className="w-full bg-transparent">
          Request Quote
        </Button>
        <Button variant="outline" className="w-full bg-transparent">
          WhatsApp Chat
        </Button>
      </div>

      {showContactForm && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Send Quick Message</h4>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
            <textarea
              placeholder="Your message"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none"
            />
            <Button size="sm" className="w-full gradient-primary gradient-primary-hover text-white">
              Send Message
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
