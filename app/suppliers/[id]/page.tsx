"use client"

import { useParams } from "next/navigation"
import { SupplierHeader } from "@/components/supplier/supplier-header"
import { SupplierStats } from "@/components/supplier/supplier-stats"
import { SupplierProducts } from "@/components/supplier/supplier-products"
import { SupplierReviews } from "@/components/supplier/supplier-reviews"
import { ContactSupplier } from "@/components/supplier/contact-supplier"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SupplierProfilePage() {
  const params = useParams()
  const supplierId = params.id as string

  // Mock supplier data - in real app this would be fetched based on ID
  const supplier = {
    id: supplierId,
    name: "Dhaka Textiles Ltd.",
    logo: "/textile-company-logo.jpg",
    coverImage: "/garment-factory.jpg",
    rating: 4.8,
    totalReviews: 156,
    location: "Dhaka, Bangladesh",
    address: "123 Industrial Area, Savar, Dhaka-1340, Bangladesh",
    description: `Dhaka Textiles Ltd. is a leading manufacturer of premium cotton garments with over 15 years of experience 
    in export quality production. We specialize in sustainable manufacturing processes and maintain the highest standards 
    of quality control. Our state-of-the-art facility is equipped with modern machinery and employs skilled workers 
    who are committed to delivering excellence.`,
    totalProducts: 250,
    verified: true,
    responseTime: "Within 2 hours",
    languages: ["English", "Bengali"],
    specialties: ["Cotton Garments", "T-Shirts", "Polo Shirts", "Casual Wear"],
    certifications: ["WRAP Certified", "OEKO-TEX Standard 100", "ISO 9001:2015", "BSCI Audit"],
    minOrder: 500,
    establishedYear: 2008,
    employees: "500-1000",
    exportMarkets: ["USA", "Europe", "Canada", "Australia"],
    contact: {
      email: "info@dhakatextiles.com",
      phone: "+880-2-7791234",
      website: "www.dhakatextiles.com",
      whatsapp: "+880-1712345678",
    },
    businessHours: "9:00 AM - 6:00 PM (GMT+6)",
    paymentTerms: ["T/T", "L/C", "Western Union"],
    shippingMethods: ["Sea Freight", "Air Freight", "Express Courier"],
    socialMedia: {
      linkedin: "https://linkedin.com/company/dhaka-textiles",
      facebook: "https://facebook.com/dhakatextiles",
    },
    companyStats: {
      monthlyCapacity: 50000,
      averageLeadTime: 15,
      onTimeDelivery: 98,
      qualityRating: 4.9,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/suppliers" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Suppliers
          </Link>
        </div>

        {/* Supplier Header */}
        <div className="mb-8">
          <SupplierHeader supplier={supplier} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Company</h2>
              <p className="text-gray-600 leading-relaxed">{supplier.description}</p>
            </div>

            {/* Stats */}
            <SupplierStats supplier={supplier} />

            {/* Products */}
            <SupplierProducts supplierId={supplier.id} />

            {/* Reviews */}
            <SupplierReviews supplierId={supplier.id} />
          </div>

          {/* Right Column - Contact & Info */}
          <div className="space-y-6">
            <ContactSupplier supplier={supplier} />

            {/* Company Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Established:</span>
                  <span className="font-medium">{supplier.establishedYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees:</span>
                  <span className="font-medium">{supplier.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Order:</span>
                  <span className="font-medium">{supplier.minOrder.toLocaleString()} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-medium">{supplier.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Business Hours:</span>
                  <span className="font-medium">{supplier.businessHours}</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
              <div className="space-y-2">
                {supplier.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Markets */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Markets</h3>
              <div className="flex flex-wrap gap-2">
                {supplier.exportMarkets.map((market) => (
                  <span key={market} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {market}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
