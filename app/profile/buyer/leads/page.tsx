"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import Image from "next/image";
import { Search, Filter, Briefcase, DollarSign } from "lucide-react";

const leads = [
  {
    id: "L-001",
    title: "Cotton T-Shirt Sourcing",
    qty: "10,000 pcs",
    budget: "BDT 3.50 - 4.20 / pc",
    location: "Bangladesh",
    date: "2025-09-10",
  },
  {
    id: "L-002",
    title: "Denim Jeans Bulk Order",
    qty: "5,000 pcs",
    budget: "USD 12.00 - 15.00",
    location: "Pakistan",
    date: "2025-09-08",
  },
];

export default function LeadsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buying Leads</h1>
            <p className="text-gray-600">
              Find supplier leads based on your sourcing requests
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search leads..." className="pl-10 w-72" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button className="gradient-primary gradient-primary-hover text-white">
              Post a Lead
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {leads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {lead.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lead.qty} • {lead.location}
                    </p>
                    <p className="text-sm text-gray-700 mt-3">
                      Budget: <strong>{lead.budget}</strong>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-sm text-gray-500">
                      Posted: {lead.date}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button size="sm" className="gradient-primary text-white">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {leads.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-lg font-medium text-gray-900">
                  No leads found
                </div>
                <p className="text-gray-600">
                  Create a request to find qualified suppliers.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
