"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Package, ShoppingCart, Building2 } from "lucide-react";

import { Product, ProductType } from "@/types";

interface ProductCardProps
  extends Omit<
    Product,
    "availableQuantity" | "leadTimeDays" | "description" | "specs"
  > {
  onAddToCart?: () => void;
}

export function ProductCard(props: ProductCardProps) {
  const {
    id,
    title,
    images,
    supplierId,
    supplierName,
    price,
    currency,
    moq,
    badges = [],
    tieredPricing,
    ...productData
  } = props;

  // Create full product object for cart
  const fullProduct: Product = {
    id,
    title,
    images,
    supplierId,
    supplierName,
    price,
    currency,
    moq,
    badges,
    tieredPricing,
    description: "",
    specs: [],
    availableQuantity: 10000,
    leadTimeDays: 7,
    ...productData,
  };
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

  const getEnabledProductTypes = () => {
    if (!fullProduct.productTypes) return [];

    return Object.entries(fullProduct.productTypes)
      .filter(([_, config]) => config.enabled)
      .map(([type, _]) => type as ProductType);
  };

  const getProductTypeIcon = (type: ProductType) => {
    switch (type) {
      case "wholesale":
        return <Package className="h-3 w-3" />;
      case "retail":
        return <ShoppingCart className="h-3 w-3" />;
      case "b2b":
        return <Building2 className="h-3 w-3" />;
    }
  };

  const getProductTypeColor = (type: ProductType) => {
    switch (type) {
      case "wholesale":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "retail":
        return "bg-green-100 text-green-700 border-green-200";
      case "b2b":
        return "bg-purple-100 text-purple-700 border-purple-200";
    }
  };

  return (
    <div className="group bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Image Section */}
      <Link href={`/products/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <Image
            src={
              images[0] ||
              "/placeholder.svg?height=240&width=320&query=garment product"
            }
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className={`${getBadgeColor(
                    badge
                  )} text-xs font-medium px-2 py-1 rounded`}
                >
                  {badge === "flash" ? "Flash Deal" : badge.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-3">
        {/* Product Title */}
        <h3 className="text-sm font-normal text-gray-800 line-clamp-2 leading-relaxed mb-2 min-h-[2.5rem]">
          <Link href={`/products/${id}`}>{title}</Link>
        </h3>

        {/* Price */}
        <div className="mb-2">
          <span className="text-lg font-semibold text-sky-600">
            {formatPrice(price, currency)}
          </span>
        </div>

        {/* MOQ */}
        <div className="text-xs text-gray-500 mb-2">
          MOQ: {moq.toLocaleString()} pieces
        </div>

        {/* Supplier */}
        <div className="text-xs text-gray-600 mb-2 truncate hover:text-sky-600">
          <Link href={`/suppliers/${supplierId}`}>{supplierName}</Link>
        </div>

        {/* Product Types */}
        {getEnabledProductTypes().length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {getEnabledProductTypes().map((type) => (
              <div
                key={type}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getProductTypeColor(type)}`}
              >
                {getProductTypeIcon(type)}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
            ))}
          </div>
        )}

        {/* Rating (simulated) */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < 4 ? "text-cyan-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">(156)</span>
        </div>
      </div>
    </div>
  );
}
