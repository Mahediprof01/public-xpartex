import { FileText, MessageCircle, CheckCircle, Clock } from "lucide-react"

export function RFQStats() {
  const stats = [
    {
      icon: FileText,
      label: "Total RFQs",
      value: "24",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: MessageCircle,
      label: "Quotes Received",
      value: "156",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: "18",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Clock,
      label: "Active RFQs",
      value: "6",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className={`${stat.bgColor} p-3 rounded-xl`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
