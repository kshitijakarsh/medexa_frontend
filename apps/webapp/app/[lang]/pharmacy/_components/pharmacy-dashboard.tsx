"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { TrendingUp, TrendingDown, Package, AlertTriangle, FileText, Clock, Download, Loader2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useDashboard } from "../_hooks/useDashboard"

// Color palette for medicines by sales pie chart
const COLORS = ["#2196F3", "#4CAF50", "#FF9800", "#F44336", "#9C27B0", "#00BCD4", "#FF5722", "#009688"]

export function PharmacyDashboard() {
  const { data: dashboardData, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  const kpis = dashboardData?.data?.kpis
  const topSellingDrugs = dashboardData?.data?.topSellingDrugs || []
  const medicinesBySales = (dashboardData?.data?.medicinesBySales || []).map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }))

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Stock Value */}
        

        {/* Items Below Min Level */}
        <Card className={`bg-white border-l-4 ${kpis?.itemsBelowMinLevel?.status === "urgent" ? "border-l-orange-500" : "border-l-green-500"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Items Below Min Level</div>
              <AlertTriangle className={`h-5 w-5 ${kpis?.itemsBelowMinLevel?.status === "urgent" ? "text-orange-500" : "text-green-500"}`} />
            </div>
            <div className={`text-2xl font-bold ${kpis?.itemsBelowMinLevel?.status === "urgent" ? "text-orange-600" : "text-green-600"}`}>
              {kpis?.itemsBelowMinLevel?.count || 0}
            </div>
            <div className={`text-xs mt-1 ${kpis?.itemsBelowMinLevel?.status === "urgent" ? "text-orange-600" : "text-green-600"}`}>
              {kpis?.itemsBelowMinLevel?.message}
            </div>
          </CardContent>
        </Card>

        {/* Pending OPDs */}
        <Card className="bg-white border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Pending OPDs</div>
              <FileText className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-600">{kpis?.pendingOPDs?.count || 0}</div>
            <div className="text-xs text-gray-600 mt-1">{kpis?.pendingOPDs?.message}</div>
          </CardContent>
        </Card>

        {/* Expiring Soon */}
        <Card className="bg-white border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Expiring Soon</div>
              <Clock className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">{kpis?.expiringSoon?.count || 0}</div>
            <div className="text-xs text-red-600 mt-1">{kpis?.expiringSoon?.period}</div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Stock Value</div>
              <Package className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{kpis?.totalStockValue?.value || "$0"}</div>
            <div className={`flex items-center mt-1 text-xs ${kpis?.totalStockValue?.trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {kpis?.totalStockValue?.trend === "up" ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(kpis?.totalStockValue?.growthPercentage || 0)}% {kpis?.totalStockValue?.trend === "up" ? "Increase" : "Decrease"} Vs last Month</span>
            </div>
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
              {topSellingDrugs.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topSellingDrugs}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="medicine_name" angle={-15} textAnchor="end" height={80} fontSize={11} />
                    <YAxis yAxisId="left" orientation="left" stroke="#2196F3" label={{ value: 'Quantity Sold', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#4CAF50" label={{ value: 'Sales Amount', angle: 90, position: 'insideRight', fontSize: 11 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar yAxisId="left" dataKey="quantity_sold" fill="#2196F3" name="Quantity Sold" />
                    <Bar yAxisId="right" dataKey="sales_amount" fill="#4CAF50" name="Sales Amount" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-500">No data available</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Medicines by Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {medicinesBySales.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={medicinesBySales}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ medicine_name, percentage }) => `${medicine_name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {medicinesBySales.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  {medicinesBySales.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600">{item.medicine_name}: {item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">No data available</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Section - Reserved for future details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Additional Details</CardTitle>
        </CardHeader>
        <CardContent className="min-h-40 p-4">
          <div className="text-center text-gray-500">
            <p>Additional details and information will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
