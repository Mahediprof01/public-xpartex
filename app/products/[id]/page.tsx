"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { useParams } from "next/navigation";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { SupplierMiniProfile } from "@/components/supplier/supplier-mini-profile";
import { RelatedProducts } from "@/components/product/related-products";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductBreadcrumb } from "@/components/ui/breadcrumb";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  // Mock product data - in real app this would be fetched based on ID
  const product: Product = {
    id: productId,
    title: "Premium Cotton T-Shirt - Unisex",
    images: [
      "/cotton-t-shirt.jpg",
      "/denim-jeans.png",
      "/classic-polo-shirt.png",
      "/cozy-hoodie.png",
    ],
    supplierId: "supplier-1",
    supplierName: "Dhaka Textiles Ltd.",
    price: 450.0,
    currency: "BDT",
    moq: 500,
    badges: ["flash", "super"],
    category: "Apparel & Textiles",
    subcategory: "T-Shirts",
    sku: "XT-001",
    primaryType: "wholesale",
    productTypes: {
      wholesale: {
        enabled: true,
        price: 450.0,
        moq: 500,
        tieredPricing: [
          { minQuantity: 500, pricePerUnit: 450 },
          { minQuantity: 1000, pricePerUnit: 420 },
          { minQuantity: 2000, pricePerUnit: 390 },
          { minQuantity: 5000, pricePerUnit: 360 }
        ]
      },
      retail: {
        enabled: true,
        price: 650.0,
        maxQuantity: 50
      },
      b2b: {
        enabled: false,
        rfqOnly: true,
        customPricing: true
      }
    },
    description: `High-quality 100% cotton t-shirt designed for comfort and durability. Perfect for casual wear, 
    promotional events, or as a base for custom printing. Our premium cotton blend ensures excellent breathability 
    and long-lasting color retention. Available in multiple sizes and colors to meet your specific requirements.`,
    specs: [
      { key: "Material", value: "100% Cotton" },
      { key: "Weight", value: "180 GSM" },
      { key: "Colors Available", value: "12 Colors" },
      { key: "Sizes", value: "XS to 3XL" },
      { key: "Neck Style", value: "Round Neck" },
      { key: "Sleeve Type", value: "Short Sleeve" },
      { key: "Care Instructions", value: "Machine Wash Cold" },
      { key: "Country of Origin", value: "Bangladesh" },
    ],
    availableQuantity: 10000,
    leadTimeDays: 15,
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: "15-20 business days",
      shippingMethods: ["Sea Freight", "Air Freight", "Express"],
    },
    certifications: ["OEKO-TEX Standard 100", "WRAP Certified", "ISO 9001"],
  };

  const supplier = {
    id: "supplier-1",
    name: "Dhaka Textiles Ltd.",
    logo: "/textile-company-logo.jpg",
    rating: 4.8,
    location: "Dhaka, Bangladesh",
    description:
      "Leading manufacturer of premium cotton garments with 15+ years experience",
    totalProducts: 250,
    verified: true,
    responseTime: "Within 2 hours",
    languages: ["English", "Bengali"],
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Professional Breadcrumb */}
        <div className="mb-6">
          <ProductBreadcrumb
            category={product.category}
            subcategory={product.subcategory}
            productName={product.title}
            className="mb-2"
          />
          <div className="text-xs text-gray-500">
            Product ID: {productId} • SKU: {product.sku} • Supplier:{" "}
            {product.supplierName}
          </div>
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Supplier Info */}
        <div className="mb-12">
          <SupplierMiniProfile supplier={supplier} />
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <ProductDetailTabs product={product} />
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <ProductReviews productId={product.id} />
        </div>

        {/* Related Products */}
        <div>
          <RelatedProducts
            currentProductId={product.id}
            supplierId={product.supplierId}
          />
        </div>
      </div>
    </div>
  );
}

function ProductDetailTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "shipping", label: "Shipping & Returns" },
    { id: "certifications", label: "Certifications" },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-sky-500 text-sky-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="prose max-w-none">
        {activeTab === "description" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Product Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specs.map((spec: any) => (
                <div
                  key={spec.key}
                  className="flex justify-between py-2 border-b border-gray-100"
                >
                  <span className="font-medium text-gray-700">{spec.key}:</span>
                  <span className="text-gray-600">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Shipping Information
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Delivery Time
                </h4>
                <p className="text-gray-600">
                  {product.shippingInfo.estimatedDelivery}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Shipping Methods
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {product.shippingInfo.shippingMethods.map(
                    (method: string) => (
                      <li key={method}>{method}</li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Free Shipping
                </h4>
                <p className="text-gray-600">
                  {product.shippingInfo.freeShipping
                    ? "Available for orders above MOQ"
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "certifications" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Quality Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.certifications.map((cert: string) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-lg"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="font-medium text-gray-900">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
