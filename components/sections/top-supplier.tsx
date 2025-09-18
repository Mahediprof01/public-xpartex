import { Star, MapPin, Users } from "lucide-react"
import Link from "next/link"

export function TopSupplier() {
  const suppliers = [
    {
      id: "1",
      name: "Dhaka Textiles Ltd.",
      logo: "/textile-company-logo.jpg",
      rating: 4.8,
      location: "Dhaka, Bangladesh",
      description: "Leading manufacturer of premium cotton garments with 15+ years experience",
      totalProducts: 250,
      verified: true,
    },
    {
      id: "2",
      name: "Bengal Garments",
      logo: "/garment-factory-logo.jpg",
      rating: 4.7,
      location: "Chittagong, Bangladesh",
      description: "Specialized in denim and casual wear manufacturing",
      totalProducts: 180,
      verified: true,
    },
    {
      id: "3",
      name: "Sylhet Fashion House",
      logo: "/abstract-fashion-logo.png",
      rating: 4.9,
      location: "Sylhet, Bangladesh",
      description: "Premium fashion garments and custom design solutions",
      totalProducts: 320,
      verified: true,
    },
    {
      id: "4",
      name: "Eco Garments BD",
      logo: "/eco-friendly-logo.png",
      rating: 4.6,
      location: "Gazipur, Bangladesh",
      description: "Sustainable and eco-friendly garment manufacturing",
      totalProducts: 150,
      verified: true,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Top Suppliers</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified suppliers who deliver quality and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suppliers.map((supplier) => (
            <Link
              key={supplier.id}
              href={`/suppliers/${supplier.id}`}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={supplier.logo || "/placeholder.svg"}
                    alt={supplier.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                  {supplier.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {supplier.name}
                </h3>

                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{supplier.rating}</span>
                </div>

                <div className="flex items-center justify-center gap-1 mb-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{supplier.location}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{supplier.description}</p>

                <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{supplier.totalProducts} Products</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/suppliers" className="text-sky-600 hover:text-sky-700 font-medium">
            View All Suppliers →
          </Link>
        </div>
      </div>
    </section>
  )
}
