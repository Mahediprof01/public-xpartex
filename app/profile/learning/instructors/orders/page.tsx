"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar as CalendarIcon,
  Download,
  MoreHorizontal,
  Eye,
  RotateCcw,
  CreditCard,
  BookOpen,
  FileText,
  CheckCircle,
  DollarSign,
  ShoppingBag,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type OrderStatus = "completed" | "pending" | "cancelled" | "refunded";
type OrderType = "course" | "ebook";

interface OrderItem {
  id: string;
  orderId: string;
  customerName: string;
  itemTitle: string;
  itemType: OrderType;
  quantity: number;
  price: number; // single item price
  orderDate: string; // ISO string
  status: OrderStatus;
  paymentMethod: "card" | "paypal" | "bank" | "cod";
}

const mockOrders: OrderItem[] = [
  {
    id: "1",
    orderId: "ORD-10234",
    customerName: "Ayesha Rahman",
    itemTitle: "Advanced Pattern Making",
    itemType: "course",
    quantity: 1,
    price: 79,
    orderDate: "2025-09-21T10:15:00Z",
    status: "completed",
    paymentMethod: "card",
  },
  {
    id: "2",
    orderId: "ORD-10235",
    customerName: "Imran Hossain",
    itemTitle: "Sustainable Fabric Guide (eBook)",
    itemType: "ebook",
    quantity: 2,
    price: 15,
    orderDate: "2025-09-22T08:30:00Z",
    status: "pending",
    paymentMethod: "paypal",
  },
  {
    id: "3",
    orderId: "ORD-10236",
    customerName: "Nusrat Jahan",
    itemTitle: "Export Compliance for Apparel",
    itemType: "course",
    quantity: 1,
    price: 129,
    orderDate: "2025-09-18T14:00:00Z",
    status: "refunded",
    paymentMethod: "card",
  },
  {
    id: "4",
    orderId: "ORD-10237",
    customerName: "Tanvir Ahmed",
    itemTitle: "Technical Pack Templates (eBook)",
    itemType: "ebook",
    quantity: 3,
    price: 12,
    orderDate: "2025-09-17T11:45:00Z",
    status: "completed",
    paymentMethod: "bank",
  },
  {
    id: "5",
    orderId: "ORD-10238",
    customerName: "Mehzabin Akter",
    itemTitle: "Quality Control Fundamentals",
    itemType: "course",
    quantity: 1,
    price: 99,
    orderDate: "2025-09-16T09:20:00Z",
    status: "cancelled",
    paymentMethod: "card",
  },
];

// statsData built from computed stats below
let statsData: Array<{
  label: string;
  value: string;
  delta: string;
  up: boolean;
  icon: any;
}> = [];

function buildStatsData(stats: {
  total: number;
  completed: number;
  refunded: number;
  revenue: number;
}) {
  return [
    {
      label: "Total Orders",
      value: String(stats.total),
      delta: "+5.1%",
      up: true,
      icon: ShoppingBag,
    },
    {
      label: "Completed",
      value: String(stats.completed),
      delta: "+1.2%",
      up: true,
      icon: CheckCircle,
    },
    {
      label: "Refunded",
      value: String(stats.refunded),
      delta: "-0.3%",
      up: false,
      icon: RotateCcw,
    },
    {
      label: "Revenue",
      value: formatCurrency(stats.revenue),
      delta: "+3.8%",
      up: true,
      icon: DollarSign,
    },
  ];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function StatusBadge({ status }: { status: OrderStatus }) {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-700 border border-green-200">
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
          Pending
        </Badge>
      );
    case "refunded":
      return (
        <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
          Refunded
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-700 border border-red-200">
          Cancelled
        </Badge>
      );
  }
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("this-month");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const filteredOrders = useMemo(() => {
    let data = [...mockOrders];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      data = data.filter(
        (o) =>
          o.orderId.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.itemTitle.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((o) => o.status === statusFilter);
    }
    if (typeFilter !== "all") {
      data = data.filter((o) => o.itemType === typeFilter);
    }
    if (paymentFilter !== "all") {
      data = data.filter((o) => o.paymentMethod === paymentFilter);
    }

    const now = new Date();
    data = data.filter((o) => {
      const d = new Date(o.orderDate);
      switch (dateRange) {
        case "today":
          return d.toDateString() === now.toDateString();
        case "this-week": {
          const day = now.getDay();
          const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday start
          const monday = new Date(now);
          monday.setDate(diff);
          const sunday = new Date(monday);
          sunday.setDate(monday.getDate() + 6);
          return d >= monday && d <= sunday;
        }
        case "this-month":
          return (
            d.getFullYear() === now.getFullYear() &&
            d.getMonth() === now.getMonth()
          );
        case "all-time":
        default:
          return true;
      }
    });

    return data;
  }, [searchTerm, statusFilter, typeFilter, paymentFilter, dateRange]);

  // KPI stats
  const stats = useMemo(() => {
    const total = filteredOrders.length;
    const completed = filteredOrders.filter(
      (o) => o.status === "completed"
    ).length;
    const refunded = filteredOrders.filter(
      (o) => o.status === "refunded"
    ).length;
    const revenue = filteredOrders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + o.price * o.quantity, 0);
    return { total, completed, refunded, revenue };
  }, [filteredOrders]);

  // Build stat cards dataset from computed stats
  statsData = buildStatsData(stats);

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const pagedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, typeFilter, paymentFilter, dateRange]);

  return (
    <div className="p-6 space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Orders & Transactions</h1>
            <p className="text-white/80 mt-1">
              Track and manage course and eBook orders.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
            >
              Download Report
            </Button>
          </div>
        </div>
        {/* Quick Stats */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 rounded-2xl mt-4"
          style={{
            background: "linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)",
          }}
        >
          {statsData.map((s) => {
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
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by Order ID, customer, item..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="course">Course Purchase</SelectItem>
                  <SelectItem value="ebook">eBook Purchase</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                Custom Dates
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {pagedOrders.length} of {filteredOrders.length} orders
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Rows per page</span>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => setPageSize(Number(v))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {filteredOrders.length} orders
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-50 z-10">
              <TableRow className="text-gray-700">
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedOrders.map((o, idx) => (
                <TableRow
                  key={o.id}
                  className={
                    idx % 2 === 0
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                >
                  <TableCell className="font-medium">{o.orderId}</TableCell>
                  <TableCell>{o.customerName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {o.itemType === "course" ? (
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      ) : (
                        <FileText className="h-4 w-4 text-emerald-600" />
                      )}
                      <span>{o.itemTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell>{o.quantity}</TableCell>
                  <TableCell>{formatCurrency(o.price * o.quantity)}</TableCell>
                  <TableCell>
                    {new Date(o.orderDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CreditCard className="h-4 w-4" />
                      <span className="capitalize">{o.paymentMethod}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" asChild>
                          <a
                            href={`/profile/learning/instructors/orders/${o.id}`}
                          >
                            <Eye className="h-4 w-4" /> View Details
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <RotateCcw className="h-4 w-4" /> Issue Refund
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Download className="h-4 w-4" /> Download Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.max(1, p - 1));
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages })
                .slice(0, 5)
                .map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={page === pageNumber}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.min(totalPages, p + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
