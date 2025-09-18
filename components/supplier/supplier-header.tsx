import { Star, MapPin, CheckCircle, Globe, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SupplierHeaderProps {
  supplier: any
}

export function SupplierHeader({ supplier }: SupplierHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-sky-500 to-cyan-400">
        <img
          src={supplier.coverImage || "/placeholder.svg?height=192&width=800&query=factory building"}
          alt={supplier.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Logo */}
        <div className="relative -mt-16 mb-4">
          <div className="w-32 h-32 bg-white rounded-2xl p-2 shadow-lg">
            <img
              src={supplier.logo || "/placeholder.svg?height=120&width=120&query=company logo"}
              alt={supplier.name}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          {supplier.verified && (
            <div className="absolute -top-2 -right-2 w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Company Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{supplier.name}</h1>
              {supplier.verified && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                  Verified Supplier
                </span>
              )}
            </div>

            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-900">{supplier.rating}</span>
                <span className="text-gray-600">({supplier.totalReviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{supplier.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{supplier.totalProducts} Products</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Response: {supplier.responseTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>Est. {supplier.establishedYear}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {supplier.specialties.slice(0, 4).map((specialty: string) => (
                <span key={specialty} className="px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 lg:w-48">
            <Button className="gradient-primary gradient-primary-hover text-white">Contact Supplier</Button>
            <Button variant="outline">Request Quote</Button>
            <Button variant="outline">Add to Favorites</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
