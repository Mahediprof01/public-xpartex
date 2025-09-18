import Link from "next/link";
import { Star, MapPin, Users, Clock, MessageCircle, CheckCircle, Building2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SupplierCardProps {
  supplier: any;
  viewMode: "grid" | "list";
}

export function SupplierCard({ supplier, viewMode }: SupplierCardProps) {
  if (viewMode === "list") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-sky-200">
        <div className="flex gap-8">
          {/* Logo Section */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-gray-100">
              <img
                src={supplier.logo || "/placeholder.svg?height=128&width=128&query=company logo"}
                alt={supplier.name}
                className="w-full h-full object-cover"
              />
            </div>
            {supplier.verified && (
              <div className="absolute -top-2 -right-2 w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div>
                  <Link href={`/suppliers/${supplier.id}`}>
                    <h3 className="text-2xl font-bold text-gray-900 hover:text-sky-600 transition-colors mb-2">
                      {supplier.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(supplier.rating) ? "text-amber-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-gray-700">{supplier.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">{supplier.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Response Time</div>
                <div className="text-xl font-bold text-gray-900">{supplier.responseTime}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed line-clamp-2">
              {supplier.description}
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-100 rounded-lg">
                <Users className="h-6 w-6 text-sky-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900">{supplier.totalProducts}</div>
                <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Products</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-lg">
                <Building2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900">{supplier.minOrder.toLocaleString()}</div>
                <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Min Order</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900">{supplier.establishedYear}</div>
                <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Established</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-900">{supplier.responseTime}</div>
                <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Response</div>
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {supplier.specialties.slice(0, 4).map((specialty: string) => (
                  <span key={specialty} className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-sky-100 hover:text-sky-700 transition-colors">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <Link href={`/suppliers/${supplier.id}`}>
                <Button variant="outline" size="lg" className="border-2 hover:border-sky-300 hover:text-sky-600 transition-colors">
                  View Profile
                </Button>
              </Link>
              <Button size="lg" className="gradient-primary gradient-primary-hover text-white font-semibold">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Supplier
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/suppliers/${supplier.id}`}
      className="group bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-sky-200 hover:-translate-y-2 block h-full"
    >
      <div className="text-center space-y-6">
        {/* Logo Section */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-gray-100 group-hover:border-sky-200 transition-colors">
            <img
              src={supplier.logo || "/placeholder.svg?height=96&width=96&query=company logo"}
              alt={supplier.name}
              className="w-full h-full object-cover"
            />
          </div>
          {supplier.verified && (
            <div className="absolute -top-2 -right-2 w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        {/* Company Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors">
            {supplier.name}
          </h3>
          
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(supplier.rating) ? "text-amber-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-700">{supplier.rating}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">{supplier.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {supplier.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-100 rounded-lg">
            <Users className="h-5 w-5 text-sky-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{supplier.totalProducts}</div>
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Products</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-lg">
            <Building2 className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{supplier.minOrder.toLocaleString()}</div>
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Min Order</div>
          </div>
        </div>

        {/* Specialties */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Specialties</h4>
          <div className="flex flex-wrap justify-center gap-1">
            {supplier.specialties.slice(0, 3).map((specialty: string) => (
              <span key={specialty} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button size="lg" className="w-full gradient-primary gradient-primary-hover text-white font-semibold">
          <MessageCircle className="h-5 w-5 mr-2" />
          Contact Supplier
        </Button>
      </div>
    </Link>
  );
}
