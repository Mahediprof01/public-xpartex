"use client";

import { useState } from "react";
import { SupplierCard } from "@/components/supplier/supplier-card";
import { SupplierFilters } from "@/components/supplier/supplier-filters";
import { Button } from "@/components/ui/button";
import { Grid, List, SlidersHorizontal } from "lucide-react";

export default function SuppliersPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  // Mock supplier data
  const suppliers = [
    {
      id: "supplier-1",
      name: "Dhaka Textiles Ltd.",
      logo: "/textile-company-logo.jpg",
      rating: 4.8,
      location: "Dhaka, Bangladesh",
      description:
        "Leading manufacturer of premium cotton garments with 15+ years experience in export quality production",
      totalProducts: 250,
      verified: true,
      responseTime: "Within 2 hours",
      languages: ["English", "Bengali"],
      specialties: ["Cotton Garments", "T-Shirts", "Polo Shirts"],
      certifications: ["WRAP", "OEKO-TEX", "ISO 9001"],
      minOrder: 500,
      establishedYear: 2008,
      employees: "500-1000",
      exportMarkets: ["USA", "Europe", "Canada"],
    },
    {
      id: "supplier-2",
      name: "Bengal Garments",
      logo: "/garment-factory-logo.jpg",
      rating: 4.7,
      location: "Chittagong, Bangladesh",
      description:
        "Specialized in denim and casual wear manufacturing with state-of-the-art facilities",
      totalProducts: 180,
      verified: true,
      responseTime: "Within 4 hours",
      languages: ["English", "Bengali", "Hindi"],
      specialties: ["Denim", "Casual Wear", "Jackets"],
      certifications: ["BSCI", "WRAP", "ISO 14001"],
      minOrder: 200,
      establishedYear: 2012,
      employees: "200-500",
      exportMarkets: ["Europe", "Australia", "Japan"],
    },
    {
      id: "supplier-3",
      name: "Chittagong Apparel",
      logo: "/abstract-fashion-logo.png",
      rating: 4.9,
      location: "Chittagong, Bangladesh",
      description:
        "Premium fashion garments and custom design solutions for global brands",
      totalProducts: 320,
      verified: true,
      responseTime: "Within 1 hour",
      languages: ["English", "Bengali", "French"],
      specialties: ["Fashion Garments", "Custom Design", "Premium Quality"],
      certifications: ["GOTS", "WRAP", "SA8000"],
      minOrder: 300,
      establishedYear: 2005,
      employees: "1000+",
      exportMarkets: ["USA", "Europe", "Middle East"],
    },
    {
      id: "supplier-4",
      name: "Sylhet Fashion House",
      logo: "/abstract-fashion-logo.png",
      rating: 4.6,
      location: "Sylhet, Bangladesh",
      description:
        "Innovative fashion solutions with focus on sustainable and eco-friendly manufacturing",
      totalProducts: 150,
      verified: true,
      responseTime: "Within 3 hours",
      languages: ["English", "Bengali"],
      specialties: ["Sustainable Fashion", "Hoodies", "Winter Wear"],
      certifications: ["GOTS", "OEKO-TEX", "Cradle to Cradle"],
      minOrder: 100,
      establishedYear: 2015,
      employees: "100-200",
      exportMarkets: ["Europe", "USA", "Scandinavia"],
    },
    {
      id: "supplier-5",
      name: "Eco Garments BD",
      logo: "/eco-friendly-logo.png",
      rating: 4.8,
      location: "Gazipur, Bangladesh",
      description:
        "100% sustainable and eco-friendly garment manufacturing with organic materials",
      totalProducts: 120,
      verified: true,
      responseTime: "Within 2 hours",
      languages: ["English", "Bengali"],
      specialties: ["Organic Cotton", "Sustainable Fashion", "Eco-Friendly"],
      certifications: ["GOTS", "OCS", "Fair Trade"],
      minOrder: 250,
      establishedYear: 2018,
      employees: "50-100",
      exportMarkets: ["Europe", "USA", "Canada"],
    },
    {
      id: "supplier-6",
      name: "Sports Apparel Co.",
      logo: "/garment-factory-logo.jpg",
      rating: 4.5,
      location: "Dhaka, Bangladesh",
      description:
        "Specialized in athletic and performance wear with advanced fabric technology",
      totalProducts: 200,
      verified: true,
      responseTime: "Within 6 hours",
      languages: ["English", "Bengali"],
      specialties: ["Athletic Wear", "Performance Fabrics", "Sportswear"],
      certifications: ["WRAP", "ISO 9001", "OEKO-TEX"],
      minOrder: 300,
      establishedYear: 2010,
      employees: "200-500",
      exportMarkets: ["USA", "Australia", "Europe"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verified Suppliers
          </h1>
          <p className="text-gray-600">
            Connect with trusted garment manufacturers and suppliers worldwide
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:ml-auto">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="rating">Highest Rated</option>
              <option value="response-time">Response Time</option>
              <option value="products">Most Products</option>
              <option value="established">Established Date</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:block ${
              showFilters ? "block" : "hidden"
            } w-full lg:w-80 flex-shrink-0`}
          >
            <SupplierFilters />
          </div>

          {/* Suppliers Grid */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {suppliers.length} suppliers found
              </p>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  : "space-y-6"
              }
            >
              {suppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  supplier={supplier}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button
                  variant="default"
                  className="gradient-primary text-white"
                >
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
