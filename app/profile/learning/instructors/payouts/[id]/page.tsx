"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Download,
  HelpCircle,
  Calendar,
  Hash,
  CreditCard,
} from "lucide-react";

type PayoutStatus = "completed" | "pending" | "failed";

interface LinkedOrder {
  orderId: string;
  itemType: "course" | "ebook";
  earnings: number;
}

interface PayoutDetail {
  id: string;
  txnId: string;
  requestedAt: string;
  processedAt?: string;
  method: "bank" | "paypal";
  status: PayoutStatus;
  totalRequested: number;
  platformFee: number;
  taxes: number;
  finalPayout: number;
  linkedOrders: LinkedOrder[];
}

const MOCK_PAYOUT: PayoutDetail = {
  id: "1",
  txnId: "PYT-90021",
  requestedAt: "2025-09-18T10:12:00Z",
  processedAt: "2025-09-19T09:01:00Z",
  method: "bank",
  status: "completed",
  totalRequested: 260.5,
  platformFee: 15.0,
  taxes: 5.0,
  finalPayout: 240.5,
  linkedOrders: [
    { orderId: "ORD-10234", itemType: "course", earnings: 79 },
    { orderId: "ORD-10237", itemType: "ebook", earnings: 36 },
    { orderId: "ORD-10240", itemType: "course", earnings: 145.5 },
  ],
};

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

export default function PayoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  // TODO: Fetch real payout by id
  const payout = useMemo(() => MOCK_PAYOUT, [id]);

  return (
    <div className="p-6 space-y-6">
      {/* Header with actions */}
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
          <h1 className="text-xl font-semibold">Payout Details</h1>
          <StatusBadge status={payout.status} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Download Statement
          </Button>
          <Button className="gap-2">
            <HelpCircle className="h-4 w-4" /> Contact Support
          </Button>
        </div>
      </div>

      {/* Summary Band */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="text-sm text-white/80 flex items-center gap-2">
                <Hash className="h-4 w-4" /> Payout ID
              </div>
              <div className="text-lg font-semibold mt-1">{payout.txnId}</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="text-sm text-white/80 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Request Date
              </div>
              <div className="text-lg font-semibold mt-1">
                {new Date(payout.requestedAt).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="text-sm text-white/80 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Process Date
              </div>
              <div className="text-lg font-semibold mt-1">
                {payout.processedAt
                  ? new Date(payout.processedAt).toLocaleString()
                  : "-"}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="text-sm text-white/80 flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Method / Status
              </div>
              <div className="text-lg font-semibold mt-1 capitalize">
                {payout.method}
              </div>
              <div className="mt-2">
                <StatusBadge status={payout.status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-600">
                    Total Amount Requested
                  </div>
                  <div className="text-xl font-semibold mt-1">
                    {formatCurrency(payout.totalRequested)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">
                    Platform Fee Deducted
                  </div>
                  <div className="text-xl font-semibold mt-1">
                    {formatCurrency(payout.platformFee)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Taxes Deducted</div>
                  <div className="text-xl font-semibold mt-1">
                    {formatCurrency(payout.taxes)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">
                    Final Payout Amount
                  </div>
                  <div className="text-xl font-semibold mt-1">
                    {formatCurrency(payout.finalPayout)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="font-medium">Quick Actions</div>
              <div className="mt-3 space-y-2">
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" /> Download Statement
                </Button>
                <Button className="w-full gap-2">
                  <HelpCircle className="h-4 w-4" /> Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Linked Orders */}
      <Card>
        <CardContent className="p-0">
          <Accordion type="single" collapsible defaultValue="orders">
            <AccordionItem value="orders">
              <AccordionTrigger className="px-6 py-4">
                Linked Orders
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-gray-700">
                        <TableHead>Order ID</TableHead>
                        <TableHead>Item Type</TableHead>
                        <TableHead className="text-right">Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payout.linkedOrders.map((lo, idx) => (
                        <TableRow
                          key={`${lo.orderId}-${idx}`}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <TableCell className="font-medium">
                            {lo.orderId}
                          </TableCell>
                          <TableCell className="capitalize">
                            {lo.itemType}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(lo.earnings)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
