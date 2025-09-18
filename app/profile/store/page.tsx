"use client"

import { DashboardLayout } from "../../../components/dashboard/dashboard-layout"
import { DashboardHeader } from "../../../components/dashboard/dashboard-header"
import { DashboardSidebar } from "../../../components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Switch } from "../../../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Label } from "../../../components/ui/label"
import Image from "next/image"
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Upload,
  Camera,
  Settings,
  Shield,
  CreditCard,
  Truck,
  Star,
  Users,
  TrendingUp,
  Eye,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

export default function StorePage() {
  return (
    <DashboardLayout>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Store Management</h1>
                <p className="text-gray-600">Configure your store profile and settings</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  Preview Store
                </Button>
                <Button className="gradient-primary gradient-primary-hover text-white">
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Store Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Store Status</p>
                      <p className="text-lg font-semibold text-green-600">Active</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Profile Completion</p>
                      <p className="text-lg font-semibold text-blue-600">85%</p>
                    </div>
                    <Settings className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Store Views</p>
                      <p className="text-lg font-semibold text-purple-600">12.4K</p>
                    </div>
                    <Eye className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +25% this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Store Rating</p>
                      <p className="text-lg font-semibold text-yellow-600">4.7 ⭐</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <p className="text-xs text-gray-500">128 reviews</p>
                </CardContent>
              </Card>
            </div>

            {/* Store Configuration Tabs */}
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Store Profile</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>

              {/* Store Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Store className="h-5 w-5" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Store Logo */}
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <Camera className="h-8 w-8 text-gray-400" />
                        </div>
                        <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Store Logo</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Upload a square logo for your store. Recommended size: 200x200px
                        </p>
                        <Button variant="outline" size="sm">
                          Upload Logo
                        </Button>
                      </div>
                    </div>

                    {/* Store Details Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="storeName">Store Name *</Label>
                        <Input 
                          id="storeName" 
                          placeholder="Enter your store name"
                          defaultValue="Premium Garments BD"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Input 
                          id="businessType" 
                          placeholder="e.g., Manufacturer, Supplier"
                          defaultValue="Garment Manufacturer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          placeholder="+880 1234567890"
                          defaultValue="+880 1712345678"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="store@example.com"
                          defaultValue="info@premiumgarments.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website URL</Label>
                        <Input 
                          id="website" 
                          placeholder="https://yourwebsite.com"
                          defaultValue="https://premiumgarments.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="established">Established Year</Label>
                        <Input 
                          id="established" 
                          placeholder="2010"
                          defaultValue="2015"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Store Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your business, products, and services..."
                        rows={4}
                        defaultValue="We are a leading garment manufacturer specializing in premium cotton apparel. With over 8 years of experience, we provide high-quality products for both local and international markets."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address *</Label>
                      <Textarea 
                        id="address" 
                        placeholder="Enter your complete business address"
                        rows={3}
                        defaultValue="House 45, Road 12, Sector 7, Uttara, Dhaka 1230, Bangladesh"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Store Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Store Visibility</h3>
                          <p className="text-sm text-gray-600">Make your store visible to buyers</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Accept New Orders</h3>
                          <p className="text-sm text-gray-600">Allow customers to place new orders</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Auto-approve RFQs</h3>
                          <p className="text-sm text-gray-600">Automatically approve quote requests</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-600">Receive notifications for new orders</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Opening Time</Label>
                        <Input type="time" defaultValue="09:00" />
                      </div>
                      <div className="space-y-2">
                        <Label>Closing Time</Label>
                        <Input type="time" defaultValue="18:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Working Days</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                          <Button 
                            key={day} 
                            variant={day === "Fri" ? "outline" : "default"} 
                            size="sm"
                            className={day !== "Fri" ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : ""}
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Verification Tab */}
              <TabsContent value="verification" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Business Verification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <h3 className="font-medium">Email Verified</h3>
                              <p className="text-sm text-gray-600">info@premiumgarments.com</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <h3 className="font-medium">Phone Verified</h3>
                              <p className="text-sm text-gray-600">+880 1712345678</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <div>
                              <h3 className="font-medium">Business License</h3>
                              <p className="text-sm text-gray-600">Upload your trade license</p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <div>
                              <h3 className="font-medium">Tax Certificate</h3>
                              <p className="text-sm text-gray-600">Upload VAT registration</p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <div>
                              <h3 className="font-medium">Bank Account</h3>
                              <p className="text-sm text-gray-600">Verify bank details</p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            <div>
                              <h3 className="font-medium">Factory Inspection</h3>
                              <p className="text-sm text-gray-600">Schedule site visit</p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Tab */}
              <TabsContent value="payment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input id="bankName" placeholder="e.g., Dutch-Bangla Bank" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountName">Account Holder Name</Label>
                        <Input id="accountName" placeholder="Account holder name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" placeholder="Bank account number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routingNumber">Routing Number</Label>
                        <Input id="routingNumber" placeholder="Bank routing number" />
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-4">Accepted Payment Methods</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Bank Transfer</h4>
                            <p className="text-sm text-gray-600">Direct bank to bank transfer</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Letter of Credit (L/C)</h4>
                            <p className="text-sm text-gray-600">For international orders</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Cash on Delivery</h4>
                            <p className="text-sm text-gray-600">For local deliveries</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Shipping Tab */}
              <TabsContent value="shipping" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping & Logistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="domesticShipping">Domestic Shipping (per kg)</Label>
                        <Input id="domesticShipping" placeholder="BDT 50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="internationalShipping">International Shipping (per kg)</Label>
                        <Input id="internationalShipping" placeholder="USD 5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="processingTime">Processing Time (days)</Label>
                        <Input id="processingTime" placeholder="7-15 days" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minOrder">Minimum Order Quantity</Label>
                        <Input id="minOrder" placeholder="100 pieces" />
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-4">Shipping Options</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Express Delivery</h4>
                            <p className="text-sm text-gray-600">2-3 business days</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Standard Delivery</h4>
                            <p className="text-sm text-gray-600">5-7 business days</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">International Shipping</h4>
                            <p className="text-sm text-gray-600">15-30 business days</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}