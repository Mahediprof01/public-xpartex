"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface ProductDetailTabsProps {
  product: any;
}

export function ProductDetailTabs({ product }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Product Overview" },
    { id: "specifications", label: "Specifications" },
    { id: "shipping", label: "Shipping & Payment" },
    { id: "supplier", label: "Supplier Info" },
  ];

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
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

      <div>
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Product Description
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <h4 className="font-medium text-gray-900 mb-3">
                Quick Specifications
              </h4>
              <div className="space-y-2">
                {product.specs.slice(0, 4).map((spec: any) => (
                  <div key={spec.key} className="flex justify-between py-1">
                    <span className="text-sm text-gray-600">{spec.key}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Supply Ability
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Supply Ability</span>
                  <span className="text-sm font-medium text-gray-900">
                    {product.availableQuantity.toLocaleString()} pieces/Month
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Lead Time</span>
                  <span className="text-sm font-medium text-gray-900">
                    {product.leadTimeDays} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">MOQ</span>
                  <span className="text-sm font-medium text-gray-900">
                    {product.moq.toLocaleString()} pieces
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Detailed Specifications
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {product.specs.map((spec: any, index: number) => (
                    <tr
                      key={spec.key}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 w-1/3">
                        {spec.key}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
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
                  <div className="space-y-1">
                    {product.shippingInfo.shippingMethods.map(
                      (method: string) => (
                        <div key={method} className="text-gray-600">
                          • {method}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Payment Terms
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="text-sm text-gray-600">
                  • T/T (Bank Transfer)
                </div>
                <div className="text-sm text-gray-600">
                  • L/C (Letter of Credit)
                </div>
                <div className="text-sm text-gray-600">• Western Union</div>
                <div className="text-sm text-gray-600">
                  • PayPal (for samples)
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "supplier" && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Supplier Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Company Profile
                </h4>
                <p className="text-gray-600 mb-4">
                  Leading manufacturer of premium cotton garments with 15+ years
                  experience in export business.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Business Type</span>
                    <span className="text-sm font-medium text-gray-900">
                      Manufacturer
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Established</span>
                    <span className="text-sm font-medium text-gray-900">
                      2008
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Employees</span>
                    <span className="text-sm font-medium text-gray-900">
                      201-300
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Certifications
                </h4>
                <div className="space-y-2">
                  {product.certifications.map((cert: string) => (
                    <div
                      key={cert}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
