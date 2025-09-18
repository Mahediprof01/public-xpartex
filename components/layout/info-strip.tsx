import Link from "next/link"
import { FileText, Zap, Truck } from "lucide-react"

export function InfoStrip() {
  const quickLinks = [
    {
      icon: FileText,
      title: "Request for Quotation",
      description: "Get custom quotes from verified suppliers",
      href: "/rfq",
      // use site-accent (sky) with transparency
      color: "bg-sky-600/20",
    },
    {
      icon: Zap,
      title: "Fast Customizations",
      description: "Quick turnaround for custom orders",
      href: "/customization",
      color: "bg-sky-600/15",
    },
    {
      icon: Truck,
      title: "Logistics Solutions",
      description: "End-to-end shipping and delivery",
      href: "/logistics",
      color: "bg-sky-600/10",
    },
  ]

  return (
    <section className="bg-sky-50/30 border-t-2 border-sky-200/40 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className={`${link.color} p-3 rounded-xl text-sky-700/90`}>
                  <link.icon className="h-6 w-6 text-sky-700/90" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-sky-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
