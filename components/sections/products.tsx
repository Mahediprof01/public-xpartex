import { ProductCard } from "@/components/ui/product-card"
import type { Product } from "@/types"

export function Products() {
  // Mock data for general products
  const products: Product[] = [
    {
      id: "p1",
      title: "Classic Cotton Shirt",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: "supplier-1",
      supplierName: "Dhaka Fashion Ltd.",
      price: 650.0,
      currency: "BDT",
      moq: 400,
      badges: ["super"],
      description: "Classic cotton shirt",
      specs: [{ key: "Material", value: "100% Cotton" }],
      availableQuantity: 2000,
      leadTimeDays: 10,
    },
    {
      id: "p2",
      title: "Casual Denim Jacket",
      images: ["/denim-jeans.png"],
      supplierId: "supplier-2",
      supplierName: "Bengal Denim Co.",
      price: 1850.0,
      currency: "BDT",
      moq: 150,
      badges: ["new", "flash"],
      description: "Durable denim jacket",
      specs: [{ key: "Material", value: "Denim" }],
      availableQuantity: 800,
      leadTimeDays: 14,
    },
    {
      id: "p3",
      title: "Formal Blazer",
      images: ["/classic-polo-shirt.png"],
      supplierId: "supplier-3",
      supplierName: "Chittagong Formals",
      price: 2250.0,
      currency: "BDT",
      moq: 100,
      badges: ["super"],
      description: "Elegant formal blazer",
      specs: [{ key: "Fabric", value: "Wool Blend" }],
      availableQuantity: 300,
      leadTimeDays: 21,
    },
    {
      id: "p4",
      title: "Sports Track Suit",
      images: ["/cozy-hoodie.png"],
      supplierId: "supplier-4",
      supplierName: "Athletic Wear BD",
      price: 1450.0,
      currency: "BDT",
      moq: 250,
      badges: ["new"],
      description: "High-performance track suit",
      specs: [{ key: "Material", value: "Polyester" }],
      availableQuantity: 1200,
      leadTimeDays: 12,
    },
    {
      id: "p5",
      title: "Summer Linen Shirt",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: "supplier-5",
      supplierName: "Comfort Textiles",
      price: 780.0,
      currency: "BDT",
      moq: 350,
      badges: ["flash"],
      description: "Breathable linen shirt",
      specs: [{ key: "Material", value: "Linen" }],
      availableQuantity: 1500,
      leadTimeDays: 9,
    },
    {
      id: "p6",
      title: "Designer Kurta",
      images: ["/classic-polo-shirt.png"],
      supplierId: "supplier-6",
      supplierName: "Traditional Wear Co.",
      price: 950.0,
      currency: "BDT",
      moq: 200,
      badges: ["super"],
      description: "Hand-embroidered designer kurta",
      specs: [{ key: "Material", value: "Cotton Blend" }],
      availableQuantity: 600,
      leadTimeDays: 18,
    },
    {
      id: "p7",
      title: "Cargo Pants",
      images: ["/denim-jeans.png"],
      supplierId: "supplier-7",
      supplierName: "Urban Fashion",
      price: 1150.0,
      currency: "BDT",
      moq: 300,
      badges: ["new"],
      description: "Durable cargo pants",
      specs: [{ key: "Material", value: "Cotton Twill" }],
      availableQuantity: 900,
      leadTimeDays: 11,
    },
    {
      id: "p8",
      title: "Winter Sweater",
      images: ["/cozy-hoodie.png"],
      supplierId: "supplier-8",
      supplierName: "Warm Clothing Ltd.",
      price: 1650.0,
      currency: "BDT",
      moq: 180,
      badges: ["flash", "super"],
      description: "Warm knitted sweater",
      specs: [{ key: "Material", value: "Wool Blend" }],
      availableQuantity: 700,
      leadTimeDays: 20,
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of quality garments from trusted manufacturers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-sky-600 hover:text-sky-700 font-medium">View All Products →</button>
        </div>
      </div>
    </section>
  )
}