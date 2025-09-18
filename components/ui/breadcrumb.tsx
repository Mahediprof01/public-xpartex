"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-gray-700 transition-colors capitalize"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Specialized breadcrumb for product details
interface ProductBreadcrumbProps {
  category?: string;
  subcategory?: string;
  productName: string;
  className?: string;
}

export function ProductBreadcrumb({
  category,
  subcategory,
  productName,
  className = "",
}: ProductBreadcrumbProps) {
  const items: BreadcrumbItem[] = [{ label: "Products", href: "/products" }];

  if (category) {
    items.push({
      label: category,
      href: `/products?category=${category.toLowerCase()}`,
    });
  }

  if (subcategory) {
    items.push({
      label: subcategory,
      href: `/products?category=${category?.toLowerCase()}&subcategory=${subcategory.toLowerCase()}`,
    });
  }

  items.push({ label: productName });

  return <Breadcrumb items={items} className={className} />;
}
