import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"

interface SupplierProductsProps {
  supplierId: string
}

export function SupplierProducts({ supplierId }: SupplierProductsProps) {
  // Mock products from this supplier
  const products: Product[] = [
    {
      id: "sp-1",
      title: "Premium Cotton T-Shirt",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: supplierId,
      supplierName: "Dhaka Textiles Ltd.",
      price: 450.0,
      currency: "BDT",
      moq: 500,
      badges: ["flash", "super"],
      description: "Premium cotton t-shirt",
      specs: [{ key: "Material", value: "100% Cotton" }],
      availableQuantity: 10000,
      leadTimeDays: 15,
      productTypes: {
        wholesale: { enabled: true, price: 450, moq: 500 },
        retail: { enabled: true, price: 480 },
        b2b: { enabled: false }
      },
      primaryType: "wholesale",
    },
    {
      id: "sp-2",
      title: "Business Polo Shirt",
      images: ["/classic-polo-shirt.png"],
      supplierId: supplierId,
      supplierName: "Dhaka Textiles Ltd.",
      price: 680.0,
      currency: "BDT",
      moq: 300,
      badges: ["super"],
      description: "Business polo shirt",
      specs: [{ key: "Material", value: "Cotton" }],
      availableQuantity: 8000,
      leadTimeDays: 10,
      productTypes: {
        wholesale: { enabled: true, price: 680, moq: 300 },
        retail: { enabled: true, price: 700 },
        b2b: { enabled: false }
      },
      primaryType: "wholesale",
    },
    {
      id: "sp-3",
      title: "Cotton Hoodie - Winter",
      images: ["/cozy-hoodie.png"],
      supplierId: supplierId,
      supplierName: "Dhaka Textiles Ltd.",
      price: 1650.0,
      currency: "BDT",
      moq: 150,
      badges: ["new"],
      description: "Warm cotton hoodie",
      specs: [{ key: "Material", value: "Fleece" }],
      availableQuantity: 2000,
      leadTimeDays: 14,
      productTypes: {
        wholesale: { enabled: true, price: 1650, moq: 150 },
        retail: { enabled: true, price: 1750 },
        b2b: { enabled: false }
      },
      primaryType: "wholesale",
    },
    {
      id: "sp-4",
      title: "Cotton Tank Top",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: supplierId,
      supplierName: "Dhaka Textiles Ltd.",
      price: 380.0,
      currency: "BDT",
      moq: 500,
      badges: [],
      description: "Lightweight tank top",
      specs: [{ key: "Material", value: "Cotton" }],
      availableQuantity: 5000,
      leadTimeDays: 7,
      productTypes: {
        wholesale: { enabled: true, price: 380, moq: 500 },
        retail: { enabled: true, price: 420 },
        b2b: { enabled: false }
      },
      primaryType: "wholesale",
    },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Products ({products.length})</h2>
        <Button variant="outline">View All Products</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
