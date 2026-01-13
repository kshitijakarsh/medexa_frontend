import { Medicine } from "@/lib/api/medicine-api"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { ShoppingCart, Plus } from "lucide-react"

interface MedicineGridProps {
  medicines: Medicine[]
  onAddToCart: (medicine: Medicine) => void
  loading?: boolean
}

export function MedicineGrid({ medicines, onAddToCart, loading }: MedicineGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (medicines.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No medicines found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {medicines.map((medicine) => (
        <Card key={medicine.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold line-clamp-2">{medicine.medicine}</h3>
                <p className="text-sm text-muted-foreground">{medicine.type}</p>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className="font-medium">{medicine.total_stock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium text-green-600">${medicine.selling_price.toFixed(2)}</span>
                </div>
              </div>

              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => onAddToCart(medicine)}
                disabled={medicine.total_stock <= 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
