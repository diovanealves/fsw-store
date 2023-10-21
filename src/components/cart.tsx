import { createCheckout } from '@/actions/checkout'
import { ComputeProductTotalPrice } from '@/helpers/product'
import { CartContext } from '@/providers/cart'
import { loadStripe } from '@stripe/stripe-js'
import { ShoppingCartIcon } from 'lucide-react'
import { useContext } from 'react'
import CartItem from './cartItem'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'

export default function Cart() {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext)

  async function handleFinishPurchaseClick() {
    const checkout = await createCheckout(products)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })
  }

  return (
    <div className="flex h-full flex-col gap-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.365rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-4 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-7">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={ComputeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold">
                Você ainda não tem nenhum produto no carrinho.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col gap-3">
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R$ {subTotal.toFixed(2)}</p>
        </div>

        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>

        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          <p>- R$ {totalDiscount.toFixed(2)}</p>
        </div>

        <Separator />
        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleFinishPurchaseClick}
      >
        Finalizar compra
      </Button>
    </div>
  )
}
