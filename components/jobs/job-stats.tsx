export default function JobStats() {
  const stats = [
    { label: "Active Jobs", value: "2,847", icon: "💼" },
    { label: "Companies Hiring", value: "1,234", icon: "🏢" },
    { label: "Jobs Filled This Month", value: "456", icon: "✅" },
    { label: "Average Salary", value: "$68,500", icon: "💰" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{stat.icon}</span>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
