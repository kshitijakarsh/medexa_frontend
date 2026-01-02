"use client"

import { Clock } from "lucide-react"
import type { Order } from "../types"

interface ActiveOrdersSectionProps {
    orders: Order[]
}

export function ActiveOrdersSection({ orders }: ActiveOrdersSectionProps) {


    return (
        <div>
            <h3 className="text-lg font-bold text-[#1C1C1E] mb-4">Active Orders</h3>

            {orders.length === 0 ? (
                <p className="text-gray-500 text-sm">No active orders</p>
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="p-4 bg-[#F0F9FF] border border-blue-100 rounded-lg flex items-center justify-between"
                        >
                            <div>
                                <p className="font-bold text-[#1C1C1E] text-sm capitalize mb-1">
                                    {order.type}: {order.details}
                                </p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                </p>
                            </div>
                            <span
                                className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium border-0 ${order.status === 'completed'
                                    ? 'bg-[#10B981] text-white'
                                    : order.status === 'scheduled'
                                        ? 'bg-[#3B82F6] text-white'
                                        : 'bg-[#F59E0B] text-white'
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
