"use client"

import { useRouter } from "next/navigation"
// ...existing imports
import { Button } from "../../../../components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { UnifiedProductForm } from "../../../../components/products/unified-product-form"

export default function AddProductPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push("/profile/products")
  }

  const handleCancel = () => {
    router.push("/profile/products")
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
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
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Create a new product listing for your inventory</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl">
        <UnifiedProductForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  )
}