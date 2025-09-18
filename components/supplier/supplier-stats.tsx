import { TrendingUp, Clock, Award, Truck } from "lucide-react"

interface SupplierStatsProps {
  supplier: any
}

export function SupplierStats({ supplier }: SupplierStatsProps) {
  const stats = [
    {
      icon: TrendingUp,
      label: "Monthly Capacity",
      value: `${supplier.companyStats.monthlyCapacity.toLocaleString()} pcs`,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Clock,
      label: "Average Lead Time",
      value: `${supplier.companyStats.averageLeadTime} days`,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Truck,
      label: "On-Time Delivery",
      value: `${supplier.companyStats.onTimeDelivery}%`,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Award,
      label: "Quality Rating",
      value: `${supplier.companyStats.qualityRating}/5.0`,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className={`${stat.bgColor} p-4 rounded-2xl w-16 h-16 mx-auto mb-3 flex items-center justify-center`}>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
