"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  CreditCard,
  Download,
  Mail,
  RotateCcw,
  BookOpen,
  FileText,
  Calendar,
  Hash,
  User,
  ReceiptText,
  Tag,
  Clock,
} from "lucide-react";

type OrderStatus = "completed" | "pending" | "cancelled" | "refunded";
type OrderType = "course" | "ebook";

interface OrderItem {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    id: string;
    title: string;
    type: OrderType;
    price: number;
    enrollmentStatus?: "enrolled" | "not-enrolled";
    downloadUrl?: string;
  }>;
  subtotal: number;
  taxes: number;
  platformFee: number;
  payout: number;
  paymentMethod: "card" | "paypal" | "bank" | "cod";
  transactionId: string;
  orderDate: string;
  status: OrderStatus;
}

const MOCK_ORDER: OrderItem = {
  id: "1",
  orderId: "ORD-10234",
  customerName: "Ayesha Rahman",
  customerEmail: "ayesha@example.com",
  items: [
    {
      id: "ci-1",
      title: "Advanced Pattern Making",
      type: "course",
      price: 79,
      enrollmentStatus: "enrolled",
    },
  ],
  subtotal: 79,
  taxes: 0,
  platformFee: 7.9,
  payout: 71.1,
  paymentMethod: "card",
  transactionId: "txn_7G39KLMQ",
  orderDate: "2025-09-21T10:15:00Z",
  status: "completed",
};

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

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };
  const { toast } = useToast();
  const [refundOpen, setRefundOpen] = useState(false);
  const [refundType, setRefundType] = useState<"full" | "partial">("full");
  const [refundAmount, setRefundAmount] = useState<string>("");
  const [refundReason, setRefundReason] = useState<string>("customer-request");
  const [refundNotes, setRefundNotes] = useState<string>("");
  const [unenroll, setUnenroll] = useState<boolean>(true);
  const [revokeDownload, setRevokeDownload] = useState<boolean>(true);
  const [notifyCustomer, setNotifyCustomer] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // TODO: Replace with API fetch by id
  const order = useMemo(() => MOCK_ORDER, [id]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <h1 className="text-xl font-semibold">Order Details</h1>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Download Invoice
          </Button>
          <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="gap-2"
                disabled={order.status !== "completed"}
              >
                <RotateCcw className="h-4 w-4" /> Issue Refund
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Issue Refund</DialogTitle>
                <DialogDescription>
                  Select refund type, amount, and provide a reason. This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Refund Type</Label>
                    <Select
                      value={refundType}
                      onValueChange={(v) =>
                        setRefundType(v as "full" | "partial")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder={formatCurrency(order.subtotal)}
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(e.target.value)}
                      disabled={refundType === "full"}
                    />
                    <div className="text-xs text-gray-500">
                      Max: {formatCurrency(order.subtotal)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Select value={refundReason} onValueChange={setRefundReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-request">
                        Customer Request
                      </SelectItem>
                      <SelectItem value="duplicate">Duplicate Order</SelectItem>
                      <SelectItem value="quality">Quality Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Notes (optional)</Label>
                  <Textarea
                    rows={3}
                    placeholder="Add any internal notes about this refund"
                    value={refundNotes}
                    onChange={(e) => setRefundNotes(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <div className="font-medium">Unenroll from course</div>
                      <div className="text-xs text-gray-500">
                        Revoke course access
                      </div>
                    </div>
                    <Switch checked={unenroll} onCheckedChange={setUnenroll} />
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <div className="font-medium">Revoke eBook download</div>
                      <div className="text-xs text-gray-500">
                        Invalidate download links
                      </div>
                    </div>
                    <Switch
                      checked={revokeDownload}
                      onCheckedChange={setRevokeDownload}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-3 sm:col-span-2">
                    <div>
                      <div className="font-medium">Notify customer</div>
                      <div className="text-xs text-gray-500">
                        Send refund email
                      </div>
                    </div>
                    <Switch
                      checked={notifyCustomer}
                      onCheckedChange={setNotifyCustomer}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={async () => {
                    const max = order.subtotal;
                    const amt =
                      refundType === "full" ? max : Number(refundAmount || 0);
                    if (!(amt > 0) || amt > max) {
                      toast({
                        title: "Invalid amount",
                        description: "Enter a valid refund amount",
                      });
                      return;
                    }
                    setSubmitting(true);
                    try {
                      await new Promise((r) => setTimeout(r, 1000));
                      toast({
                        title: "Refund issued",
                        description: `${
                          refundType === "full" ? "Full" : "Partial"
                        } refund of ${formatCurrency(amt)} initiated`,
                      });
                      setRefundOpen(false);
                      setRefundType("full");
                      setRefundAmount("");
                      setRefundReason("customer-request");
                      setRefundNotes("");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : "Confirm Refund"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="gap-2">
            <Mail className="h-4 w-4" /> Message Customer
          </Button>
        </div>
      </div>

      {/* Invoice-style Header Band */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-white/20">
              <Image
                src="/logo.png"
                alt="Brand"
                fill
                className="object-contain p-2"
              />
            </div>
            <div>
              <div className="text-sm text-white/80">Order</div>
              <div className="text-2xl font-semibold">{order.orderId}</div>
              <div className="text-sm text-white/80 flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />{" "}
                {new Date(order.orderDate).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <div className="text-sm text-white/80">Customer</div>
              <div className="text-lg font-semibold">{order.customerName}</div>
            </div>
            <div>
              <div className="text-sm text-white/80">Total</div>
              <div className="text-2xl font-semibold">
                {formatCurrency(order.subtotal)}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="text-sm text-white/80 flex items-center gap-2">
                <Hash className="h-4 w-4" /> Order ID
              </div>
              <div className="text-lg font-semibold mt-1">{order.orderId}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="text-sm text-white/80 flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Payment Method
              </div>
              <div className="text-lg font-semibold mt-1 capitalize">
                {order.paymentMethod}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="text-sm text-white/80">Transaction ID</div>
              <div className="text-lg font-semibold mt-1">
                {order.transactionId}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="text-sm text-white/80 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Status
              </div>
              <div className="mt-2">
                <StatusBadge status={order.status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary + Customer + Payment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-600">Customer</div>
                <div className="mt-2 flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-sm text-gray-600">
                      {order.customerEmail}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Payment</div>
                <div className="mt-2 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-600" />
                  <span className="capitalize">{order.paymentMethod}</span>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <span className="text-sm text-gray-600">Txn:</span>
                  <span className="text-sm font-medium">
                    {order.transactionId}
                  </span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                <Tag className="h-3 w-3" /> Digital Purchase
              </Badge>
              <Badge variant="secondary">No shipping</Badge>
              <Badge variant="secondary">Invoice available</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="font-medium">Quick Actions</div>
            <div className="mt-3 space-y-2">
              <Button variant="outline" className="w-full gap-2">
                <ReceiptText className="h-4 w-4" /> Print Invoice
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" /> Download Invoice
              </Button>
              <Button className="w-full gap-2">
                <Mail className="h-4 w-4" /> Message Customer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items */}
      <Card>
        <CardContent className="p-0">
          <div className="px-6 py-4 border-b border-gray-200 font-medium">
            Purchased Items
          </div>
          <div className="divide-y divide-gray-200">
            {order.items.map((it) => (
              <div
                key={it.id}
                className="px-6 py-4 flex items-start justify-between"
              >
                <div className="flex items-start gap-3">
                  {it.type === "course" ? (
                    <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                  ) : (
                    <FileText className="h-5 w-5 text-emerald-600 mt-0.5" />
                  )}
                  <div>
                    <div className="font-medium">{it.title}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {it.type}
                    </div>
                    {it.type === "course" && (
                      <div className="text-xs mt-1">
                        Enrollment:{" "}
                        {it.enrollmentStatus === "enrolled"
                          ? "Active"
                          : "Not Enrolled"}
                      </div>
                    )}
                    {it.type === "ebook" && it.downloadUrl && (
                      <Button variant="link" className="px-0 text-blue-600">
                        Download
                      </Button>
                    )}
                  </div>
                </div>
                <div className="font-medium">{formatCurrency(it.price)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"></div>
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Taxes</span>
                <span className="font-medium">
                  {formatCurrency(order.taxes)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Platform Fee</span>
                <span className="font-medium">
                  {formatCurrency(order.platformFee)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                <span className="text-gray-800">Final Payout</span>
                <span className="text-lg font-semibold">
                  {formatCurrency(order.payout)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
