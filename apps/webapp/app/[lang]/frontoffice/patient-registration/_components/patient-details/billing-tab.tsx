import { Invoice } from "./types"

interface BillingTabProps {
    invoices: Invoice[]
}

export function BillingTab({ invoices }: BillingTabProps) {
    if (invoices.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
                No invoices found
            </div>
        )
    }

    // Helper to format currency
    const formatCurrency = (amount: number) => {
        return `AED ${amount.toFixed(2)}`
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[calc(100vh-220px)] flex flex-col">
            <div className="p-6">
                <h3 className="text-lg font-bold text-[#1C1C1E]">Billing / Invoices</h3>
            </div>
            <div className="p-6 space-y-4">
                {invoices.map((invoice, index) => (
                    <div key={index} className="bg-[#F9FAFB] rounded-xl p-4">
                        {/* Header Info */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-12">
                                <div>
                                    <span className="block text-[13px] font-bold text-[#1C1C1E] mb-1">{invoice.id}</span>
                                    <span className="text-xs text-gray-500">{invoice.date}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit Type</span>
                                    <span className="text-[13px] text-gray-500">{invoice.visitType}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Visit ID</span>
                                    <span className="text-[13px] text-gray-500">{invoice.visitId}</span>
                                </div>
                            </div>

                            <span
                                className={`inline-flex items-center justify-center rounded-full px-4 h-6 text-xs font-bold border-0 ${invoice.status === 'Paid'
                                    ? 'bg-[#22C55E] text-white'
                                    : invoice.status === 'Partial'
                                        ? 'bg-[#F97316] text-white'
                                        : 'bg-[#EF4444] text-white'
                                    }`}
                            >
                                {invoice.status}
                            </span>
                        </div>

                        {/* Amounts Card */}
                        <div className="bg-white rounded-lg p-4 grid grid-cols-3 gap-12">
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Total Amount</span>
                                <span className="text-[13px] font-medium text-gray-500">{formatCurrency(invoice.totalAmount)}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Paid</span>
                                <span className="text-[13px] font-medium text-gray-500">{formatCurrency(invoice.paidAmount)}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-[#1C1C1E] mb-1">Outstanding</span>
                                <span className="text-[13px] font-medium text-gray-500">{formatCurrency(invoice.outstandingAmount)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
