"use client"

import { useState } from "react"
import { RFQForm } from "@/components/rfq/rfq-form"
import { RFQList } from "@/components/rfq/rfq-list"
import { RFQStats } from "@/components/rfq/rfq-stats"
import { Button } from "@/components/ui/button"
import { Plus, FileText, CheckCircle } from "lucide-react"

export default function RFQPage() {
  const [activeTab, setActiveTab] = useState("create")

  const tabs = [
    { id: "create", label: "Create RFQ", icon: Plus },
    { id: "my-rfqs", label: "My RFQs", icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request for Quotation (RFQ)</h1>
          <p className="text-gray-600">Get custom quotes from verified suppliers for your specific requirements</p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <RFQStats />
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex bg-white rounded-2xl p-1 shadow-sm border w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id ? "gradient-primary text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === "create" && <RFQForm />}
            {activeTab === "my-rfqs" && <RFQList />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How it Works */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How RFQ Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Submit Request</h4>
                    <p className="text-sm text-gray-600">Fill out your requirements and specifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Get Quotes</h4>
                    <p className="text-sm text-gray-600">Receive competitive quotes from verified suppliers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Compare & Choose</h4>
                    <p className="text-sm text-gray-600">Compare offers and select the best supplier</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Free to submit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Multiple competitive quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Verified suppliers only</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-700">Quick response time</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our team is here to help you get the best quotes for your requirements.
              </p>
              <Button variant="outline" className="w-full bg-transparent">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
