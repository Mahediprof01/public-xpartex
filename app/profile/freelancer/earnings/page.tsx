"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  CreditCard,
  Wallet,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for earnings
const earningsData = {
  overview: {
    totalEarnings: 28450,
    thisMonth: 5680,
    lastMonth: 4320,
    pendingPayments: 2340,
    availableForWithdrawal: 3400
  },
  monthlyGrowth: 31.5,
  recentTransactions: [
    {
      id: 1,
      type: "payment",
      description: "E-commerce Platform Development - Milestone 1",
      client: "TechStyle Fashion",
      amount: 1100,
      date: "2024-12-28",
      status: "completed"
    },
    {
      id: 2,
      type: "withdrawal",
      description: "Bank Transfer to ****1234",
      client: "",
      amount: -800,
      date: "2024-12-25",
      status: "completed"
    },
    {
      id: 3,
      type: "payment",
      description: "Fashion Brand Mobile App - Final Payment",
      client: "Elegant Threads",
      amount: 750,
      date: "2024-12-22",
      status: "pending"
    },
    {
      id: 4,
      type: "payment",
      description: "Supply Chain Management - Milestone 2",
      client: "Global Textiles Ltd",
      amount: 1640,
      date: "2024-12-20",
      status: "completed"
    },
    {
      id: 5,
      type: "fee",
      description: "Platform Service Fee",
      client: "",
      amount: -55,
      date: "2024-12-20",
      status: "completed"
    }
  ],
  monthlyStats: [
    { month: "Jul", earnings: 2100 },
    { month: "Aug", earnings: 2800 },
    { month: "Sep", earnings: 3200 },
    { month: "Oct", earnings: 2950 },
    { month: "Nov", earnings: 4320 },
    { month: "Dec", earnings: 5680 }
  ],
  paymentMethods: [
    {
      id: 1,
      type: "bank",
      name: "Bank Account",
      details: "****1234",
      isDefault: true
    },
    {
      id: 2,
      type: "paypal",
      name: "PayPal",
      details: "user@example.com",
      isDefault: false
    }
  ]
}

export default function Earnings() {
  const [timeRange, setTimeRange] = useState("6months")
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false)

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <ArrowDownRight className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />
      case "fee":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-700"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your income, payments, and financial growth</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${earningsData.overview.totalEarnings.toLocaleString()}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-green-600">
                  ${earningsData.overview.thisMonth.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{earningsData.monthlyGrowth}%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ${earningsData.overview.pendingPayments.toLocaleString()}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available to Withdraw</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${earningsData.overview.availableForWithdrawal.toLocaleString()}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Monthly Earnings Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earningsData.monthlyStats.map((stat, index) => (
                <div key={stat.month} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{stat.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <Progress 
                        value={(stat.earnings / Math.max(...earningsData.monthlyStats.map(s => s.earnings))) * 100} 
                        className="flex-1 h-3" 
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        ${stat.earnings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Quick Withdrawal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Available Balance</p>
              <p className="text-2xl font-bold text-blue-600">
                ${earningsData.overview.availableForWithdrawal.toLocaleString()}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Payment Methods</h4>
              {earningsData.paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {method.type === 'bank' ? <CreditCard className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{method.name}</p>
                    <p className="text-xs text-gray-500">{method.details}</p>
                  </div>
                  {method.isDefault && (
                    <Badge variant="secondary" className="text-xs">Default</Badge>
                  )}
                </div>
              ))}
            </div>
            
            <Button className="w-full" disabled={earningsData.overview.availableForWithdrawal === 0}>
              <Download className="h-4 w-4 mr-2" />
              Withdraw Funds
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Withdrawals typically process within 2-3 business days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Recent Transactions
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earningsData.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {getTransactionIcon(transaction.type)}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                  {transaction.client && (
                    <p className="text-sm text-gray-600">Client: {transaction.client}</p>
                  )}
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                
                <div className="text-right">
                  <p className={`font-bold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* This Year Summary */}
        <Card>
          <CardHeader>
            <CardTitle>2024 Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Total Income</span>
              <span className="font-bold text-green-600">$28,450</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Platform Fees</span>
              <span className="font-bold text-red-600">-$1,423</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Withdrawn</span>
              <span className="font-bold text-blue-600">-$23,627</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-900">Net Earnings</span>
              <span className="font-bold text-gray-900 text-lg">$3,400</span>
            </div>
          </CardContent>
        </Card>

        {/* Tax Information */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Tax Season Reminder</span>
              </div>
              <p className="text-sm text-yellow-700">
                Keep track of your earnings for tax purposes. Consider consulting with a tax professional.
              </p>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Tax Report
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                View 1099 Form
              </Button>
            </div>
            
            <p className="text-xs text-gray-500">
              Tax documents are available annually by January 31st
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}