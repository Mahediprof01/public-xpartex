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
import { Search, Filter, Briefcase, DollarSign, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getRFQListByBuyer, RFQResponse } from "../../../../actions/rfq";
import { useAuth } from "../../../../contexts/auth-context";

export default function LeadsPage() {
  const [rfqs, setRfqs] = useState<RFQResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    const fetchRFQs = async () => {
      // Wait for auth to finish loading
      if (authLoading) {
        return;
      }

      if (!isAuthenticated || !user) {
        setError("Please log in to view your RFQs");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('🔍 [LeadsPage] Fetching RFQs for buyer:', user.id);
        
        const response = await getRFQListByBuyer(user.id);
        
        if (response.success) {
          // Handle both cases: data exists or empty array
          setRfqs(response.data || []);
          console.log('✅ [LeadsPage] Successfully fetched RFQs for buyer, count:', response.data?.length || 0);
        } else {
          // Check if it's a "no data found" type error vs actual error
          const isNoDataError = response.message?.toLowerCase().includes('not found') || 
                                response.message?.toLowerCase().includes('no data') ||
                                response.message?.toLowerCase().includes('empty');
          
          if (isNoDataError) {
            // Treat as empty result, not an error
            setRfqs([]);
            console.log('ℹ️ [LeadsPage] No RFQs found for buyer:', user.id);
          } else {
            // Actual error occurred
            setError(response.message || "Failed to fetch RFQs");
          }
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error fetching RFQs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRFQs();
  }, [user, isAuthenticated, authLoading]);
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
          {(loading || authLoading) && (
            <Card>
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
                <div className="text-lg font-medium text-gray-900">
                  {authLoading ? "Authenticating..." : "Loading RFQs..."}
                </div>
                <p className="text-gray-600">
                  {authLoading 
                    ? "Please wait while we verify your identity." 
                    : "Please wait while we fetch the latest requests."
                  }
                </p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-12 text-center">
                <div className="text-lg font-medium text-red-900">
                  {error.includes("log in") ? "Authentication Required" : "Error loading RFQs"}
                </div>
                <p className="text-red-600">
                  {error}
                </p>
                {!error.includes("log in") && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {!loading && !error && rfqs.map((rfq) => (
            <Card key={rfq.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {rfq.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {rfq.quantity} {rfq.unit} • {rfq.region}
                    </p>
                    <p className="text-sm text-gray-700 mt-3">
                      Currency: <strong>{rfq.currency}</strong> • Lead Time: <strong>{rfq.leadTime}</strong>
                    </p>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rfq.status === 'open' ? 'bg-green-100 text-green-800' : 
                        rfq.status === 'closed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                      </span>
                    </div>
                    {rfq.product && (
                      <p className="text-sm text-gray-500 mt-2">
                        Product: {rfq.product.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-sm text-gray-500">
                      Posted: {new Date(rfq.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" className="gradient-primary text-white">
                        Contact Buyer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {!loading && !error && rfqs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-lg font-medium text-gray-900">
                  No RFQs Available
                </div>
                <p className="text-gray-600">
                  You haven't created any requests for quotations yet. Create your first RFQ to start connecting with suppliers.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
