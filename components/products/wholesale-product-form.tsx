"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Upload, X, Plus, Trash2 } from "lucide-react"

interface ImageFile {
  id: number
  name: string
  url: string
  file: File
}

interface TierPricing {
  minQty: string
  maxQty: string
  price: string
}

interface WholesaleFormData {
  productName: string
  sku: string
  moq: string
  tierPricing: TierPricing[]
  stockQuantity: string
  category: string
  description: string
  images: ImageFile[]
}

interface TierError {
  minQty?: string
  maxQty?: string
  price?: string
}

interface FormErrors {
  [key: string]: string | TierError[] | undefined
  productName?: string
  sku?: string
  moq?: string
  stockQuantity?: string
  category?: string
  description?: string
  images?: string
  tierPricing?: TierError[]
}

interface WholesaleProductFormProps {
  onSubmit: (data: WholesaleFormData) => void
  initialData?: Partial<WholesaleFormData>
}

export function WholesaleProductForm({ onSubmit, initialData = {} }: WholesaleProductFormProps) {
  const [formData, setFormData] = useState<WholesaleFormData>({
    productName: initialData.productName || "",
    sku: initialData.sku || "",
    moq: initialData.moq || "",
    tierPricing: initialData.tierPricing || [
      { minQty: "", maxQty: "", price: "" }
    ],
    stockQuantity: initialData.stockQuantity || "",
    category: initialData.category || "",
    description: initialData.description || "",
    images: initialData.images || []
  })
  
  const [errors, setErrors] = useState<FormErrors>({})

  const categories = [
    "Apparel",
    "Accessories", 
    "Footwear",
    "Home & Living",
    "Electronics",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Other"
  ]

  const handleInputChange = (field: keyof WholesaleFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleTierPricingChange = (index: number, field: string, value: string) => {
    const updatedTiers = [...formData.tierPricing]
    updatedTiers[index] = { ...updatedTiers[index], [field]: value }
    setFormData(prev => ({ ...prev, tierPricing: updatedTiers }))
  }

  const addTierPricing = () => {
    setFormData(prev => ({
      ...prev,
      tierPricing: [...prev.tierPricing, { minQty: "", maxQty: "", price: "" }]
    }))
  }

  const removeTierPricing = (index: number) => {
    if (formData.tierPricing.length > 1) {
      setFormData(prev => ({
        ...prev,
        tierPricing: prev.tierPricing.filter((_: TierPricing, i: number) => i !== index)
      }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      const newImages = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        url: URL.createObjectURL(file),
        file: file
      }))
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...newImages].slice(0, 10)
      }))
    }
  }

  const removeImage = (imageId: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((img: ImageFile) => img.id !== imageId)
    }))
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (!formData.productName.trim()) newErrors.productName = "Product name is required"
    if (!formData.sku.trim()) newErrors.sku = "SKU is required"
    if (!formData.moq || parseInt(formData.moq) <= 0) newErrors.moq = "Valid MOQ is required"
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) newErrors.stockQuantity = "Stock quantity is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (formData.images.length === 0) newErrors.images = "At least one product image is required"
    
    // Validate tier pricing
    const tierErrors: TierError[] = []
    formData.tierPricing.forEach((tier: TierPricing, index: number) => {
      const tierError: TierError = {}
      if (!tier.minQty || parseInt(tier.minQty) <= 0) tierError.minQty = "Min quantity required"
      if (!tier.maxQty || parseInt(tier.maxQty) <= parseInt(tier.minQty)) tierError.maxQty = "Max quantity must be greater than min"
      if (!tier.price || parseFloat(tier.price) <= 0) tierError.price = "Valid price required"
      
      if (Object.keys(tierError).length > 0) {
        tierErrors[index] = tierError
      }
    })
    
    if (tierErrors.length > 0) {
      newErrors.tierPricing = tierErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={formData.productName}
                onChange={(e) => handleInputChange("productName", e.target.value)}
                placeholder="Enter product name"
                className={errors.productName ? "border-red-500" : ""}
              />
              {errors.productName && (
                <p className="text-sm text-red-500 mt-1">{errors.productName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                placeholder="e.g., WT-001-BULK"
                className={errors.sku ? "border-red-500" : ""}
              />
              {errors.sku && (
                <p className="text-sm text-red-500 mt-1">{errors.sku}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* MOQ & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">MOQ & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="moq">Minimum Order Quantity (MOQ) *</Label>
              <Input
                id="moq"
                type="number"
                min="1"
                value={formData.moq}
                onChange={(e) => handleInputChange("moq", e.target.value)}
                placeholder="e.g., 100"
                className={errors.moq ? "border-red-500" : ""}
              />
              {errors.moq && (
                <p className="text-sm text-red-500 mt-1">{errors.moq}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Minimum quantity buyers must order
              </p>
            </div>

            <div>
              <Label htmlFor="stockQuantity">Total Stock Quantity *</Label>
              <Input
                id="stockQuantity"
                type="number"
                min="0"
                value={formData.stockQuantity}
                onChange={(e) => handleInputChange("stockQuantity", e.target.value)}
                placeholder="0"
                className={errors.stockQuantity ? "border-red-500" : ""}
              />
              {errors.stockQuantity && (
                <p className="text-sm text-red-500 mt-1">{errors.stockQuantity}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tier Pricing Structure *</CardTitle>
          <p className="text-sm text-gray-600">Set different prices for different quantity ranges</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.tierPricing.map((tier, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <Label htmlFor={`minQty-${index}`}>Min Quantity</Label>
                <Input
                  id={`minQty-${index}`}
                  type="number"
                  min="1"
                  value={tier.minQty}
                  onChange={(e) => handleTierPricingChange(index, "minQty", e.target.value)}
                  placeholder="1"
                  className={errors.tierPricing?.[index]?.minQty ? "border-red-500" : ""}
                />
                {errors.tierPricing?.[index]?.minQty && (
                  <p className="text-xs text-red-500 mt-1">{errors.tierPricing[index].minQty}</p>
                )}
              </div>

              <div>
                <Label htmlFor={`maxQty-${index}`}>Max Quantity</Label>
                <Input
                  id={`maxQty-${index}`}
                  type="number"
                  min="1"
                  value={tier.maxQty}
                  onChange={(e) => handleTierPricingChange(index, "maxQty", e.target.value)}
                  placeholder="100"
                  className={errors.tierPricing?.[index]?.maxQty ? "border-red-500" : ""}
                />
                {errors.tierPricing?.[index]?.maxQty && (
                  <p className="text-xs text-red-500 mt-1">{errors.tierPricing[index].maxQty}</p>
                )}
              </div>

              <div>
                <Label htmlFor={`price-${index}`}>Price per Unit</Label>
                <Input
                  id={`price-${index}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={tier.price}
                  onChange={(e) => handleTierPricingChange(index, "price", e.target.value)}
                  placeholder="0.00"
                  className={errors.tierPricing?.[index]?.price ? "border-red-500" : ""}
                />
                {errors.tierPricing?.[index]?.price && (
                  <p className="text-xs text-red-500 mt-1">{errors.tierPricing[index].price}</p>
                )}
              </div>

              <div className="flex items-end gap-2">
                {formData.tierPricing.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeTierPricing(index)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addTierPricing}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Pricing Tier
          </Button>
        </CardContent>
      </Card>

      {/* Product Images */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Images *</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Click to upload product images</p>
                  <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB each (max 10 images)</p>
                </div>
              </label>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image: ImageFile, index: number) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img src={image.url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Main</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Description *</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your wholesale product, target market, specifications..."
            className={`min-h-32 ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Include bulk packaging details, shipping information, quality certifications, etc.
          </p>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-6">
        <Button type="submit" className="gradient-primary gradient-primary-hover text-white">
          Add Wholesale Product
        </Button>
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
      </div>
    </form>
  )
}