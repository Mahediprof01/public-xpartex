"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function CustomizationPortfolio() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = ["all", "t-shirts", "hoodies", "polo-shirts", "jackets"]

  const portfolioItems = [
    {
      id: 1,
      title: "Corporate T-Shirt Design",
      category: "t-shirts",
      image: "/cotton-t-shirt.jpg",
      description: "Custom corporate t-shirts with logo embroidery",
    },
    {
      id: 2,
      title: "Premium Hoodie Collection",
      category: "hoodies",
      image: "/cozy-hoodie.png",
      description: "Winter hoodie collection with custom prints",
    },
    {
      id: 3,
      title: "Business Polo Shirts",
      category: "polo-shirts",
      image: "/classic-polo-shirt.png",
      description: "Professional polo shirts for business events",
    },
    {
      id: 4,
      title: "Sports Team Jackets",
      category: "jackets",
      image: "/garment-factory.jpg",
      description: "Custom team jackets with embroidered logos",
    },
  ]

  const filteredItems =
    activeCategory === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our recent customization projects and see the quality of our work
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-100 rounded-2xl p-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "gradient-primary text-white"
                    : "text-gray-600 hover:text-gray-900 bg-transparent"
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <Button
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity gradient-primary text-white"
                  >
                    View Details
                  </Button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
