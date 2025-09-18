"use client";

import { Button } from "@/components/ui/button";
import {
  Shield,
  Clock,
  MessageCircle,
  Star,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";

interface SupplierProfileCardProps {
  supplier: any;
}

export function SupplierProfileCard({ supplier }: SupplierProfileCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="text-center">
        <div className="relative inline-block mb-3">
          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl font-bold text-sky-600">
              {supplier.name.charAt(0)}
            </span>
          </div>
          {supplier.verified && (
            <div className="absolute -top-1 -right-1 w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
        <h3 className="font-medium text-gray-900 mb-1">{supplier.name}</h3>
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(supplier.rating)
                  ? "text-cyan-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            ({supplier.rating})
          </span>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          {supplier.location}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4" />
          Response time: {supplier.responseTime}
        </div>
        <div className="text-gray-600">
          <span className="font-medium">{supplier.totalProducts}</span> Total
          Products
        </div>
      </div>

      <div className="space-y-2">
        <Button
          size="sm"
          className="w-full gradient-primary gradient-primary-hover text-white"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Now
        </Button>
        <Button size="sm" variant="outline" className="w-full">
          <Phone className="h-4 w-4 mr-2" />
          View Profile
        </Button>
      </div>

      {supplier.verified && (
        <div className="bg-green-50 border border-green-200 rounded p-3">
          <div className="flex items-center gap-2 text-green-700 text-sm">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Verified Supplier</span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Xpartex has verified the qualification of this supplier
          </p>
        </div>
      )}
    </div>
  );
}
