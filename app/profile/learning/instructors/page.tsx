import { UnifiedLayout } from "@/components/dashboard/unified-layout";
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
  const monthMax = Math.max(...courseMonthly, ...ebookMonthly) + 20;

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

  // Donut chart helpers
  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angle: number
  ) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const arcPath = (
    cx: number,
    cy: number,
    r: number,
    start: number,
    end: number
  ) => {
    const startPt = polarToCartesian(cx, cy, r, end);
    const endPt = polarToCartesian(cx, cy, r, start);
    const largeArc = end - start <= 180 ? 0 : 1;
    return `M ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${largeArc} 0 ${endPt.x} ${endPt.y}`;
  };

  return (
    <UnifiedLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Instructor Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Insights for your courses, assets, and revenue.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <Calendar className="h-4 w-4" /> Last 30 days
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon as any;
            return (
              <div
                key={s.label}
                className="rounded-2xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`h-10 w-10 rounded-xl ${s.color} flex items-center justify-center`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${
                      s.up
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-rose-50 text-rose-700 border-rose-200"
                    }`}
                  >
                    {s.up ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    <span>{s.delta}</span>
                  </div>
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900">
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Monthly Overview Row: Grouped bars (left) + Donut pie (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Left: Monthly Overview (Grouped Bars) */}
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
            <div className="mt-4">
              <svg viewBox="0 0 100 100" className="w-full h-56">
                {/* Gridlines */}
                {[0, 25, 50, 75, 100].map((g) => (
                  <line
                    key={`g-${g}`}
                    x1="0"
                    x2="100"
                    y1={g}
                    y2={g}
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                ))}
                {/* Bars */}
                {weeks.map((_, i) => {
                  const groupPadding = 6; // inner padding for nicer look
                  const fullGroupWidth =
                    (100 - 2 * 8 - (weeks.length - 1) * 6) / weeks.length; // mirror previous calc roughly
                  const barWidth = (fullGroupWidth - groupPadding) / 2;
                  const groupStart =
                    8 + i * (fullGroupWidth + 6) + groupPadding / 2;

                  const courseH = (courseMonthly[i] / monthMax) * (100 - 2 * 8);
                  const ebookH = (ebookMonthly[i] / monthMax) * (100 - 2 * 8);

                  const courseY = 100 - 8 - courseH;
                  const ebookY = 100 - 8 - ebookH;

                  return (
                    <g key={`m-${i}`}>
                      <rect
                        x={groupStart}
                        y={courseY}
                        width={barWidth}
                        height={courseH}
                        rx="1.5"
                        ry="1.5"
                        fill="#3b82f6"
                      />
                      <title>{`W${i + 1} Course: ${courseMonthly[i]}`}</title>
                      <rect
                        x={groupStart + barWidth + 3}
                        y={ebookY}
                        width={barWidth}
                        height={ebookH}
                        rx="1.5"
                        ry="1.5"
                        fill="#10b981"
                      />
                      <title>{`W${i + 1} eBook: ${ebookMonthly[i]}`}</title>
                    </g>
                  );
                })}
              </svg>
              <div className="mt-2 grid grid-cols-4 gap-2 text-xs text-gray-500">
                {weeks.map((w, i) => (
                  <div key={`w-${i}`} className="text-center">
                    {w}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sales Breakdown (Donut Pie) */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Sales Breakdown
              </h2>
              <span className="text-xs text-gray-500">Last 30 days</span>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-48 h-48">
                  {/* Donut segments */}
                  {(() => {
                    const cx = 60,
                      cy = 60,
                      r = 45,
                      stroke = 10;
                    let start = 0;
                    return pieData.map((seg, idx) => {
                      const angle = (seg.value / pieTotal) * 360;
                      const end = start + angle;
                      const path = arcPath(cx, cy, r, start, end);
                      const mid = start + angle / 2;
                      const label = `${Math.round(
                        (seg.value / pieTotal) * 100
                      )}%`;
                      const labelPos = polarToCartesian(cx, cy, r - 16, mid);
                      start = end;
                      return (
                        <g key={`seg-${idx}`}>
                          <path
                            d={path}
                            stroke={seg.color}
                            strokeWidth={stroke}
                            fill="none"
                          />
                          <text
                            x={labelPos.x}
                            y={labelPos.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="7"
                            fill="#374151"
                          >
                            {label}
                          </text>
                        </g>
                      );
                    });
                  })()}
                  {/* Inner hole */}
                  <circle cx="60" cy="60" r="35" fill="#ffffff" />
                  {/* Center label */}
                  <text
                    x="60"
                    y="56"
                    textAnchor="middle"
                    className="fill-gray-900"
                    style={{ fontSize: 10, fontWeight: 600 }}
                  >
                    Total
                  </text>
                  <text
                    x="60"
                    y="72"
                    textAnchor="middle"
                    className="fill-gray-500"
                    style={{ fontSize: 9 }}
                  >
                    {pieTotal}
                  </text>
                </svg>
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
                Monthly totals shown above. Activity feed shows the latest
                events.
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
    </UnifiedLayout>
  );
}
