"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Clock, MessageCircle, Truck, Award } from "lucide-react";

interface ProductInfoSectionProps {
  product: any;
}

export function ProductInfoSection({ product }: ProductInfoSectionProps) {
  const [quantity, setQuantity] = useState(product.moq);

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
    })}`;
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "flash":
        return "bg-red-500 text-white";
      case "super":
        return "gradient-primary text-white";
      case "new":
        return "bg-cyan-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const priceBreaks = [
    { min: 500, max: 999, price: 450 },
    { min: 1000, max: 4999, price: 420 },
    { min: 5000, max: 9999, price: 400 },
    { min: 10000, max: null, price: 380 },
  ];

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl font-medium text-gray-900 mb-3">
          {product.title}
        </h1>

        {/* Badges */}
        {product.badges?.length > 0 && (
          <div className="flex gap-2 mb-4">
            {product.badges.map((badge: string) => (
              <span
                key={badge}
                className={`${getBadgeColor(
                  badge
                )} text-xs px-2 py-1 rounded font-medium`}
              >
                {badge === "flash" ? "Flash Deal" : badge.toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Section */}
      <div className="bg-red-50 border border-red-100 rounded-lg p-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-sky-600">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-sm text-gray-500">/ piece</span>
        </div>
        <div className="text-sm text-gray-600">
          MOQ: {product.moq.toLocaleString()} pieces
        </div>
      </div>

      {/* Price Breaks */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Price Breaks</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {priceBreaks.map((tier, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-sm text-gray-600">
                {tier.min.toLocaleString()} -{" "}
                {tier.max ? tier.max.toLocaleString() : "∞"} pieces
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatPrice(tier.price, product.currency)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="text-sm font-medium text-gray-900 mb-2 block">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={product.moq}
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Math.max(product.moq, parseInt(e.target.value) || product.moq)
              )
            }
            className="w-32 px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          />
          <span className="text-sm text-gray-500">
            pieces (Min. order: {product.moq.toLocaleString()})
          </span>
        </div>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Key Features</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-green-500" />
            Quality Assured
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="h-4 w-4 text-blue-500" />
            Fast Shipping
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="h-4 w-4 text-orange-500" />
            Certified Supplier
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-purple-500" />
            {product.leadTimeDays} Days Delivery
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full gradient-primary gradient-primary-hover text-white h-12">
          <MessageCircle className="h-5 w-5 mr-2" />
          Contact Supplier
        </Button>
        <Button variant="outline" className="w-full h-12">
          Request for Quotation
        </Button>
      </div>
    </div>
  );
}
