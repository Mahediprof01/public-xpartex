"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ContractCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal?: {
    id: string;
    freelancerName: string;
    bidAmount: string;
    deliveryTime: string;
  };
  onConfirm?: (payload: {
    title: string;
    amount: string;
    startDate: string;
    endDate: string;
    scope: string;
  }) => Promise<void> | void;
}

export default function ContractCreateModal({
  isOpen,
  onClose,
  proposal,
  onConfirm,
}: ContractCreateModalProps) {
  const [form, setForm] = useState({
    title: proposal
      ? `Contract with ${proposal.freelancerName}`
      : "New Contract",
    amount: proposal?.bidAmount ?? "",
    startDate: "",
    endDate: "",
    scope: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm?.(form);
      alert("Contract created (prototype). Redirecting to contract details...");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Contract</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Freelancer</Label>
              <Input value={proposal?.freelancerName ?? ""} disabled />
            </div>
            <div>
              <Label>Proposal bid</Label>
              <Input value={proposal?.bidAmount ?? ""} disabled />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                value={form.amount}
                onChange={(e) => update("amount", e.target.value)}
              />
            </div>
            <div>
              <Label>Start date</Label>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
              />
            </div>
            <div>
              <Label>End date</Label>
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) => update("endDate", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Scope</Label>
            <Textarea
              placeholder="Brief scope of work..."
              value={form.scope}
              onChange={(e) => update("scope", e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? "Creating..." : "Create Contract"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
