"use client"

import { useState } from "react"
import { UnifiedLayout } from "../../../../components/dashboard/unified-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProductTypeSelector } from "../../../../components/products/product-type-selector"
import { RetailProductForm } from "../../../../components/products/retail-product-form"
import { WholesaleProductForm } from "../../../../components/products/wholesale-product-form"
import { B2BProductForm } from "../../../../components/products/b2b-product-form"

export type ProductType = "wholesale" | "retail" | "b2b" | null

export default function AddProductPage() {
  const [selectedType, setSelectedType] = useState<ProductType>(null)
  const [formData, setFormData] = useState({})

  const handleTypeSelect = (type: ProductType) => {
    setSelectedType(type)
    setFormData({}) // Reset form data when type changes
  }

  const handleBack = () => {
    if (selectedType) {
      setSelectedType(null)
      setFormData({})
    }
  }

  const handleFormSubmit = (data: any) => {
    // Here you would typically save to your backend
    console.log("Product data to save:", { type: selectedType, ...data })
    
    // For now, just redirect back to products page
    // In real implementation, you'd save to DB first
    window.location.href = "/profile/products"
  }

  return (
    <UnifiedLayout>
      <div className="p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/profile/products">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                  </Button>
                </Link>
                <div>
                  <p className="text-gray-600">
                    {!selectedType 
                      ? "Choose your product type to get started" 
                      : `Adding a ${selectedType} product`
                    }
                  </p>
                </div>
              </div>
              {selectedType && (
                <Button variant="outline" onClick={handleBack}>
                  Change Product Type
                </Button>
              )}
            </div>

            {/* Main Content */}
            <Card>
              <CardContent className="p-8">
                {!selectedType ? (
                  <ProductTypeSelector onSelect={handleTypeSelect} />
                ) : (
                  <div className="space-y-6">
                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                      <span className="px-2 py-1 bg-gray-100 rounded">Step 1: Product Type</span>
                      <span>→</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded font-medium">
                        Step 2: Product Details
                      </span>
                    </div>

                    {/* Dynamic Form based on selected type */}
                    {selectedType === "retail" && (
                      <RetailProductForm 
                        onSubmit={handleFormSubmit}
                        initialData={formData}
                      />
                    )}
                    {selectedType === "wholesale" && (
                      <WholesaleProductForm 
                        onSubmit={handleFormSubmit}
                        initialData={formData}
                      />
                    )}
                    {selectedType === "b2b" && (
                      <B2BProductForm 
                        onSubmit={handleFormSubmit}
                        initialData={formData}
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
      </div>
    </UnifiedLayout>
  )
}