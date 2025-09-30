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
  DollarSign,
  Users,
  Globe,
  ChevronDown,
  ChevronUp,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  BarChart3,
  Folder,
  ShoppingBag,
  Wallet,
  Star,
  Award,
  Play,
  FileQuestion,
  Download,
  User,
  Mail,
  Lock,
  Eye,
  Edit,
  MessageCircle,
  Search,
  FileSpreadsheet,
  ClipboardList,
  Handshake,
  TrendingUp,
  UserCheck,
  Bell,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Navigation structure type definitions
interface NavigationItem {
  title: string;
  href?: string;
  icon: any;
  children?: NavigationItem[];
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// Seller Management Navigation Items
const sellerNavigationItems: NavigationItem[] = [
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
const buyerNavigationItems: NavigationItem[] = [
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
    title: "Quotation",
    href: "/profile/buyer/quotation",
    icon: FileText,
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

// Learning Management Navigation Items - Restructured
const learningManagementItems: NavigationItem[] = [
  {
    title: "Learner Management",
    icon: GraduationCap,
    children: [
      {
        title: "Dashboard",
        href: "/profile/learning/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Courses",
        icon: BookOpen,
        children: [
          {
            title: "Course List",
            href: "/profile/learning/courses",
            icon: BookOpen,
          },
          {
            title: "Course Viewer",
            href: "/profile/learning/courses/viewer",
            icon: Play,
          },
          {
            title: "Assignments & Quizzes",
            href: "/profile/learning/courses/assignments",
            icon: FileQuestion,
          },
          {
            title: "Certificates",
            href: "/profile/learning/courses/certificates",
            icon: Award,
          },
          {
            title: "Course Reviews",
            href: "/profile/learning/courses/reviews",
            icon: Star,
          },
        ],
      },
      {
        title: "My eBooks",
        href: "/profile/learning/ebooks",
        icon: BookOpen,
      },
      {
        title: "My Assets",
        href: "/profile/learning/assets",
        icon: Folder,
      },
    ],
  },
  {
    title: "Instructor Management",
    icon: GraduationCap,
    children: [
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
        title: "eBooks",
        icon: Folder,
        children: [
          {
            title: "Manage E-Books",
            href: "/profile/learning/instructors/assets",
            icon: Folder,
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
        ],
      },
      {
        title: "Community Engagements",
        href: "/profile/learning/instructors/messages",
        icon: MessageSquare,
      },
    ],
  },
];

// Freelancer Management Navigation Items
const freelancerManagementItems: NavigationItem[] = [
  {
    title: "Dashboard Home",
    href: "/profile/freelancer",
    icon: LayoutDashboard,
  },
  {
    title: "Find Jobs",
    href: "/profile/freelancer/find-jobs",
    icon: Search,
  },
  {
    title: "Job Details",
    href: "/profile/freelancer/job-details",
    icon: Briefcase,
  },
  {
    title: "My Proposals",
    href: "/profile/freelancer/proposals",
    icon: FileSpreadsheet,
  },
  {
    title: "Contracts",
    href: "/profile/freelancer/contracts",
    icon: Handshake,
  },
  {
    title: "Messages",
    href: "/profile/freelancer/messages",
    icon: MessageCircle,
  },
  {
    title: "Earnings",
    href: "/profile/freelancer/earnings",
    icon: TrendingUp,
  },
  {
    title: "Profile",
    href: "/profile/freelancer/profile",
    icon: UserCheck,
  },
  {
    title: "Settings",
    href: "/profile/freelancer/settings",
    icon: Bell,
  },
];

// Navigation sections configuration
const navigationSections: NavigationSection[] = [
  {
    title: "Buyer Management",
    items: buyerNavigationItems,
  },
  {
    title: "Seller Management",
    items: sellerNavigationItems,
  },
  {
    title: "Learning Management",
    items: learningManagementItems,
  },
  {
    title: "Freelancer Management",
    items: freelancerManagementItems,
  },
];

// Settings navigation item
const settingsItem: NavigationItem = {
  title: "Settings",
  href: "/profile/settings",
  icon: Settings,
  children: [
    {
      title: "Profile",
      href: "/profile/settings/profile",
      icon: User,
    },
    {
      title: "Email & Notifications",
      href: "/profile/settings/email",
      icon: Mail,
    },
    {
      title: "Password & Security",
      href: "/profile/settings/password",
      icon: Lock,
    },
  ],
};

export function UnifiedSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    "Buyer Management": true,
    "Seller Management": true,
    "Learning Management": true,
    "Freelancer Management": true,
  });
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const pathname = usePathname();

  const toggleSection = (sectionTitle: string) => {
    if (collapsed) return;
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const toggleItem = (itemKey: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  // Helper function to check if path is active
  const isPathActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  // Helper function to check if any child is active
  const isAnyChildActive = (children?: NavigationItem[]): boolean => {
    if (!children) return false;
    return children.some(
      (child) => isPathActive(child.href) || isAnyChildActive(child.children)
    );
  };

  // Helper function to get unique key for navigation items
  const getItemKey = (item: NavigationItem, level: number = 0): string => {
    return `${item.title}-${level}`;
  };

  // Render navigation item
  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isPathActive(item.href);
    const isChildActive = isAnyChildActive(item.children);
    const itemKey = getItemKey(item, level);
    const isExpanded =
      expandedItems[itemKey] !== undefined
        ? expandedItems[itemKey]
        : isChildActive && level === 0;
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <div key={itemKey} className="space-y-1">
          <button
            type="button"
            className={cn(
              "w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
              level === 0 ? "text-gray-900" : "text-gray-700",
              isActive || isChildActive
                ? "bg-blue-50 text-blue-700"
                : "hover:bg-gray-100"
            )}
            onClick={() => toggleItem(itemKey)}
            title={collapsed ? item.title : undefined}
          >
            <span className="flex items-center gap-2">
              <Icon
                className={cn(
                  "h-4 w-4",
                  isActive || isChildActive ? "text-blue-600" : "text-gray-500"
                )}
              />
              {!collapsed && <span>{item.title}</span>}
            </span>
            {!collapsed &&
              (isExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ))}
          </button>
          {isExpanded && (
            <div
              className={cn(
                "space-y-1",
                !collapsed && level === 0 && "pl-6",
                !collapsed && level > 0 && "pl-4"
              )}
            >
              {item.children?.map((child) =>
                renderNavigationItem(child, level + 1)
              )}
            </div>
          )}
        </div>
      );
    }

    if (!item.href) return null;

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
            "h-4 w-4",
            isActive ? "text-blue-600" : "text-gray-500"
          )}
        />
        {!collapsed && <span className="flex-1">{item.title}</span>}
      </Link>
    );
  };

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
          {navigationSections.map((section) => (
            <div key={section.title}>
              <div
                className="flex items-center justify-between cursor-pointer mb-2"
                onClick={() => toggleSection(section.title)}
              >
                {!collapsed && (
                  <>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                      {section.title}
                    </h3>
                    {expandedSections[section.title] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </>
                )}
              </div>

              {(collapsed || expandedSections[section.title]) && (
                <div className="space-y-1">
                  {section.items.map((item) => renderNavigationItem(item))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Settings at bottom */}
      <div className="p-4 border-t border-gray-200">
        {renderNavigationItem(settingsItem)}
      </div>
    </div>
  );
}
