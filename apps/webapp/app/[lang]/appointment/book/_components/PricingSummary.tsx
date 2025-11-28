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
    <div className="space-y-2 pt-4 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-800">Pricing Summary</h3>
      <div className="space-y-2">
        {data.items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium text-gray-800">{item.amount}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="font-semibold text-gray-800">Total</span>
          <span className="font-bold text-lg text-gray-800">{data.total}</span>
        </div>
      </div>
    </div>
  )
}

