"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Briefcase, 
  FileSpreadsheet, 
  DollarSign,
  ArrowUpRight,
  BarChart3,
  Star,
  CheckCircle,
  Clock,
  MessageSquare,
  Target,
  Calendar,
  Eye
} from "lucide-react"

export default function FreelancerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 via-emerald-700 to-teal-800 text-white p-8">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Freelancer Dashboard</h2>
          <p className="text-green-100 mb-6 max-w-2xl">
            Discover new opportunities, manage your projects, and grow your freelance career. 
            Connect with clients worldwide and showcase your expertise on Xpartex.
          </p>
          <div className="flex gap-4">
            <Button className="bg-white text-green-700 hover:bg-green-50">
              Find Jobs
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
              Complete Profile
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full"></div>
        
        {/* Floating illustration */}
        <div className="absolute top-8 right-8 w-48 h-32 bg-white/5 rounded-lg hidden lg:block"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Proposals</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              2 new this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Contracts</CardTitle>
            <Briefcase className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3" />
              All on track
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$12,480</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +15.3% this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">92%</div>
            <p className="text-xs text-gray-600 mt-1">Based on 25 projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Job Invites */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Recent Job Invites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">E-commerce Website Development</h4>
                  <p className="text-sm text-gray-600 mt-1">React & Node.js expertise needed</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">$2,000 - $5,000</Badge>
                    <Badge variant="outline" className="text-xs">Remote</Badge>
                  </div>
                </div>
                <div className="text-xs text-gray-500">2h ago</div>
              </div>
              
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Mobile App UI Design</h4>
                  <p className="text-sm text-gray-600 mt-1">iOS and Android design needed</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">$800 - $1,200</Badge>
                    <Badge variant="outline" className="text-xs">Fixed Price</Badge>
                  </div>
                </div>
                <div className="text-xs text-gray-500">1d ago</div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                View All Invites
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Contracts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-600" />
              Active Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border border-emerald-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Textile Supplier Platform</h4>
                    <p className="text-sm text-gray-600 mt-1">Progress: 65% complete</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700">
                    In Progress
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                  <span>Due: Dec 15, 2025</span>
                  <span className="font-medium text-emerald-600">$3,200</span>
                </div>
              </div>
              
              <div className="p-3 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Fashion Brand Website</h4>
                    <p className="text-sm text-gray-600 mt-1">Progress: 30% complete</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    Starting
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                  <span>Due: Jan 30, 2026</span>
                  <span className="font-medium text-blue-600">$1,800</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                View All Contracts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Find Jobs */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Find New Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-600 text-sm">
              Discover opportunities that match your skills and expertise in textile, fashion, and e-commerce.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Browse Jobs
            </Button>
          </CardContent>
        </Card>

        {/* Improve Profile */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-lg">Improve Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-600 text-sm">
              Complete your profile, add portfolio items, and showcase your best work to attract clients.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Track Earnings */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">Track Earnings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-600 text-sm">
              Monitor your income, view payment history, and manage withdrawal requests.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Earnings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Recent Messages
            </span>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                JS
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">John Smith</h4>
                <p className="text-sm text-gray-600">Great work on the website design! Can we discuss the next phase?</p>
              </div>
              <div className="text-xs text-gray-500">
                <Clock className="h-3 w-3 inline mr-1" />
                2h ago
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                MD
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Maria Davis</h4>
                <p className="text-sm text-gray-600">I&apos;ve reviewed your proposal for the mobile app project...</p>
              </div>
              <div className="text-xs text-gray-500">
                <Clock className="h-3 w-3 inline mr-1" />
                1d ago
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}