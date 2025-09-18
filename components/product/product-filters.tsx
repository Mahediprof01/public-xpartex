"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])

  const categories = [
    { id: "t-shirts", label: "T-Shirts", count: 45 },
    { id: "jeans", label: "Jeans", count: 32 },
    { id: "polo-shirts", label: "Polo Shirts", count: 28 },
    { id: "hoodies", label: "Hoodies", count: 22 },
    { id: "dresses", label: "Dresses", count: 38 },
    { id: "jackets", label: "Jackets", count: 19 },
  ]

  const suppliers = [
    { id: "dhaka-textiles", label: "Dhaka Textiles Ltd.", count: 25 },
    { id: "bengal-garments", label: "Bengal Garments", count: 18 },
    { id: "chittagong-apparel", label: "Chittagong Apparel", count: 22 },
    { id: "sylhet-fashion", label: "Sylhet Fashion House", count: 15 },
  ]

  const materials = [
    { id: "cotton", label: "Cotton", count: 65 },
    { id: "polyester", label: "Polyester", count: 42 },
    { id: "denim", label: "Denim", count: 28 },
    { id: "fleece", label: "Fleece", count: 19 },
    { id: "silk", label: "Silk", count: 12 },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const clearAllFilters = () => {
    setPriceRange([0, 5000])
    setSelectedCategories([])
    setSelectedSuppliers([])
    setSelectedMaterials([])
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Price Range (BDT)</h4>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={5000} min={0} step={100} className="mb-4" />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>BDT {priceRange[0].toLocaleString()}</span>
            <span>BDT {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <label htmlFor={category.id} className="text-sm text-gray-700 cursor-pointer">
                  {category.label}
                </label>
              </div>
              <span className="text-xs text-gray-500">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suppliers */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Suppliers</h4>
        <div className="space-y-3">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={supplier.id}
                  checked={selectedSuppliers.includes(supplier.id)}
                  onCheckedChange={(checked) =>
                    setSelectedSuppliers(
                      checked
                        ? [...selectedSuppliers, supplier.id]
                        : selectedSuppliers.filter((id) => id !== supplier.id),
                    )
                  }
                />
                <label htmlFor={supplier.id} className="text-sm text-gray-700 cursor-pointer">
                  {supplier.label}
                </label>
              </div>
              <span className="text-xs text-gray-500">({supplier.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Materials</h4>
        <div className="space-y-3">
          {materials.map((material) => (
            <div key={material.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={material.id}
                  checked={selectedMaterials.includes(material.id)}
                  onCheckedChange={(checked) =>
                    setSelectedMaterials(
                      checked
                        ? [...selectedMaterials, material.id]
                        : selectedMaterials.filter((id) => id !== material.id),
                    )
                  }
                />
                <label htmlFor={material.id} className="text-sm text-gray-700 cursor-pointer">
                  {material.label}
                </label>
              </div>
              <span className="text-xs text-gray-500">({material.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <Button className="w-full gradient-primary gradient-primary-hover text-white">Apply Filters</Button>
    </div>
  )
}
