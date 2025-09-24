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
import { ProductFormData, ProductType, DescriptionItem, SizeItem } from "@/actions/product/type"
import { transformFormDataToApiRequest, validateProductFormData, isFieldRequired, createEmptyDescriptionItem, validateDescriptionItem, createEmptySizeItem, validateSizeItem } from "@/actions/product/business"
import ImageUploadBox from "../common/ImageUploadBox"

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
    productStatus: "publish",
    productType: "retail", // Default to retail
    productSubCategory: "",
    hsnCode: "",
    skuCode: "",
    materialType: "",
    composition: "",
    gsm: "",
    yarnCount: "",
    pattern: "",
    certifications: [""],
    unitOfMeasurement: "kg",
    availableQuantity: 1,
    manufacturer: false,
    originCountry: "",
    productionCapacity: "",
    description: [createEmptyDescriptionItem()],
    size: [createEmptySizeItem()],
    additionalImages: [""],
    tags: [""],
    weight: 0.1,
    deliveryOptions: [""],
    discountPrice: 0,
    colorVariants: [""],
    returnPolicy: "",
    packagingDetails: "",
    leadTime: "",
    moq: 1,
    negotiablePrice: false,
    sampleAvailability: false,
    customBiddingOption: false
  } as ProductFormData)

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

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

  const handleInputChange = (field: string, value: string | number | boolean | File) => {
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
    setFormData(prev => {
      const newData = { ...prev, productType: type }
      
      // Add/remove conditional fields based on product type
      if (type === "wholesale" || type === "b2b") {
        newData.moq = prev.moq || 1
        newData.negotiablePrice = prev.negotiablePrice !== undefined ? prev.negotiablePrice : false
        newData.sampleAvailability = prev.sampleAvailability !== undefined ? prev.sampleAvailability : false
        newData.customBiddingOption = prev.customBiddingOption !== undefined ? prev.customBiddingOption : false
      } else {
        // For retail, we keep the fields but they won't be sent in the API request
        newData.moq = undefined
        newData.negotiablePrice = undefined
        newData.sampleAvailability = undefined
        newData.customBiddingOption = undefined
      }
      
      return newData
    })
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

  const handleSizeChange = (index: number, field: 'productsize' | 'productQuantity', value: string) => {
    setFormData(prev => {
      const newSize = [...prev.size]
      newSize[index] = { ...newSize[index], [field]: value }
      return { ...prev, size: newSize }
    })
  }

  const addSizeItem = () => {
    setFormData(prev => ({
      ...prev,
      size: [...prev.size, createEmptySizeItem()]
    }))
  }

  const removeSizeItem = (index: number) => {
    if (formData.size.length > 1) {
      setFormData(prev => ({
        ...prev,
        size: prev.size.filter((_, i) => i !== index)
      }))
    }
  }

  const handleArrayFieldChange = (field: keyof ProductFormData, index: number, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      const newArray = [...currentArray]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const addArrayItem = (field: keyof ProductFormData) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      return { ...prev, [field]: [...currentArray, ""] }
    })
  }

  const removeArrayItem = (field: keyof ProductFormData, index: number) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[]
      if (currentArray.length > 1) {
        return { ...prev, [field]: currentArray.filter((_, i) => i !== index) }
      }
      return prev
    })
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
      price: "Price ($)",
      stockQuantity: "Stock Quantity",
      productDescription: "Product Description",
      productStatus: "Product Status",
      productSubCategory: "Product Sub Category",
      hsnCode: "HSN Code",
      skuCode: "SKU Code",
      materialType: "Material Type",
      composition: "Composition",
      gsm: "GSM",
      yarnCount: "Yarn Count",
      pattern: "Pattern",
      certifications: "Certifications",
      unitOfMeasurement: "Unit of Measurement",
      availableQuantity: "Available Quantity",
      manufacturer: "Is Manufacturer",
      originCountry: "Origin Country",
      productionCapacity: "Production Capacity",
      description: "Detailed Description",
      size: "Sizes & Quantities",
      moq: "Minimum Order Quantity (MOQ)",
      productType: "Product Type",
      additionalImages: "Additional Images",
      tags: "Product Tags",
      weight: "Weight (kg)",
      deliveryOptions: "Delivery Options",
      discountPrice: "Discount Price ($)",
      colorVariants: "Color Variants",
      returnPolicy: "Return Policy",
      packagingDetails: "Packaging Details",
      leadTime: "Lead Time",
      negotiablePrice: "Negotiable Price",
      sampleAvailability: "Sample Available",
      customBiddingOption: "Custom Bidding"
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

    if (field === "productStatus") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Select value={formData[field]} onValueChange={(value) => handleInputChange(field, value)}>
            <SelectTrigger className={error ? "border-red-500" : ""}>
              <SelectValue placeholder="Select product status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publish">Publish</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "productDescription" || field === "returnPolicy" || field === "packagingDetails") {
      return (
        <div key={field} className="space-y-2 col-span-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            id={field}
            value={formData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
            rows={field === "productDescription" ? 4 : 3}
            className={error ? "border-red-500" : ""}
          />
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "size") {
      return (
        <div key={field} className="space-y-2 col-span-2">
          <Label>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <div className="space-y-3">
            {formData.size.map((item, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Input
                    placeholder="Size (e.g., XL, M, L)"
                    value={item.productsize}
                    onChange={(e) => handleSizeChange(index, 'productsize', e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Quantity"
                    type="number"
                    min="1"
                    value={item.productQuantity}
                    onChange={(e) => handleSizeChange(index, 'productQuantity', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  {formData.size.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSizeItem(index)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  {index === formData.size.length - 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSizeItem}
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
                    placeholder="Title (e.g., Material, Features)"
                    value={item.title}
                    onChange={(e) => handleDescriptionChange(index, 'title', e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Value (e.g., Cotton, Waterproof)"
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

    if (field === "tags" || field === "colorVariants" || field === "deliveryOptions" || field === "additionalImages" || field === "certifications") {
      const currentArray = formData[field] as string[]
      return (
        <div key={field} className="space-y-2 col-span-2">
          <Label>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <div className="space-y-3">
            {currentArray.length === 0 ? (
              <div className="flex gap-2 items-center">
                <Input
                  placeholder={`Enter ${label.toLowerCase()}`}
                  defaultValue=""
                  onBlur={(e) => {
                    if (e.target.value.trim()) {
                      setFormData(prev => ({ ...prev, [field]: [e.target.value.trim()] }))
                    }
                  }}
                />
              </div>
            ) : (
              currentArray.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={item}
                    onChange={(e) => handleArrayFieldChange(field, index, e.target.value)}
                  />
                  <div className="flex gap-1">
                    {currentArray.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem(field, index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    {index === currentArray.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addArrayItem(field)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
            {currentArray.length === 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArrayItem(field)}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add {label.slice(0, -1)}
              </Button>
            )}
          </div>
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "stockQuantity" || field === "moq" || field === "weight") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id={field}
            type="number"
            min={field === "weight" ? "0.1" : "1"}
            step={field === "weight" ? "0.1" : "1"}
            value={formData[field as keyof ProductFormData] as number}
            onChange={(e) => handleInputChange(field, field === "weight" ? parseFloat(e.target.value) || 0 : parseInt(e.target.value) || 0)}
            placeholder={`Enter ${label.toLowerCase()}`}
            className={error ? "border-red-500" : ""}
          />
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "price" || field === "discountPrice") {
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

    if (field === "negotiablePrice" || field === "sampleAvailability" || field === "customBiddingOption") {
      return (
        <div key={field} className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              id={field}
              type="checkbox"
              checked={formData[field as keyof ProductFormData] as boolean}
              onChange={(e) => handleInputChange(field, e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor={field}>
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
          </div>
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "img") {
      return (
        <div key={field} className="space-y-2 col-span-2">
          <ImageUploadBox
            label={label}
            required={isRequired}
            value={formData[field]}
            onChange={(fileOrUrl) => handleInputChange(field, fileOrUrl)}
            error={error}
            uploadText="Upload Product Image"
            buttonText="Choose Image"
          />
        </div>
      )
    }

    if (field === "unitOfMeasurement") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Select value={formData[field]} onValueChange={(value) => handleInputChange(field, value)}>
            <SelectTrigger className={error ? "border-red-500" : ""}>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Kilogram (kg)</SelectItem>
              <SelectItem value="g">Gram (g)</SelectItem>
              <SelectItem value="piece">Piece</SelectItem>
              <SelectItem value="meter">Meter (m)</SelectItem>
              <SelectItem value="yard">Yard</SelectItem>
              <SelectItem value="dozen">Dozen</SelectItem>
              <SelectItem value="set">Set</SelectItem>
              <SelectItem value="pack">Pack</SelectItem>
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "manufacturer") {
      return (
        <div key={field} className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              id={field}
              type="checkbox"
              checked={formData[field] || false}
              onChange={(e) => handleInputChange(field, e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor={field}>
              {label} {isRequired && <span className="text-red-500">*</span>}
            </Label>
          </div>
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "productSubCategory" || field === "hsnCode" || field === "skuCode" || 
        field === "materialType" || field === "composition" || field === "gsm" || 
        field === "yarnCount" || field === "pattern" || field === "originCountry" || 
        field === "productionCapacity") {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id={field}
            value={formData[field as keyof ProductFormData] as string || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
            className={error ? "border-red-500" : ""}
          />
          {error && <p className="text-sm text-red-500">{String(error)}</p>}
        </div>
      )
    }

    if (field === "availableQuantity") {
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
            onChange={(e) => handleInputChange(field, parseInt(e.target.value) || 1)}
            placeholder="Enter available quantity"
            className={error ? "border-red-500" : ""}
          />
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
          value={formData[field as keyof ProductFormData] as string}
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
    const commonFields = [
      "name", "img", "categoryId", "price", "discountPrice", "stockQuantity", 
      "productDescription", "productStatus", "productSubCategory", "hsnCode", "skuCode",
      "materialType", "composition", "gsm", "yarnCount", "pattern", "certifications",
      "unitOfMeasurement", "availableQuantity", "manufacturer", "originCountry", 
      "productionCapacity", "weight", "description", "size", 
      "additionalImages", "tags", "deliveryOptions", "colorVariants", 
      "returnPolicy", "packagingDetails", "leadTime"
    ]

   
    const allFields = ["productType", ...commonFields]


    if (formData.productType === "wholesale" || formData.productType === "b2b") {
      return [...allFields, "moq", "negotiablePrice", "sampleAvailability", "customBiddingOption"]
    }


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
