import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { Trash2, ShoppingCart, CheckCircle } from "lucide-react"

interface CartItem {
  id: number
  medicine: string
  selling_price: number
  cartQuantity: number
}

interface ShoppingCartPanelProps {
  cart: CartItem[]
  onQuantityChange: (id: number, quantity: number) => void
  onRemove: (id: number) => void
  onCheckout: () => void
}

export function ShoppingCartPanel({
  cart,
  onQuantityChange,
  onRemove,
  onCheckout,
}: ShoppingCartPanelProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.selling_price * item.cartQuantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <CardTitle>Shopping Cart</CardTitle>
          {cart.length > 0 && (
            <Badge className="ml-auto bg-blue-600">{cart.length} items</Badge>
          )}
        </div>
      </CardHeader>

      {cart.length === 0 ? (
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Your cart is empty</p>
        </CardContent>
      ) : (
        <>
          <div className="h-[300px] overflow-y-auto">
            <CardContent className="space-y-3 p-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-sm font-medium line-clamp-1">{item.medicine}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.selling_price.toFixed(2)} × {item.cartQuantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onQuantityChange(item.id, item.cartQuantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      −
                    </Button>
                    <span className="w-8 text-center font-medium">{item.cartQuantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onQuantityChange(item.id, item.cartQuantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemove(item.id)}
                      className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </div>

          <CardFooter className="flex flex-col gap-4 border-t pt-4">
            <div className="space-y-2 w-full text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              size="sm"
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={onCheckout}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Proceed to Checkout
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
