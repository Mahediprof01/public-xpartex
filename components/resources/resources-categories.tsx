import React from 'react'

export default function ResourcesCategories() {
  const categories = ["Guides", "Books", "Templates", "Regulations"]
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-lg font-medium">Categories</h3>
        <div className="mt-4 flex gap-3 flex-wrap">
          {categories.map((c) => (
            <span key={c} className="px-3 py-1 bg-white border rounded text-sm">{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
