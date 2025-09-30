"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  ShieldCheck,
  Bell,
  Link as LinkIcon,
  Calendar,
  Edit3,
} from "lucide-react";

// Gradient button class for blue-500 to cyan-500
const gradientBtn =
  "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 border-0 shadow transition-colors";

const gradientOutlineBtn =
  "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-colors";

const gradientBadge =
  "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0";

const gradientHeader =
  "relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-blue-500 to-cyan-500";

const gradientIcon = "text-cyan-500";

const labelClass = "text-xs text-cyan-700 font-medium";

const inputClass =
  "focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 border-cyan-200";

export default function ClientProfilePage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className={gradientHeader}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12" />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-white/40">
              <AvatarFallback className="bg-white/20 text-white text-xl">
                CL
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Client Profile
              </h1>
              <p className="text-white/80">
                Manage your account, company, billing and security
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className={gradientBtn}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="outline"
              className={gradientOutlineBtn + "border border-white text-white"}
            >
              <Edit3 className="h-4 w-4 mr-2" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Overview */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl border bg-gradient-to-r from-blue-50 to-cyan-50">
              <User className={"h-5 w-5 " + gradientIcon} />
              <div>
                <p className="text-xs text-cyan-700">Account Status</p>
                <Badge className={gradientBadge}>Verified</Badge>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border bg-gradient-to-r from-blue-50 to-cyan-50">
              <Building2 className={"h-5 w-5 " + gradientIcon} />
              <div>
                <p className="text-xs text-cyan-700">Company</p>
                <p className="text-sm font-medium text-cyan-900">
                  Xpartex Ltd.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border bg-gradient-to-r from-blue-50 to-cyan-50">
              <Calendar className={"h-5 w-5 " + gradientIcon} />
              <div>
                <p className="text-xs text-cyan-700">Member Since</p>
                <p className="text-sm font-medium text-cyan-900">2021</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border bg-gradient-to-r from-blue-50 to-cyan-50">
              <ShieldCheck className={"h-5 w-5 " + gradientIcon} />
              <div>
                <p className="text-xs text-cyan-700">2FA</p>
                <p className="text-sm font-medium text-cyan-900">Enabled</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forms grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Information */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-800">
              <User className={"h-4 w-4 " + gradientIcon} /> Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Full Name</label>
                <Input defaultValue="John Doe" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <div className="flex items-center gap-2">
                  <Input
                    defaultValue="john.doe@example.com"
                    className={inputClass}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      gradientOutlineBtn +
                      " px-3 py-1 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white"
                    }
                  >
                    Change
                  </Button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <div className="flex items-center gap-2">
                  <Input
                    defaultValue="+880 1700 000000"
                    className={inputClass}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      gradientOutlineBtn +
                      " px-3 py-1 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white"
                    }
                  >
                    Verify
                  </Button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Website</label>
                <Input
                  defaultValue="https://xpartex.com"
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Bio</label>
                <Textarea
                  placeholder="Short description about your business..."
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving}
                className={gradientBtn}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Company Details */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-800">
              <Building2 className={"h-4 w-4 " + gradientIcon} /> Company
              Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Company Name</label>
                <Input defaultValue="Xpartex Ltd." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Industry</label>
                <Select defaultValue="Apparel">
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Apparel">Apparel</SelectItem>
                    <SelectItem value="Textile">Textile</SelectItem>
                    <SelectItem value="Ecommerce">Ecommerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className={labelClass}>Company Email</label>
                <div className="flex items-center gap-2">
                  <Input
                    defaultValue="accounts@xpartex.com"
                    className={inputClass}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      gradientOutlineBtn +
                      " px-3 py-1 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white"
                    }
                  >
                    Verify
                  </Button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Company Phone</label>
                <Input defaultValue="+880 2 123456" className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Address</label>
                <Input
                  defaultValue="House 11, Road 22, Dhaka 1212, Bangladesh"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving}
                className={gradientBtn}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing & Tax */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-800">
              <Globe className={"h-4 w-4 " + gradientIcon} /> Billing & Tax
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Billing Email</label>
                <Input
                  defaultValue="billing@xpartex.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <Select defaultValue="USD">
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="BDT">BDT</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className={labelClass}>Tax ID / VAT</label>
                <Input defaultValue="BN-12345678" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Billing Address</label>
                <Input
                  defaultValue="House 11, Road 22, Dhaka 1212, Bangladesh"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving}
                className={gradientBtn}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-800">
              <ShieldCheck className={"h-4 w-4 " + gradientIcon} /> Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Current Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>New Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Two-Factor Authentication</label>
                <Select defaultValue="enabled">
                  <SelectTrigger className={inputClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enabled">Enabled</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving}
                className={gradientBtn}
              >
                {saving ? "Saving..." : "Update Security"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preferences + Connected Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-800">
              <Bell className={"h-4 w-4 " + gradientIcon} /> Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Email Notifications</label>
                <Select defaultValue="all">
                  <SelectTrigger className={inputClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="important">Important only</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className={labelClass}>Default Language</label>
                <Select defaultValue="en">
                  <SelectTrigger className={inputClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="bn">Bangla</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Signature</label>
                <Textarea
                  placeholder="Text appended to your outgoing messages..."
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={saving}
                className={gradientBtn}
              >
                {saving ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-800">
              <LinkIcon className={"h-4 w-4 " + gradientIcon} /> Connected
              Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3 bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="text-sm text-cyan-900">Google</div>
              <div className="flex items-center gap-2">
                <Badge className={gradientBadge}>Connected</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className={
                    gradientOutlineBtn +
                    " px-3 py-1 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white"
                  }
                >
                  Disconnect
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3 bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="text-sm text-cyan-900">LinkedIn</div>
              <div className="flex items-center gap-2">
                <Badge className={gradientBadge}>Connected</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className={
                    gradientOutlineBtn +
                    " px-3 py-1 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white"
                  }
                >
                  Disconnect
                </Button>
              </div>
            </div>
            <Button className={gradientBtn + " w-full"}>
              Connect New Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Activity */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-cyan-800">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-cyan-700">Date</TableHead>
                <TableHead className="text-cyan-700">Activity</TableHead>
                <TableHead className="text-cyan-700">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-cyan-900">2025-09-26</TableCell>
                <TableCell className="text-cyan-900">Job Posted</TableCell>
                <TableCell className="text-cyan-900">
                  Sewing Machine Operator Needed
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-cyan-900">2025-09-25</TableCell>
                <TableCell className="text-cyan-900">Payment</TableCell>
                <TableCell className="text-cyan-900">
                  Paid ৳ 32,000 to Rahim (Milestone 1)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-cyan-900">2025-09-20</TableCell>
                <TableCell className="text-cyan-900">Message</TableCell>
                <TableCell className="text-cyan-900">
                  Sent inquiry to Shila for pattern making
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
