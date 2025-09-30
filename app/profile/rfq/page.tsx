"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { Label } from "../../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  FileText, 
  Clock, 
  CheckCircle, 
  Package,
  User,
  Mail,
  Phone,
  Calendar,
  Download,
  MessageSquare,
  RefreshCw,
  Eye
} from "lucide-react";
import { getAllInquiries } from "../../../actions/inquiry";
import { InquiryResponse } from "../../../actions/inquiry/type";
import { useAuth } from "../../../contexts/auth-context";
import { SendQuoteModal } from "../../../components/rfq/send-quote-modal";
import { useRFQModal } from "../../../actions/rfq";

export default function RFQPage() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<InquiryResponse[]>([]);
  const [allInquiries, setAllInquiries] = useState<InquiryResponse[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Use RFQ store for modal state management
  const { isQuoteModalOpen, selectedInquiryForQuote, openQuoteModal, closeQuoteModal } = useRFQModal();

  useEffect(() => {
    if (user) {
      loadInquiries();
    }
  }, [user]);

  const loadInquiries = async () => {
    if (!user?.id) {
      console.log('No user ID available, skipping inquiry load');
      return;
    }

    setLoading(true);
    try {
      const response = await getAllInquiries();
      if (response.success && response.data) {
        setAllInquiries(response.data);
        
        // Filter inquiries to show only those for products owned by current seller
        const sellerInquiries = response.data.filter((inquiry: InquiryResponse) => 
          inquiry.product?.seller?.id === user.id
        );
        
        setInquiries(sellerInquiries);
        console.log(`Total inquiries: ${response.data.length}`);
        console.log(`Seller inquiries for user ${user.id}: ${sellerInquiries.length}`);
        console.log('Seller inquiries:', JSON.stringify(sellerInquiries, null, 2));
        
        if (sellerInquiries.length > 0) {
          console.log('Sample seller inquiry details:');
          sellerInquiries.forEach((inquiry, index) => {
            console.log(`Seller Inquiry ${index + 1}:`, JSON.stringify(inquiry, null, 2));
            console.log(`- Product Owner:`, inquiry.product?.seller?.id, 'vs Current User:', user.id);
          });
        }
      } else {
        console.error("Failed to load inquiries:", response.message);
      }
    } catch (error) {
      console.error("Error loading inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Number(amount));
  };

  const handleSendQuote = (inquiry: InquiryResponse) => {
    openQuoteModal(inquiry);
  };

  const handleCloseQuoteModal = () => {
    closeQuoteModal();
    // Optionally refresh the inquiries to show updated status
    loadInquiries();
  };

  // Filter inquiries based on search term
  const filteredInquiries = inquiries.filter((inquiry: InquiryResponse) =>
    inquiry.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.buyer?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.buyer?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Inquiries</p>
                <p className="text-2xl font-bold">{inquiries.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-green-600">{inquiries.filter((i: InquiryResponse) => new Date(i.buyer?.createdAt || Date.now()).getMonth() === new Date().getMonth()).length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="text-2xl font-bold text-purple-600">{new Set(inquiries.map((i: InquiryResponse) => i.product?.name)).size}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Quantity</p>
                <p className="text-2xl font-bold text-orange-600">{inquiries.reduce((sum: number, i: InquiryResponse) => sum + i.quantity, 0).toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search inquiries by product, buyer, or description..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Buyer Inquiries ({filteredInquiries.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-6 text-center">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Loading inquiries...</p>
                  </div>
                ) : filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inquiry: InquiryResponse) => (
                    <div
                      key={inquiry.id}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedInquiry?.id === inquiry.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm truncate">
                              {inquiry.product?.name || 'Product Name'}
                            </h4>
                            <Badge variant="outline" className="text-xs ml-2">
                              {inquiry.quantity}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>Buyer: {inquiry.buyer?.firstName || 'N/A'} {inquiry.buyer?.lastName || ''}</div>
                            <div className="font-semibold text-green-600">
                              {formatCurrency(inquiry.product?.price || 0)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2" />
                    <p>No inquiries found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inquiry Details */}
        <div className="lg:col-span-2">
          {selectedInquiry ? (
            <Tabs defaultValue="details" className="space-y-4">
              <TabsList>
                <TabsTrigger value="details">Inquiry Details</TabsTrigger>
                <TabsTrigger value="product">Product Information</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Inquiry Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedInquiry.quantity}</div>
                        <div className="text-sm text-muted-foreground">Quantity Requested</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(selectedInquiry.product?.price || 0)}
                        </div>
                        <div className="text-sm text-muted-foreground">Unit Price</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency((Number(selectedInquiry.product?.price || 0) * selectedInquiry.quantity))}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Value</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Quantity</Label>
                        <p className="text-lg">{selectedInquiry.quantity.toLocaleString()} units</p>
                      </div>
                      
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
                      
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                        <div className="mt-2 p-4 bg-muted rounded-lg">
                          <p className="whitespace-pre-wrap">{selectedInquiry.description}</p>
                        </div>
                      </div>

                      {/* Buyer Information */}
                      <Separator />
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground mb-2 block">Buyer Information</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Name</Label>
                            <p>{selectedInquiry.buyer?.firstName || 'N/A'} {selectedInquiry.buyer?.lastName || ''}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Email</Label>
                            <p className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {selectedInquiry.buyer?.email || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Phone</Label>
                            <p className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {selectedInquiry.buyer?.phoneNumber || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Member Since</Label>
                            <p className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {selectedInquiry.buyer?.createdAt ? formatDate(selectedInquiry.buyer.createdAt) : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        <Button 
                          variant="default" 
                          onClick={() => handleSendQuote(selectedInquiry)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Quote
                        </Button>
                        <Button variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Buyer
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export Details
                        </Button>
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
                            src={selectedInquiry.product?.img || "/placeholder.svg"}
                            alt={selectedInquiry.product?.name || "Product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold">{selectedInquiry.product?.name || 'Product Name'}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {selectedInquiry.product?.productSubCategory || 'General'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Price</Label>
                            <p className="text-lg font-semibold text-green-600">
                              {formatCurrency(selectedInquiry.product?.price || 0)}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Stock Quantity</Label>
                            <p className="text-lg">{selectedInquiry.product?.stockQuantity?.toLocaleString() || 'N/A'}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">SKU Code</Label>
                            <p className="text-lg">{selectedInquiry.product?.skuCode || 'N/A'}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">HSN Code</Label>
                            <p className="text-lg">{selectedInquiry.product?.hsnCode || 'N/A'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                          <p className="mt-1 text-sm">{selectedInquiry.product?.productDescription || 'No description available'}</p>
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
                <p className="text-muted-foreground">
                  Select an inquiry from the list to view details.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Send Quote Modal */}
      {selectedInquiryForQuote && (
        <SendQuoteModal
          isOpen={isQuoteModalOpen}
          onClose={handleCloseQuoteModal}
          inquiry={selectedInquiryForQuote}
        />
      )}
    </div>
  )
}