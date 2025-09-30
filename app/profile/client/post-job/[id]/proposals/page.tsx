"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Star,
  Clock,
  DollarSign,
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  Handshake,
} from "lucide-react";
import Link from "next/link";
import ContractCreateModal from "@/components/client/contract-create-modal";

export default function ProposalsPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string);

  // Mock proposals for the given job id
  const initialProposals = useMemo(
    () => [
      {
        id: "p1",
        freelancer: {
          name: "Rahim Uddin",
          rating: 4.8,
          location: "Dhaka, Bangladesh",
          jobsCompleted: 34,
        },
        bidAmount: "৳120,000",
        deliveryTime: "8 weeks",
        coverLetter:
          "I have 6+ years experience in garments production automation and line balancing. I can deliver high quality output with strong QA process.",
        status: "Shortlisted" as "Shortlisted" | "Pending" | "Interviewing",
      },
      {
        id: "p2",
        freelancer: {
          name: "Shila Akter",
          rating: 4.6,
          location: "Gazipur, Bangladesh",
          jobsCompleted: 18,
        },
        bidAmount: "৳95,000",
        deliveryTime: "10 weeks",
        coverLetter:
          "Experienced sewing line supervisor with strong track record in quality control and throughput improvement.",
        status: "Pending" as "Shortlisted" | "Pending" | "Interviewing",
      },
      {
        id: "p3",
        freelancer: {
          name: "Masud Rana",
          rating: 4.9,
          location: "Narayanganj, Bangladesh",
          jobsCompleted: 52,
        },
        bidAmount: "৳135,000",
        deliveryTime: "7 weeks",
        coverLetter:
          "I will optimize your sewing workflow and train operators to minimize defects. Available to start immediately.",
        status: "Interviewing" as "Shortlisted" | "Pending" | "Interviewing",
      },
    ],
    [id]
  );

  const [proposals, setProposals] = useState(initialProposals);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(
    null
  );

  const statusColor = (s: string) => {
    switch (s) {
      case "Shortlisted":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Interviewing":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleShortlist = (proposalId: string) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === proposalId ? { ...p, status: "Shortlisted" } : p
      )
    );
  };

  const openHireModal = (proposalId: string) => {
    setSelectedProposalId(proposalId);
    setModalOpen(true);
  };

  const selected = proposals.find((p) => p.id === selectedProposalId);

  const confirmHire = async () => {
    // Prototype: mark as hired (we'll just alert and keep UI as-is)
    alert(`Contract created with ${selected?.freelancer.name} (prototype)`);
    setModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div
        className="flex items-center justify-between rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        }}
      >
        <h1 className="text-2xl font-semibold text-white">Proposals</h1>
        <div className="flex items-center gap-2">
          <Link href={`/profile/client/post-job/${id}`}>
            <Button
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Job Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Proposals list in row view */}
      <div className="flex flex-col gap-4">
        {proposals.map((p) => (
          <Card key={p.id} className="border-0 shadow-sm">
            <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6">
              {/* Freelancer Info */}
              <div className="flex flex-row items-center gap-4 min-w-[220px] md:w-1/4">
                <User className="h-10 w-10 text-blue-600 bg-blue-100 rounded-full p-2" />
                <div>
                  <div className="font-semibold text-gray-900">
                    {p.freelancer.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-amber-500" />
                    {p.freelancer.rating}
                    <span className="mx-1">·</span>
                    {p.freelancer.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <MessageCircle className="h-3 w-3 text-indigo-600" />
                    {p.freelancer.jobsCompleted} jobs completed
                  </div>
                </div>
              </div>
              {/* Proposal Info */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex flex-row flex-wrap gap-4 md:gap-8">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">{p.bidAmount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{p.deliveryTime}</span>
                  </div>
                  <Badge className={statusColor(p.status)}>{p.status}</Badge>
                </div>
                <div className="flex-1 mt-2 md:mt-0 md:ml-8">
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {p.coverLetter}
                  </p>
                </div>
              </div>
              {/* Actions */}
              <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:ml-4">
                <Button variant="outline" size="sm">
                  Message
                </Button>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700"
                  size="sm"
                  onClick={() => handleShortlist(p.id)}
                  disabled={p.status === "Shortlisted"}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {p.status === "Shortlisted" ? "Shortlisted" : "Shortlist"}
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  size="sm"
                  onClick={() => openHireModal(p.id)}
                >
                  <Handshake className="h-4 w-4 mr-2" /> Hire
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ContractCreateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        proposal={
          selected
            ? {
                id: selected.id,
                freelancerName: selected.freelancer.name,
                bidAmount: selected.bidAmount,
                deliveryTime: selected.deliveryTime,
              }
            : undefined
        }
        onConfirm={async () => confirmHire()}
      />
    </div>
  );
}
