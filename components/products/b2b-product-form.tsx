"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Switch } from "../ui/switch"
// RadioGroup removed — pricing configuration no longer required
import { Upload, X, FileText } from "lucide-react"

interface ImageFile {
  id: number
  name: string
  url: string
  file: File
}

interface DocumentFile {
  id: number
  name: string
  size: string
  file: File
}

interface B2BFormData {
  productName: string
  sku: string
  moq: string
  rfqEnabled: boolean
  leadTime: string
  category: string
  description: string
  images: ImageFile[]
  documents: DocumentFile[]
}

interface FormErrors {
  [key: string]: string | undefined
  productName?: string
  sku?: string
  moq?: string
  rfqEnabled?: string
  leadTime?: string
  category?: string
  description?: string
  images?: string
  documents?: string
}

interface B2BProductFormProps {
  onSubmit: (data: B2BFormData) => void
  initialData?: Partial<B2BFormData>
}

export function B2BProductForm({ onSubmit, initialData = {} }: B2BProductFormProps) {
  const [formData, setFormData] = useState<B2BFormData>({
    productName: initialData.productName || "",
    sku: initialData.sku || "",
    moq: initialData.moq || "",
    rfqEnabled: initialData.rfqEnabled || true,
    leadTime: initialData.leadTime || "",
    category: initialData.category || "",
    description: initialData.description || "",
    images: initialData.images || [],
    documents: initialData.documents || []
  })
  
  const [errors, setErrors] = useState<FormErrors>({})

  const categories = [
    "Manufacturing Services",
    "Custom Apparel",
    "Industrial Equipment", 
    "Raw Materials",
    "Business Services",
    "Technology Solutions",
    "Other B2B Services"
  ]

  const handleInputChange = (field: keyof B2BFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
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

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      const newDocuments = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        file: file
      }))
      setFormData(prev => ({ 
        ...prev, 
        documents: [...prev.documents, ...newDocuments].slice(0, 5)
      }))
    }
  }

  const removeImage = (imageId: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((img: ImageFile) => img.id !== imageId)
    }))
  }

  const removeDocument = (docId: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((doc: DocumentFile) => doc.id !== docId)
    }))
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (!formData.productName.trim()) newErrors.productName = "Product name is required"
    if (!formData.sku.trim()) newErrors.sku = "SKU is required"
    if (!formData.moq || parseInt(formData.moq) <= 0) newErrors.moq = "Valid MOQ is required"
    if (!formData.leadTime || parseInt(formData.leadTime) <= 0) newErrors.leadTime = "Lead time is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (formData.images.length === 0) newErrors.images = "At least one product image is required"

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
                placeholder="Enter product/service name"
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
                placeholder="e.g., B2B-MFG-001"
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

        {/* B2B Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">B2B Configuration</CardTitle>
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
                placeholder="e.g., 500"
                className={errors.moq ? "border-red-500" : ""}
              />
              {errors.moq && (
                <p className="text-sm text-red-500 mt-1">{errors.moq}</p>
              )}
            </div>

            <div>
              <Label htmlFor="leadTime">Lead Time (Production Days) *</Label>
              <Input
                id="leadTime"
                type="number"
                min="1"
                value={formData.leadTime}
                onChange={(e) => handleInputChange("leadTime", e.target.value)}
                placeholder="e.g., 30"
                className={errors.leadTime ? "border-red-500" : ""}
              />
              {errors.leadTime && (
                <p className="text-sm text-red-500 mt-1">{errors.leadTime}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Estimated days from order to completion
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="rfqEnabled">Enable RFQ (Request for Quotation)</Label>
                <p className="text-sm text-gray-500">Allow buyers to request custom quotes</p>
              </div>
              <Switch
                id="rfqEnabled"
                checked={formData.rfqEnabled}
                onCheckedChange={(checked) => handleInputChange("rfqEnabled", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing configuration removed as requested */}

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

      {/* Business Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Business Documents (Optional)</CardTitle>
          <p className="text-sm text-gray-600">Upload certifications, specifications, or other relevant documents</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="documents"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                multiple
                onChange={handleDocumentUpload}
                className="hidden"
              />
              <label htmlFor="documents" className="cursor-pointer flex flex-col items-center gap-2">
                <FileText className="h-8 w-8 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Click to upload documents</p>
                  <p className="text-xs text-gray-500">PDF, DOC, XLS, PPT up to 25MB each (max 5 files)</p>
                </div>
              </label>
            </div>

            {formData.documents.length > 0 && (
              <div className="space-y-2">
                {formData.documents.map((doc: DocumentFile) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(doc.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
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
            placeholder="Describe your B2B product/service, capabilities, certifications, target industries..."
            className={`min-h-32 ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Include manufacturing capabilities, quality standards, certifications, target industries, customization options, etc.
          </p>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-6">
        <Button type="submit" className="gradient-primary gradient-primary-hover text-white">
          Add B2B Product
        </Button>
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
      </div>
    </form>
  )
}