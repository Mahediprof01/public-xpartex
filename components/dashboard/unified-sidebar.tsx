"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Package,
  Store,
  Settings,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShoppingCart,
  Heart,
  History,
  DollarSign,
  Users,
  Globe,
  ChevronDown,
  ChevronUp,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  UploadCloud,
  Folder,
  ShoppingBag,
  Wallet,
  Undo2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Seller Management Navigation Items
const sellerNavigationItems = [
  {
    title: "Home",
    href: "/profile",
    icon: Home,
  },
  {
    title: "Request for Quotation",
    href: "/profile/rfq",
    icon: FileText,
  },
  {
    title: "Products",
    href: "/profile/products",
    icon: Package,
  },
  {
    title: "Store",
    href: "/profile/store",
    icon: Store,
  },
];

// Buyer Management Navigation Items
const buyerNavigationItems = [
  {
    title: "Home",
    href: "/profile/buyer",
    icon: Home,
  },
  {
    title: "Messages",
    href: "/profile/buyer/messages",
    icon: MessageSquare,
  },
  {
    title: "Buying Leads",
    href: "/profile/buyer/leads",
    icon: ShoppingCart,
  },
  {
    title: "Orders",
    href: "/profile/buyer/orders",
    icon: Package,
  },
  {
    title: "Payment",
    href: "/profile/buyer/payment",
    icon: DollarSign,
  },
  {
    title: "Contacts",
    href: "/profile/buyer/contacts",
    icon: Users,
  },
  {
    title: "My Lists",
    href: "/profile/buyer/lists",
    icon: Heart,
  },
  {
    title: "Trade Services",
    href: "/profile/buyer/trade-services",
    icon: Globe,
  },
  {
    title: "Logistics",
    href: "/profile/buyer/logistics",
    icon: Package,
  },
];

// Learning Management Navigation Items
const learningManagementItems = [
  {
    title: "Courses",
    href: "/profile/learning/courses",
    icon: BookOpen,
  },

  {
    title: "Instructor Management",
    icon: GraduationCap,
    children: [],
  },

  {
    title: "Learner Management",
    href: "/profile/learning/courses",
    icon: GraduationCap,
  },
  
];

