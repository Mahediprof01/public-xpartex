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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar as CalendarIcon,
  Download,
  Search,
  Wallet,
  DollarSign,
  Clock,
  BookOpen,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type PayoutStatus = "completed" | "pending" | "failed";
type Method = "bank" | "paypal";

interface PayoutRow {
  id: string;
  txnId: string;
  amount: number;
  requestedAt: string;
  processedAt?: string;
  status: PayoutStatus;
  method: Method;
}

const mockPayouts: PayoutRow[] = [
  {
    id: "1",
    txnId: "PYT-90021",
    amount: 240.5,
    requestedAt: "2025-09-18T10:12:00Z",
    processedAt: "2025-09-19T09:01:00Z",
    status: "completed",
    method: "bank",
  },
  {
    id: "2",
    txnId: "PYT-90022",
    amount: 120.0,
    requestedAt: "2025-09-21T13:44:00Z",
    status: "pending",
    method: "paypal",
  },
  {
    id: "3",
    txnId: "PYT-90020",
    amount: 75,
    requestedAt: "2025-09-15T08:30:00Z",
    processedAt: "2025-09-15T15:10:00Z",
    status: "failed",
    method: "paypal",
  },
];

// statsData will be built from computed stats below

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function StatusBadge({ status }: { status: PayoutStatus }) {
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
    case "failed":
      return (
        <Badge className="bg-red-100 text-red-700 border border-red-200">
          Failed
        </Badge>
      );
  }
}

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("this-month");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    let rows = [...mockPayouts];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      rows = rows.filter(
        (r) => r.txnId.toLowerCase().includes(q) || String(r.amount).includes(q)
      );
    }
    if (statusFilter !== "all")
      rows = rows.filter((r) => r.status === statusFilter);
    if (methodFilter !== "all")
      rows = rows.filter((r) => r.method === methodFilter);

    const now = new Date();
    rows = rows.filter((r) => {
      const d = new Date(r.requestedAt);
      switch (dateRange) {
        case "today":
          return d.toDateString() === now.toDateString();
        case "this-week": {
          const day = now.getDay();
          const diff = now.getDate() - day + (day === 0 ? -6 : 1);
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

    return rows;
  }, [searchTerm, statusFilter, methodFilter, dateRange]);

  const stats = useMemo(() => {
    const totalEarnings = 2380.75; // mock summary
    const withdrawn = mockPayouts
      .filter((r) => r.status === "completed")
      .reduce((sum, r) => sum + r.amount, 0);
    const pending = mockPayouts
      .filter((r) => r.status === "pending")
      .reduce((sum, r) => sum + r.amount, 0);
    const available = Math.max(0, totalEarnings - withdrawn - pending);
    return { totalEarnings, withdrawn, pending, available };
  }, []);

  const statsData = useMemo(
    () => [
      {
        label: "Total Earnings",
        value: formatCurrency(stats.totalEarnings),
        delta: "+5.1%",
        up: true,
        icon: DollarSign,
      },
      {
        label: "Available",
        value: formatCurrency(stats.available),
        delta: "+1.4%",
        up: true,
        icon: Wallet,
      },
      {
        label: "Pending Payouts",
        value: formatCurrency(stats.pending),
        delta: "-0.6%",
        up: false,
        icon: Clock,
      },
      {
        label: "Withdrawn to Date",
        value: formatCurrency(stats.withdrawn),
        delta: "+12.0%",
        up: true,
        icon: Download,
      },
    ],
    [stats]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, methodFilter, dateRange]);

  // Request payout dialog state
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<Method>("bank");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Gradient Header with Stats */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Payouts</h1>
            <p className="text-white/80 mt-1">
              Manage earnings and withdrawals.
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-blue-600 hover:bg-white/90">
                <Wallet className="h-4 w-4 mr-2" /> Request Payout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Payout</DialogTitle>
                <DialogDescription>
                  Available balance: {formatCurrency(stats.available)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder={formatCurrency(stats.available)}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="text-xs text-gray-500">
                    Minimum: {formatCurrency(10)}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Method</Label>
                  <Select
                    value={method}
                    onValueChange={(v) => setMethod(v as Method)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes (optional)</Label>
                  <Textarea
                    rows={3}
                    placeholder="Account reference or additional info"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={async () => {
                    const amt = Number(amount || 0);
                    if (!(amt > 0) || amt < 10 || amt > stats.available) {
                      toast({
                        title: "Invalid amount",
                        description: "Enter a valid payout amount.",
                      });
                      return;
                    }
                    setLoading(true);
                    try {
                      await new Promise((r) => setTimeout(r, 1000));
                      toast({
                        title: "Payout requested",
                        description: `${formatCurrency(amt)} via ${method}`,
                      });
                      setOpen(false);
                      setAmount("");
                      setNotes("");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by Payout ID or amount..."
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
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
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
              Showing {paged.length} of {filtered.length} payouts
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">{filtered.length} payouts</div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-gray-50 z-10">
              <TableRow className="text-gray-700">
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Processed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((r, idx) => (
                <TableRow
                  key={r.id}
                  className={
                    idx % 2 === 0
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                >
                  <TableCell className="font-medium">{r.txnId}</TableCell>
                  <TableCell>{formatCurrency(r.amount)}</TableCell>
                  <TableCell>
                    {new Date(r.requestedAt).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    {r.processedAt
                      ? new Date(r.processedAt).toLocaleString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                  <TableCell className="capitalize">{r.method}</TableCell>
                  <TableCell className="text-gray-500">-</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm" className="gap-2">
                      <a href={`/profile/learning/instructors/payouts/${r.id}`}>
                        <Download className="h-4 w-4" /> View
                      </a>
                    </Button>
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
