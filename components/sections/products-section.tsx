import { ProductCard } from "@/components/ui/product-card"
import Link from "next/link"
import TailoredProducts from "./tailored-products"

export function ProductsSection() {
  const topDeals = [
    {
      id: "td1",
      title: "Cotton Blend T-Shirt",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: "supplier-1",
      supplierName: "Dhaka Textiles Ltd.",
      price: 380.0,
      currency: "BDT" as const,
      moq: 1000,
      badges: ["flash"] as ("new" | "super" | "flash")[],
    },
    {
      id: "td2",
      title: "Premium Denim Jacket",
      images: ["/denim-jeans.png"],
      supplierId: "supplier-2",
      supplierName: "Bengal Garments",
      price: 2200.0,
      currency: "BDT" as const,
      moq: 150,
      badges: ["super"] as ("new" | "super" | "flash")[],
    },
  ]

  const topRanking = [
    {
      id: "tr1",
      title: "Business Polo Shirt",
      images: ["/classic-polo-shirt.png"],
      supplierId: "supplier-3",
      supplierName: "Chittagong Apparel",
      price: 750.0,
      currency: "BDT" as const,
      moq: 500,
      badges: ["super"] as ("new" | "super" | "flash")[],
    },
    {
      id: "tr2",
      title: "Winter Hoodie Collection",
      images: ["/cozy-hoodie.png"],
      supplierId: "supplier-4",
      supplierName: "Sylhet Fashion House",
      price: 1650.0,
      currency: "BDT" as const,
      moq: 200,
      badges: ["new"] as ("new" | "super" | "flash")[],
    },
  ]

  const newArrivals = [
    {
      id: "na1",
      title: "Sustainable Cotton Tee",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: "supplier-5",
      supplierName: "Eco Garments BD",
      price: 520.0,
      currency: "BDT" as const,
      moq: 300,
      badges: ["new"] as ("new" | "super" | "flash")[],
    },
    {
      id: "na2",
      title: "Athletic Performance Wear",
      images: ["/classic-polo-shirt.png"],
      supplierId: "supplier-6",
      supplierName: "Sports Apparel Co.",
      price: 890.0,
      currency: "BDT" as const,
      moq: 250,
      badges: ["new", "super"] as ("new" | "super" | "flash")[],
    },
  ]

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        {/* Tailored Products - Bento Grid */}
        <div >
          <TailoredProducts />
        </div>
      </div>
    </section>
  )
}
