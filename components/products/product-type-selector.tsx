"use client"

import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { 
  ShoppingCart, 
  Package, 
  Building2,
  Users,
  TrendingUp,
  Handshake
} from "lucide-react"

interface ProductTypeSelectorProps {
  onSelect: (type: "wholesale" | "retail" | "b2b") => void
}

export function ProductTypeSelector({ onSelect }: ProductTypeSelectorProps) {
  const productTypes = [
    {
      type: "wholesale" as const,
      title: "Wholesale",
      description: "Bulk products with tier pricing and minimum order quantities",
      icon: Package,
      features: [
        "Minimum Order Quantity (MOQ)",
        "Tier-based pricing structure", 
        "Bulk inventory management",
        "Volume discount pricing"
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200 hover:border-blue-300"
    },
    {
      type: "retail" as const,
      title: "Retail",
      description: "Individual products for direct consumer sales",
      icon: ShoppingCart,
      features: [
        "Fixed per-unit pricing",
        "Individual stock quantities",
        "Discount pricing options",
        "Consumer-focused descriptions"
      ],
      color: "text-green-600", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200 hover:border-green-300"
    },
    {
      type: "b2b" as const,
      title: "B2B",
      description: "Business-to-business products with custom pricing and RFQ",
      icon: Building2,
      features: [
        "Request for Quotation (RFQ)",
        "Negotiable pricing options",
        "Custom lead times",
        "Business document uploads"
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200 hover:border-purple-300"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          What type of product are you adding?
        </h2>
        <p className="text-gray-600">
          Choose the product type to customize your listing form accordingly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productTypes.map((productType) => {
          const IconComponent = productType.icon
          return (
            <Card 
              key={productType.type}
              className={`cursor-pointer transition-all duration-200 ${productType.borderColor} hover:shadow-lg`}
              onClick={() => onSelect(productType.type)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${productType.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className={`h-6 w-6 ${productType.color}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {productType.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4">
                  {productType.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {productType.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 ${productType.bgColor} rounded-full mt-2 flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${productType.color} bg-transparent border hover:${productType.bgColor}`}
                  variant="outline"
                >
                  Select {productType.title}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Handshake className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Need help choosing?</h4>
            <p className="text-sm text-blue-700">
              <strong>Wholesale:</strong> For suppliers selling to retailers in bulk quantities. <br />
              <strong>Retail:</strong> For individual products sold directly to end consumers. <br />
              <strong>B2B:</strong> For custom manufacturing or services requiring quotations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}