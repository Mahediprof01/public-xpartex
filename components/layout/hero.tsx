"use client"

import { useState } from "react"
import { Search, Camera, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
  const [activeTab, setActiveTab] = useState("products")
  const [deepSearch, setDeepSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const tabs = [
    { id: "products", label: "Products" },
    { id: "manufacturers", label: "Manufacturers" },
    { id: "regional", label: "Regional Supplies" },
  ]

  const frequentSearches = [
    "Cotton T-shirts",
    "Denim Jeans",
    "Polo Shirts",
    "Hoodies",
    "Formal Shirts",
    "Sportswear",
    "Kids Clothing",
    "Accessories",
  ]

  const handleSearch = () => {
    // Handle search logic
    console.log("Searching for:", searchQuery, "Deep search:", deepSearch)
  }

  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      {/* Decorative gradient background and soft blurred blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-emerald-50 opacity-95" />
        <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-tr from-sky-400 to-emerald-300 opacity-30 filter blur-3xl transform-gpu" />
        <div className="absolute right-[-10rem] top-20 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-300 to-sky-300 opacity-20 filter blur-4xl transform-gpu" />
        <div className="absolute left-1/2 bottom-[-8rem] w-96 h-96 rounded-full bg-gradient-to-tr from-amber-200 to-sky-200 opacity-18 filter blur-3xl transform-gpu -translate-x-1/2" />
        <div className="absolute inset-0 bg-white/30 dark:bg-black/10 mix-blend-overlay" />
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 text-balance">
            Global Garments
            <span className="gradient-primary bg-clip-text text-transparent"> Marketplace</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty max-w-3xl mx-auto">
            Connect with verified manufacturers, suppliers, and buyers worldwide. Source quality garments, get custom
            quotes, and grow your business.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-2xl p-1 shadow-sm border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id ? "gradient-primary text-white shadow-sm" : "text-neutral-700 hover:text-sky-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 text-lg"
                />
              </div>

              {/* Deep Search Toggle */}
              <div className="flex items-center gap-2 px-4 border-l">
                <span className="text-sm text-gray-600">Deep Search</span>
                <button onClick={() => setDeepSearch(!deepSearch)} className="text-gray-400 hover:text-gray-600">
                  {deepSearch ? <ToggleRight className="h-5 w-5 text-sky-500" /> : <ToggleLeft className="h-5 w-5" />}
                </button>
              </div>

              {/* Image Search */}
              <Button variant="ghost" size="sm" className="px-4">
                <Camera className="h-5 w-5" />
              </Button>

              {/* Search Button */}
              <Button onClick={handleSearch} className="gradient-primary gradient-primary-hover text-white px-8 py-3 shadow-sm">
                Search
              </Button>
            </div>
          </div>

          {/* Frequently Searched Keywords */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Frequently searched:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {frequentSearches.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setSearchQuery(keyword)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
