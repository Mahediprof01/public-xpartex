"use client"

import { BuyerLayout } from "../../../../components/dashboard/buyer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { Badge } from "../../../../components/ui/badge"
import { CreditCard } from "lucide-react"

const payments = [
  { id: 'P-001', method: 'Bank Transfer', last4: '****1234', preferred: true },
  { id: 'P-002', method: 'Letter of Credit (L/C)', last4: null, preferred: false }
]

export default function PaymentPage() {
  return (
    <BuyerLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
              <p className="text-gray-600">Manage your payment options for orders</p>
            </div>
            <Button className="gradient-primary gradient-primary-hover text-white">Add Payment Method</Button>
          </div>

          <div className="space-y-4">
            {payments.map((p) => (
              <Card key={p.id}>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium">{p.method}</div>
                        <div className="text-sm text-gray-500">{p.last4 ? `Card ${p.last4}` : 'No card number'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.preferred && <Badge className="bg-green-100 text-green-800">Preferred</Badge>}
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </BuyerLayout>
  )
}