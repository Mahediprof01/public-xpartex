"use client"

export default function CourseFilters() {
  return (
    <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-6">Filter Courses</h3>

      <div className="space-y-6">
        {/* Category */}
        <div>
          <h4 className="font-medium mb-3">Category</h4>
          <div className="space-y-2">
            {["Fashion Design", "Production Management", "Business & Marketing", "Sustainability", "Technology"].map(
              (category) => (
                <label key={category} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{category}</span>
                </label>
              ),
            )}
          </div>
        </div>

        {/* Level */}
        <div>
          <h4 className="font-medium mb-3">Level</h4>
          <div className="space-y-2">
            {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
              <label key={level} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h4 className="font-medium mb-3">Duration</h4>
          <div className="space-y-2">
            {["1-3 weeks", "4-6 weeks", "7-10 weeks", "10+ weeks"].map((duration) => (
              <label key={duration} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">{duration}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-2">
            {["Free", "$1-$50", "$51-$100", "$101-$200", "$200+"].map((price) => (
              <label key={price} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">{price}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-2 px-4 hover:from-sky-600 hover:to-cyan-500 transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  )
}