// Learner Dashboard nested items
const learnerDashboardItems = [
  {
    title: "Dashboard",
    href: "/profile/learning/instructors",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    icon: BookOpen,
    children: [
      {
        title: "Manage Courses",
        href: "/profile/learning/instructors/courses",
        icon: BookOpen,
      },
      {
        title: "Course Analytics",
        href: "/profile/learning/instructors/courses/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "eBooks & Digital Assets",
    icon: Folder,
    children: [
      {
        title: "Manage Assets",
        href: "/profile/learning/instructors/assets",
        icon: Folder,
      },
      {
        title: "Assets Analytics",
        href: "/profile/learning/instructors/assets/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Orders & Transactions",
    icon: ShoppingBag,
    children: [
      {
        title: "Orders",
        href: "/profile/learning/instructors/orders",
        icon: ShoppingBag,
      },
      {
        title: "Payouts",
        href: "/profile/learning/instructors/payouts",
        icon: Wallet,
      },
      {
        title: "Refunds & Disputes",
        href: "/profile/learning/instructors/refunds-disputes",
        icon: Undo2,
      },
    ],
  },
  {
    title: "Community & Engagement",
    icon: MessageSquare,
    children: [
      {
        title: "Messages",
        href: "/profile/learning/instructors/messages",
        icon: MessageSquare,
      },
      {
        title: "Reviews Received",
        href: "/profile/learning/instructors/reviews",
        icon: Star,
      },
    ],
  },
  {
    title: "Settings",
    href: "/profile/learning/instructors/settings",
    icon: Settings,
  },
];

// attach learner dashboard items into Instructor Management children
learningManagementItems[1].children = learnerDashboardItems as any;

export function UnifiedSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [buyerExpanded, setBuyerExpanded] = useState(true);
  const [sellerExpanded, setSellerExpanded] = useState(true);
  const [learningExpanded, setLearningExpanded] = useState(true);
  const [learnerExpanded, setLearnerExpanded] = useState(true);
  const [learnerGroupOpen, setLearnerGroupOpen] = useState<
    Record<string, boolean>
  >({});
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-88"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-2"
                aria-label="Go to homepage"
              >
                <div className="w-30 h-10 p-1 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Xpartex logo"
                    width={200}
                    height={200}
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Buyer Management Section */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => !collapsed && setBuyerExpanded(!buyerExpanded)}
            >
              {!collapsed && (
                <>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Buyer Management
                  </h3>
                  {buyerExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </>
              )}
            </div>

            {(collapsed || buyerExpanded) && (
              <div className="space-y-1">
                {buyerNavigationItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-blue-600" : "text-gray-500"
                        )}
                      />
                      {!collapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Seller Management Section */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() => !collapsed && setSellerExpanded(!sellerExpanded)}
            >
              {!collapsed && (
                <>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Seller Management
                  </h3>
                  {sellerExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </>
              )}
            </div>

            {(collapsed || sellerExpanded) && (
              <div className="space-y-1">
                {sellerNavigationItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-blue-600" : "text-gray-500"
                        )}
                      />
                      {!collapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Learning Management Section */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer mb-2"
              onClick={() =>
                !collapsed && setLearningExpanded(!learningExpanded)
              }
            >
              {!collapsed && (
                <>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Learning Management
                  </h3>
                  {learningExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </>
              )}
            </div>
            {(collapsed || learningExpanded) && (
              <div className="space-y-1">
                {learningManagementItems.map((item) => {
                  const hasChildren = Array.isArray((item as any).children);
                  const Icon = item.icon as any;
                  if (hasChildren) {
                    const isAnyChildActive = (item as any).children.some(
                      (sub: any) =>
                        pathname === sub.href ||
                        pathname.startsWith(sub.href + "/")
                    );
                    return (
                      <div key={item.title} className="space-y-1">
                        <button
                          type="button"
                          className={cn(
                            "w-full flex items-center justify-between rounded-md px-3 py-2",
                            isAnyChildActive
                              ? "bg-blue-50"
                              : "hover:bg-gray-100"
                          )}
                          onClick={() =>
                            setLearnerGroupOpen((prev) => ({
                              ...prev,
                              [item.title]: !prev[item.title],
                            }))
                          }
                          title={collapsed ? item.title : undefined}
                        >
                          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            {Icon && <Icon className="h-5 w-5 text-gray-500" />}
                            {!collapsed && <span>{item.title}</span>}
                          </span>
                          {!collapsed &&
                            (learnerGroupOpen[item.title] ||
                            isAnyChildActive ? (
                              <ChevronUp className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            ))}
                        </button>
                        {(learnerGroupOpen[item.title] || isAnyChildActive) && (
                          <div
                            className={cn("space-y-1", !collapsed && "pl-6")}
                          >
                            {(item as any).children.map((sub: any) => {
                              const subHasChildren = Array.isArray(
                                sub?.children
                              );
                              const SubIcon = sub.icon as any;

                              if (subHasChildren) {
                                const groupKey = `${item.title}:${sub.title}`;
                                const isAnyGrandActive = sub.children.some(
                                  (g: any) =>
                                    pathname === g.href ||
                                    pathname.startsWith((g.href ?? "") + "/")
                                );
                                return (
                                  <div key={groupKey} className="space-y-1">
                                    <button
                                      type="button"
                                      className={cn(
                                        "w-full flex items-center justify-between rounded-md px-3 py-2",
                                        isAnyGrandActive
                                          ? "bg-blue-50"
                                          : "hover:bg-gray-100"
                                      )}
                                      onClick={() =>
                                        setLearnerGroupOpen((prev) => ({
                                          ...prev,
                                          [groupKey]: !prev[groupKey],
                                        }))
                                      }
                                      title={collapsed ? sub.title : undefined}
                                    >
                                      <span className="flex items-center gap-2 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        {SubIcon && (
                                          <SubIcon className="h-4 w-4 text-gray-500" />
                                        )}
                                        {sub.title}
                                      </span>
                                      {learnerGroupOpen[groupKey] ||
                                      isAnyGrandActive ? (
                                        <ChevronUp className="h-4 w-4 text-gray-500" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                      )}
                                    </button>

                                    {(learnerGroupOpen[groupKey] ||
                                      isAnyGrandActive) && (
                                      <div
                                        className={cn(
                                          "space-y-1",
                                          !collapsed && "pl-4"
                                        )}
                                      >
                                        {sub.children.map((grand: any) => {
                                          const GrandIcon = grand.icon as any;
                                          if (!grand?.href) return null;
                                          const isActive =
                                            pathname === grand.href ||
                                            pathname.startsWith(
                                              grand.href + "/"
                                            );
                                          return (
                                            <Link
                                              key={grand.href}
                                              href={grand.href}
                                              className={cn(
                                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                                isActive
                                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                                  : "text-gray-700 hover:bg-gray-100"
                                              )}
                                              title={
                                                collapsed
                                                  ? grand.title
                                                  : undefined
                                              }
                                            >
                                              {GrandIcon ? (
                                                <GrandIcon
                                                  className={cn(
                                                    "h-4 w-4",
                                                    isActive
                                                      ? "text-blue-600"
                                                      : "text-gray-500"
                                                  )}
                                                />
                                              ) : (
                                                <span className="h-4 w-4" />
                                              )}
                                              {!collapsed && (
                                                <span className="flex-1">
                                                  {grand.title}
                                                </span>
                                              )}
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              }

                              if (!sub?.href) return null;
                              const isActive =
                                pathname === sub.href ||
                                pathname.startsWith(sub.href + "/");
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                                      : "text-gray-700 hover:bg-gray-100"
                                  )}
                                  title={collapsed ? sub.title : undefined}
                                >
                                  {SubIcon ? (
                                    <SubIcon
                                      className={cn(
                                        "h-4 w-4",
                                        isActive
                                          ? "text-blue-600"
                                          : "text-gray-500"
                                      )}
                                    />
                                  ) : (
                                    <span className="h-4 w-4" />
                                  )}
                                  {!collapsed && (
                                    <span className="flex-1">{sub.title}</span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  const isActive =
                    pathname === (item as any).href ||
                    pathname.startsWith(((item as any).href ?? "") + "/");
                  return (
                    <Link
                      key={(item as any).href as string}
                      href={(item as any).href as string}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-blue-600" : "text-gray-500"
                        )}
                      />
                      {!collapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Settings at bottom */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/profile/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === "/profile/settings"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "text-gray-700 hover:bg-gray-100"
          )}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings
            className={cn(
              "h-5 w-5",
              pathname === "/profile/settings"
                ? "text-blue-600"
                : "text-gray-500"
            )}
          />
          {!collapsed && <span className="flex-1">Settings</span>}
        </Link>
      </div>
    </div>
  );
}
