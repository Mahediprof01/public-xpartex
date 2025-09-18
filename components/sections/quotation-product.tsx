import { ProductCard } from "@/components/ui/product-card"
import type { Product } from "@/types"

export function QuotationProduct() {
  // Mock data for quotation products
  const quotationProducts: Product[] = [
    {
      id: "1",
      title: "Premium Cotton T-Shirt",
      images: ["/cotton-t-shirt.jpg"],
      supplierId: "supplier-1",
      supplierName: "Dhaka Textiles Ltd.",
      price: 450.0,
      currency: "BDT",
      moq: 500,
      badges: ["flash", "super"],
      description: "Premium cotton t-shirt",
      specs: [{ key: "Material", value: "100% Cotton" }],
      availableQuantity: 10000,
      leadTimeDays: 15,
    },
    {
      id: "2",
      title: "Denim Jeans - Slim Fit",
      images: ["/denim-jeans.png"],
      supplierId: "supplier-2",
      supplierName: "Bengal Garments",
      price: 1250.0,
      currency: "BDT",
      moq: 200,
      badges: ["new"],
      description: "Slim fit denim jeans",
      specs: [{ key: "Material", value: "Denim" }],
      availableQuantity: 5000,
      leadTimeDays: 20,
    },
    {
      id: "3",
      title: "Polo Shirt - Business Casual",
      images: ["/classic-polo-shirt.png"],
      supplierId: "supplier-3",
      supplierName: "Chittagong Apparel",
      price: 680.0,
      currency: "BDT",
      moq: 300,
      badges: ["super"],
      description: "Business casual polo shirt",
      specs: [{ key: "Material", value: "Cotton" }],
      availableQuantity: 3000,
      leadTimeDays: 14,
    },
    {
      id: "4",
      title: "Hoodie - Premium Quality",
      images: ["/cozy-hoodie.png"],
      supplierId: "supplier-4",
      supplierName: "Sylhet Fashion House",
      price: 1850.0,
      currency: "BDT",
      moq: 100,
      badges: ["flash"],
      description: "Premium hoodie with fleece lining",
      specs: [{ key: "Material", value: "Fleece" }],
      availableQuantity: 1200,
      leadTimeDays: 7,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Quotation Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant quotes on popular products from verified suppliers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quotationProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-sky-600 hover:text-sky-700 font-medium">View More Quotation Products →</button>
        </div>
      </div>
    </section>
  )
}
