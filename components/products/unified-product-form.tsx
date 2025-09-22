"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Alert, AlertDescription } from "../ui/alert"
import { Loader2, Upload, X, Image as ImageIcon, AlertCircle, CheckCircle, Plus } from "lucide-react"
import toast from "react-hot-toast"
import { useAuth } from "@/contexts/auth-context"
import { useProductStore } from "@/actions/product/store"
import { ProductFormData, ProductType, DescriptionItem } from "@/actions/product/type"
import { transformFormDataToApiRequest, validateProductFormData, isFieldRequired, createEmptyDescriptionItem, validateDescriptionItem } from "@/actions/product/business"

interface UnifiedProductFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function UnifiedProductForm({ onSuccess, onCancel }: UnifiedProductFormProps) {
  const router = useRouter()
  const { user } = useAuth()
  const {
    createProduct,
    isCreating,
    error,
    successMessage,
    clearError,
    clearSuccess,
    categories,
    isLoadingCategories,
    fetchCategories
  } = useProductStore()

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    img: "",
    categoryId: "",
    price: "",
    stockQuantity: 1,
    productDescription: "",
    description: [createEmptyDescriptionItem()],
    productType: "retail", // Default to retail
    size: "",
    moq: 1
  } as ProductFormData)

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [imagePreview, setImagePreview] = useState<string>("")

  // Clear messages when component mounts and fetch categories
  useEffect(() => {
    clearError()
    clearSuccess()
    fetchCategories()
  }, [clearError, clearSuccess, fetchCategories])



  // Handle successful product creation
  useEffect(() => {
    if (successMessage) {
      toast.success("Product created successfully!")
      clearSuccess()

      // Redirect after a short delay
      setTimeout(() => {
        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/profile/products")
        }
      }, 1500)
    }
  }, [successMessage, clearSuccess, onSuccess, router])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleProductTypeChange = (type: ProductType) => {
    setFormData(prev => ({
      ...prev,
      productType: type
    }))
  }

  const handleImageUrlChange = (url: string) => {
    handleInputChange("img", url)
    setImagePreview(url)
  }

  const handleDescriptionChange = (index: number, field: 'title' | 'value', value: string) => {
    setFormData(prev => {
      const newDescription = [...prev.description]
      newDescription[index] = { ...newDescription[index], [field]: value }
      return { ...prev, description: newDescription }
    })
  }

  const addDescriptionItem = () => {
    setFormData(prev => ({
      ...prev,
      description: [...prev.description, createEmptyDescriptionItem()]
    }))
  }

  const removeDescriptionItem = (index: number) => {
    if (formData.description.length > 1) {
      setFormData(prev => ({
        ...prev,
        description: prev.description.filter((_, i) => i !== index)
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.id) {
      setValidationErrors({ general: "User not authenticated" })
      return
    }

    // Check if categories are available
    if (categories.length === 0) {
      setValidationErrors({ general: "Categories are not available. Please try again later." })
      return
    }

    // Validate form data
    const validation = validateProductFormData(formData)
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    // Clear previous errors
    setValidationErrors({})
    clearError()

    // Transform form data to API request
    const apiRequest = transformFormDataToApiRequest(formData, user.id)

    // Submit to API
    try {
      const result = await createProduct(apiRequest)

      if (!result.success) {
        const errorMessage = result.error || "Failed to create product"
        setValidationErrors({ general: errorMessage })
        toast.error(errorMessage)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      const errorMessage = "An unexpected error occurred"
      setValidationErrors({ general: errorMessage })
      toast.error(errorMessage)
    }
  }

  const getFieldLabel = (field: string) => {
    const labels: Record<string, string> = {
      name: "Product Name",
      img: "Product Image URL",
      categoryId: "Category",
      price: "Price",
      stockQuantity: "Stock Quantity",
      productDescription: "Product Description",
      description: "Detailed Description",
      size: "Size",
      moq: "Minimum Order Quantity (MOQ)",
      productType: "Product Type"
    }
    return labels[field] || field
  }

  const renderField = (field: string) => {
    const isRequired = isFieldRequired(field, formData.productType)
    const label = getFieldLabel(field)
    const error = validationErrors[field]

    if (field === "productType") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Select value={formData[field]} onValueChange={(value) => handleProductTypeChange(value as ProductType)}>
            <SelectTrigger className={error ? "border-red-500" : ""}>
              <SelectValue placeholder="Select product type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="wholesale">Wholesale</SelectItem>
              <SelectItem value="b2b">B2B</SelectItem>
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "categoryId") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
            {isLoadingCategories && <Loader2 className="h-3 w-3 animate-spin ml-2 inline" />}
          </Label>
          <Select
            value={formData[field]}
            onValueChange={(value) => handleInputChange(field, value)}
            disabled={isLoadingCategories || categories.length === 0}
          >
            <SelectTrigger className={error ? "border-red-500" : ""}>
              <SelectValue placeholder={
                isLoadingCategories
                  ? "Loading categories..."
                  : categories.length === 0
                    ? "No categories available"
                    : "Select a category"
              } />
            </SelectTrigger>
            <SelectContent>
              {categories.length > 0 ? (
                categories
                  .filter(category => category.id && category.id.trim() !== "")
                  .map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                    >
                      {category.title || "Untitled Category"}
                    </SelectItem>
                  ))
              ) : (
                <div className="p-2 text-sm text-gray-500">
                  No categories available
                </div>
              )}
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "productDescription") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            id={field}
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
            rows={4}
            className={error ? "border-red-500" : ""}
          />
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "description") {
      return (
        <div key={field} className="space-y-2 col-span-2">
          <Label>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <div className="space-y-3">
            {formData.description.map((item, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Input
                    placeholder="Title (e.g., Size, Color)"
                    value={item.title}
                    onChange={(e) => handleDescriptionChange(index, 'title', e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Value (e.g., XL, Black)"
                    value={item.value}
                    onChange={(e) => handleDescriptionChange(index, 'value', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  {formData.description.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeDescriptionItem(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  {index === formData.description.length - 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addDescriptionItem}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "stockQuantity" || field === "moq") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id={field}
            type="number"
            min="1"
            value={formData[field]}
            onChange={(e) => handleInputChange(field, parseInt(e.target.value) || 0)}
            placeholder={`Enter ${label.toLowerCase()}`}
            className={error ? "border-red-500" : ""}
          />
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "price") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id={field}
            type="number"
            step="0.01"
            min="0"
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder="0.00"
            className={error ? "border-red-500" : ""}
          />
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "img") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id={field}
            type="url"
            value={formData[field]}
            onChange={(e) => handleImageUrlChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className={error ? "border-red-500" : ""}
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
                onError={() => setImagePreview("")}
              />
            </div>
          )}
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    return (
      <div key={field} className="space-y-2">
        <Label htmlFor={field}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <Input
          id={field}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{String(error)}</p>}
      </div>
    )
  }

  const getFieldsForProductType = () => {
    // Common fields for all product types
    const commonFields = ["name", "img", "categoryId", "price", "stockQuantity", "productDescription", "description"]

    // Always show product type dropdown first, then common fields
    const allFields = ["productType", ...commonFields]

    // Add conditional fields based on product type
    if (formData.productType === "retail") {
      return [...allFields, "size"]
    } else if (formData.productType === "wholesale" || formData.productType === "b2b") {
      return [...allFields, "size", "moq"]
    }

    // Default case (when no product type selected yet)
    return allFields
  }



  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <p className="text-sm text-gray-600">Fill in the product details below</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display alerts */}
          {(error || validationErrors.general) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {String(error || validationErrors.general)}
              </AlertDescription>
            </Alert>
          )}



          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getFieldsForProductType().map(field => renderField(field))}
          </div>

          {/* Form actions */}
          <div className="flex justify-end gap-4 pt-6">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isCreating} className="gradient-primary text-white">
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Product...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
