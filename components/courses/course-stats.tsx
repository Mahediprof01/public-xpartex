export default function CourseStats() {
  const stats = [
    { label: "Total Courses", value: "847", icon: "📚" },
    { label: "Expert Instructors", value: "234", icon: "👨‍🏫" },
    { label: "Students Enrolled", value: "45,678", icon: "🎓" },
    { label: "Completion Rate", value: "94%", icon: "✅" },
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
