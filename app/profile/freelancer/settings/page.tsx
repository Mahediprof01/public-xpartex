"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Bell,
  Shield,
  CreditCard,
  Globe,
  User,
  Lock,
  Mail,
  Smartphone,
  Save,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function FreelancerSettings() {
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      emailJobAlerts: true,
      emailMessages: true,
      emailPayments: true,
      emailMarketing: false,
      pushNotifications: true,
      smsNotifications: false
    },
    privacy: {
      profileVisibility: "public",
      showRates: true,
      showLocation: true,
      showLastActive: true
    },
    account: {
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      timezone: "America/New_York",
      language: "English",
      currency: "USD"
    },
    security: {
      twoFactorEnabled: false,
      loginAlerts: true
    }
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings)
    // Show success message
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match")
      return
    }
    console.log("Changing password")
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }))
  }

  const updatePrivacySetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }))
  }

  const updateAccountSetting = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      account: {
        ...prev.account,
        [key]: value
      }
    }))
  }

  const updateSecuritySetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and security</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Email Notifications</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <Label className="font-medium">Job Alerts</Label>
                    <p className="text-sm text-gray-500">New job postings matching your skills</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.emailJobAlerts}
                  onCheckedChange={(checked) => updateNotificationSetting('emailJobAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <Label className="font-medium">Messages</Label>
                    <p className="text-sm text-gray-500">New messages from clients</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.emailMessages}
                  onCheckedChange={(checked) => updateNotificationSetting('emailMessages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <div>
                    <Label className="font-medium">Payments</Label>
                    <p className="text-sm text-gray-500">Payment confirmations and invoices</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.emailPayments}
                  onCheckedChange={(checked) => updateNotificationSetting('emailPayments', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <Label className="font-medium">Marketing</Label>
                    <p className="text-sm text-gray-500">Tips, promotions, and updates</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.emailMarketing}
                  onCheckedChange={(checked) => updateNotificationSetting('emailMarketing', checked)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Push & SMS</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-gray-500" />
                  <div>
                    <Label className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Browser and mobile notifications</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.pushNotifications}
                  onCheckedChange={(checked) => updateNotificationSetting('pushNotifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-gray-500" />
                  <div>
                    <Label className="font-medium">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Important updates via text message</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications.smsNotifications}
                  onCheckedChange={(checked) => updateNotificationSetting('smsNotifications', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              Privacy & Visibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">Profile Visibility</Label>
                <p className="text-sm text-gray-500 mb-2">Who can see your profile</p>
                <Select 
                  value={settings.privacy.profileVisibility}
                  onValueChange={(value) => updatePrivacySetting('profileVisibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can see</SelectItem>
                    <SelectItem value="clients">Clients Only</SelectItem>
                    <SelectItem value="private">Private - Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Show Hourly Rates</Label>
                  <p className="text-sm text-gray-500">Display your rates on your profile</p>
                </div>
                <Switch
                  checked={settings.privacy.showRates}
                  onCheckedChange={(checked) => updatePrivacySetting('showRates', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Show Location</Label>
                  <p className="text-sm text-gray-500">Display your city and country</p>
                </div>
                <Switch
                  checked={settings.privacy.showLocation}
                  onCheckedChange={(checked) => updatePrivacySetting('showLocation', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Show Last Active</Label>
                  <p className="text-sm text-gray-500">Show when you were last online</p>
                </div>
                <Switch
                  checked={settings.privacy.showLastActive}
                  onCheckedChange={(checked) => updatePrivacySetting('showLastActive', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.account.email}
                onChange={(e) => updateAccountSetting('email', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={settings.account.phone}
                onChange={(e) => updateAccountSetting('phone', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select 
                value={settings.account.timezone}
                onValueChange={(value) => updateAccountSetting('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">GMT</SelectItem>
                  <SelectItem value="Europe/Paris">CET</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={settings.account.language}
                  onValueChange={(value) => updateAccountSetting('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  value={settings.account.currency}
                  onValueChange={(value) => updateAccountSetting('currency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Password</h3>
              
              <div className="space-y-3">
                <div className="relative">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({
                      ...prev,
                      currentPassword: e.target.value
                    }))}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-6 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                  />
                </div>
                
                <Button onClick={handlePasswordChange} disabled={!passwordForm.currentPassword || !passwordForm.newPassword}>
                  Update Password
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Enable 2FA</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorEnabled}
                  onCheckedChange={(checked) => updateSecuritySetting('twoFactorEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Login Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                </div>
                <Switch
                  checked={settings.security.loginAlerts}
                  onCheckedChange={(checked) => updateSecuritySetting('loginAlerts', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
            <div>
              <h3 className="font-medium text-red-700">Deactivate Account</h3>
              <p className="text-sm text-gray-600">Temporarily disable your freelancer profile</p>
            </div>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              Deactivate
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
            <div>
              <h3 className="font-medium text-red-700">Delete Account</h3>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-700 font-medium">Settings saved successfully!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}