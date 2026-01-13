"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { TrendingUp, TrendingDown, Package, AlertTriangle, FileText, Clock, Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Dummy data
const topSellingDrugs = [
  { name: "Augmentin 625mg", currentWeek: 45, lastWeek: 70 },
  { name: "Calpol 500mg", currentWeek: 75, lastWeek: 50 },
  { name: "Dolo 650 Utapil", currentWeek: 20, lastWeek: 90 },
  { name: "Pantocid 400mg", currentWeek: 65, lastWeek: 40 },
  { name: "Azee 250 76.5mg", currentWeek: 55, lastWeek: 35 },
]

const medicinesSales = [
  { name: "Insulin", value: 52, color: "#2196F3" },
  { name: "Aspirin", value: 18, color: "#4CAF50" },
  { name: "Paracetamol", value: 6, color: "#FF9800" },
  { name: "Lisinopril", value: 10, color: "#F44336" },
  { name: "Metformin", value: 4, color: "#9C27B0" },
  { name: "Amlodipine", value: 14, color: "#00BCD4" },
]

const recentActivities = [
  { id: 1, type: "Request Received - IPD Pharmacy", details: "Room No : IPD-ARZA30440", time: "2 minutes ago", icon: Package, color: "text-blue-600" },
  { id: 2, type: "Expiring Soon", details: "9 Medicines", time: "15 minutes ago", icon: AlertTriangle, color: "text-yellow-600" },
  { id: 3, type: "Low Stock Alert", details: "Calpol 500mg - Minimum level reached", time: "1 hour ago", icon: AlertTriangle, color: "text-red-600" },
  { id: 4, type: "Stock Transfer", details: "Central Store -> OT Store", time: "2 hours ago", icon: Package, color: "text-green-600" },
  { id: 5, type: "Expiry Alert", details: "6 drugs 500ml - Expires in 15 days", time: "3 hours ago", icon: Clock, color: "text-orange-600" },
]

export function PharmacyDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Stock Value</div>
              <Package className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">$2.35M</div>
            <div className="flex items-center mt-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+6.5% Vs last Month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Items Below Min Level</div>
              <AlertTriangle className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600">24</div>
            <div className="text-xs text-orange-600 mt-1">Urgent Action Required</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Pending OPDs</div>
              <FileText className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-xs text-gray-600 mt-1">5 pending scripts</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Expiring Soon</div>
              <Clock className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">8</div>
            <div className="text-xs text-red-600 mt-1">Within 30 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Selling Drugs (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topSellingDrugs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} fontSize={11} />
                  <YAxis yAxisId="left" orientation="left" stroke="#2196F3" label={{ value: 'Quantity Sold', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#4CAF50" label={{ value: 'Sales (in $)', angle: 90, position: 'insideRight', fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar yAxisId="left" dataKey="currentWeek" fill="#2196F3" name="Current Week" />
                  <Bar yAxisId="right" dataKey="lastWeek" fill="#4CAF50" name="Last Week" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Medicines by Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={medicinesSales}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {medicinesSales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              {medicinesSales.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`${activity.color} mt-0.5`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{activity.type}</div>
                  <div className="text-sm text-gray-600">{activity.details}</div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Download Report */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-blue-900">Download Daily Sales Report</div>
              <div className="text-sm text-blue-700">Generate and download today's sales report</div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
