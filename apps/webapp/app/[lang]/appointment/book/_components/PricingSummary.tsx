"use client"

interface PricingItem {
  label: string
  amount: string
}

interface PricingSummaryProps {
  data: {
    items: PricingItem[]
    total: string
  }
}

export function PricingSummary({ data }: PricingSummaryProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg space-y-2">
      {data.items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-sm"
        >
          <span className="text-gray-700 font-medium">{item.label}</span>
          <span className="font-semibold text-gray-900">{item.amount}</span>
        </div>
      ))}
      <div className="flex justify-between items-center pt-2 text-sm">
        <span className="text-gray-700 font-medium">Total</span>
        <span className="font-semibold text-gray-900">{data.total}</span>
      </div>
    </div>
  )
}

