"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Badge } from "../../../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { Separator } from "../../../../components/ui/separator";
import { Label } from "../../../../components/ui/label";
import Image from "next/image";
import {
  Search,
  FileText,
  Package,
  Calendar,
  Download,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

import { getInquiryById, getAllInquiries } from "../../../../actions/inquiry";
import { InquiryResponse } from "../../../../actions/inquiry/type";
import { useAuth } from "../../../../contexts/auth-context";

export default function QuotationPage() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<InquiryResponse[]>([]);
  const [allInquiries, setAllInquiries] = useState<InquiryResponse[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiryId, setInquiryId] = useState("");
  const searchParams = useSearchParams();

  // Load inquiry from URL params if provided
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setInquiryId(id);
      fetchInquiry(id);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      loadAllInquiries();
    }
  }, [user]);

  const loadAllInquiries = async () => {
    if (!user?.id) {
      console.log('No user ID available, skipping inquiry load');
      return;
    }

    setLoading(true);
    try {
      const response = await getAllInquiries();
      if (response.success && response.data) {
        setAllInquiries(response.data);
        
        // Filter inquiries to show only those made by current buyer
        const buyerInquiries = response.data.filter((inquiry: InquiryResponse) => 
          inquiry.buyer?.id === user.id
        );
        
        setInquiries(buyerInquiries);
        console.log(`Loaded ${buyerInquiries.length} buyer inquiries`);
        
        if (!selectedInquiry && buyerInquiries.length > 0) {
          setSelectedInquiry(buyerInquiries[0]);
        }
      } else {
        console.error("Failed to fetch inquiries:", response.message);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiry = async (id: string) => {
    if (!id.trim()) return;
    
    setLoading(true);
    try {
      const response = await getInquiryById(id);
      if (response.success && response.data) {
        setSelectedInquiry(response.data);
        setInquiries(prev => {
          const exists = prev.find(inq => inq.id === response.data!.id);
          if (!exists) {
            return [response.data!, ...prev];
          }
          return prev;
        });
      } else {
        console.error("Failed to fetch inquiry:", response.message);
      }
    } catch (error) {
      console.error("Error fetching inquiry:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInquirySearch = () => {
    fetchInquiry(inquiryId);
  };

  const handleInquirySelect = (inquiry: InquiryResponse) => {
    setSelectedInquiry(inquiry);
  };

  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.buyer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.buyer.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Number(amount));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Inquiry Management</h1>
          <p className="text-muted-foreground">
            View and manage your product inquiries
          </p>
        </div>
        <Button onClick={loadAllInquiries} disabled={loading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="space-y-6">

        <div className="space-y-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    All Inquiries ({filteredInquiries.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inquiries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <Label className="text-sm text-muted-foreground mb-2 block">Search by ID</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter inquiry ID..."
                        value={inquiryId}
                        onChange={(e) => setInquiryId(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleInquirySearch()}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleInquirySearch} 
                        disabled={loading || !inquiryId.trim()}
                        size="sm"
                      >
                        {loading ? "..." : "Get"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {loading ? (
                      <div className="flex justify-center py-8">
                        <RefreshCw className="h-6 w-6 animate-spin" />
                      </div>
                    ) : filteredInquiries.length > 0 ? (
                      filteredInquiries.map((inquiry) => (
                        <div
                          key={inquiry.id}
                          onClick={() => handleInquirySelect(inquiry)}
                          className={`p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedInquiry?.id === inquiry.id ? 'border-blue-500 bg-blue-50' : 'border-border'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm font-medium truncate">
                              {inquiry.product.name}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {inquiry.quantity}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>Buyer: {inquiry.buyer.firstName} {inquiry.buyer.lastName}</div>
                            <div className="font-semibold text-green-600">
                              {formatCurrency(inquiry.product.price)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No inquiries found</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {selectedInquiry ? (
                <Tabs defaultValue="details" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="details">Inquiry Details</TabsTrigger>
                    <TabsTrigger value="product">Product Information</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Inquiry Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{selectedInquiry.quantity}</div>
                            <div className="text-sm text-muted-foreground">Quantity Requested</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedInquiry.product.price)}</div>
                            <div className="text-sm text-muted-foreground">Unit Price</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{formatCurrency(Number(selectedInquiry.product.price) * selectedInquiry.quantity)}</div>
                            <div className="text-sm text-muted-foreground">Total Value</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Inquiry Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Quantity</Label>
                              <p className="text-lg">{selectedInquiry.quantity.toLocaleString()} units</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            {selectedInquiry.attachment && (
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Attachment</Label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Download className="h-4 w-4" />
                                  <a 
                                    href={selectedInquiry.attachment} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                  >
                                    View Attachment
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                          <div className="mt-2 p-4 bg-muted rounded-lg">
                            <p className="whitespace-pre-wrap">{selectedInquiry.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="product" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Product Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-48 h-48 relative border rounded-lg overflow-hidden">
                              <Image
                                src={selectedInquiry.product.img || "/placeholder.svg"}
                                alt={selectedInquiry.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-4">
                            <div>
                              <h3 className="text-xl font-semibold">{selectedInquiry.product.name}</h3>
                              <Badge variant="secondary" className="mt-1">
                                {selectedInquiry.product.productSubCategory || 'General'}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Price</Label>
                                <p className="text-lg font-semibold text-green-600">
                                  {formatCurrency(selectedInquiry.product.price)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">Stock Quantity</Label>
                                <p className="text-lg">{selectedInquiry.product.stockQuantity.toLocaleString()}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">SKU Code</Label>
                                <p className="text-lg">{selectedInquiry.product.skuCode}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-muted-foreground">HSN Code</Label>
                                <p className="text-lg">{selectedInquiry.product.hsnCode}</p>
                              </div>
                            </div>
                            
                            <div>
                              <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                              <p className="mt-1 text-sm">{selectedInquiry.product.productDescription}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Inquiry Selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select an inquiry from the list to view details, or search for a specific inquiry by ID.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
