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
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-gray-100 transition-all">
        <div className="flex gap-6 items-start">
          {/* Logo Section */}
          <div className="relative w-28 h-28 flex-shrink-0">
            <div className="w-full h-full rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={supplier.logo || "/placeholder.svg?height=128&width=128&query=company logo"}
                alt={supplier.name}
                className="w-full h-full object-cover"
              />
            </div>
            {supplier.verified && (
              <div className="absolute -top-1 -right-1 w-8 h-8 gradient-primary rounded-full flex items-center justify-center shadow-sm ring-1 ring-white">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Link href={`/suppliers/${supplier.id}`}>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 truncate hover:text-sky-600 transition-colors">
                    {supplier.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(supplier.rating) ? "text-amber-400 fill-current" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-700">{supplier.rating}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 truncate">{supplier.location}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Response</div>
                <div className="text-lg font-semibold text-gray-900">{supplier.responseTime}</div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-3 line-clamp-2">{supplier.description}</p>

            <div className="flex items-center justify-between gap-4 mt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="h-4 w-4 text-sky-600" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">{supplier.totalProducts}</span>
                    <span className="text-[10px] text-gray-500 uppercase">Products</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Building2 className="h-4 w-4 text-green-600" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">{supplier.minOrder.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-500 uppercase">Order Completed</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <Link href={`/suppliers/${supplier.id}`}>
                  <Button variant="outline" size="sm" className="border-2 hover:border-sky-300 hover:text-sky-600 transition-colors">
                    View Profile
                  </Button>
                </Link>
                <Button size="sm" className="gradient-primary gradient-primary-hover text-white font-semibold">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={`/suppliers/${supplier.id}`}
      className="group block bg-white rounded-2xl p-6 shadow-lg border border-transparent hover:shadow-xl hover:border-gray-100 transition-all"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative">
          <div className="w-28 h-28 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
            <img
              src={supplier.logo || "/placeholder.svg?height=96&width=96&query=company logo"}
              alt={supplier.name}
              className="max-w-[72%] max-h-[72%] object-contain"
            />
          </div>
          {supplier.verified && (
            <div className="absolute -top-2 -right-2 w-9 h-9 bg-sky-400 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        <div className="space-y-1 w-full">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-sky-600 truncate">{supplier.name}</h3>

          <div className="flex items-center justify-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(supplier.rating) ? "text-amber-400 fill-current" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-sm font-medium text-gray-700">{supplier.rating}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-1">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{supplier.location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mx-auto max-w-[90%]">{supplier.description}</p>

        <div className="flex items-center gap-6 w-full justify-center px-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="h-4 w-4 text-sky-600" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">{supplier.totalProducts}</span>
              <span className="text-[10px] text-gray-500 uppercase">Products</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Building2 className="h-4 w-4 text-green-600" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">{supplier.minOrder.toLocaleString()}</span>
              <span className="text-[10px] text-gray-500 uppercase">Order Completed</span>
            </div>
          </div>
        </div>

        <Button size="lg" className="w-full mt-3 rounded-lg gradient-primary gradient-primary-hover text-white font-semibold">
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Supplier
        </Button>
      </div>
    </Link>
  );
}
