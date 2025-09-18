import Link from "next/link"
import { Star, MapPin, MessageCircle, Eye, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SupplierMiniProfileProps {
  supplier: any
}

export function SupplierMiniProfile({ supplier }: SupplierMiniProfileProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Information</h3>

      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="relative">
          <img
            src={supplier.logo || "/placeholder.svg?height=64&width=64&query=company logo"}
            alt={supplier.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          {supplier.verified && (
            <div className="absolute -top-1 -right-1 w-5 h-5 gradient-primary rounded-full flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <Link href={`/suppliers/${supplier.id}`}>
            <h4 className="font-semibold text-gray-900 hover:text-sky-600 transition-colors mb-1">{supplier.name}</h4>
          </Link>

          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">{supplier.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{supplier.location}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{supplier.description}</p>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span>Response: {supplier.responseTime}</span>
            <span>Languages: {supplier.languages.join(", ")}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href={`/suppliers/${supplier.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </Link>
            <Button size="sm" className="gradient-primary gradient-primary-hover text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
