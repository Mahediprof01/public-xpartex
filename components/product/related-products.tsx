import { ProductCard } from "@/components/ui/product-card"
import type { Product } from "@/types"

interface RelatedProductsProps {
  currentProductId: string
  supplierId: string
}

export function RelatedProducts({ currentProductId, supplierId }: RelatedProductsProps) {
  // Mock related products data
  const relatedProducts: Product[] = [
    {
      id: "related-1",
      title: "Cotton Polo Shirt - Premium",
      images: ["/classic-polo-shirt.png"],
      supplierId: "supplier-1",
      supplierName: "Dhaka Textiles Ltd.",
  price: 680.0,
  currency: "BDT",
  moq: 300,
  badges: ["super"],
  description: "Premium polo shirt made from 100% cotton.",
  specs: [{ key: "Material", value: "100% Cotton" }],
  availableQuantity: 2000,
  leadTimeDays: 10,
  productTypes: {
    wholesale: { enabled: true, price: 680, moq: 300 },
    retail: { enabled: true, price: 700 },
    b2b: { enabled: false }
  },
  primaryType: "wholesale",
    },
    {
      id: "related-2",
      title: "Cotton Hoodie - Winter Collection",
      images: ["/cozy-hoodie.png"],
      supplierId: "supplier-1",
      supplierName: "Dhaka Textiles Ltd.",
  price: 1650.0,
  currency: "BDT",
  moq: 150,
  badges: ["new"],
  description: "Cozy hoodie with soft fleece lining.",
  specs: [{ key: "Material", value: "Fleece" }],
  availableQuantity: 1000,
  leadTimeDays: 14,
  productTypes: {
    wholesale: { enabled: true, price: 1650, moq: 150 },
    retail: { enabled: true, price: 1750 },
    b2b: { enabled: false }
  },
  primaryType: "wholesale",
    },
    {
      id: "related-3",
      title: "Cotton Tank Top - Summer",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: "supplier-1",
      supplierName: "Dhaka Textiles Ltd.",
  price: 380.0,
  currency: "BDT",
  moq: 500,
  badges: ["flash"],
  description: "Lightweight tank top perfect for summer.",
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
    {
      id: "related-4",
      title: "Cotton Long Sleeve Tee",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: "supplier-1",
      supplierName: "Dhaka Textiles Ltd.",
  price: 520.0,
  currency: "BDT",
  moq: 400,
  badges: [],
  description: "Classic long sleeve tee suitable for layering.",
  specs: [{ key: "Material", value: "Cotton" }],
  availableQuantity: 3000,
  leadTimeDays: 12,
  productTypes: {
    wholesale: { enabled: true, price: 520, moq: 400 },
    retail: { enabled: true, price: 550 },
    b2b: { enabled: false }
  },
  primaryType: "wholesale",
    },
  ]

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}
