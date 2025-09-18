"use client"

import { useState } from "react"

export default function JobFilters() {
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    salary: "",
    location: "",
  })

  return (
    <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-6">Filter Jobs</h3>

      <div className="space-y-6">
        {/* Job Type */}
        <div>
          <h4 className="font-medium mb-3">Job Type</h4>
          <div className="space-y-2">
            {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((type) => (
              <label key={type} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <h4 className="font-medium mb-3">Experience Level</h4>
          <div className="space-y-2">
            {["Entry Level", "Mid Level", "Senior Level", "Executive"].map((level) => (
              <label key={level} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <h4 className="font-medium mb-3">Salary Range</h4>
          <select className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-sky-500">
            <option value="">Any Salary</option>
            <option value="30-50k">$30,000 - $50,000</option>
            <option value="50-75k">$50,000 - $75,000</option>
            <option value="75-100k">$75,000 - $100,000</option>
            <option value="100k+">$100,000+</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-medium mb-3">Location</h4>
          <input
            type="text"
            placeholder="Enter city or state"
            className="w-full p-2 border border-gray-300 focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <button className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white py-2 px-4 hover:from-sky-600 hover:to-cyan-500 transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  )
}
