"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  DollarSign,
  Wallet,
  Calendar,
  ArrowUpDown,
  CreditCard,
  Banknote,
  Download,
  FileText,
} from "lucide-react";

export default function ClientPaymentsPage() {
  const stats = [
    { label: "Total Paid", value: "$ 1,240,000", icon: DollarSign },
    { label: "This Month", value: "$ 120,500", icon: Wallet },
    { label: "Outstanding", value: "$ 35,000", icon: Banknote },
    { label: "Upcoming (7d)", value: "$ 18,000", icon: Calendar },
  ];

  const transactions = useMemo(
    () => [
      {
        id: "T-101",
        date: "2025-09-26",
        freelancer: "Rahim Uddin",
        item: "Contract #C-88 · Milestone 1",
        type: "Milestone",
        method: "Card (VISA **** 4242)",
        amount: 32000,
        fees: 500,
        status: "Paid" as const,
      },
      {
        id: "T-102",
        date: "2025-09-25",
        freelancer: "Shila Akter",
        item: "Contract #C-77 · Full",
        type: "Contract",
        method: "Bank Transfer",
        amount: 58000,
        fees: 0,
        status: "Pending" as const,
      },
      {
        id: "T-103",
        date: "2025-09-20",
        freelancer: "Masud Rana",
        item: "Contract #C-70 · Milestone 2",
        type: "Milestone",
        method: "Card (MC **** 9911)",
        amount: 45000,
        fees: 700,
        status: "Paid" as const,
      },
    ],
    []
  );

  const invoices = useMemo(
    () => [
      {
        no: "INV-2025-0915",
        issued: "2025-09-15",
        due: "2025-09-30",
        amount: 18000,
        status: "Unpaid" as const,
      },
      {
        no: "INV-2025-0907",
        issued: "2025-09-07",
        due: "2025-09-14",
        amount: 32000,
        status: "Paid" as const,
      },
    ],
    []
  );

  const upcoming = useMemo(
    () => [
      {
        id: "UP-01",
        due: "2025-10-02",
        freelancer: "Rahim Uddin",
        item: "Milestone 2",
        amount: 28000,
      },
      {
        id: "UP-02",
        due: "2025-10-05",
        freelancer: "Shila Akter",
        item: "Final Payment",
        amount: 18000,
      },
    ],
    []
  );

  const [status, setStatus] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const filteredTx = useMemo(() => {
    let list = transactions.filter((t) => {
      const okStatus = status === "all" ? true : t.status === status;
      const okType = type === "all" ? true : t.type === type;
      return okStatus && okType;
    });
    switch (sortBy) {
      case "oldest":
        list = list.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case "amount_desc":
        list = list.sort((a, b) => b.amount - a.amount);
        break;
      default:
        list = list.sort((a, b) => b.date.localeCompare(a.date));
    }
    return list;
  }, [transactions, status, type, sortBy]);

  const statusBadge = (s: string) => {
    switch (s) {
      case "Paid":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Unpaid":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Gradient header with stat cards */}
      <div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12" />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Payments
              </h1>
              <p className="text-white/80">
                Manage transactions, invoices and methods
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-white text-blue-600 hover:bg-gray-50">
                Request Payout
              </Button>
              <Button
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Calendar className="h-4 w-4 mr-2" /> This Month
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => {
              const Icon = s.icon as any;
              return (
                <div
                  key={s.label}
                  className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/20 p-4 shadow-lg backdrop-blur-md bg-clip-padding"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0.10) 100%)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <div className="pointer-events-none absolute -top-12 -right-12 h-24 w-24 rounded-full bg-white/30 blur-xl" />
                  <div className="pointer-events-none absolute -bottom-4 -right-2 opacity-10">
                    <Icon className="h-16 w-16" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">{s.label}</p>
                      <p className="text-2xl font-semibold text-white">
                        {s.value}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-white/30 backdrop-blur-sm ring-1 ring-white/30 shadow-sm">
                      <Icon className="h-5 w-5 text-white/90" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Milestone">Milestone</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Refund">Refund</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="amount_desc">Amount High → Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStatus("all");
                  setType("all");
                  setSortBy("newest");
                }}
              >
                Reset
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowUpDown className="h-4 w-4 mr-2" /> Apply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-3 w-16 text-center">
                    SL No
                  </TableHead>
                  <TableHead className="px-4 py-3">Date</TableHead>
                  <TableHead className="px-4 py-3">Freelancer</TableHead>
                  <TableHead className="px-4 py-3">Job/Contract</TableHead>
                  <TableHead className="px-4 py-3">Type</TableHead>
                  <TableHead className="px-4 py-3">Method</TableHead>
                  <TableHead className="px-4 py-3">Amount</TableHead>
                  <TableHead className="px-4 py-3">Fees</TableHead>
                  <TableHead className="px-4 py-3">Status</TableHead>
                  <TableHead className="px-4 py-3 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTx.map((t, idx) => (
                  <TableRow key={t.id}>
                    <TableCell className="px-4 py-2 text-center font-semibold">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="px-4 py-2">{t.date}</TableCell>
                    <TableCell className="px-4 py-2">{t.freelancer}</TableCell>
                    <TableCell className="px-4 py-2">{t.item}</TableCell>
                    <TableCell className="px-4 py-2">{t.type}</TableCell>
                    <TableCell className="px-4 py-2">{t.method}</TableCell>
                    <TableCell className="px-4 py-2">
                      $ {t.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      $ {t.fees.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <Badge className={statusBadge(t.status)}>
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-2 text-right">
                      <Button variant="outline" size="sm" className="mr-2">
                        <FileText className="h-4 w-4 mr-2" /> Invoice
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Invoices + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice No</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.no}>
                    <TableCell>{inv.no}</TableCell>
                    <TableCell>{inv.issued}</TableCell>
                    <TableCell>{inv.due}</TableCell>
                    <TableCell>$ {inv.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={statusBadge(inv.status)}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2">
                        <FileText className="h-4 w-4 mr-2" /> View
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {u.freelancer} · {u.item}
                  </p>
                  <p className="text-xs text-gray-600">Due: {u.due}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    $ {u.amount.toLocaleString()}
                  </span>
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Pay now
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods + Billing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="text-sm">VISA **** 4242 (Default)</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Remove
                </Button>
                <Button variant="outline" size="sm">
                  Make Default
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="text-sm">MasterCard **** 9911</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Remove
                </Button>
                <Button variant="outline" size="sm">
                  Make Default
                </Button>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Method
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Billing & Tax Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Company</p>
                <p className="font-medium text-gray-900">Xpartex Ltd.</p>
              </div>
              <div>
                <p className="text-gray-500">Tax ID</p>
                <p className="font-medium text-gray-900">BN-12345678</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Billing Address</p>
                <p className="font-medium text-gray-900">
                  House 11, Road 22, Dhaka 1212, Bangladesh
                </p>
              </div>
            </div>
            <Button variant="outline">Edit Billing Info</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
