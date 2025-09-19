"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Plus } from "lucide-react"
import { Combobox } from "@/components/ui/combobox"

export function RFQForm() {
  type Spec = { key: string; value: string }
  type FormData = {
    title: string
    category: string
    quantity: string
    leadTime: string
    specifications: Spec[]
    preferredSuppliers: string[]
    attachments: any[]
  }

  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    quantity: "",
    leadTime: "",
    specifications: [{ key: "", value: "" }],
    preferredSuppliers: [],
    attachments: [],
  })

  const categories = [
    "T-Shirts",
    "Polo Shirts",
    "Hoodies",
    "Jeans",
    "Dresses",
    "Jackets",
    "Sportswear",
    "Formal Wear",
    "Kids Clothing",
    "Accessories",
  ]

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: "", value: "" }],
    })
  }

  const removeSpecification = (index: number) => {
    const newSpecs = formData.specifications.filter((_, i) => i !== index)
    setFormData({ ...formData, specifications: newSpecs })
  }

  const updateSpecification = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...formData.specifications]
    newSpecs[index][field] = value
    setFormData({ ...formData, specifications: newSpecs })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("RFQ submitted:", formData)
    // Handle form submission
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New RFQ</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">RFQ Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Custom Cotton T-Shirts for Promotional Event"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Note: Detailed Description removed per request */}

        {/* Quantity and lead time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Required *</label>
            <input
              type="number"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="e.g., 1000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required Lead Time (days)</label>
            <input
              type="number"
              value={formData.leadTime}
              onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
              placeholder="e.g., 30"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Specifications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Specifications</label>
            <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
              <Plus className="h-4 w-4 mr-2" />
              Add Specification
            </Button>
          </div>

          <div className="space-y-3">
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Specification (e.g., Material)"
                  value={spec.key}
                  onChange={(e) => updateSpecification(index, "key", e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Value (e.g., 100% Cotton)"
                  value={spec.value}
                  onChange={(e) => updateSpecification(index, "value", e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                {formData.specifications.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeSpecification(index)}
                    className="bg-transparent"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Upload design files, reference images, or technical drawings</p>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB each</p>
            <Button type="button" variant="outline" size="sm" className="mt-3 bg-transparent">
              Choose Files
            </Button>
          </div>
        </div>

        {/* Preferred Suppliers using Combobox */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Suppliers (Optional)</label>
          <Combobox
            options={[]}
            value={formData.preferredSuppliers[0] ?? ""}
            onChange={(v) => setFormData({ ...formData, preferredSuppliers: v ? [v] : [] })}
            placeholder={""}
            showChevron={false}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-left"
          />
          <p className="text-xs text-gray-500 mt-1">If left blank, your RFQ will be sent to all suppliers matching your category</p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" className="gradient-primary gradient-primary-hover text-white px-8">
            Submit RFQ
          </Button>
          <Button type="button" variant="outline" className="bg-transparent">
            Save as Draft
          </Button>
        </div>
      </form>
    </div>
  )
}
