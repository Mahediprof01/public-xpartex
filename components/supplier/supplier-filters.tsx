"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function SupplierFilters() {
  const [minOrderRange, setMinOrderRange] = useState([0, 10000])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])

  const locations = [
    { id: "dhaka", label: "Dhaka", count: 45 },
    { id: "chittagong", label: "Chittagong", count: 32 },
    { id: "gazipur", label: "Gazipur", count: 28 },
    { id: "sylhet", label: "Sylhet", count: 22 },
    { id: "narayanganj", label: "Narayanganj", count: 18 },
  ]

  const specialties = [
    { id: "cotton-garments", label: "Cotton Garments", count: 65 },
    { id: "denim", label: "Denim", count: 42 },
    { id: "polo-shirts", label: "Polo Shirts", count: 38 },
    { id: "t-shirts", label: "T-Shirts", count: 55 },
    { id: "hoodies", label: "Hoodies", count: 28 },
    { id: "jackets", label: "Jackets", count: 19 },
  ]

  const certifications = [
    { id: "wrap", label: "WRAP", count: 45 },
    { id: "oeko-tex", label: "OEKO-TEX", count: 38 },
    { id: "iso-9001", label: "ISO 9001", count: 42 },
    { id: "bsci", label: "BSCI", count: 35 },
    { id: "gots", label: "GOTS", count: 25 },
  ]

  const clearAllFilters = () => {
    setMinOrderRange([0, 10000])
    setSelectedLocations([])
    setSelectedSpecialties([])
    setSelectedCertifications([])
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>

      {/* Minimum Order Range */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Minimum Order Quantity</h4>
        <div className="px-2">
          <Slider
            value={minOrderRange}
            onValueChange={setMinOrderRange}
            max={10000}
            min={0}
            step={100}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{minOrderRange[0].toLocaleString()} pcs</span>
            <span>{minOrderRange[1].toLocaleString()} pcs</span>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Location</h4>
        <div className="space-y-3">
          {locations.map((location) => (
            <div key={location.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={location.id}
                  checked={selectedLocations.includes(location.id)}
                  onCheckedChange={(checked) =>
                    setSelectedLocations(
                      checked
                        ? [...selectedLocations, location.id]
                        : selectedLocations.filter((id) => id !== location.id),
                    )
                  }
                />
                <label htmlFor={location.id} className="text-sm text-gray-700 cursor-pointer">
                  {location.label}
                </label>
              </div>
              <span className="text-xs text-gray-500">({location.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Specialties</h4>
        <div className="space-y-3">
          {specialties.map((specialty) => (
            <div key={specialty.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={specialty.id}
                  checked={selectedSpecialties.includes(specialty.id)}
                  onCheckedChange={(checked) =>
                    setSelectedSpecialties(
                      checked
                        ? [...selectedSpecialties, specialty.id]
                        : selectedSpecialties.filter((id) => id !== specialty.id),
                    )
                  }
                />
                <label htmlFor={specialty.id} className="text-sm text-gray-700 cursor-pointer">
                  {specialty.label}
                </label>
              </div>
              <span className="text-xs text-gray-500">({specialty.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Certifications</h4>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={cert.id}
                  checked={selectedCertifications.includes(cert.id)}
                  onCheckedChange={(checked) =>
                    setSelectedCertifications(
                      checked
                        ? [...selectedCertifications, cert.id]
                        : selectedCertifications.filter((id) => id !== cert.id),
                    )
                  }
                />
                <label htmlFor={cert.id} className="text-sm text-gray-700 cursor-pointer">
                  {cert.label}
                </label>
              </div>
              <span className="text-xs text-gray-500">({cert.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <Button className="w-full gradient-primary gradient-primary-hover text-white">Apply Filters</Button>
    </div>
  )
}
