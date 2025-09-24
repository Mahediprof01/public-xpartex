"use client";
import {
  DollarSign,
  BookOpen,
  ShoppingBag,
  Wallet,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Upload,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Page() {
  // Mock data for now; replace with real API data later
  const stats = [
    {
      label: "Total Sales",
      value: "$12,480",
      delta: "+8.2%",
      up: true,
      icon: DollarSign,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active Courses",
      value: "8",
      delta: "+1",
      up: true,
      icon: BookOpen,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending Orders",
      value: "14",
      delta: "-2",
      up: false,
      icon: ShoppingBag,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Earnings (this month)",
      value: "$2,340",
      delta: "+3.4%",
      up: true,
      icon: Wallet,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  // Monthly overview (4 weeks)
  const weeks = ["W1", "W2", "W3", "W4"];
  const courseMonthly = [120, 180, 160, 210];
  const ebookMonthly = [60, 90, 110, 130];
  const overviewData = weeks.map((w, i) => ({
    week: w,
    courses: courseMonthly[i],
    ebooks: ebookMonthly[i],
    total: courseMonthly[i] + ebookMonthly[i],
  }));

  // Pie (donut) breakdown for the month
  const pieData = [
    {
      label: "Courses",
      value: courseMonthly.reduce((a, b) => a + b, 0),
      color: "#3b82f6",
    },
    {
      label: "eBooks",
      value: ebookMonthly.reduce((a, b) => a + b, 0),
      color: "#10b981",
    },
    { label: "Digital Assets", value: 240, color: "#f59e0b" },
  ];
  const pieTotal = pieData.reduce((a, b) => a + b.value, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div
        className="flex items-center justify-between rounded-2xl p-6 mb-2"
        style={{
          background: "linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)",
        }}
      >
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Instructor Dashboard
          </h1>
          <p className="text-cyan-100 mt-1">
            Insights for your courses, assets, and revenue.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/20 px-3 py-2 text-sm text-white hover:bg-white/30 transition">
            <Calendar className="h-4 w-4 text-white" /> Last 30 days
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 rounded-2xl p-4"
        style={{
          background: "linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)",
        }}
      >
        {stats.map((s) => {
          const Icon = s.icon as any;
          return (
            <div
              key={s.label}
              className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/20 p-4 shadow-lg backdrop-blur-md bg-clip-padding"
              style={{
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0.10) 100%)",
                boxShadow:
                  "0 4px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 4px 0 rgba(0,0,0,0.04)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -top-12 -right-12 h-24 w-24 rounded-full bg-white/30 blur-xl" />
              {/* Watermark icon */}
              <div className="pointer-events-none absolute -bottom-4 -right-2 opacity-10">
                <Icon className="h-20 w-20" />
              </div>
              <div className="flex items-start justify-between">
                <div
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center bg-white/30 backdrop-blur-sm ring-1 ring-white/30 shadow-sm`}
                >
                  <Icon className="h-5 w-5 text-white/90 drop-shadow" />
                </div>
                <div
                  className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${
                    s.up
                      ? "bg-emerald-100/60 text-emerald-800 border-emerald-200/60"
                      : "bg-rose-100/60 text-rose-800 border-rose-200/60"
                  } backdrop-blur-sm`}
                >
                  {s.up ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  <span>{s.delta}</span>
                </div>
              </div>
              <p className="mt-4 text-2xl font-semibold text-white drop-shadow">
                {s.value}
              </p>
              <p className="text-xs text-white/80 mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Monthly Overview Row: Animated charts (EvilCharts-inspired) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Left: Composed Area + Bar + Line */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Monthly Overview
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                Course Sales
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                eBook Sales
              </div>
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={overviewData}
                margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id="gradCourses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop
                      offset="100%"
                      stopColor="#3b82f6"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                  <linearGradient id="gradEbooks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
                    <stop
                      offset="100%"
                      stopColor="#10b981"
                      stopOpacity={0.08}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                <XAxis
                  dataKey="week"
                  stroke="#9ca3af"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(59,130,246,0.08)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="courses"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#gradCourses)"
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Bar
                  dataKey="ebooks"
                  fill="url(#gradEbooks)"
                  radius={[6, 6, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#64748b"
                  strokeDasharray="6 6"
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Sales Breakdown (Animated Donut) */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Sales Breakdown
            </h2>
            <span className="text-xs text-gray-500">Last 30 days</span>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="flex items-center justify-center h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e5e7eb",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={24} />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    startAngle={90}
                    endAngle={-270}
                    isAnimationActive
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {pieData.map((seg) => (
                <div
                  key={seg.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: seg.color }}
                    ></span>
                    <span className="text-sm text-gray-700">{seg.label}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {seg.value}
                  </span>
                </div>
              ))}
              <div className="pt-2 text-xs text-gray-500">
                Total: {pieTotal}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
          <a
            href="/profile/learning/instructors/orders"
            className="text-sm text-blue-600 hover:underline"
          >
            View all
          </a>
        </div>
        <ul className="mt-4 space-y-3">
          {pieData.length > 0 && (
            <li className="text-xs text-gray-500">
              Monthly totals shown above. Activity feed shows the latest events.
            </li>
          )}
          {/* Keep the previous recent list if needed */}
        </ul>
      </div>

      {/* Floating Quick Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <a
          href="/profile/learning/instructors/courses"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white shadow-lg px-4 py-2 text-sm hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> Create Course
        </a>
        <a
          href="/profile/learning/instructors/assets"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white shadow-lg px-4 py-2 text-sm hover:bg-emerald-700"
        >
          <Upload className="h-4 w-4" /> Upload Asset
        </a>
        <a
          href="/profile/learning/instructors/payouts"
          className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white shadow-lg px-4 py-2 text-sm hover:bg-black"
        >
          <Wallet className="h-4 w-4" /> Withdraw Earnings
        </a>
      </div>
    </div>
  );
}
